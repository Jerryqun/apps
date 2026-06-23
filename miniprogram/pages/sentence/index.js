var sentencesData = require("../../data/sentences.js");
var speaker = require("../../utils/speak.js");

Page({
  data: {
    currentSentence: null,
    shuffledWords: [],
    selectedWords: [],
    currentIndex: 0,
    total: 0,
    answered: false,
    isCorrect: false,
    score: 0
  },

  onLoad: function () {
    // 每次随机抽8题，不重复
    var all = sentencesData.sentences.slice();
    var pool = sentencesData.shuffle(all).slice(0, 8);
    this.pool = pool;
    this.setData({ total: pool.length });
    this.loadQuestion(0);
  },

  loadQuestion: function (index) {
    var sentence = this.pool[index];
    var shuffled = sentencesData.getShuffledSentence(sentence);
    this.setData({
      currentSentence: sentence,
      shuffledWords: shuffled.words.map(function (w, i) { return { text: w, id: i, used: false }; }),
      selectedWords: [],
      currentIndex: index,
      answered: false,
      isCorrect: false
    });
  },

  selectWord: function (event) {
    if (this.data.answered) return;
    var id = event.currentTarget.dataset.id;
    var shuffled = this.data.shuffledWords;
    var selected = this.data.selectedWords;

    // 找到对应词
    var wordObj = null;
    for (var i = 0; i < shuffled.length; i++) {
      if (shuffled[i].id == id && !shuffled[i].used) {
        wordObj = shuffled[i];
        shuffled[i].used = true;
        break;
      }
    }
    if (!wordObj) return;

    selected.push(wordObj);
    this.setData({ shuffledWords: shuffled, selectedWords: selected });
  },

  removeWord: function (event) {
    if (this.data.answered) return;
    var id = event.currentTarget.dataset.id;
    var shuffled = this.data.shuffledWords;
    var selected = this.data.selectedWords;

    // 从已选中移除
    var newSelected = [];
    var removed = false;
    for (var i = 0; i < selected.length; i++) {
      if (selected[i].id == id && !removed) {
        removed = true;
      } else {
        newSelected.push(selected[i]);
      }
    }

    // 恢复到可选列表
    for (var j = 0; j < shuffled.length; j++) {
      if (shuffled[j].id == id) {
        shuffled[j].used = false;
        break;
      }
    }

    this.setData({ shuffledWords: shuffled, selectedWords: newSelected });
  },

  checkAnswer: function () {
    var userAnswer = this.data.selectedWords.map(function (w) { return w.text; }).join("");
    var correct = userAnswer === this.data.currentSentence.answer;
    var score = this.data.score + (correct ? 1 : 0);
    this.setData({ answered: true, isCorrect: correct, score: score });
    // 答对后朗读句子
    if (correct) {
      speaker.speakTTS(this.data.currentSentence.answer);
    }
  },

  nextQuestion: function () {
    var nextIdx = this.data.currentIndex + 1;
    if (nextIdx >= this.data.total) {
      wx.showModal({
        title: "练习完成！",
        content: "答对 " + this.data.score + " / " + this.data.total + " 题",
        showCancel: false,
        success: function () {
          wx.navigateBack();
        }
      });
      return;
    }
    this.loadQuestion(nextIdx);
  },

  resetQuestion: function () {
    this.loadQuestion(this.data.currentIndex);
  },

  onUnload: function () {
    speaker.destroy();
  }
});
