var pinyinData = require("../../data/pinyin.js");

var pinyinAudioCtx = null;
var pinyinAudioCache = {};

function getAudioCtx() {
  if (!pinyinAudioCtx) {
    pinyinAudioCtx = wx.createInnerAudioContext();
  }
  return pinyinAudioCtx;
}

function playPinyinAudio(pinyin) {
  if (!pinyin) return;

  // 已缓存直接播放
  if (pinyinAudioCache[pinyin]) {
    var ctx = getAudioCtx();
    ctx.stop();
    ctx.src = pinyinAudioCache[pinyin];
    ctx.play();
    return;
  }

  // 通过云函数获取音频
  wx.cloud.callFunction({
    name: "quickstartFunctions",
    data: { type: "getPinyinAudio", pinyin: pinyin },
    success: function (res) {
      var result = res.result;
      if (result && result.success && result.fileID) {
        wx.cloud.downloadFile({
          fileID: result.fileID,
          success: function (dlRes) {
            if (dlRes.tempFilePath) {
              pinyinAudioCache[pinyin] = dlRes.tempFilePath;
              var ctx = getAudioCtx();
              ctx.stop();
              ctx.src = dlRes.tempFilePath;
              ctx.play();
            }
          }
        });
      }
    },
    fail: function (err) {
      console.error("拼音音频获取失败：", pinyin, err);
    }
  });
}

Page({
  data: {
    categories: [],
    currentCat: null,
    currentIndex: 0,
    current: null
  },

  onLoad: function () {
    var categories = pinyinData.categories;
    var firstCat = categories[0];
    this.setData({
      categories: categories,
      currentCat: firstCat,
      currentIndex: 0,
      current: firstCat.list[0]
    });
  },

  switchCategory: function (event) {
    var catId = event.currentTarget.dataset.id;
    var cat = pinyinData.getCategoryById(catId);
    this.setData({
      currentCat: cat,
      currentIndex: 0,
      current: cat.list[0]
    });
  },

  selectItem: function (event) {
    var index = event.currentTarget.dataset.index;
    var item = this.data.currentCat.list[index];
    this.setData({ currentIndex: index, current: item });
    playPinyinAudio(item.pinyin);
  },

  onTapPinyin: function () {
    if (this.data.current) {
      playPinyinAudio(this.data.current.pinyin);
    }
  },

  prev: function () {
    if (this.data.currentIndex <= 0) return;
    var newIndex = this.data.currentIndex - 1;
    var item = this.data.currentCat.list[newIndex];
    this.setData({ currentIndex: newIndex, current: item });
    playPinyinAudio(item.pinyin);
  },

  next: function () {
    var list = this.data.currentCat.list;
    if (this.data.currentIndex >= list.length - 1) return;
    var newIndex = this.data.currentIndex + 1;
    var item = list[newIndex];
    this.setData({ currentIndex: newIndex, current: item });
    playPinyinAudio(item.pinyin);
  },

  onUnload: function () {
    if (pinyinAudioCtx) {
      pinyinAudioCtx.destroy();
      pinyinAudioCtx = null;
    }
  }
});
