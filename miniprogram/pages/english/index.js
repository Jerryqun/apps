var englishData = require("../../data/english.js");
var speaker = require("../../utils/speak.js");

Page({
  data: {
    categories: [],
    currentCat: null,
    currentIndex: 0,
    current: null,
    isAlphabet: true
  },

  onLoad: function () {
    var categories = englishData.categories;
    var firstCat = categories[0];
    this.setData({
      categories: categories,
      currentCat: firstCat,
      currentIndex: 0,
      current: firstCat.list[0],
      isAlphabet: firstCat.id === "alphabet"
    });
  },

  switchCategory: function (event) {
    var catId = event.currentTarget.dataset.id;
    var cat = englishData.getCategoryById(catId);
    this.setData({
      currentCat: cat,
      currentIndex: 0,
      current: cat.list[0],
      isAlphabet: cat.id === "alphabet"
    });
  },

  selectItem: function (event) {
    var index = event.currentTarget.dataset.index;
    var item = this.data.currentCat.list[index];
    this.setData({ currentIndex: index, current: item });
    // 字母模式读字母，单词模式读整个单词
    var text = this.data.isAlphabet ? item.letter : item.word;
    speaker.speakTTS(text);
  },

  onTapLetter: function () {
    if (!this.data.current) return;
    speaker.speakTTS(this.data.current.letter);
  },

  onTapWord: function () {
    if (!this.data.current) return;
    speaker.speakTTS(this.data.current.word);
  },

  prev: function () {
    if (this.data.currentIndex <= 0) return;
    var newIndex = this.data.currentIndex - 1;
    var item = this.data.currentCat.list[newIndex];
    this.setData({ currentIndex: newIndex, current: item });
  },

  next: function () {
    var list = this.data.currentCat.list;
    if (this.data.currentIndex >= list.length - 1) return;
    var newIndex = this.data.currentIndex + 1;
    var item = list[newIndex];
    this.setData({ currentIndex: newIndex, current: item });
  },

  onUnload: function () {
    speaker.destroy();
  }
});
