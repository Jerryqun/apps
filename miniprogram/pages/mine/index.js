const hanziData = require("../../data/hanzi.js");
const speaker = require("../../utils/speak.js");
const user = require("../../utils/user.js");

Page({
  data: {
    learnedCount: 0,
    totalCount: 0,
    favoriteChars: [],
    bestScore: 0,
    playCount: 0,
    mathEasy: 0,
    mathMedium: 0,
    mathHard: 0,
    // 用户资料
    avatarUrl: "",
    nickName: "",
    isLoggedIn: false,
    // 编辑资料弹窗
    showProfileEditor: false,
    editingAvatar: "",
    editingAvatarFileID: "",
    editingNickName: ""
  },

  onLoad: function () {
    this.setData({ totalCount: hanziData.getAllHanzi().length });
    this.doLogin();
  },

  onShow: function () {
    this.refresh();
  },

  onUnload: function () {
    speaker.destroy();
  },

  // 登录并从云端拉取数据
  doLogin: function () {
    wx.showLoading({ title: "登录中...", mask: true });
    user
      .login()
      .then((result) => {
        wx.hideLoading();
        const profile = result.userData;
        this.setData({
          isLoggedIn: true,
          avatarUrl: profile.avatarUrl || "",
          nickName: profile.nickName || ""
        });
        this.refresh();
      })
      .catch((error) => {
        wx.hideLoading();
        console.error("登录失败：", error);
        wx.showToast({ title: "登录失败，已使用本地数据", icon: "none" });
        this.refresh();
      });
  },

  refresh: function () {
    const learned = wx.getStorageSync("learnedChars") || [];
    const favorites = wx.getStorageSync("favoriteChars") || [];
    this.setData({
      learnedCount: learned.length,
      favoriteChars: favorites,
      bestScore: wx.getStorageSync("quizBestScore") || 0,
      playCount: wx.getStorageSync("quizPlayCount") || 0,
      mathEasy: wx.getStorageSync("mathBest_easy") || 0,
      mathMedium: wx.getStorageSync("mathBest_medium") || 0,
      mathHard: wx.getStorageSync("mathBest_hard") || 0
    });
  },

  // 打开资料编辑弹窗
  openProfileEditor: function () {
    this.setData({
      showProfileEditor: true,
      editingAvatar: this.data.avatarUrl,
      editingAvatarFileID: "",
      editingNickName: this.data.nickName
    });
  },

  closeProfileEditor: function () {
    this.setData({ showProfileEditor: false });
  },

  // 空函数：用于 catchtap 阻止事件冒泡到遮罩层（避免点弹窗内部就关闭弹窗）
  noop: function () {},

  // 选择头像（微信原生头像选择）
  onChooseAvatar: function (event) {
    const tempAvatarUrl = event.detail.avatarUrl;
    // 1. 立即用临时图回显，用户马上能看到头像
    this.setData({ editingAvatar: tempAvatarUrl });

    // 2. 后台静默上传到云存储，得到永久 fileID 供保存时使用
    const cloudPath = "avatars/" + Date.now() + ".png";
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: tempAvatarUrl,
      success: (res) => {
        // 上传成功，记录云端 fileID（显示仍用临时图，回显不受影响）
        this.setData({ editingAvatarFileID: res.fileID });
      },
      fail: (error) => {
        console.error("头像上传云存储失败：", error);
        // 上传失败不影响本次显示，保存时会退化用临时地址
        this.setData({ editingAvatarFileID: "" });
        wx.showToast({ title: "头像上传失败，请重试", icon: "none" });
      }
    });
  },

  // 昵称输入
  onNickNameInput: function (event) {
    this.setData({ editingNickName: event.detail.value });
  },

  // 保存资料
  saveProfile: function () {
    // 优先使用上传成功的云端 fileID（持久可用），否则退化用临时图地址
    const avatarUrl = this.data.editingAvatarFileID || this.data.editingAvatar;
    const nickName = (this.data.editingNickName || "").trim();
    if (!nickName) {
      wx.showToast({ title: "请填写昵称", icon: "none" });
      return;
    }
    wx.showLoading({ title: "保存中...", mask: true });
    user
      .updateProfile({ avatarUrl: avatarUrl, nickName: nickName })
      .then(() => {
        wx.hideLoading();
        this.setData({
          avatarUrl: avatarUrl,
          nickName: nickName,
          showProfileEditor: false
        });
        wx.showToast({ title: "保存成功 ✅", icon: "none" });
      })
      .catch((error) => {
        wx.hideLoading();
        console.error("保存资料失败：", error);
        wx.showToast({ title: "保存失败，请重试", icon: "none" });
      });
  },

  speakChar: function (event) {
    const char = event.currentTarget.dataset.char;
    speaker.speak(char);
  },

  removeFavorite: function (event) {
    const char = event.currentTarget.dataset.char;
    let favorites = wx.getStorageSync("favoriteChars") || [];
    const index = favorites.indexOf(char);
    if (index !== -1) {
      favorites.splice(index, 1);
      wx.setStorageSync("favoriteChars", favorites);
      this.setData({ favoriteChars: favorites });
      // 同步到云端
      user.syncToCloud();
    }
  },

  goLearn: function () {
    wx.switchTab({ url: "/pages/home/index" });
  },

  clearProgress: function () {
    wx.showModal({
      title: "确认重置",
      content: "会清空学习进度和收藏哦，确定吗？",
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync("learnedChars", []);
          wx.setStorageSync("favoriteChars", []);
          wx.setStorageSync("quizBestScore", 0);
          wx.setStorageSync("quizPlayCount", 0);
          wx.setStorageSync("mathBest_easy", 0);
          wx.setStorageSync("mathBest_medium", 0);
          wx.setStorageSync("mathBest_hard", 0);
          this.refresh();
          // 同步清空到云端
          user.syncToCloud();
          wx.showToast({ title: "已重置", icon: "success" });
        }
      }
    });
  }
});
