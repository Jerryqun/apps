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
  },
  {
    id: "greeting",
    name: "问候语",
    icon: "👋",
    color: "#26A69A",
    desc: "Greetings",
    list: [
      { word: "hello", meaning: "你好", emoji: "👋" },
      { word: "hi", meaning: "嗨", emoji: "🙋" },
      { word: "good morning", meaning: "早上好", emoji: "🌅" },
      { word: "good night", meaning: "晚安", emoji: "🌙" },
      { word: "goodbye", meaning: "再见", emoji: "👋" },
      { word: "thank you", meaning: "谢谢", emoji: "🙏" },
      { word: "sorry", meaning: "对不起", emoji: "😔" },
      { word: "please", meaning: "请", emoji: "🤲" },
      { word: "yes", meaning: "是", emoji: "✅" },
      { word: "no", meaning: "不", emoji: "❌" }
    ]
  },
  {
    id: "family",
    name: "家庭成员",
    icon: "👨‍👩‍👧",
    color: "#5C6BC0",
    desc: "Family",
    list: [
      { word: "father", meaning: "爸爸", emoji: "👨" },
      { word: "mother", meaning: "妈妈", emoji: "👩" },
      { word: "brother", meaning: "哥哥/弟弟", emoji: "👦" },
      { word: "sister", meaning: "姐姐/妹妹", emoji: "👧" },
      { word: "grandfather", meaning: "爷爷/外公", emoji: "👴" },
      { word: "grandmother", meaning: "奶奶/外婆", emoji: "👵" },
      { word: "baby", meaning: "宝宝", emoji: "👶" },
      { word: "friend", meaning: "朋友", emoji: "🤝" }
    ]
  },
  {
    id: "body",
    name: "身体部位",
    icon: "🧍",
    color: "#EF5350",
    desc: "Body Parts",
    list: [
      { word: "head", meaning: "头", emoji: "🧠" },
      { word: "eye", meaning: "眼睛", emoji: "👁️" },
      { word: "ear", meaning: "耳朵", emoji: "👂" },
      { word: "nose", meaning: "鼻子", emoji: "👃" },
      { word: "mouth", meaning: "嘴巴", emoji: "👄" },
      { word: "hand", meaning: "手", emoji: "✋" },
      { word: "foot", meaning: "脚", emoji: "🦶" },
      { word: "arm", meaning: "手臂", emoji: "💪" },
      { word: "leg", meaning: "腿", emoji: "🦵" },
      { word: "face", meaning: "脸", emoji: "😊" }
    ]
  },
  {
    id: "sentence",
    name: "简单句型",
    icon: "💬",
    color: "#FF7043",
    desc: "Simple Sentences",
    list: [
      { word: "I am happy.", meaning: "我很开心。", emoji: "😊" },
      { word: "What is this?", meaning: "这是什么？", emoji: "❓" },
      { word: "This is a cat.", meaning: "这是一只猫。", emoji: "🐱" },
      { word: "I like apples.", meaning: "我喜欢苹果。", emoji: "🍎" },
      { word: "How are you?", meaning: "你好吗？", emoji: "👋" },
      { word: "I am fine.", meaning: "我很好。", emoji: "👍" },
      { word: "Thank you!", meaning: "谢谢你！", emoji: "🙏" },
      { word: "Let's play!", meaning: "我们一起玩吧！", emoji: "🎮" },
      { word: "I can do it.", meaning: "我能做到。", emoji: "💪" },
      { word: "Good job!", meaning: "做得好！", emoji: "🌟" }
    ]
  },
  {
    id: "food",
    name: "食物饮料",
    icon: "🍔",
    color: "#FF7043",
    desc: "好吃的食物",
    list: [
      { word: "bread", meaning: "面包", emoji: "🍞" },
      { word: "rice", meaning: "米饭", emoji: "🍚" },
      { word: "milk", meaning: "牛奶", emoji: "🥛" },
      { word: "egg", meaning: "鸡蛋", emoji: "🥚" },
      { word: "cake", meaning: "蛋糕", emoji: "🎂" },
      { word: "juice", meaning: "果汁", emoji: "🧃" },
      { word: "water", meaning: "水", emoji: "💧" },
      { word: "noodle", meaning: "面条", emoji: "🍜" }
    ]
  },
  {
    id: "transport",
    name: "交通工具",
    icon: "🚌",
    color: "#5C6BC0",
    desc: "出行方式",
    list: [
      { word: "bus", meaning: "公共汽车", emoji: "🚌" },
      { word: "car", meaning: "小汽车", emoji: "🚗" },
      { word: "bike", meaning: "自行车", emoji: "🚲" },
      { word: "train", meaning: "火车", emoji: "🚆" },
      { word: "plane", meaning: "飞机", emoji: "✈️" },
      { word: "ship", meaning: "轮船", emoji: "🚢" },
      { word: "taxi", meaning: "出租车", emoji: "🚕" },
      { word: "subway", meaning: "地铁", emoji: "🚇" }
    ]
  },
  {
    id: "school",
    name: "学习用品",
    icon: "✏️",
    color: "#26A69A",
    desc: "文具和家具",
    list: [
      { word: "book", meaning: "书", emoji: "📖" },
      { word: "pen", meaning: "钢笔", emoji: "🖊️" },
      { word: "pencil", meaning: "铅笔", emoji: "✏️" },
      { word: "ruler", meaning: "尺子", emoji: "📏" },
      { word: "bag", meaning: "书包", emoji: "🎒" },
      { word: "desk", meaning: "课桌", emoji: "🪑" },
      { word: "chair", meaning: "椅子", emoji: "🪑" },
      { word: "eraser", meaning: "橡皮", emoji: "🧹" }
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
