var mathData = require("../../data/math.js");

var feedbackAudio = null;
var feedbackCache = {};

function getFeedbackAudio() {
  if (!feedbackAudio) {
    feedbackAudio = wx.createInnerAudioContext();
  }
  return feedbackAudio;
}

function playFeedback(name) {
  if (feedbackCache[name]) {
    var ctx = getFeedbackAudio();
    ctx.stop();
    ctx.src = feedbackCache[name];
    ctx.play();
    return;
  }
  var fileID = "cloud://cloud1-d1gfxg66v1189fa18.636c-cloud1-d1gfxg66v1189fa18-1439573675/audio/feedback/" + name + ".mp3";
  wx.cloud.downloadFile({
    fileID: fileID,
    success: function (res) {
      if (res.tempFilePath) {
        feedbackCache[name] = res.tempFilePath;
        var ctx = getFeedbackAudio();
        ctx.stop();
        ctx.src = res.tempFilePath;
        ctx.play();
      }
    }
  });
}

Page({
  data: {
    phase: "playing",
    gameId: "",
    gameName: "",
    gameColor: "",
    questions: [],
    currentIndex: 0,
    current: null,
    score: 0,
    combo: 0,
    maxCombo: 0,
    correctCount: 0,
    answered: false,
    selectedOption: "",
    isCorrect: false,
    showEncourage: "",
    starCount: 0
  },

  onLoad: function (options) {
    var gameId = options.id;
    var game = mathData.getGameById(gameId);
    if (!game) {
      wx.navigateBack();
      return;
    }
    var questions = mathData.generateQuestions(gameId);
    wx.setNavigationBarTitle({ title: game.name });
    this.setData({
      phase: "playing",
      gameId: gameId,
      gameName: game.name,
      gameColor: game.color,
      questions: questions,
      currentIndex: 0,
      current: questions[0],
      score: 0,
      combo: 0,
      maxCombo: 0,
      correctCount: 0,
      answered: false,
      selectedOption: "",
      isCorrect: false,
      showEncourage: ""
    });
    // 如果第一题是钟表题，画钟面
    if (questions[0] && questions[0].clockData) {
      var that = this;
      setTimeout(function () { that.drawClock(questions[0].clockData); }, 100);
    }
  },

  // ======== 画钟面 ========
  drawClock: function (clockData) {
    var ctx = wx.createCanvasContext("clockCanvas", this);
    var size = 220; // canvas 尺寸 (px, 对应 440rpx)
    var cx = size / 2;
    var cy = size / 2;
    var radius = size / 2 - 12;

    // 钟面底色
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.setFillStyle("#FFF8E1");
    ctx.fill();
    ctx.setStrokeStyle("#FF8A65");
    ctx.setLineWidth(4);
    ctx.stroke();

    // 刻度和数字
    for (var i = 1; i <= 12; i++) {
      var angle = (i * 30 - 90) * Math.PI / 180;
      // 短刻度
      var tickOuter = radius - 6;
      var tickInner = radius - 16;
      ctx.beginPath();
      ctx.moveTo(cx + tickOuter * Math.cos(angle), cy + tickOuter * Math.sin(angle));
      ctx.lineTo(cx + tickInner * Math.cos(angle), cy + tickInner * Math.sin(angle));
      ctx.setStrokeStyle("#795548");
      ctx.setLineWidth(2);
      ctx.stroke();
      // 数字
      var numR = radius - 28;
      ctx.setFontSize(16);
      ctx.setFillStyle("#5D4037");
      ctx.setTextAlign("center");
      ctx.setTextBaseline("middle");
      ctx.fillText(String(i), cx + numR * Math.cos(angle), cy + numR * Math.sin(angle));
    }

    // 中心圆点
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, 2 * Math.PI);
    ctx.setFillStyle("#E91E63");
    ctx.fill();

    var hour = clockData.hour;
    var minute = clockData.minute;

    // 时针 —— 粗短，蓝色
    var hourAngle = ((hour % 12) * 30 + minute * 0.5 - 90) * Math.PI / 180;
    var hourLen = radius * 0.48;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + hourLen * Math.cos(hourAngle), cy + hourLen * Math.sin(hourAngle));
    ctx.setStrokeStyle("#1565C0");
    ctx.setLineWidth(6);
    ctx.setLineCap("round");
    ctx.stroke();

    // 分针 —— 细长，红色
    var minuteAngle = (minute * 6 - 90) * Math.PI / 180;
    var minuteLen = radius * 0.72;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + minuteLen * Math.cos(minuteAngle), cy + minuteLen * Math.sin(minuteAngle));
    ctx.setStrokeStyle("#E91E63");
    ctx.setLineWidth(3);
    ctx.setLineCap("round");
    ctx.stroke();

    // 图例标注
    ctx.setFontSize(11);
    ctx.setTextAlign("left");
    // 蓝色时针标注
    ctx.setFillStyle("#1565C0");
    ctx.fillText("● 时针(短粗)", cx - radius + 8, cy + radius - 8);
    // 红色分针标注
    ctx.setFillStyle("#E91E63");
    ctx.fillText("● 分针(细长)", cx + 10, cy + radius - 8);

    ctx.draw();
  },

  selectOption: function (event) {
    if (this.data.answered) return;
    var option = event.currentTarget.dataset.option;
    var answer = this.data.current.answer;
    var isCorrect = String(option) === String(answer);
    var score = this.data.score;
    var combo = this.data.combo;
    var maxCombo = this.data.maxCombo;
    var correctCount = this.data.correctCount;

    var encourages = ["棒棒哒！🌟", "真厉害！💪", "答对啦！🎉", "太聪明了！🧠", "你真棒！⭐", "继续加油！🌈"];
    var wrongHints = ["再想想哦～🤔", "差一点点～💪", "仔细看看～👀", "不对哦，再试试～🌸"];
    var encourage = "";

    if (isCorrect) {
      combo++;
      correctCount++;
      if (combo > maxCombo) maxCombo = combo;
      score += 10 + (combo > 1 ? combo * 2 : 0);
      encourage = encourages[Math.floor(Math.random() * encourages.length)];
      playFeedback("correct");
      wx.vibrateShort({ type: "light" });
    } else {
      combo = 0;
      encourage = wrongHints[Math.floor(Math.random() * wrongHints.length)];
      playFeedback("wrong");
      wx.vibrateShort({ type: "heavy" });
    }

    this.setData({
      answered: true,
      selectedOption: String(option),
      isCorrect: isCorrect,
      score: score,
      combo: combo,
      maxCombo: maxCombo,
      correctCount: correctCount,
      showEncourage: encourage
    });

    var that = this;
    if (isCorrect) {
      // 答对：1.5秒后进入下一题
      setTimeout(function () { that.nextQuestion(); }, 1500);
    } else {
      // 答错：1.5秒后重置选中状态，让孩子继续当前题
      setTimeout(function () {
        that.setData({ answered: false, selectedOption: "", showEncourage: "" });
      }, 1500);
    }
  },

  nextQuestion: function () {
    var nextIndex = this.data.currentIndex + 1;
    if (nextIndex >= this.data.questions.length) {
      this.finishGame();
      return;
    }
    var nextQ = this.data.questions[nextIndex];
    this.setData({
      currentIndex: nextIndex,
      current: nextQ,
      answered: false,
      selectedOption: "",
      isCorrect: false,
      showEncourage: ""
    });
    // 如果下一题是钟表题，画钟面
    if (nextQ && nextQ.clockData) {
      var that = this;
      setTimeout(function () { that.drawClock(nextQ.clockData); }, 100);
    }
  },

  finishGame: function () {
    var total = this.data.questions.length;
    var correct = this.data.correctCount;
    var ratio = correct / total;
    var starCount = ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : ratio >= 0.5 ? 1 : 0;
    this.setData({ phase: "result", starCount: starCount });

    var key = "mathBest_" + this.data.gameId;
    var best = wx.getStorageSync(key) || 0;
    if (this.data.score > best) {
      wx.setStorageSync(key, this.data.score);
    }
  },

  playAgain: function () {
    var questions = mathData.generateQuestions(this.data.gameId);
    this.setData({
      phase: "playing",
      questions: questions,
      currentIndex: 0,
      current: questions[0],
      score: 0,
      combo: 0,
      maxCombo: 0,
      correctCount: 0,
      answered: false,
      selectedOption: "",
      isCorrect: false,
      showEncourage: "",
      starCount: 0
    });
  },

  goBack: function () {
    wx.navigateBack();
  },

  onUnload: function () {
    if (feedbackAudio) {
      feedbackAudio.destroy();
      feedbackAudio = null;
    }
  }
});
