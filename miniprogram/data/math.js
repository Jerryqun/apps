// 数学小游戏 —— 一年级数学启蒙
// 6种游戏模式，结合人教版一年级上下册教材

// ======== 游戏模式定义 ========
var games = [
  { id: "calc", name: "口算闯关", icon: "🧮", color: "#66BB6A", desc: "加减法练习", total: 10 },
  { id: "compare", name: "比大小", icon: "⚖️", color: "#42A5F5", desc: "谁大谁小", total: 10 },
  { id: "shape", name: "认图形", icon: "🔷", color: "#AB47BC", desc: "认识形状", total: 8 },
  { id: "clock", name: "认钟表", icon: "🕐", color: "#FF7043", desc: "几点钟啦", total: 8 },
  { id: "count", name: "数数乐", icon: "🎯", color: "#26C6DA", desc: "数一数", total: 8 },
  { id: "pattern", name: "找规律", icon: "🧩", color: "#EC407A", desc: "下一个是什么", total: 8 }
];

function getGameById(id) {
  return games.find(function (g) { return g.id === id; });
}

// ======== 工具函数 ========
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ======== 口算闯关 ========
function genCalc() {
  var maxNum = pickRandom([10, 10, 10, 20, 20]);
  var isAdd = Math.random() > 0.4;
  var a, b, answer, symbol;
  if (isAdd) {
    symbol = "+";
    a = randInt(1, maxNum - 1);
    b = randInt(0, maxNum - a);
    answer = a + b;
  } else {
    symbol = "-";
    a = randInt(1, maxNum);
    b = randInt(0, a);
    answer = a - b;
  }
  var options = [answer];
  while (options.length < 4) {
    var fake = answer + randInt(-3, 4);
    if (fake < 0) fake = Math.abs(fake);
    if (fake !== answer && options.indexOf(fake) === -1) options.push(fake);
  }
  return { type: "calc", text: a + " " + symbol + " " + b + " = ?", answer: answer, options: shuffle(options) };
}

// ======== 比大小 ========
var compareEmojis = ["🍎", "🍊", "🌟", "🌸", "🍬", "🎈", "🦋", "🐱"];

function genCompare() {
  var mode = randInt(0, 2);
  if (mode === 0) {
    // 比数字大小
    var a = randInt(1, 99);
    var b = randInt(1, 99);
    while (b === a) b = randInt(1, 99);
    var answer = a > b ? ">" : a < b ? "<" : "=";
    return { type: "compare", text: a + "  ○  " + b, hint: "填入 > < 或 =", answer: answer, options: [">", "<", "="] };
  } else if (mode === 1) {
    // 数物品比多少
    var emoji = pickRandom(compareEmojis);
    var countA = randInt(1, 8);
    var countB = randInt(1, 8);
    while (countB === countA) countB = randInt(1, 8);
    var leftStr = "";
    for (var i = 0; i < countA; i++) leftStr += emoji;
    var rightStr = "";
    for (var j = 0; j < countB; j++) rightStr += emoji;
    var answer2 = countA > countB ? "左边多" : "右边多";
    return { type: "compare", text: leftStr + "  和  " + rightStr, hint: "哪边更多？", answer: answer2, options: ["左边多", "右边多"] };
  } else {
    // 比长短/高矮
    var scenarios = [
      { q: "🌳🌳🌳 和 🌲，哪个多？", a: "🌳多" , opts: ["🌳多", "🌲多"] },
      { q: "🐘大象 和 🐭小老鼠，谁更大？", a: "大象", opts: ["大象", "小老鼠"] },
      { q: "🦒长颈鹿 和 🐇小兔子，谁更高？", a: "长颈鹿", opts: ["长颈鹿", "小兔子"] },
      { q: "🐍蛇 和 🐛毛毛虫，谁更长？", a: "蛇", opts: ["蛇", "毛毛虫"] },
      { q: "🏔️高山 和 🏠房子，哪个更高？", a: "高山", opts: ["高山", "房子"] },
      { q: "🚂火车 和 🚗小汽车，哪个更长？", a: "火车", opts: ["火车", "小汽车"] },
      { q: "🐋鲸鱼 和 🐠小鱼，谁更重？", a: "鲸鱼", opts: ["鲸鱼", "小鱼"] },
      { q: "10 和 5，谁更大？", a: "10", opts: ["10", "5"] },
      { q: "3 + 2 和 4，谁更大？", a: "3+2", opts: ["3+2", "4"] },
      { q: "8 - 3 和 6，谁更大？", a: "6", opts: ["8-3", "6"] },
    ];
    var s = pickRandom(scenarios);
    return { type: "compare", text: s.q, hint: "选一选", answer: s.a, options: s.opts };
  }
}

// ======== 认图形 ========
var shapes = [
  { name: "圆形", emoji: "🔴", desc: "圆圆的，没有角" },
  { name: "三角形", emoji: "🔺", desc: "三条边三个角" },
  { name: "正方形", emoji: "🟧", desc: "四条边一样长" },
  { name: "长方形", emoji: "🟦", desc: "对边一样长" },
  { name: "五角星", emoji: "⭐", desc: "五个尖角" },
  { name: "菱形", emoji: "🔶", desc: "四条边一样长，像倾斜的正方形" },
  { name: "心形", emoji: "❤️", desc: "像一颗爱心" },
  { name: "半圆形", emoji: "🌗", desc: "圆形的一半" }
];

function genShape() {
  var mode = randInt(0, 1);
  var target = pickRandom(shapes);
  var others = shapes.filter(function (s) { return s.name !== target.name; });
  var wrongOptions = shuffle(others).slice(0, 3).map(function (s) { return mode === 0 ? s.name : s.emoji; });

  if (mode === 0) {
    // 看图选名字
    return {
      type: "shape",
      text: target.emoji,
      hint: "这是什么形状？",
      answer: target.name,
      options: shuffle([target.name].concat(wrongOptions))
    };
  } else {
    // 看名字选图
    return {
      type: "shape",
      text: "找一找：" + target.name,
      hint: target.desc,
      answer: target.emoji,
      options: shuffle([target.emoji].concat(wrongOptions))
    };
  }
}

// ======== 认钟表 ========
function genClock() {
  var hour = randInt(1, 12);
  var isHalf = Math.random() > 0.5;
  var minute = isHalf ? 30 : 0;
  var readStr = isHalf ? (hour + "点半") : (hour + "点整");

  // 生成干扰选项
  var options = [readStr];
  while (options.length < 4) {
    var fakeH = randInt(1, 12);
    var fakeHalf = Math.random() > 0.5;
    var fakeStr = fakeHalf ? (fakeH + "点半") : (fakeH + "点整");
    if (options.indexOf(fakeStr) === -1) options.push(fakeStr);
  }

  // 返回 clockData 供 canvas 画钟面，text 留空由 canvas 展示
  return {
    type: "clock",
    text: "",
    hint: "看钟面，现在几点了？",
    answer: readStr,
    options: shuffle(options),
    clockData: { hour: hour, minute: minute }
  };
}

// ======== 数数乐 ========
var countItems = [
  { emoji: "🍎", name: "苹果" }, { emoji: "🌟", name: "星星" }, { emoji: "🌸", name: "花朵" },
  { emoji: "🦋", name: "蝴蝶" }, { emoji: "🐱", name: "小猫" }, { emoji: "🍬", name: "糖果" },
  { emoji: "🎈", name: "气球" }, { emoji: "🐟", name: "小鱼" }, { emoji: "🍓", name: "草莓" }
];

function genCount() {
  var mode = randInt(0, 2);

  if (mode === 0) {
    // 数物品个数
    var item = pickRandom(countItems);
    var count = randInt(3, 12);
    var display = "";
    for (var i = 0; i < count; i++) display += item.emoji;
    var opts = [count];
    while (opts.length < 4) {
      var f = count + randInt(-3, 3);
      if (f > 0 && f !== count && opts.indexOf(f) === -1) opts.push(f);
    }
    return { type: "count", text: display, hint: "数一数，有几个" + item.name + "？", answer: count, options: shuffle(opts) };
  } else if (mode === 1) {
    // 数字接龙：_ 填空
    var start = randInt(1, 15);
    var step = pickRandom([1, 2, 5]);
    var seq = [];
    for (var j = 0; j < 5; j++) seq.push(start + step * j);
    var blankIdx = randInt(1, 3);
    var answer = seq[blankIdx];
    var display2 = seq.map(function (n, idx) { return idx === blankIdx ? "?" : n; }).join("  ");
    var opts2 = [answer];
    while (opts2.length < 4) {
      var f2 = answer + randInt(-3, 4) * step;
      if (f2 > 0 && f2 !== answer && opts2.indexOf(f2) === -1) opts2.push(f2);
    }
    return { type: "count", text: display2, hint: "？处应该填什么数？", answer: answer, options: shuffle(opts2) };
  } else {
    // 几个和几个合成
    var total = randInt(5, 15);
    var partA = randInt(1, total - 1);
    var partB = total - partA;
    var opts3 = [total];
    while (opts3.length < 4) {
      var f3 = total + randInt(-3, 4);
      if (f3 > 0 && f3 !== total && opts3.indexOf(f3) === -1) opts3.push(f3);
    }
    var itemC = pickRandom(countItems);
    return { type: "count", text: partA + " 个" + itemC.emoji + " 加上 " + partB + " 个" + itemC.emoji, hint: "一共有几个" + itemC.name + "？", answer: total, options: shuffle(opts3) };
  }
}

// ======== 找规律 ========
function genPattern() {
  var mode = randInt(0, 2);

  if (mode === 0) {
    // emoji 重复规律
    var patterns = [
      { seq: ["🔴", "🔵", "🔴", "🔵", "🔴"], answer: "🔵", opts: ["🔵", "🔴", "🟢", "🟡"] },
      { seq: ["🌸", "🌸", "⭐", "🌸", "🌸"], answer: "⭐", opts: ["⭐", "🌸", "🌙", "🔴"] },
      { seq: ["🐱", "🐶", "🐱", "🐶", "🐱"], answer: "🐶", opts: ["🐶", "🐱", "🐰", "🐸"] },
      { seq: ["🍎", "🍊", "🍎", "🍊", "🍎"], answer: "🍊", opts: ["🍊", "🍎", "🍇", "🍌"] },
      { seq: ["⬆️", "⬇️", "⬆️", "⬇️", "⬆️"], answer: "⬇️", opts: ["⬇️", "⬆️", "⬅️", "➡️"] },
      { seq: ["🌕", "🌗", "🌑", "🌕", "🌗"], answer: "🌑", opts: ["🌑", "🌕", "🌗", "⭐"] },
      { seq: ["❤️", "💛", "💙", "❤️", "💛"], answer: "💙", opts: ["💙", "❤️", "💛", "💚"] },
      { seq: ["🔺", "🔵", "🔶", "🔺", "🔵"], answer: "🔶", opts: ["🔶", "🔺", "🔵", "🟢"] },
    ];
    var p = pickRandom(patterns);
    var display = p.seq.join(" ") + " ?";
    return { type: "pattern", text: display, hint: "下一个应该是什么？", answer: p.answer, options: shuffle(p.opts) };
  } else if (mode === 1) {
    // 数字递增规律
    var start = randInt(1, 10);
    var step = pickRandom([1, 2, 3, 5]);
    var seq2 = [];
    for (var k = 0; k < 4; k++) seq2.push(start + step * k);
    var answer2 = start + step * 4;
    var opts2 = [answer2];
    while (opts2.length < 4) {
      var f = answer2 + randInt(-3, 4) * step;
      if (f > 0 && f !== answer2 && opts2.indexOf(f) === -1) opts2.push(f);
    }
    return { type: "pattern", text: seq2.join("  ") + "  ?", hint: "下一个数字是什么？", answer: answer2, options: shuffle(opts2) };
  } else {
    // 图形大小规律
    var sizePatterns = [
      { seq: "🔴 🔴🔴 🔴🔴🔴 ?", answer: "🔴🔴🔴🔴", opts: ["🔴🔴🔴🔴", "🔴🔴🔴", "🔴🔴", "🔴"] },
      { seq: "⭐ ⭐⭐ ⭐⭐⭐ ⭐⭐⭐⭐ ?", answer: "⭐⭐⭐⭐⭐", opts: ["⭐⭐⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐", "⭐⭐"] },
      { seq: "🌸 🌸🌸🌸 🌸🌸🌸🌸🌸 ?", answer: "🌸🌸🌸🌸🌸🌸🌸", opts: ["🌸🌸🌸🌸🌸🌸🌸", "🌸🌸🌸🌸🌸🌸", "🌸🌸🌸🌸🌸", "🌸🌸🌸"] },
    ];
    var sp = pickRandom(sizePatterns);
    return { type: "pattern", text: sp.seq, hint: "接下来应该是？", answer: sp.answer, options: shuffle(sp.opts) };
  }
}

// ======== 统一生成题目 ========
var generators = {
  calc: genCalc,
  compare: genCompare,
  shape: genShape,
  clock: genClock,
  count: genCount,
  pattern: genPattern
};

function generateQuestions(gameId) {
  var game = getGameById(gameId);
  if (!game) return [];
  var gen = generators[gameId];
  var questions = [];
  for (var i = 0; i < game.total; i++) {
    questions.push(gen());
  }
  return questions;
}

module.exports = {
  games: games,
  getGameById: getGameById,
  generateQuestions: generateQuestions
};
