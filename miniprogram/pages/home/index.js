var greetings = [
  "早上好呀，小公主！🌸", "今天也要加油哦！💪", "你是最棒的小朋友！⭐",
  "新的一天，新的冒险！🌈", "今天想学什么呢？🦋", "你好呀，小天使！🎀"
];

var funFacts = [
  { emoji: "🐘", question: "陆地上最大的动物是什么？", answer: "是大象！刚出生的小象就有100公斤重哦！" },
  { emoji: "🌈", question: "彩虹有几种颜色？", answer: "有7种：红橙黄绿蓝靛紫，下雨后太阳出来就能看到！" },
  { emoji: "🦋", question: "蝴蝶小时候长什么样？", answer: "蝴蝶小时候是毛毛虫，要先变成蛹，再破茧而出变成蝴蝶！" },
  { emoji: "🌻", question: "为什么向日葵叫向日葵？", answer: "因为向日葵会跟着太阳转，是不是很神奇？" },
  { emoji: "🐬", question: "海豚睡觉时会闭几只眼睛？", answer: "只闭一只！一半大脑休息，另一半保持警觉！" },
  { emoji: "🌙", question: "月亮自己会发光吗？", answer: "不会哦！月亮的光其实是太阳光照到月亮上反射过来的！" },
  { emoji: "🐝", question: "蜜蜂要采多少朵花才能酿1斤蜂蜜？", answer: "要采200万朵花！它们真的好辛苦！" },
  { emoji: "❄️", question: "世界上有两片一样的雪花吗？", answer: "没有！每一片雪花都是独一无二的！" },
  { emoji: "🐱", question: "猫咪一天要睡多久？", answer: "猫咪一天要睡16个小时，是不是比你还能睡呀？" },
  { emoji: "🌍", question: "地球是什么形状的？", answer: "地球是圆的，像一个大大的球，我们都住在上面！" },
  { emoji: "🦒", question: "世界上最高的动物是什么？", answer: "是长颈鹿！它的脖子就有2米长，比爸爸还高！" },
  { emoji: "🐧", question: "企鹅会飞吗？", answer: "不会飞，但它们是游泳高手，在水里像鱼一样快！" },
  { emoji: "🍯", question: "蜂蜜放很久会坏吗？", answer: "不会！考古学家发现过3000年前的蜂蜜还能吃呢！" },
  { emoji: "🌸", question: "樱花一般开几天？", answer: "只有一周左右，所以日本人会专门去赏樱花，叫'花见'！" },
  { emoji: "🦀", question: "螃蟹的血是什么颜色的？", answer: "是蓝色的！因为它们的血液里含有铜而不是铁！" }
];

var weekDays = ["日", "一", "二", "三", "四", "五", "六"];
var user = require("../../utils/user.js");

Page({
  data: {
    greeting: "",
    todayStr: "",
    weekDay: "",
    funFact: null,
    showAnswer: false,
    streakDays: 0,
    todayChecked: false,
    weekChecks: [],
    quickEntries: [
      { id: "hanzi", name: "认汉字", icon: "📖", color: "#FF8A65", desc: "今天学几个新字" },
      { id: "math", name: "数学游戏", icon: "🔢", color: "#42A5F5", desc: "有趣的数学闯关" },
      { id: "pinyin", name: "学拼音", icon: "🔤", color: "#AB47BC", desc: "拼音声母韵母" },
      { id: "english", name: "学英语", icon: "🌍", color: "#66BB6A", desc: "字母和单词" }
    ]
  },

  onLoad: function () {
    this.initToday();
    this.loadStreak(); // 先用本地缓存快速渲染
    this.syncCheckFromCloud(); // 异步从云端拉取打卡记录并合并
  },

  onShow: function () {
    this.loadStreak();
  },

  initToday: function () {
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var wDay = weekDays[now.getDay()];
    var greeting = greetings[Math.floor(Math.random() * greetings.length)];

    this.setData({
      greeting: greeting,
      todayStr: month + "月" + day + "日",
      weekDay: "星期" + wDay
    });

    this.loadRandomFact();
  },

  loadRandomFact: function () {
    var self = this;
    wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: { type: "getRandomFact" },
      success: function (res) {
        var result = res.result;
        if (result && result.success && result.fact) {
          self.setData({ funFact: result.fact, showAnswer: false });
        } else {
          // 云端没数据，自动导入本地数据后再取
          self.importAndLoad();
        }
      },
      fail: function () {
        self.useLocalFact();
      }
    });
  },

  importAndLoad: function () {
    var self = this;
    // 先用本地的显示
    self.useLocalFact();
    // 后台导入到云端
    wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: { type: "importFunFacts", facts: funFacts },
      success: function (res) {
        console.log("趣味知识导入完成：", res.result);
      }
    });
  },

  useLocalFact: function () {
    var fact = funFacts[Math.floor(Math.random() * funFacts.length)];
    this.setData({ funFact: fact, showAnswer: false });
  },

  loadStreak: function () {
    var now = new Date();
    var todayKey = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    var checkLog = wx.getStorageSync("checkLog") || {};
    var todayChecked = !!checkLog[todayKey];

    // 计算本周打卡情况（周一到周日）
    var dayOfWeek = now.getDay() || 7; // 周日=7
    var weekChecks = [];
    for (var i = 1; i <= 7; i++) {
      var d = new Date(now);
      d.setDate(now.getDate() - (dayOfWeek - i));
      var key = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      weekChecks.push({
        day: weekDays[d.getDay()],
        checked: !!checkLog[key],
        isToday: i === dayOfWeek
      });
    }

    // 计算连续打卡天数
    var streak = 0;
    var checkDate = new Date(now);
    if (!todayChecked) {
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

    this.setData({ streakDays: streak, todayChecked: todayChecked, weekChecks: weekChecks });
  },

  doCheck: function () {
    if (this.data.todayChecked) return;
    var now = new Date();
    var todayKey = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    var checkLog = wx.getStorageSync("checkLog") || {};
    checkLog[todayKey] = true;
    wx.setStorageSync("checkLog", checkLog);
    wx.vibrateShort({ type: "light" });
    this.loadStreak();
    wx.showToast({ title: "打卡成功！🎉", icon: "none" });
    // 同步打卡记录到云端（静默执行，失败不阻塞）
    user.syncToCloud();
  },

  // 从云端拉取打卡记录，合并到本地后重新渲染
  syncCheckFromCloud: function () {
    var self = this;
    user
      .login()
      .then(function () {
        // login 已将云端 checkLog 合并写入本地缓存
        self.loadStreak();
        // 如果登录期间本地有新增打卡（用户手快），再同步一次到云端
        user.syncToCloud();
      })
      .catch(function (err) {
        console.warn("从云端同步打卡记录失败：", err);
      });
  },

  goQuick: function (event) {
    var id = event.currentTarget.dataset.id;
    if (id === "hanzi") {
      wx.switchTab({ url: "/pages/study/index" });
    } else if (id === "math") {
      wx.navigateTo({ url: "/pages/math/index" });
    } else if (id === "pinyin") {
      wx.navigateTo({ url: "/pages/pinyin/index" });
    } else if (id === "english") {
      wx.navigateTo({ url: "/pages/english/index" });
    }
  },

  refreshFact: function () {
    this.loadRandomFact();
  },

  revealAnswer: function () {
    this.setData({ showAnswer: true });
  }
});
