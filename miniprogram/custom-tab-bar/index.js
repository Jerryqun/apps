Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "/pages/home/index",
        text: "首页",
        icon: "🏠",
        activeIcon: "🏡",
        color: "#FF8A65"
      },
      {
        pagePath: "/pages/study/index",
        text: "学习",
        icon: "📖",
        activeIcon: "📚",
        color: "#42A5F5"
      },
      {
        pagePath: "/pages/practice/index",
        text: "练习",
        icon: "✏️",
        activeIcon: "🎯",
        color: "#AB47BC"
      },
      {
        pagePath: "/pages/mine/index",
        text: "我的",
        icon: "👤",
        activeIcon: "⭐",
        color: "#66BB6A"
      }
    ]
  },

  methods: {
    switchTab: function (e) {
      var index = e.currentTarget.dataset.index;
      var item = this.data.list[index];
      wx.switchTab({ url: item.pagePath });
    }
  }
});
