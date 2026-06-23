var radicalsData = require("../../data/radicals.js");
var speaker = require("../../utils/speak.js");

Page({
  data: {
    radicals: [],
    currentRadical: null,
    currentIndex: 0
  },

  onLoad: function () {
    var radicals = radicalsData.radicals;
    this.setData({
      radicals: radicals,
      currentRadical: radicals[0],
      currentIndex: 0
    });
  },

  switchRadical: function (event) {
    var id = event.currentTarget.dataset.id;
    var radicals = this.data.radicals;
    for (var i = 0; i < radicals.length; i++) {
      if (radicals[i].id === id) {
        this.setData({ currentRadical: radicals[i], currentIndex: i });
        return;
      }
    }
  },

  prev: function () {
    if (this.data.currentIndex <= 0) return;
    var newIdx = this.data.currentIndex - 1;
    this.setData({
      currentIndex: newIdx,
      currentRadical: this.data.radicals[newIdx]
    });
  },

  next: function () {
    if (this.data.currentIndex >= this.data.radicals.length - 1) return;
    var newIdx = this.data.currentIndex + 1;
    this.setData({
      currentIndex: newIdx,
      currentRadical: this.data.radicals[newIdx]
    });
  },

  readChar: function (event) {
    var char = event.currentTarget.dataset.char;
    if (char) speaker.speak(char);
  },

  readRadicalName: function () {
    var r = this.data.currentRadical;
    if (r) speaker.speakTTS(r.name);
  },

  onUnload: function () {
    speaker.destroy();
  }
});
