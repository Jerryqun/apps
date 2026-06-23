Page({
  data: {
    entries: [
      { id: "quiz", name: "语文测验", icon: "📝", color: "#FF8A65", desc: "听音选字，巩固识字", page: "/pages/quiz/index" },
      { id: "math", name: "口算闯关", icon: "🔢", color: "#42A5F5", desc: "加减法限时挑战", page: "/pages/math/index" },
      { id: "english", name: "英语练习", icon: "🌍", color: "#66BB6A", desc: "字母单词认读", page: "/pages/english/index" },
      { id: "sentence", name: "连词成句", icon: "💬", color: "#26C6DA", desc: "排列词语组句子", page: "/pages/sentence/index" }
    ]
  },

  goEntry: function (event) {
    var page = event.currentTarget.dataset.page;
    wx.navigateTo({ url: page });
  }
});
