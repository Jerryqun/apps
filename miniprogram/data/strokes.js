// 笔画笔顺数据 —— 8种基本笔画 + 示例字

var strokes = [
  {
    id: 1, name: "横", pinyin: "héng", symbol: "一",
    desc: "从左到右，平平的一笔",
    mnemonic: "像一条小路平平走",
    examples: [
      { char: "一", strokes: 1, order: "横" },
      { char: "二", strokes: 2, order: "短横、长横" },
      { char: "十", strokes: 2, order: "横、竖" },
      { char: "王", strokes: 4, order: "横、横、竖、横" }
    ]
  },
  {
    id: 2, name: "竖", pinyin: "shù", symbol: "丨",
    desc: "从上到下，直直的一笔",
    mnemonic: "像一棵小树笔直站",
    examples: [
      { char: "十", strokes: 2, order: "横、竖" },
      { char: "中", strokes: 4, order: "竖、横折、横、竖" },
      { char: "下", strokes: 3, order: "横、竖、点" },
      { char: "木", strokes: 4, order: "横、竖、撇、捺" }
    ]
  },
  {
    id: 3, name: "撇", pinyin: "piě", symbol: "丿",
    desc: "从右上到左下，轻轻一甩",
    mnemonic: "像小鸟展翅往下飞",
    examples: [
      { char: "人", strokes: 2, order: "撇、捺" },
      { char: "大", strokes: 3, order: "横、撇、捺" },
      { char: "八", strokes: 2, order: "撇、捺" },
      { char: "木", strokes: 4, order: "横、竖、撇、捺" }
    ]
  },
  {
    id: 4, name: "捺", pinyin: "nà", symbol: "㇏",
    desc: "从左上到右下，先轻后重",
    mnemonic: "像滑滑梯往下滑",
    examples: [
      { char: "人", strokes: 2, order: "撇、捺" },
      { char: "大", strokes: 3, order: "横、撇、捺" },
      { char: "木", strokes: 4, order: "横、竖、撇、捺" },
      { char: "入", strokes: 2, order: "撇、捺" }
    ]
  },
  {
    id: 5, name: "点", pinyin: "diǎn", symbol: "丶",
    desc: "轻轻一点，像小雨滴",
    mnemonic: "像天上掉下小雨滴",
    examples: [
      { char: "小", strokes: 3, order: "竖钩、点、点" },
      { char: "下", strokes: 3, order: "横、竖、点" },
      { char: "六", strokes: 4, order: "点、横、撇、点" },
      { char: "火", strokes: 4, order: "点、撇、撇、捺" }
    ]
  },
  {
    id: 6, name: "提", pinyin: "tí", symbol: "㇀",
    desc: "从左下往右上，轻轻挑起",
    mnemonic: "像用铲子往上抛",
    examples: [
      { char: "打", strokes: 5, order: "横、竖钩、提、横、竖" },
      { char: "江", strokes: 6, order: "点、点、提、横、竖、横" },
      { char: "地", strokes: 6, order: "横、竖、提、横折钩、竖、竖弯钩" }
    ]
  },
  {
    id: 7, name: "折", pinyin: "zhé", symbol: "𠃊",
    desc: "写到一半转弯，有拐角",
    mnemonic: "像走路遇到拐弯处",
    examples: [
      { char: "口", strokes: 3, order: "竖、横折、横" },
      { char: "日", strokes: 4, order: "竖、横折、横、横" },
      { char: "月", strokes: 4, order: "撇、横折钩、横、横" },
      { char: "山", strokes: 3, order: "竖、竖折、竖" }
    ]
  },
  {
    id: 8, name: "钩", pinyin: "gōu", symbol: "亅",
    desc: "写到末尾往回钩一下",
    mnemonic: "像鱼钩弯弯的",
    examples: [
      { char: "小", strokes: 3, order: "竖钩、点、点" },
      { char: "水", strokes: 4, order: "竖钩、横撇、撇、捺" },
      { char: "手", strokes: 4, order: "撇、横、横、竖钩" },
      { char: "了", strokes: 2, order: "横撇、竖钩" }
    ]
  }
];

module.exports = {
  strokes: strokes
};
