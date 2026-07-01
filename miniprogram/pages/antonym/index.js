var antonymsData = require("../../data/antonyms.js");
var speaker = require("../../utils/speak.js");

Page({
  data: {
    questions: [],
    currentIndex: 0,
    current: null,
    answered: false,
    isCorrect: false,
    selectedOption: "",
    score: 0,
    total: 8,
    finished: false
  },

  onLoad: function () {
    var questions = antonymsData.generateQuiz(8);
    this.setData({ questions: questions, total: questions.length });
    this.loadQuestion(0);
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
      selectedOption: ""
    });
  },

  selectOption: function (event) {
    if (this.data.answered) return;
    var option = event.currentTarget.dataset.option;
    var correct = option === this.data.current.answer;
    var score = this.data.score + (correct ? 1 : 0);
    this.setData({ answered: true, isCorrect: correct, selectedOption: option, score: score });
    if (correct) {
      speaker.speakTTS(this.data.current.word + "的反义词是" + this.data.current.answer);
    }
  },

  nextQuestion: function () {
    this.loadQuestion(this.data.currentIndex + 1);
  },

  restart: function () {
    var questions = antonymsData.generateQuiz(8);
    this.setData({ questions: questions, total: questions.length, score: 0, finished: false });
    this.loadQuestion(0);
  },

  onUnload: function () {
    speaker.destroy();
  }
});
