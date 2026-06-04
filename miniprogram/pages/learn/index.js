const hanziData = require("../../data/hanzi.js");
const speaker = require("../../utils/speak.js");
const user = require("../../utils/user.js");

Page({
  data: {
    category: null,
    list: [],
    currentIndex: 0,
    current: null,
    isFavorite: false,
    isKnown: false,
    animKey: 0,
    loading: true,
    page: 1,
    pageSize: 20,
    hasMore: false,
    total: 0,
    loadingMore: false
  },

  onLoad: function (options) {
    this._catId = options.catId;
    this._knownChars = wx.getStorageSync("knownChars") || [];
    this.fetchFromCloud(1);
  },

  fetchFromCloud: function (page) {
    var self = this;
    var isFirstPage = page === 1;
    if (!isFirstPage) {
      self.setData({ loadingMore: true });
    }

    wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: {
        type: "getHanziByCategory",
        catId: self._catId,
        page: page,
        pageSize: self.data.pageSize
      },
      success: function (res) {
        var result = res.result;
        if (result && result.success && result.list.length > 0) {
          // 过滤掉已认识的字
          var known = self._knownChars;
          var filtered = result.list.filter(function (item) {
            return known.indexOf(item.char) === -1;
          });
          var newList = isFirstPage ? filtered : self.data.list.concat(filtered);
          var catName = result.list[0].catName || self._catId;
          wx.setNavigationBarTitle({ title: catName });
          self.setData({
            list: newList,
            page: page,
            hasMore: result.hasMore,
            total: result.total,
            loading: false,
            loadingMore: false,
            category: { catId: self._catId, name: catName }
          });
          if (isFirstPage) {
            if (newList.length > 0) {
              self.updateCurrent(0);
            } else if (result.hasMore) {
              // 当前页全部已认识，自动加载下一页
              self.fetchFromCloud(page + 1);
            } else {
              wx.showToast({ title: "这课的字你都认识啦！🎉", icon: "none" });
            }
          }
          return;
        }
        if (isFirstPage) {
          self.useFallback();
        }
      },
      fail: function () {
        if (isFirstPage) {
          self.useFallback();
        }
        self.setData({ loadingMore: false });
      }
    });
  },

  useFallback: function () {
    var category = hanziData.getCategoryById(this._catId);
    if (!category) {
      wx.showToast({ title: "没有找到课程", icon: "none" });
      this.setData({ loading: false });
      return;
    }
    var known = this._knownChars;
    var filtered = category.list.filter(function (item) {
      return known.indexOf(item.char) === -1;
    });
    wx.setNavigationBarTitle({ title: category.name });
    this.setData({
      category: category,
      list: filtered,
      loading: false,
      hasMore: false,
      total: filtered.length
    });
    if (filtered.length > 0) {
      this.updateCurrent(0);
    } else {
      wx.showToast({ title: "这课的字你都认识啦！🎉", icon: "none" });
    }
  },

  loadMore: function () {
    if (this.data.hasMore && !this.data.loadingMore) {
      this.fetchFromCloud(this.data.page + 1);
    }
  },

  onUnload: function () {
    speaker.destroy();
  },

  updateCurrent: function (index) {
    const list = this.data.list;
    if (index < 0 || index >= list.length) {
      return;
    }
    const current = list[index];
    this.setData({
      currentIndex: index,
      current: current,
      isFavorite: this.checkFavorite(current.char),
      isKnown: this._knownChars.indexOf(current.char) !== -1,
      animKey: this.data.animKey + 1
    });
    this.markLearned(current.char);
    this.speak(current.char);
  },

  // 标记已认识：从列表移除并跳到下一个
  markKnown: function () {
    var char = this.data.current.char;
    if (this._knownChars.indexOf(char) === -1) {
      this._knownChars.push(char);
      wx.setStorageSync("knownChars", this._knownChars);
      user.syncToCloud();
    }

    // 从当前列表移除
    var list = this.data.list.slice();
    var idx = this.data.currentIndex;
    list.splice(idx, 1);

    if (list.length === 0) {
      // 全部认识了
      if (this.data.hasMore) {
        this.setData({ list: list, currentIndex: 0 });
        this.fetchFromCloud(this.data.page + 1);
      } else {
        this.setData({ list: list, current: null, total: 0 });
        wx.showToast({ title: "这课的字你都认识啦！🎉", icon: "none" });
      }
      return;
    }

    // 调整索引
    var newIdx = idx >= list.length ? list.length - 1 : idx;
    this.setData({ list: list, total: this.data.total - 1 });
    this.updateCurrent(newIdx);
    wx.showToast({ title: "已标记认识 ✅", icon: "none", duration: 1000 });
  },

  // 标记已学
  markLearned: function (char) {
    const learned = wx.getStorageSync("learnedChars") || [];
    if (learned.indexOf(char) === -1) {
      learned.push(char);
      wx.setStorageSync("learnedChars", learned);
      // 同步到云端
      user.syncToCloud();
    }
  },

  checkFavorite: function (char) {
    const favorites = wx.getStorageSync("favoriteChars") || [];
    return favorites.indexOf(char) !== -1;
  },

  // 文字转语音朗读
  speak: function (text) {
    speaker.speak(text);
  },

  // 点击大字朗读
  onTapChar: function () {
    this.speak(this.data.current.char);
  },

  // 朗读组词（TTS读词语）
  onTapWord: function (event) {
    var word = event.currentTarget.dataset.word;
    if (word) {
      speaker.speakTTS(word);
    }
  },

  // 朗读例句（TTS读整句）
  onTapSentence: function () {
    if (this.data.current && this.data.current.sentence) {
      speaker.speakTTS(this.data.current.sentence);
    }
  },

  prev: function () {
    if (this.data.currentIndex > 0) {
      this.updateCurrent(this.data.currentIndex - 1);
    }
  },

  next: function () {
    var self = this;
    if (this.data.currentIndex < this.data.list.length - 1) {
      this.updateCurrent(this.data.currentIndex + 1);
    } else if (this.data.hasMore) {
      // 还有更多数据，加载下一页
      this.setData({ loadingMore: true });
      var nextPage = this.data.page + 1;
      wx.cloud.callFunction({
        name: "quickstartFunctions",
        data: {
          type: "getHanziByCategory",
          catId: self._catId,
          page: nextPage,
          pageSize: self.data.pageSize
        },
        success: function (res) {
          var result = res.result;
          if (result && result.success && result.list.length > 0) {
            var newList = self.data.list.concat(result.list);
            var nextIndex = self.data.currentIndex + 1;
            self.setData({
              list: newList,
              page: nextPage,
              hasMore: result.hasMore,
              loadingMore: false
            });
            self.updateCurrent(nextIndex);
          } else {
            self.setData({ loadingMore: false, hasMore: false });
          }
        },
        fail: function () {
          self.setData({ loadingMore: false });
          wx.showToast({ title: "加载失败", icon: "none" });
        }
      });
    } else {
      wx.showModal({
        title: "太棒啦！🎉",
        content: "这一课的字都学完啦，去玩游戏检验一下吧！",
        confirmText: "去玩游戏",
        cancelText: "再看一遍",
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({ url: "/pages/quiz/index" });
          } else {
            self.updateCurrent(0);
          }
        }
      });
    }
  },

  toggleFavorite: function () {
    const char = this.data.current.char;
    let favorites = wx.getStorageSync("favoriteChars") || [];
    const index = favorites.indexOf(char);
    if (index === -1) {
      favorites.push(char);
      wx.showToast({ title: "已收藏 ⭐", icon: "none" });
    } else {
      favorites.splice(index, 1);
      wx.showToast({ title: "已取消收藏", icon: "none" });
    }
    wx.setStorageSync("favoriteChars", favorites);
    this.setData({ isFavorite: index === -1 });
    // 同步到云端
    user.syncToCloud();
  }
});
