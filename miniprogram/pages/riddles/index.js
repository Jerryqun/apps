var riddlesData = require("../../data/riddles.js");
var speaker = require("../../utils/speak.js");

Page({
  data: {
    questions: [],
    currentIndex: 0,
    current: null,
    answered: false,
    isCorrect: false,
    selectedOption: "",
    showHint: false,
    score: 0,
    total: 8,
    finished: false
  },

  onLoad: function () {
    var self = this;
    wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: { type: "getQuizData", collection: "quiz_riddles" },
      success: function (res) {
        var result = res.result;
        if (result && result.success && result.data && result.data.length > 0) {
          self.cloudPool = result.data;
          self.startQuiz();
          return;
        }
        self.startQuiz();
      },
      fail: function () {
        self.startQuiz();
      }
    });
  },

  startQuiz: function () {
    var questions;
    if (this.cloudPool && this.cloudPool.length > 0) {
      var pool = this.shuffle(this.cloudPool).slice(0, 8);
      questions = pool.map(function (item) {
        return {
          id: item.id, riddle: item.riddle, hint: item.hint,
          answer: item.answer, explain: item.explain,
          options: item.options ? this.shuffle(item.options.slice()) : [item.answer]
        };
      }.bind(this));
    } else {
      questions = riddlesData.generateQuiz(8);
    }
    this.setData({ questions: questions, total: questions.length });
    this.loadQuestion(0);
  },

  shuffle: function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  },

  loadQuestion: function (index) {
    if (index >= this.data.questions.length) {
      this.setData({ finished: true });
      return;
    }
    this.setData({
      currentIndex: index,
      current: this.data.questions[index],
      answered: false,
      isCorrect: false,
      selectedOption: "",
      showHint: false
    });
  },

  toggleHint: function () {
    this.setData({ showHint: !this.data.showHint });
  },

  selectOption: function (event) {
    if (this.data.answered) return;
    var option = event.currentTarget.dataset.option;
    var correct = option === this.data.current.answer;
    var score = this.data.score + (correct ? 1 : 0);
    this.setData({ answered: true, isCorrect: correct, selectedOption: option, score: score });
    if (correct) {
      speaker.speak(this.data.current.answer);
    }
  },

  nextQuestion: function () {
    this.loadQuestion(this.data.currentIndex + 1);
  },

  restart: function () {
    this.setData({ score: 0, finished: false });
    this.startQuiz();
  },

  onUnload: function () {
    speaker.destroy();
  }
});
