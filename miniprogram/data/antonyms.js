// 反义词配对数据 —— 一年级常见反义词

var antonyms = [
  { id: 1, word: "大", answer: "小", emoji: "🐘↔🐭" },
  { id: 2, word: "多", answer: "少", emoji: "🍎🍎🍎↔🍎" },
  { id: 3, word: "长", answer: "短", emoji: "📏↔📎" },
  { id: 4, word: "高", answer: "矮", emoji: "🦒↔🐢" },
  { id: 5, word: "前", answer: "后", emoji: "⬆️↔⬇️" },
  { id: 6, word: "上", answer: "下", emoji: "☝️↔👇" },
  { id: 7, word: "快", answer: "慢", emoji: "🐇↔🐢" },
  { id: 8, word: "黑", answer: "白", emoji: "⬛↔⬜" },
  { id: 9, word: "远", answer: "近", emoji: "🏔️↔🏠" },
  { id: 10, word: "开", answer: "关", emoji: "🔓↔🔒" },
  { id: 11, word: "来", answer: "去", emoji: "👈↔👉" },
  { id: 12, word: "左", answer: "右", emoji: "⬅️↔➡️" },
  { id: 13, word: "胖", answer: "瘦", emoji: "🐷↔🐍" },
  { id: 14, word: "新", answer: "旧", emoji: "✨↔🧹" },
  { id: 15, word: "哭", answer: "笑", emoji: "😢↔😊" },
  { id: 16, word: "冷", answer: "热", emoji: "❄️↔🔥" },
  { id: 17, word: "早", answer: "晚", emoji: "🌅↔🌙" },
  { id: 18, word: "好", answer: "坏", emoji: "👍↔👎" },
  { id: 19, word: "进", answer: "出", emoji: "🚪➡️↔🚪⬅️" },
  { id: 20, word: "东", answer: "西", emoji: "🌅↔🌇" },
  { id: 21, word: "南", answer: "北", emoji: "🔽↔🔼" },
  { id: 22, word: "天", answer: "地", emoji: "☁️↔🌍" },
  { id: 23, word: "轻", answer: "重", emoji: "🪶↔🏋️" },
  { id: 24, word: "老", answer: "幼", emoji: "👴↔👶" },
  { id: 25, word: "深", answer: "浅", emoji: "🏊↔🦶" }
];

// 获取所有答案词（用于生成干扰选项）
var allWords = [];
antonyms.forEach(function (item) {
  if (allWords.indexOf(item.word) === -1) allWords.push(item.word);
  if (allWords.indexOf(item.answer) === -1) allWords.push(item.answer);
});

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function generateQuiz(count) {
  var pool = shuffle(antonyms).slice(0, count || 8);
  return pool.map(function (item) {
    var options = [item.answer];
    var candidates = allWords.filter(function (w) { return w !== item.word && w !== item.answer; });
    candidates = shuffle(candidates);
    for (var i = 0; i < 3 && i < candidates.length; i++) {
      options.push(candidates[i]);
    }
    return { id: item.id, word: item.word, answer: item.answer, emoji: item.emoji, options: shuffle(options) };
  });
}

module.exports = {
  antonyms: antonyms,
  generateQuiz: generateQuiz
};
