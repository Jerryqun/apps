// 看图说话数据 —— emoji场景 + 正确描述 + 干扰描述

var pictures = [
  {
    id: 1,
    scene: "🌧️☂️👧",
    answer: "下雨了，小女孩打着伞。",
    options: ["下雨了，小女孩打着伞。", "天晴了，小女孩在跑步。", "下雪了，小女孩在堆雪人。", "刮风了，小女孩在放风筝。"]
  },
  {
    id: 2,
    scene: "🌳🐦🐦🐦☀️",
    answer: "阳光下，树上有三只小鸟。",
    options: ["阳光下，树上有三只小鸟。", "月光下，树上有一只猫头鹰。", "树下有三只兔子在吃草。", "三只鱼在水里游泳。"]
  },
  {
    id: 3,
    scene: "👦🎒🏫",
    answer: "小男孩背着书包去上学。",
    options: ["小男孩背着书包去上学。", "小男孩在家里看电视。", "小女孩在公园里玩。", "小男孩在超市买东西。"]
  },
  {
    id: 4,
    scene: "🐱🐟😋",
    answer: "小猫正在吃鱼，很开心。",
    options: ["小猫正在吃鱼，很开心。", "小狗在啃骨头。", "小猫在睡觉。", "小鱼在水里游泳。"]
  },
  {
    id: 5,
    scene: "👨‍👩‍👧🎂🎉",
    answer: "一家人在一起过生日。",
    options: ["一家人在一起过生日。", "小朋友在学校上课。", "爸爸一个人在工作。", "妈妈在做饭。"]
  },
  {
    id: 6,
    scene: "🌸🦋🌸🦋",
    answer: "花园里蝴蝶在花丛中飞舞。",
    options: ["花园里蝴蝶在花丛中飞舞。", "小鸟在天上飞。", "蜜蜂在采蜜。", "毛毛虫在吃叶子。"]
  },
  {
    id: 7,
    scene: "⛄❄️👦👧",
    answer: "冬天下雪了，小朋友在堆雪人。",
    options: ["冬天下雪了，小朋友在堆雪人。", "夏天很热，小朋友在游泳。", "秋天到了，树叶变黄了。", "春天来了，花儿开了。"]
  },
  {
    id: 8,
    scene: "🌙⭐🛏️👶",
    answer: "夜晚，小宝宝在床上睡觉。",
    options: ["夜晚，小宝宝在床上睡觉。", "早上，小朋友在吃早餐。", "中午，太阳高高挂。", "下午，小朋友在写作业。"]
  },
  {
    id: 9,
    scene: "🏊‍♂️🌊☀️",
    answer: "大晴天，有人在游泳。",
    options: ["大晴天，有人在游泳。", "下雨天，有人在钓鱼。", "有人在爬山。", "有人在骑自行车。"]
  },
  {
    id: 10,
    scene: "👩‍🍳🍳🥚",
    answer: "妈妈在厨房煎鸡蛋。",
    options: ["妈妈在厨房煎鸡蛋。", "爸爸在洗碗。", "奶奶在织毛衣。", "姐姐在画画。"]
  },
  {
    id: 11,
    scene: "🚌👨👩👧👦",
    answer: "一家人坐公交车出门。",
    options: ["一家人坐公交车出门。", "小朋友在骑自行车。", "爸爸开车去上班。", "妈妈在等出租车。"]
  },
  {
    id: 12,
    scene: "📚👓👴",
    answer: "爷爷戴着眼镜在看书。",
    options: ["爷爷戴着眼镜在看书。", "奶奶在看电视。", "爸爸在打电话。", "小朋友在写字。"]
  }
];

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function generateQuiz(count) {
  var pool = shuffle(pictures).slice(0, count || 8);
  return pool.map(function (item) {
    return { id: item.id, scene: item.scene, answer: item.answer, options: shuffle(item.options.slice()) };
  });
}

module.exports = {
  pictures: pictures,
  generateQuiz: generateQuiz
};
