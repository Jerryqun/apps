// 古诗启蒙数据 —— 一年级必背古诗

var poems = [
  {
    id: "yonge",
    title: "咏鹅",
    author: "骆宾王",
    dynasty: "唐",
    emoji: "🦢",
    color: "#42A5F5",
    lines: ["鹅鹅鹅，", "曲项向天歌。", "白毛浮绿水，", "红掌拨清波。"],
    pinyin: ["é é é，", "qū xiàng xiàng tiān gē。", "bái máo fú lǜ shuǐ，", "hóng zhǎng bō qīng bō。"],
    meaning: "小朋友看到白鹅在水里游泳，弯着脖子朝天叫，白色羽毛浮在绿水上，红色脚掌划动清波。"
  },
  {
    id: "chunxiao",
    title: "春晓",
    author: "孟浩然",
    dynasty: "唐",
    emoji: "🌸",
    color: "#EC407A",
    lines: ["春眠不觉晓，", "处处闻啼鸟。", "夜来风雨声，", "花落知多少。"],
    pinyin: ["chūn mián bù jué xiǎo，", "chù chù wén tí niǎo。", "yè lái fēng yǔ shēng，", "huā luò zhī duō shǎo。"],
    meaning: "春天睡得好香不知不觉天亮了，到处都能听到小鸟叫。昨晚风雨交加，不知花儿被吹落了多少。"
  },
  {
    id: "jingyesi",
    title: "静夜思",
    author: "李白",
    dynasty: "唐",
    emoji: "🌙",
    color: "#7E57C2",
    lines: ["床前明月光，", "疑是地上霜。", "举头望明月，", "低头思故乡。"],
    pinyin: ["chuáng qián míng yuè guāng，", "yí shì dì shàng shuāng。", "jǔ tóu wàng míng yuè，", "dī tóu sī gù xiāng。"],
    meaning: "月光照在床前像地上的白霜，抬头看天上的月亮，低头想念远方的家乡。"
  },
  {
    id: "minnong",
    title: "悯农（其二）",
    author: "李绅",
    dynasty: "唐",
    emoji: "🌾",
    color: "#FF8A65",
    lines: ["锄禾日当午，", "汗滴禾下土。", "谁知盘中餐，", "粒粒皆辛苦。"],
    pinyin: ["chú hé rì dāng wǔ，", "hàn dī hé xià tǔ。", "shuí zhī pán zhōng cān，", "lì lì jiē xīn kǔ。"],
    meaning: "农民伯伯在炎热的中午锄地，汗水滴到了泥土里。谁知道碗里的饭，每一粒都是辛苦种出来的。"
  },
  {
    id: "hua",
    title: "画",
    author: "王维",
    dynasty: "唐",
    emoji: "🎨",
    color: "#66BB6A",
    lines: ["远看山有色，", "近听水无声。", "春去花还在，", "人来鸟不惊。"],
    pinyin: ["yuǎn kàn shān yǒu sè，", "jìn tīng shuǐ wú shēng。", "chūn qù huā hái zài，", "rén lái niǎo bù jīng。"],
    meaning: "远看山有美丽的颜色，走近听水却没有声音。春天过去花还开着，人走来鸟儿也不害怕——原来这是一幅画！"
  },
  {
    id: "dengguanque",
    title: "登鹳雀楼",
    author: "王之涣",
    dynasty: "唐",
    emoji: "🏯",
    color: "#FFA726",
    lines: ["白日依山尽，", "黄河入海流。", "欲穷千里目，", "更上一层楼。"],
    pinyin: ["bái rì yī shān jìn，", "huáng hé rù hǎi liú。", "yù qióng qiān lǐ mù，", "gèng shàng yī céng lóu。"],
    meaning: "太阳沿着山落下去了，黄河向大海流去。想要看到更远的地方，就要再上一层楼。"
  },
  {
    id: "fengqiao",
    title: "风",
    author: "李峤",
    dynasty: "唐",
    emoji: "💨",
    color: "#26C6DA",
    lines: ["解落三秋叶，", "能开二月花。", "过江千尺浪，", "入竹万竿斜。"],
    pinyin: ["jiě luò sān qiū yè，", "néng kāi èr yuè huā。", "guò jiāng qiān chǐ làng，", "rù zhú wàn gān xié。"],
    meaning: "风能吹落秋天的树叶，也能让二月的花开放。吹过江面掀起大浪，吹进竹林让竹竿歪斜。"
  },
  {
    id: "yueluoqiti",
    title: "古朗月行（节选）",
    author: "李白",
    dynasty: "唐",
    emoji: "🌕",
    color: "#AB47BC",
    lines: ["小时不识月，", "呼作白玉盘。", "又疑瑶台镜，", "飞在青云端。"],
    pinyin: ["xiǎo shí bù shí yuè，", "hū zuò bái yù pán。", "yòu yí yáo tái jìng，", "fēi zài qīng yún duān。"],
    meaning: "小时候不认识月亮，把它叫做白玉做的盘子。又觉得像仙人用的镜子，飞到了蓝色的云上面。"
  }
];

function getPoemById(id) {
  return poems.find(function (p) { return p.id === id; });
}

module.exports = {
  poems: poems,
  getPoemById: getPoemById
};
