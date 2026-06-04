// 拼音学习数据 —— 23声母 + 24韵母 + 16整体认读音节

const categories = [
  {
    id: "shengmu",
    name: "声母",
    icon: "🅱️",
    color: "#FF8A65",
    desc: "23个声母",
    list: [
      { pinyin: "b", example: "爸", examplePinyin: "bà", desc: "嘴巴闭紧再张开" },
      { pinyin: "p", example: "怕", examplePinyin: "pà", desc: "用力送气" },
      { pinyin: "m", example: "妈", examplePinyin: "mā", desc: "双唇紧闭哼出来" },
      { pinyin: "f", example: "飞", examplePinyin: "fēi", desc: "上齿咬下唇" },
      { pinyin: "d", example: "大", examplePinyin: "dà", desc: "舌尖抵上齿龈" },
      { pinyin: "t", example: "他", examplePinyin: "tā", desc: "舌尖送气" },
      { pinyin: "n", example: "你", examplePinyin: "nǐ", desc: "舌尖抵上齿龈鼻音" },
      { pinyin: "l", example: "六", examplePinyin: "liù", desc: "舌尖抵上齿龈边音" },
      { pinyin: "g", example: "哥", examplePinyin: "gē", desc: "舌根抵软腭" },
      { pinyin: "k", example: "口", examplePinyin: "kǒu", desc: "舌根送气" },
      { pinyin: "h", example: "好", examplePinyin: "hǎo", desc: "舌根接近软腭" },
      { pinyin: "j", example: "家", examplePinyin: "jiā", desc: "舌面前部抬起" },
      { pinyin: "q", example: "七", examplePinyin: "qī", desc: "舌面送气" },
      { pinyin: "x", example: "下", examplePinyin: "xià", desc: "舌面接近硬腭" },
      { pinyin: "zh", example: "中", examplePinyin: "zhōng", desc: "舌尖翘起抵硬腭" },
      { pinyin: "ch", example: "吃", examplePinyin: "chī", desc: "翘舌送气" },
      { pinyin: "sh", example: "山", examplePinyin: "shān", desc: "翘舌擦音" },
      { pinyin: "r", example: "人", examplePinyin: "rén", desc: "翘舌浊擦音" },
      { pinyin: "z", example: "字", examplePinyin: "zì", desc: "舌尖平伸抵齿背" },
      { pinyin: "c", example: "草", examplePinyin: "cǎo", desc: "平舌送气" },
      { pinyin: "s", example: "三", examplePinyin: "sān", desc: "平舌擦音" },
      { pinyin: "y", example: "月", examplePinyin: "yuè", desc: "嘴角向两边展开" },
      { pinyin: "w", example: "我", examplePinyin: "wǒ", desc: "双唇拢圆" }
    ]
  },
  {
    id: "yunmu",
    name: "韵母",
    icon: "🅰️",
    color: "#42A5F5",
    desc: "24个韵母",
    list: [
      { pinyin: "a", example: "大", examplePinyin: "dà", desc: "嘴巴张大" },
      { pinyin: "o", example: "我", examplePinyin: "wǒ", desc: "嘴巴拢圆" },
      { pinyin: "e", example: "鹅", examplePinyin: "é", desc: "嘴角向两边咧" },
      { pinyin: "i", example: "一", examplePinyin: "yī", desc: "嘴角展开牙齿对齐" },
      { pinyin: "u", example: "五", examplePinyin: "wǔ", desc: "嘴巴突出成圆形" },
      { pinyin: "ü", example: "鱼", examplePinyin: "yú", desc: "嘴巴小圆撅起来" },
      { pinyin: "ai", example: "爱", examplePinyin: "ài", desc: "先a后i" },
      { pinyin: "ei", example: "飞", examplePinyin: "fēi", desc: "先e后i" },
      { pinyin: "ui", example: "水", examplePinyin: "shuǐ", desc: "先u后i" },
      { pinyin: "ao", example: "好", examplePinyin: "hǎo", desc: "先a后o" },
      { pinyin: "ou", example: "走", examplePinyin: "zǒu", desc: "先o后u" },
      { pinyin: "iu", example: "六", examplePinyin: "liù", desc: "先i后u" },
      { pinyin: "ie", example: "写", examplePinyin: "xiě", desc: "先i后e" },
      { pinyin: "üe", example: "月", examplePinyin: "yuè", desc: "先ü后e" },
      { pinyin: "er", example: "耳", examplePinyin: "ěr", desc: "舌头卷起来" },
      { pinyin: "an", example: "山", examplePinyin: "shān", desc: "先a后鼻音n" },
      { pinyin: "en", example: "人", examplePinyin: "rén", desc: "先e后鼻音n" },
      { pinyin: "in", example: "金", examplePinyin: "jīn", desc: "先i后鼻音n" },
      { pinyin: "un", example: "春", examplePinyin: "chūn", desc: "先u后鼻音n" },
      { pinyin: "ün", example: "云", examplePinyin: "yún", desc: "先ü后鼻音n" },
      { pinyin: "ang", example: "上", examplePinyin: "shàng", desc: "先a后鼻音ng" },
      { pinyin: "eng", example: "风", examplePinyin: "fēng", desc: "先e后鼻音ng" },
      { pinyin: "ing", example: "星", examplePinyin: "xīng", desc: "先i后鼻音ng" },
      { pinyin: "ong", example: "中", examplePinyin: "zhōng", desc: "先o后鼻音ng" }
    ]
  },
  {
    id: "zhengti",
    name: "整体认读",
    icon: "📌",
    color: "#66BB6A",
    desc: "16个整体认读音节",
    list: [
      { pinyin: "zhi", example: "知", examplePinyin: "zhī", desc: "翘舌整体认读" },
      { pinyin: "chi", example: "吃", examplePinyin: "chī", desc: "翘舌整体认读" },
      { pinyin: "shi", example: "十", examplePinyin: "shí", desc: "翘舌整体认读" },
      { pinyin: "ri", example: "日", examplePinyin: "rì", desc: "翘舌整体认读" },
      { pinyin: "zi", example: "字", examplePinyin: "zì", desc: "平舌整体认读" },
      { pinyin: "ci", example: "次", examplePinyin: "cì", desc: "平舌整体认读" },
      { pinyin: "si", example: "四", examplePinyin: "sì", desc: "平舌整体认读" },
      { pinyin: "yi", example: "一", examplePinyin: "yī", desc: "整体认读" },
      { pinyin: "wu", example: "五", examplePinyin: "wǔ", desc: "整体认读" },
      { pinyin: "yu", example: "鱼", examplePinyin: "yú", desc: "整体认读" },
      { pinyin: "ye", example: "也", examplePinyin: "yě", desc: "整体认读" },
      { pinyin: "yue", example: "月", examplePinyin: "yuè", desc: "整体认读" },
      { pinyin: "yuan", example: "圆", examplePinyin: "yuán", desc: "整体认读" },
      { pinyin: "yin", example: "音", examplePinyin: "yīn", desc: "整体认读" },
      { pinyin: "yun", example: "云", examplePinyin: "yún", desc: "整体认读" },
      { pinyin: "ying", example: "鹰", examplePinyin: "yīng", desc: "整体认读" }
    ]
  }
];

function getAllPinyin() {
  var all = [];
  categories.forEach(function (cat) {
    cat.list.forEach(function (item) {
      all.push(Object.assign({ catId: cat.id, catName: cat.name }, item));
    });
  });
  return all;
}

function getCategoryById(id) {
  return categories.find(function (cat) {
    return cat.id === id;
  });
}

module.exports = {
  categories: categories,
  getAllPinyin: getAllPinyin,
  getCategoryById: getCategoryById
};
