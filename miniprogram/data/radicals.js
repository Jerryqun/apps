// 偏旁部首学习数据 —— 一年级常见偏旁

var radicals = [
  {
    id: "water",
    radical: "氵",
    name: "三点水",
    pinyin: "sāndiǎnshuǐ",
    meaning: "与水有关",
    color: "#42A5F5",
    examples: [
      { char: "河", pinyin: "hé", meaning: "河流", emoji: "🏞️" },
      { char: "海", pinyin: "hǎi", meaning: "大海", emoji: "🌊" },
      { char: "洗", pinyin: "xǐ", meaning: "洗手", emoji: "🧼" },
      { char: "汗", pinyin: "hàn", meaning: "汗水", emoji: "💦" }
    ]
  },
  {
    id: "person",
    radical: "亻",
    name: "单人旁",
    pinyin: "dānrénpáng",
    meaning: "与人有关",
    color: "#66BB6A",
    examples: [
      { char: "你", pinyin: "nǐ", meaning: "你好", emoji: "👋" },
      { char: "他", pinyin: "tā", meaning: "他人", emoji: "👤" },
      { char: "们", pinyin: "men", meaning: "我们", emoji: "👥" },
      { char: "休", pinyin: "xiū", meaning: "休息", emoji: "😴" }
    ]
  },
  {
    id: "mouth",
    radical: "口",
    name: "口字旁",
    pinyin: "kǒuzìpáng",
    meaning: "与嘴/说话有关",
    color: "#EF5350",
    examples: [
      { char: "吃", pinyin: "chī", meaning: "吃饭", emoji: "🍚" },
      { char: "喝", pinyin: "hē", meaning: "喝水", emoji: "🥤" },
      { char: "叫", pinyin: "jiào", meaning: "叫声", emoji: "📢" },
      { char: "唱", pinyin: "chàng", meaning: "唱歌", emoji: "🎤" }
    ]
  },
  {
    id: "female",
    radical: "女",
    name: "女字旁",
    pinyin: "nǚzìpáng",
    meaning: "与女性有关",
    color: "#EC407A",
    examples: [
      { char: "妈", pinyin: "mā", meaning: "妈妈", emoji: "👩" },
      { char: "姐", pinyin: "jiě", meaning: "姐姐", emoji: "👧" },
      { char: "奶", pinyin: "nǎi", meaning: "奶奶", emoji: "👵" },
      { char: "好", pinyin: "hǎo", meaning: "好的", emoji: "👍" }
    ]
  },
  {
    id: "wood",
    radical: "木",
    name: "木字旁",
    pinyin: "mùzìpáng",
    meaning: "与树木有关",
    color: "#8D6E63",
    examples: [
      { char: "林", pinyin: "lín", meaning: "树林", emoji: "🌲" },
      { char: "桃", pinyin: "táo", meaning: "桃子", emoji: "🍑" },
      { char: "树", pinyin: "shù", meaning: "大树", emoji: "🌳" },
      { char: "村", pinyin: "cūn", meaning: "村庄", emoji: "🏡" }
    ]
  },
  {
    id: "fire",
    radical: "火",
    name: "火字旁",
    pinyin: "huǒzìpáng",
    meaning: "与火有关",
    color: "#FF7043",
    examples: [
      { char: "灯", pinyin: "dēng", meaning: "灯光", emoji: "💡" },
      { char: "烧", pinyin: "shāo", meaning: "烧火", emoji: "🔥" },
      { char: "炒", pinyin: "chǎo", meaning: "炒菜", emoji: "🍳" },
      { char: "烟", pinyin: "yān", meaning: "烟雾", emoji: "💨" }
    ]
  },
  {
    id: "earth",
    radical: "土",
    name: "提土旁",
    pinyin: "títǔpáng",
    meaning: "与土地有关",
    color: "#A1887F",
    examples: [
      { char: "地", pinyin: "dì", meaning: "土地", emoji: "🌍" },
      { char: "坐", pinyin: "zuò", meaning: "坐下", emoji: "🪑" },
      { char: "城", pinyin: "chéng", meaning: "城市", emoji: "🏙️" },
      { char: "场", pinyin: "chǎng", meaning: "广场", emoji: "🏟️" }
    ]
  },
  {
    id: "sun",
    radical: "日",
    name: "日字旁",
    pinyin: "rìzìpáng",
    meaning: "与太阳/时间有关",
    color: "#FFA726",
    examples: [
      { char: "明", pinyin: "míng", meaning: "明亮", emoji: "☀️" },
      { char: "早", pinyin: "zǎo", meaning: "早晨", emoji: "🌅" },
      { char: "晚", pinyin: "wǎn", meaning: "晚上", emoji: "🌙" },
      { char: "时", pinyin: "shí", meaning: "时间", emoji: "⏰" }
    ]
  },
  {
    id: "grass",
    radical: "艹",
    name: "草字头",
    pinyin: "cǎozìtóu",
    meaning: "与植物有关",
    color: "#4CAF50",
    examples: [
      { char: "花", pinyin: "huā", meaning: "花朵", emoji: "🌸" },
      { char: "草", pinyin: "cǎo", meaning: "小草", emoji: "🌿" },
      { char: "苹", pinyin: "píng", meaning: "苹果", emoji: "🍎" },
      { char: "茶", pinyin: "chá", meaning: "喝茶", emoji: "🍵" }
    ]
  },
  {
    id: "hand",
    radical: "扌",
    name: "提手旁",
    pinyin: "tíshǒupáng",
    meaning: "与手的动作有关",
    color: "#7E57C2",
    examples: [
      { char: "打", pinyin: "dǎ", meaning: "打球", emoji: "🏀" },
      { char: "拍", pinyin: "pāi", meaning: "拍手", emoji: "👏" },
      { char: "拉", pinyin: "lā", meaning: "拉手", emoji: "🤝" },
      { char: "抱", pinyin: "bào", meaning: "拥抱", emoji: "🤗" }
    ]
  },
  {
    id: "heart",
    radical: "忄",
    name: "竖心旁",
    pinyin: "shùxīnpáng",
    meaning: "与心情有关",
    color: "#E91E63",
    examples: [
      { char: "快", pinyin: "kuài", meaning: "快乐", emoji: "😄" },
      { char: "忙", pinyin: "máng", meaning: "忙碌", emoji: "🏃" },
      { char: "怕", pinyin: "pà", meaning: "害怕", emoji: "😨" },
      { char: "情", pinyin: "qíng", meaning: "心情", emoji: "❤️" }
    ]
  },
  {
    id: "speech",
    radical: "讠",
    name: "言字旁",
    pinyin: "yánzìpáng",
    meaning: "与说话有关",
    color: "#26C6DA",
    examples: [
      { char: "说", pinyin: "shuō", meaning: "说话", emoji: "🗣️" },
      { char: "话", pinyin: "huà", meaning: "对话", emoji: "💬" },
      { char: "读", pinyin: "dú", meaning: "读书", emoji: "📖" },
      { char: "请", pinyin: "qǐng", meaning: "请问", emoji: "🙏" }
    ]
  }
];

function getRadicalById(id) {
  return radicals.find(function (r) { return r.id === id; });
}

module.exports = {
  radicals: radicals,
  getRadicalById: getRadicalById
};
