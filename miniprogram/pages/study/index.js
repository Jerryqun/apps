var hanziData = require("../../data/hanzi.js");

Page({
  data: {
    hanziCategories: [],
    learnedCount: 0,
    totalCount: 0,
    loading: true
  },

  onLoad: function () {
    this.fetchCategories();
  },

  onShow: function () {
    var learned = wx.getStorageSync("learnedChars") || [];
    this.setData({ learnedCount: learned.length });
  },

  fetchCategories: function () {
    var self = this;
    wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: { type: "getHanziCategories" },
      success: function (res) {
        var result = res.result;
        if (result && result.success && result.categories.length > 0) {
          self.setData({
            hanziCategories: result.categories,
            totalCount: result.categories.reduce(function (sum, cat) { return sum + (cat.count || 0); }, 0),
            loading: false
          });
          return;
        }
        self.useFallback();
      },
      fail: function () {
        self.useFallback();
      }
    });
  },

  useFallback: function () {
    this.setData({
      hanziCategories: hanziData.categories.map(function (cat) {
        return { catId: cat.id, name: cat.name, icon: cat.icon, color: cat.color, desc: cat.desc, count: cat.list.length };
      }),
      totalCount: hanziData.getAllHanzi().length,
      loading: false
    });
  },

  goLearn: function (event) {
    var categoryId = event.currentTarget.dataset.id || event.currentTarget.dataset.catid;
    wx.navigateTo({ url: "/pages/learn/index?catId=" + categoryId });
  },

  goPinyin: function () {
    wx.navigateTo({ url: "/pages/pinyin/index" });
  },

  goEnglish: function () {
    wx.navigateTo({ url: "/pages/english/index" });
  }
});
