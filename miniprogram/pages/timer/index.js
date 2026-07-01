var user = require("../../utils/user.js");

var STUDY_SECONDS = 20 * 60;  // 20分钟
var REST_SECONDS = 5 * 60;    // 5分钟

Page({
  data: {
    status: "ready",  // ready | studying | resting | done
    timeLeft: STUDY_SECONDS,
    totalTime: STUDY_SECONDS,
    displayTime: "20:00",
    progress: 100,
    todayCount: 0,
    statusText: "准备开始专注学习",
    btnText: "开始学习 📚"
  },

  timer: null,

  onLoad: function () {
    this.loadTodayCount();
  },

  onShow: function () {
    this.loadTodayCount();
  },

  onUnload: function () {
    this.clearTimer();
  },

  onHide: function () {
    // 不清除计时器，允许后台继续
  },

  loadTodayCount: function () {
    var now = new Date();
    var todayKey = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    var focusLog = wx.getStorageSync("focusLog") || {};
    this.setData({ todayCount: focusLog[todayKey] || 0 });
  },

  startTimer: function () {
    var self = this;
    var status = self.data.status;

    if (status === "ready") {
      // 开始学习
      wx.setKeepScreenOn({ keepScreenOn: true });
      self.setData({
        status: "studying",
        timeLeft: STUDY_SECONDS,
        totalTime: STUDY_SECONDS,
        statusText: "专注学习中...",
        btnText: "放弃本次"
      });
      self.runCountdown();
    } else if (status === "studying") {
      // 放弃
      self.clearTimer();
      wx.setKeepScreenOn({ keepScreenOn: false });
      self.setData({
        status: "ready",
        timeLeft: STUDY_SECONDS,
        totalTime: STUDY_SECONDS,
        displayTime: "20:00",
        progress: 100,
        statusText: "准备开始专注学习",
        btnText: "开始学习 📚"
      });
    } else if (status === "resting") {
      // 跳过休息
      self.clearTimer();
      self.finishRound();
    } else if (status === "done") {
      // 再来一轮
      self.setData({
        status: "ready",
        timeLeft: STUDY_SECONDS,
        totalTime: STUDY_SECONDS,
        displayTime: "20:00",
        progress: 100,
        statusText: "准备开始专注学习",
        btnText: "开始学习 📚"
      });
    }
  },

  runCountdown: function () {
    var self = this;
    self.clearTimer();
    self.timer = setInterval(function () {
      var left = self.data.timeLeft - 1;
      if (left <= 0) {
        self.clearTimer();
        if (self.data.status === "studying") {
          self.onStudyDone();
        } else if (self.data.status === "resting") {
          self.finishRound();
        }
        return;
      }
      var min = Math.floor(left / 60);
      var sec = left % 60;
      var display = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
      var progress = Math.round((left / self.data.totalTime) * 100);
      self.setData({ timeLeft: left, displayTime: display, progress: progress });
    }, 1000);
  },

  onStudyDone: function () {
    var self = this;
    wx.vibrateLong();
    // 记录一次专注完成
    var now = new Date();
    var todayKey = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    var focusLog = wx.getStorageSync("focusLog") || {};
    focusLog[todayKey] = (focusLog[todayKey] || 0) + 1;
    wx.setStorageSync("focusLog", focusLog);
    user.syncToCloud();

    // 进入休息
    self.setData({
      status: "resting",
      timeLeft: REST_SECONDS,
      totalTime: REST_SECONDS,
      displayTime: "05:00",
      progress: 100,
      todayCount: focusLog[todayKey],
      statusText: "太棒了！休息一下吧",
      btnText: "跳过休息"
    });
    self.runCountdown();
  },

  finishRound: function () {
    wx.setKeepScreenOn({ keepScreenOn: false });
    this.setData({
      status: "done",
      displayTime: "🎉",
      progress: 100,
      statusText: "本轮完成！你真厉害！",
      btnText: "再来一轮 💪"
    });
  },

  clearTimer: function () {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
});
