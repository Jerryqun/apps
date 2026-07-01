var habits = require("../../data/habits.js");
var user = require("../../utils/user.js");

Page({
  data: {
    todayStr: "",
    habits: [],
    doneCount: 0,
    totalCount: 8
  },

  onLoad: function () {
    this.initToday();
  },

  onShow: function () {
    this.initToday();
  },

  initToday: function () {
    var now = new Date();
    var todayKey = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    var habitsLog = wx.getStorageSync("habitsLog") || {};
    var todayDone = habitsLog[todayKey] || [];

    var list = habits.map(function (item) {
      return {
        id: item.id,
        name: item.name,
        icon: item.icon,
        done: todayDone.indexOf(item.id) !== -1
      };
    });

    var month = now.getMonth() + 1;
    var day = now.getDate();

    this.setData({
      todayStr: month + "月" + day + "日",
      habits: list,
      doneCount: todayDone.length,
      totalCount: habits.length
    });
  },

  toggleHabit: function (e) {
    var id = e.currentTarget.dataset.id;
    var now = new Date();
    var todayKey = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    var habitsLog = wx.getStorageSync("habitsLog") || {};
    var todayDone = habitsLog[todayKey] || [];

    var idx = todayDone.indexOf(id);
    if (idx === -1) {
      todayDone.push(id);
      wx.vibrateShort({ type: "light" });
    } else {
      todayDone.splice(idx, 1);
    }

    habitsLog[todayKey] = todayDone;
    wx.setStorageSync("habitsLog", habitsLog);

    this.initToday();
    user.syncToCloud();
  },

  goBack: function () {
    wx.navigateBack();
  }
});
