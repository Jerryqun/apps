const hanziData = require("../../data/hanzi.js");
const speaker = require("../../utils/speak.js");
const user = require("../../utils/user.js");

const TOTAL_QUESTIONS = 10;

Page({
  data: {
    started: false,
    finished: false,
    questionIndex: 0,
    totalQuestions: TOTAL_QUESTIONS,
    score: 0,
    question: null,
    options: [],
    answeredId: -1,
    correctId: -1,
    showResult: false
  },

  allHanzi: [],
  questions: [],

  onLoad: function () {
    this.allHanzi = hanziData.getAllHanzi();
  },

  onUnload: function () {
    speaker.destroy();
  },

  startQuiz: function () {
    this.questions = this.buildQuestions();
    this.setData(
      {
        started: true,
        finished: false,
        questionIndex: 0,
        score: 0
      },
      () => {
        this.loadQuestion(0);
      }
    );
  },

  // 生成题目：随机选词，每题 4 个选项（看拼音+例句线索选汉字）
  buildQuestions: function () {
    const shuffled = this.shuffle(this.allHanzi.slice());
    const picked = shuffled.slice(0, TOTAL_QUESTIONS);
    const that = this;
    return picked.map(function (target) {
      const distractors = that.shuffle(
        that.allHanzi.filter(function (item) {
          return item.char !== target.char;
        })
      ).slice(0, 3);
      const options = that.shuffle(distractors.concat([target]));
      return {
        target: target,
        options: options.map(function (item, idx) {
          return { id: idx, char: item.char, isCorrect: item.char === target.char };
        })
      };
    });
  },

  loadQuestion: function (index) {
    const q = this.questions[index];
    this.setData({
      questionIndex: index,
      question: q.target,
      options: q.options,
      answeredId: -1,
      correctId: -1,
      showResult: false
    });
    this.speak(q.target.char);
  },

  speak: function (text) {
    speaker.speak(text);
  },

  replaySound: function () {
    this.speak(this.data.question.char);
  },

  chooseOption: function (event) {
    if (this.data.showResult) {
      return;
    }
    const chosenId = event.currentTarget.dataset.id;
    const options = this.data.options;
    const chosen = options.find(function (item) {
      return item.id === chosenId;
    });
    const correctOption = options.find(function (item) {
      return item.isCorrect;
    });

    const isCorrect = chosen.isCorrect;
    if (isCorrect) {
      wx.vibrateShort({ type: "light" });
      this.setData({ score: this.data.score + 1 });
    } else {
      wx.vibrateShort({ type: "heavy" });
    }

    this.setData({
      answeredId: chosenId,
      correctId: correctOption.id,
      showResult: true
    });

    setTimeout(() => {
      this.goNext();
    }, 1200);
  },

  goNext: function () {
    const nextIndex = this.data.questionIndex + 1;
    if (nextIndex >= this.questions.length) {
      this.finishQuiz();
    } else {
      this.loadQuestion(nextIndex);
    }
  },

  finishQuiz: function () {
    const score = this.data.score;
    this.saveBestScore(score);
    this.setData({ finished: true, started: false });
  },

  saveBestScore: function (score) {
    const best = wx.getStorageSync("quizBestScore") || 0;
    if (score > best) {
      wx.setStorageSync("quizBestScore", score);
    }
    const count = wx.getStorageSync("quizPlayCount") || 0;
    wx.setStorageSync("quizPlayCount", count + 1);
    // 同步到云端
    user.syncToCloud();
  },

  restart: function () {
    this.startQuiz();
  },

  backHome: function () {
    wx.switchTab({ url: "/pages/home/index" });
  },

  shuffle: function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
});
