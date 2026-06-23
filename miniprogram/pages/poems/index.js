var poemsData = require("../../data/poems.js");
var speaker = require("../../utils/speak.js");

Page({
  data: {
    poems: [],
    current: null,
    currentIndex: 0,
    showPinyin: true
  },

  onLoad: function () {
    var poems = poemsData.poems;
    this.setData({
      poems: poems,
      current: poems[0],
      currentIndex: 0
    });
  },

  selectPoem: function (event) {
    var id = event.currentTarget.dataset.id;
    var poems = this.data.poems;
    for (var i = 0; i < poems.length; i++) {
      if (poems[i].id === id) {
        this.setData({ current: poems[i], currentIndex: i });
        return;
      }
    }
  },

  togglePinyin: function () {
    this.setData({ showPinyin: !this.data.showPinyin });
  },

  readLine: function (event) {
    var line = event.currentTarget.dataset.line;
    if (line) speaker.speakTTS(line.replace(/[，。？！]/g, ""));
  },

  readAll: function () {
    var poem = this.data.current;
    if (poem) {
      var fullText = poem.lines.join("").replace(/[，。？！]/g, "");
      speaker.speakTTS(fullText);
    }
  },

  prev: function () {
    if (this.data.currentIndex <= 0) return;
    var newIdx = this.data.currentIndex - 1;
    this.setData({ currentIndex: newIdx, current: this.data.poems[newIdx] });
  },

  next: function () {
    if (this.data.currentIndex >= this.data.poems.length - 1) return;
    var newIdx = this.data.currentIndex + 1;
    this.setData({ currentIndex: newIdx, current: this.data.poems[newIdx] });
  },

  onUnload: function () {
    speaker.destroy();
  }
});
