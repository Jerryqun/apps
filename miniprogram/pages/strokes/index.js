var strokesData = require("../../data/strokes.js");
var speaker = require("../../utils/speak.js");

Page({
  data: {
    strokes: [],
    current: null,
    currentIndex: -1
  },

  onLoad: function () {
    this.setData({ strokes: strokesData.strokes });
  },

  selectStroke: function (event) {
    var id = event.currentTarget.dataset.id;
    var strokes = this.data.strokes;
    for (var i = 0; i < strokes.length; i++) {
      if (strokes[i].id == id) {
        this.setData({ current: strokes[i], currentIndex: i });
        return;
      }
    }
  },

  readChar: function (event) {
    var char = event.currentTarget.dataset.char;
    if (char) speaker.speak(char);
  },

  readName: function () {
    var s = this.data.current;
    if (s) speaker.speakTTS(s.name);
  },

  goBack: function () {
    this.setData({ current: null, currentIndex: -1 });
  },

  onUnload: function () {
    speaker.destroy();
  }
});
