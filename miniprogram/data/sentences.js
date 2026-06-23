// 连词成句数据 —— 一年级语文

var sentences = [
  {
    id: 1,
    words: ["小鸟", "在", "天上", "飞"],
    answer: "小鸟在天上飞",
    emoji: "🐦",
    color: "#42A5F5"
  },
  {
    id: 2,
    words: ["我", "爱", "妈妈"],
    answer: "我爱妈妈",
    emoji: "❤️",
    color: "#EC407A"
  },
  {
    id: 3,
    words: ["小猫", "在", "吃", "鱼"],
    answer: "小猫在吃鱼",
    emoji: "🐱",
    color: "#FF8A65"
  },
  {
    id: 4,
    words: ["太阳", "从", "东方", "升起来", "了"],
    answer: "太阳从东方升起来了",
    emoji: "🌅",
    color: "#FFA726"
  },
  {
    id: 5,
    words: ["弟弟", "在", "公园里", "玩"],
    answer: "弟弟在公园里玩",
    emoji: "🏞️",
    color: "#66BB6A"
  },
  {
    id: 6,
    words: ["花", "开", "了", "春天"],
    answer: "春天花开了",
    emoji: "🌸",
    color: "#AB47BC"
  },
  {
    id: 7,
    words: ["我们", "去", "学校", "上学"],
    answer: "我们去学校上学",
    emoji: "🏫",
    color: "#5C6BC0"
  },
  {
    id: 8,
    words: ["月亮", "弯弯的", "像", "小船"],
    answer: "弯弯的月亮像小船",
    emoji: "🌙",
    color: "#7E57C2"
  },
  {
    id: 9,
    words: ["小朋友们", "在", "做", "游戏", "开心地"],
    answer: "小朋友们在开心地做游戏",
    emoji: "🎮",
    color: "#26C6DA"
  },
  {
    id: 10,
    words: ["妈妈", "给我", "买了", "新书包", "一个"],
    answer: "妈妈给我买了一个新书包",
    emoji: "🎒",
    color: "#EF5350"
  },
  {
    id: 11,
    words: ["大树", "上", "有", "很多", "叶子"],
    answer: "大树上有很多叶子",
    emoji: "🌳",
    color: "#8D6E63"
  },
  {
    id: 12,
    words: ["哥哥", "在", "写", "作业", "认真地"],
    answer: "哥哥在认真地写作业",
    emoji: "📝",
    color: "#78909C"
  },
  {
    id: 13,
    words: ["下雨了", "小草", "喝", "水", "高兴地"],
    answer: "下雨了小草高兴地喝水",
    emoji: "🌧️",
    color: "#4DB6AC"
  },
  {
    id: 14,
    words: ["爸爸", "带我", "去", "动物园", "看", "大象"],
    answer: "爸爸带我去动物园看大象",
    emoji: "🐘",
    color: "#FF7043"
  },
  {
    id: 15,
    words: ["小鱼", "在", "河里", "快乐地", "游"],
    answer: "小鱼在河里快乐地游",
    emoji: "🐟",
    color: "#29B6F6"
  }
];

// 打乱词语顺序
function shuffle(arr) {
  var result = arr.slice();
  for (var i = result.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

function getSentenceById(id) {
  return sentences.find(function (s) { return s.id === id; });
}

function getShuffledSentence(sentence) {
  return {
    id: sentence.id,
    words: shuffle(sentence.words),
    answer: sentence.answer,
    emoji: sentence.emoji,
    color: sentence.color
  };
}

module.exports = {
  sentences: sentences,
  getSentenceById: getSentenceById,
  getShuffledSentence: getShuffledSentence,
  shuffle: shuffle
};
