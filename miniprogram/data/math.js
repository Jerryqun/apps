// 数学小游戏 —— 一年级数学启蒙
// 12种游戏模式，结合人教版一年级上下册教材

// ======== 游戏模式定义 ========
var games = [
  { id: "calc", name: "口算闯关", icon: "🧮", color: "#66BB6A", desc: "加减法练习", total: 10 },
  { id: "compare", name: "比大小", icon: "⚖️", color: "#42A5F5", desc: "谁大谁小", total: 10 },
  { id: "shape", name: "认图形", icon: "🔷", color: "#AB47BC", desc: "认识形状", total: 8 },
  { id: "clock", name: "认钟表", icon: "🕐", color: "#FF7043", desc: "几点钟啦", total: 8 },
  { id: "count", name: "数数乐", icon: "🎯", color: "#26C6DA", desc: "数一数", total: 8 },
  { id: "pattern", name: "找规律", icon: "🧩", color: "#EC407A", desc: "下一个是什么", total: 8 },
  { id: "multiply", name: "乘法表", icon: "✖️", color: "#FF9800", desc: "九九乘法口诀", total: 10 },
  { id: "position", name: "位置方向", icon: "🧭", color: "#26A69A", desc: "上下前后左右", total: 8 },
  { id: "chaincalc", name: "连加连减", icon: "🔗", color: "#5C6BC0", desc: "两步运算", total: 10 },
  { id: "money", name: "认识人民币", icon: "💰", color: "#FBC02D", desc: "购物找零", total: 8 },
  { id: "compose", name: "数的组成", icon: "🔢", color: "#EC407A", desc: "十位和个位", total: 8 },
  { id: "classify", name: "分类整理", icon: "🗂️", color: "#66BB6A", desc: "找不同类", total: 8 }
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
  var maxNum = pickRandom([50, 50, 100, 100, 100]);
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
    var fake = answer + randInt(-10, 10);
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

// ======== 乘法表 ========
// 九九乘法口诀表（中文口诀，帮助小朋友朗朗上口地记忆）
var multiplyRhymes = {
  "1-1": "一一得一",
  "1-2": "一二得二", "2-2": "二二得四",
  "1-3": "一三得三", "2-3": "二三得六", "3-3": "三三得九",
  "1-4": "一四得四", "2-4": "二四得八", "3-4": "三四十二", "4-4": "四四十六",
  "1-5": "一五得五", "2-5": "二五一十", "3-5": "三五十五", "4-5": "四五二十", "5-5": "五五二十五",
  "1-6": "一六得六", "2-6": "二六十二", "3-6": "三六十八", "4-6": "四六二十四", "5-6": "五六三十", "6-6": "六六三十六",
  "1-7": "一七得七", "2-7": "二七十四", "3-7": "三七二十一", "4-7": "四七二十八", "5-7": "五七三十五", "6-7": "六七四十二", "7-7": "七七四十九",
  "1-8": "一八得八", "2-8": "二八十六", "3-8": "三八二十四", "4-8": "四八三十二", "5-8": "五八四十", "6-8": "六八四十八", "7-8": "七八五十六", "8-8": "八八六十四",
  "1-9": "一九得九", "2-9": "二九十八", "3-9": "三九二十七", "4-9": "四九三十六", "5-9": "五九四十五", "6-9": "六九五十四", "7-9": "七九六十三", "8-9": "八九七十二", "9-9": "九九八十一"
};

var multiplyEmojis = ["🍎", "🌸", "⭐", "🎈", "🦋", "🍓", "🐱", "🍬", "🐟", "🌈"];

function genMultiply() {
  // 渐进难度：2和5最容易记（有规律），出现最多；其次3和4；最后6-9
  var a = pickRandom([2, 2, 2, 5, 5, 5, 3, 3, 4, 4, 6, 7, 8, 9]);
  var b = randInt(1, 9);
  // 确保 a <= b（符合九九表惯例，不重复出 3×4 和 4×3）
  if (a > b) { var t = a; a = b; b = t; }

  var answer = a * b;
  var rhymeKey = a + "-" + b;
  var rhyme = multiplyRhymes[rhymeKey] || "";
  var emoji = pickRandom(multiplyEmojis);

  // 生成可视化：a 行，每行 b 个 emoji，帮助小朋友理解乘法含义
  var rows = [];
  for (var r = 0; r < a; r++) {
    var rowStr = "";
    for (var c = 0; c < b; c++) rowStr += emoji;
    rows.push(rowStr);
  }

  // 生成干扰项（用接近的乘积或 ±a/±b 作为干扰）
  var options = [answer];
  while (options.length < 4) {
    var fake = answer + pickRandom([-a, -b, a, b, randInt(-5, 5)]);
    if (fake < 0) fake = Math.abs(fake);
    if (fake !== answer && options.indexOf(fake) === -1) options.push(fake);
  }

  return {
    type: "multiply",
    text: a + " × " + b + " = ?",
    hint: "口诀：" + rhyme,
    answer: answer,
    options: shuffle(options),
    multiplyData: { rows: rows }
  };
}

// ======== 位置与方向 ========
function genPosition() {
  var mode = randInt(0, 2);
  if (mode === 0) {
    // 看图判断上下左右
    var items = pickRandom([["🍎", "🍊"], ["🌸", "⭐"], ["🐱", "🐶"], ["🎈", "🎁"]]);
    var layouts = [
      { rows: [items[0], items[1]], answer: "上面", q: items[0] + "在" + items[1] + "的___？" },
      { rows: [items[1], items[0]], answer: "下面", q: items[0] + "在" + items[1] + "的___？" },
      { rows: [items[0] + "  " + items[1]], answer: "左边", q: items[0] + "在" + items[1] + "的___？" },
      { rows: [items[1] + "  " + items[0]], answer: "右边", q: items[0] + "在" + items[1] + "的___？" }
    ];
    var layout = pickRandom(layouts);
    return {
      type: "position",
      text: layout.q,
      hint: "看一看，选一选",
      answer: layout.answer,
      options: shuffle(["上面", "下面", "左边", "右边"]),
      multiplyData: { rows: layout.rows }
    };
  } else if (mode === 1) {
    // 排队问题
    var total = randInt(5, 10);
    var pos = randInt(2, total - 1);
    var front = pos - 1;
    var back = total - pos;
    var askFront = Math.random() > 0.5;
    if (askFront) {
      return { type: "position", text: "小明排第" + pos + "个，一共" + total + "人", hint: "小明前面有几人？", answer: front, options: shuffle([front, back, total, pos]) };
    } else {
      return { type: "position", text: "小明排第" + pos + "个，一共" + total + "人", hint: "小明后面有几人？", answer: back, options: shuffle([back, front, total, pos]) };
    }
  } else {
    var scenarios = [
      { q: "写字拿笔通常用哪只手？", a: "右手", opts: ["左手", "右手"] },
      { q: "吃饭拿筷子通常用哪只手？", a: "右手", opts: ["左手", "右手"] },
      { q: "👈 这个箭头指向哪边？", a: "左边", opts: ["左边", "右边"] },
      { q: "👉 这个箭头指向哪边？", a: "右边", opts: ["左边", "右边"] },
      { q: "⬆️ 这个箭头指向哪边？", a: "上面", opts: ["上面", "下面"] },
      { q: "⬇️ 这个箭头指向哪边？", a: "下面", opts: ["上面", "下面"] }
    ];
    var s = pickRandom(scenarios);
    return { type: "position", text: s.q, hint: "想一想", answer: s.a, options: shuffle(s.opts) };
  }
}

// ======== 连加连减 ========
function genChainCalc() {
  var mode = randInt(0, 2);
  var a, b, c, answer, text;
  if (mode === 0) {
    a = randInt(1, 20); b = randInt(1, 20); c = randInt(1, 20);
    answer = a + b + c;
    text = a + " + " + b + " + " + c + " = ?";
  } else if (mode === 1) {
    a = randInt(10, 50); b = randInt(1, Math.floor(a / 2)); c = randInt(1, a - b);
    answer = a - b - c;
    text = a + " - " + b + " - " + c + " = ?";
  } else {
    a = randInt(5, 30); b = randInt(1, 20); c = randInt(1, a + b);
    answer = a + b - c;
    text = a + " + " + b + " - " + c + " = ?";
  }
  var options = [answer];
  while (options.length < 4) {
    var fake = answer + randInt(-8, 8);
    if (fake < 0) fake = Math.abs(fake);
    if (fake !== answer && options.indexOf(fake) === -1) options.push(fake);
  }
  return { type: "chaincalc", text: text, hint: "一步一步算哦", answer: answer, options: shuffle(options) };
}

// ======== 认识人民币 ========
function genMoney() {
  var mode = randInt(0, 2);
  if (mode === 0) {
    var bills = [
      { desc: "红红的一张，上面写着100", answer: "100元" },
      { desc: "绿绿的一张，上面写着50", answer: "50元" },
      { desc: "蓝蓝的一张，上面写着10", answer: "10元" },
      { desc: "棕色的一张，上面写着20", answer: "20元" },
      { desc: "紫色的一张，上面写着5", answer: "5元" },
      { desc: "金色硬币，上面写着壹圆", answer: "1元" }
    ];
    var b = pickRandom(bills);
    var others = shuffle(bills.filter(function (x) { return x.answer !== b.answer; })).slice(0, 3).map(function (x) { return x.answer; });
    return { type: "money", text: "💰 " + b.desc, hint: "这是多少钱？", answer: b.answer, options: shuffle([b.answer].concat(others)) };
  } else if (mode === 1) {
    var conversions = [
      { q: "1元 = ?角", a: "10", opts: ["10", "5", "20", "100"] },
      { q: "1角 = ?分", a: "10", opts: ["10", "5", "20", "100"] },
      { q: "5角 = ?分", a: "50", opts: ["50", "5", "10", "500"] },
      { q: "10角 = ?元", a: "1", opts: ["1", "10", "5", "100"] },
      { q: "20角 = ?元", a: "2", opts: ["2", "20", "10", "5"] },
      { q: "1元 = ?分", a: "100", opts: ["100", "10", "50", "1000"] }
    ];
    var c = pickRandom(conversions);
    return { type: "money", text: c.q, hint: "想一想换算", answer: c.a, options: shuffle(c.opts) };
  } else {
    var price = pickRandom([2, 3, 5, 6, 8, 9, 10, 12, 15, 20]);
    var pay = pickRandom([10, 20, 50]);
    while (pay <= price) pay = pickRandom([10, 20, 50]);
    var change = pay - price;
    var options = [change];
    while (options.length < 4) {
      var fake = change + randInt(-5, 5);
      if (fake >= 0 && fake !== change && options.indexOf(fake) === -1) options.push(fake);
    }
    return { type: "money", text: "文具盒" + price + "元，付了" + pay + "元", hint: "应该找回多少钱？", answer: change, options: shuffle(options) };
  }
}

// ======== 数的组成 ========
function genCompose() {
  var mode = randInt(0, 2);
  if (mode === 0) {
    var num = randInt(11, 99);
    var tens = Math.floor(num / 10);
    var ones = num % 10;
    var answer = tens + "个十和" + ones + "个一";
    var options = [answer];
    while (options.length < 4) {
      var ft = randInt(1, 9), fo = randInt(0, 9);
      var fake = ft + "个十和" + fo + "个一";
      if (fake !== answer && options.indexOf(fake) === -1) options.push(fake);
    }
    return { type: "compose", text: num + " 里面有___？", hint: "想想十位和个位", answer: answer, options: shuffle(options) };
  } else if (mode === 1) {
    var tens2 = randInt(1, 9), ones2 = randInt(0, 9);
    var answer2 = tens2 * 10 + ones2;
    var options2 = [answer2];
    while (options2.length < 4) {
      var fake2 = answer2 + randInt(-9, 9);
      if (fake2 > 0 && fake2 !== answer2 && options2.indexOf(fake2) === -1) options2.push(fake2);
    }
    return { type: "compose", text: tens2 + "个十和" + ones2 + "个一", hint: "组成多少？", answer: answer2, options: shuffle(options2) };
  } else {
    var num3 = randInt(11, 99);
    var tens3 = Math.floor(num3 / 10), ones3 = num3 % 10;
    if (Math.random() > 0.5) {
      return { type: "compose", text: num3 + " 的十位是几？", hint: "十位上的数字", answer: tens3, options: shuffle([tens3, ones3, tens3 + ones3, tens3 * ones3 || 1]) };
    } else {
      return { type: "compose", text: num3 + " 的个位是几？", hint: "个位上的数字", answer: ones3, options: shuffle([ones3, tens3, tens3 + ones3, tens3 * ones3 || 1]) };
    }
  }
}

// ======== 分类与整理 ========
function genClassify() {
  var groups = [
    { items: ["🍎", "🍌", "🍊", "🐱"], odd: "🐱" },
    { items: ["🍎", "🍌", "🍊", "🥕"], odd: "🥕" },
    { items: ["🐱", "🐶", "🐰", "🌸"], odd: "🌸" },
    { items: ["⚽", "🏀", "🎾", "📚"], odd: "📚" },
    { items: ["🚗", "🚕", "🚙", "🏠"], odd: "🏠" },
    { items: ["👔", "👗", "👖", "🍕"], odd: "🍕" }
  ];
  var g = pickRandom(groups);
  return { type: "classify", text: g.items.join("  "), hint: "哪一个和其它的不同类？", answer: g.odd, options: shuffle(g.items.slice()) };
}

// ======== 统一生成题目 ========
var generators = {
  calc: genCalc,
  compare: genCompare,
  shape: genShape,
  clock: genClock,
  count: genCount,
  pattern: genPattern,
  multiply: genMultiply,
  position: genPosition,
  chaincalc: genChainCalc,
  money: genMoney,
  compose: genCompose,
  classify: genClassify
};

function generateQuestions(gameId) {
  var game = getGameById(gameId);
  if (!game) return [];
  var gen = generators[gameId];
  var questions = [];
  var seen = {};
  var maxRetries = 50;
  var retries = 0;
  while (questions.length < game.total && retries < maxRetries) {
    var q = gen();
    var key = q.text + "|" + String(q.answer);
    if (!seen[key]) {
      seen[key] = true;
      questions.push(q);
    } else {
      retries++;
    }
  }
  // 如果实在凑不够不重复的，补充填满
  while (questions.length < game.total) {
    questions.push(gen());
  }
  return questions;
}

module.exports = {
  games: games,
  getGameById: getGameById,
  generateQuestions: generateQuestions
};
