// 英语学习数据 —— 26字母 + 基础单词分类

var categories = [
  {
    id: "alphabet",
    name: "26个字母",
    icon: "🔤",
    color: "#42A5F5",
    desc: "学会大小写字母",
    list: [
      { letter: "A", lower: "a", word: "apple", meaning: "苹果", emoji: "🍎" },
      { letter: "B", lower: "b", word: "ball", meaning: "球", emoji: "⚽" },
      { letter: "C", lower: "c", word: "cat", meaning: "猫", emoji: "🐱" },
      { letter: "D", lower: "d", word: "dog", meaning: "狗", emoji: "🐶" },
      { letter: "E", lower: "e", word: "egg", meaning: "鸡蛋", emoji: "🥚" },
      { letter: "F", lower: "f", word: "fish", meaning: "鱼", emoji: "🐟" },
      { letter: "G", lower: "g", word: "girl", meaning: "女孩", emoji: "👧" },
      { letter: "H", lower: "h", word: "hand", meaning: "手", emoji: "✋" },
      { letter: "I", lower: "i", word: "ice", meaning: "冰", emoji: "🧊" },
      { letter: "J", lower: "j", word: "jump", meaning: "跳", emoji: "🤸" },
      { letter: "K", lower: "k", word: "kite", meaning: "风筝", emoji: "🪁" },
      { letter: "L", lower: "l", word: "lion", meaning: "狮子", emoji: "🦁" },
      { letter: "M", lower: "m", word: "moon", meaning: "月亮", emoji: "🌙" },
      { letter: "N", lower: "n", word: "nose", meaning: "鼻子", emoji: "👃" },
      { letter: "O", lower: "o", word: "orange", meaning: "橙子", emoji: "🍊" },
      { letter: "P", lower: "p", word: "pen", meaning: "钢笔", emoji: "🖊️" },
      { letter: "Q", lower: "q", word: "queen", meaning: "女王", emoji: "👑" },
      { letter: "R", lower: "r", word: "rabbit", meaning: "兔子", emoji: "🐰" },
      { letter: "S", lower: "s", word: "sun", meaning: "太阳", emoji: "☀️" },
      { letter: "T", lower: "t", word: "tree", meaning: "树", emoji: "🌳" },
      { letter: "U", lower: "u", word: "umbrella", meaning: "雨伞", emoji: "☂️" },
      { letter: "V", lower: "v", word: "van", meaning: "货车", emoji: "🚐" },
      { letter: "W", lower: "w", word: "water", meaning: "水", emoji: "💧" },
      { letter: "X", lower: "x", word: "box", meaning: "盒子", emoji: "📦" },
      { letter: "Y", lower: "y", word: "yellow", meaning: "黄色", emoji: "🟡" },
      { letter: "Z", lower: "z", word: "zoo", meaning: "动物园", emoji: "🦁" }
    ]
  },
  {
    id: "color",
    name: "颜色",
    icon: "🌈",
    color: "#EC407A",
    desc: "Colors",
    list: [
      { word: "red", meaning: "红色", emoji: "🔴" },
      { word: "blue", meaning: "蓝色", emoji: "🔵" },
      { word: "green", meaning: "绿色", emoji: "🟢" },
      { word: "yellow", meaning: "黄色", emoji: "🟡" },
      { word: "white", meaning: "白色", emoji: "⚪" },
      { word: "black", meaning: "黑色", emoji: "⚫" },
      { word: "pink", meaning: "粉色", emoji: "🩷" },
      { word: "orange", meaning: "橙色", emoji: "🟠" }
    ]
  },
  {
    id: "number",
    name: "数字",
    icon: "🔢",
    color: "#FF8A65",
    desc: "Numbers",
    list: [
      { word: "one", meaning: "一", emoji: "1️⃣" },
      { word: "two", meaning: "二", emoji: "2️⃣" },
      { word: "three", meaning: "三", emoji: "3️⃣" },
      { word: "four", meaning: "四", emoji: "4️⃣" },
      { word: "five", meaning: "五", emoji: "5️⃣" },
      { word: "six", meaning: "六", emoji: "6️⃣" },
      { word: "seven", meaning: "七", emoji: "7️⃣" },
      { word: "eight", meaning: "八", emoji: "8️⃣" },
      { word: "nine", meaning: "九", emoji: "9️⃣" },
      { word: "ten", meaning: "十", emoji: "🔟" }
    ]
  },
  {
    id: "animal",
    name: "动物",
    icon: "🐾",
    color: "#66BB6A",
    desc: "Animals",
    list: [
      { word: "cat", meaning: "猫", emoji: "🐱" },
      { word: "dog", meaning: "狗", emoji: "🐶" },
      { word: "fish", meaning: "鱼", emoji: "🐟" },
      { word: "bird", meaning: "鸟", emoji: "🐦" },
      { word: "pig", meaning: "猪", emoji: "🐷" },
      { word: "duck", meaning: "鸭", emoji: "🦆" },
      { word: "bear", meaning: "熊", emoji: "🐻" },
      { word: "rabbit", meaning: "兔子", emoji: "🐰" }
    ]
  },
  {
    id: "fruit",
    name: "水果",
    icon: "🍎",
    color: "#AB47BC",
    desc: "Fruits",
    list: [
      { word: "apple", meaning: "苹果", emoji: "🍎" },
      { word: "banana", meaning: "香蕉", emoji: "🍌" },
      { word: "orange", meaning: "橙子", emoji: "🍊" },
      { word: "grape", meaning: "葡萄", emoji: "🍇" },
      { word: "pear", meaning: "梨", emoji: "🍐" },
      { word: "watermelon", meaning: "西瓜", emoji: "🍉" }
    ]
  }
];

function getCategoryById(id) {
  return categories.find(function (cat) {
    return cat.id === id;
  });
}

module.exports = {
  categories: categories,
  getCategoryById: getCategoryById
};
