var badges = require("../../data/badges.js");

var MATH_GAME_IDS = [
  "calc", "compare", "shape", "clock", "count", "pattern",
  "multiply", "position", "chaincalc", "money", "compose",
  "classify", "solid", "tenmethod", "wordproblem"
];

Page({
  data: {
    badges: [],
    unlockedCount: 0
  },

  onLoad: function () {
    this.computeBadges();
  },

  onShow: function () {
    this.computeBadges();
  },

  computeBadges: function () {
    var stats = this.getStats();
    var list = badges.map(function (badge) {
      var current = stats[badge.type] || 0;
      var unlocked = current >= badge.target;
      var progress = Math.min(Math.round((current / badge.target) * 100), 100);
      return {
        id: badge.id,
        name: badge.name,
        icon: badge.icon,
        desc: badge.desc,
        unlocked: unlocked,
        progress: progress,
        progressText: current + "/" + badge.target
      };
    });
    var unlockedCount = list.filter(function (b) { return b.unlocked; }).length;
    this.setData({ badges: list, unlockedCount: unlockedCount });
  },

  getStats: function () {
    // 连续打卡天数
    var checkLog = wx.getStorageSync("checkLog") || {};
    var streak = 0;
    var now = new Date();
    var checkDate = new Date(now);
    var todayKey = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    if (!checkLog[todayKey]) {
      checkDate.setDate(checkDate.getDate() - 1);
    }
    while (true) {
      var k = checkDate.getFullYear() + "-" + (checkDate.getMonth() + 1) + "-" + checkDate.getDate();
      if (checkLog[k]) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // 已学汉字数
    var learnedChars = wx.getStorageSync("learnedChars") || [];
    var learned = learnedChars.length;

    // 已完成的数学游戏种类数（有分数 > 0 的）
    var mathGames = 0;
    MATH_GAME_IDS.forEach(function (gid) {
      if ((wx.getStorageSync("mathBest_" + gid) || 0) > 0) {
        mathGames++;
      }
    });

    // 累计专注次数
    var focusLog = wx.getStorageSync("focusLog") || {};
    var totalFocus = 0;
    Object.keys(focusLog).forEach(function (k) {
      totalFocus += focusLog[k];
    });

    // 习惯全勤天数（某天8项全部完成）
    var habitsLog = wx.getStorageSync("habitsLog") || {};
    var habitPerfect = 0;
    Object.keys(habitsLog).forEach(function (k) {
      if (habitsLog[k] && habitsLog[k].length >= 8) {
        habitPerfect++;
      }
    });

    return {
      streak: streak,
      learned: learned,
      mathGames: mathGames,
      totalFocus: totalFocus,
      habitPerfect: habitPerfect
    };
  },

  goBack: function () {
    wx.navigateBack();
  }
});
