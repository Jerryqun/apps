Page({
  data: {
    entries: [
      { id: "quiz", name: "语文测验", icon: "📝", color: "#FF8A65", desc: "听音选字，巩固识字", page: "/pages/quiz/index" },
      { id: "math", name: "口算闯关", icon: "🔢", color: "#42A5F5", desc: "加减法限时挑战", page: "/pages/math/index" },
      { id: "english", name: "英语练习", icon: "🌍", color: "#66BB6A", desc: "字母单词认读", page: "/pages/english/index" },
      { id: "sentence", name: "连词成句", icon: "💬", color: "#26C6DA", desc: "排列词语组句子", page: "/pages/sentence/index" },
      { id: "antonym", name: "反义词配对", icon: "⇄", color: "#43A047", desc: "找出反义词", page: "/pages/antonym/index" },
      { id: "classifier", name: "量词填空", icon: "📚", color: "#7B1FA2", desc: "一只猫一条鱼", page: "/pages/classifier/index" },
      { id: "picture", name: "看图说话", icon: "🖼️", color: "#1565C0", desc: "观察图画选句子", page: "/pages/picture-talk/index" },
      { id: "riddles", name: "趣味字谜", icon: "🧩", color: "#E65100", desc: "猜字谜认汉字", page: "/pages/riddles/index" }
    ]
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
  },

  goEntry: function (event) {
    var page = event.currentTarget.dataset.page;
    wx.navigateTo({ url: page });
  }
});
