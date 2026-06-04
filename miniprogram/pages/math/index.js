var mathData = require("../../data/math.js");

Page({
  data: {
    games: []
  },

  onLoad: function () {
    this.setData({ games: mathData.games });
  },

  startGame: function (event) {
    var gameId = event.currentTarget.dataset.id;
    wx.navigateTo({ url: "/pages/math-play/index?id=" + gameId });
  }
});
