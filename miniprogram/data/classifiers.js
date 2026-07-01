// 量词填空数据 —— 一年级常见量词搭配

var classifiers = [
  { id: 1, classifier: "只", noun: "猫", emoji: "🐱", sentence: "一___猫" },
  { id: 2, classifier: "条", noun: "鱼", emoji: "🐟", sentence: "一___鱼" },
  { id: 3, classifier: "朵", noun: "花", emoji: "🌸", sentence: "一___花" },
  { id: 4, classifier: "本", noun: "书", emoji: "📖", sentence: "一___书" },
  { id: 5, classifier: "棵", noun: "树", emoji: "🌳", sentence: "一___树" },
  { id: 6, classifier: "辆", noun: "车", emoji: "🚗", sentence: "一___车" },
  { id: 7, classifier: "把", noun: "伞", emoji: "☂️", sentence: "一___伞" },
  { id: 8, classifier: "双", noun: "鞋", emoji: "👟", sentence: "一___鞋" },
  { id: 9, classifier: "张", noun: "桌子", emoji: "🪑", sentence: "一___桌子" },
  { id: 10, classifier: "支", noun: "铅笔", emoji: "✏️", sentence: "一___铅笔" },
  { id: 11, classifier: "片", noun: "叶子", emoji: "🍃", sentence: "一___叶子" },
  { id: 12, classifier: "颗", noun: "星星", emoji: "⭐", sentence: "一___星星" },
  { id: 13, classifier: "头", noun: "牛", emoji: "🐄", sentence: "一___牛" },
  { id: 14, classifier: "匹", noun: "马", emoji: "🐴", sentence: "一___马" },
  { id: 15, classifier: "座", noun: "山", emoji: "⛰️", sentence: "一___山" },
  { id: 16, classifier: "架", noun: "飞机", emoji: "✈️", sentence: "一___飞机" },
  { id: 17, classifier: "面", noun: "旗", emoji: "🚩", sentence: "一___旗" },
  { id: 18, classifier: "块", noun: "蛋糕", emoji: "🍰", sentence: "一___蛋糕" },
  { id: 19, classifier: "件", noun: "衣服", emoji: "👕", sentence: "一___衣服" },
  { id: 20, classifier: "瓶", noun: "水", emoji: "💧", sentence: "一___水" },
  { id: 21, classifier: "群", noun: "羊", emoji: "🐑", sentence: "一___羊" },
  { id: 22, classifier: "幅", noun: "画", emoji: "🖼️", sentence: "一___画" },
  { id: 23, classifier: "根", noun: "绳子", emoji: "🪢", sentence: "一___绳子" },
  { id: 24, classifier: "台", noun: "电脑", emoji: "💻", sentence: "一___电脑" },
  { id: 25, classifier: "扇", noun: "门", emoji: "🚪", sentence: "一___门" }
];

// 所有量词列表
var allClassifiers = [];
classifiers.forEach(function (item) {
  if (allClassifiers.indexOf(item.classifier) === -1) allClassifiers.push(item.classifier);
});

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function generateQuiz(count) {
  var pool = shuffle(classifiers).slice(0, count || 8);
  return pool.map(function (item) {
    var options = [item.classifier];
    var candidates = allClassifiers.filter(function (c) { return c !== item.classifier; });
    candidates = shuffle(candidates);
    for (var i = 0; i < 3 && i < candidates.length; i++) {
      options.push(candidates[i]);
    }
    return {
      id: item.id, noun: item.noun, classifier: item.classifier,
      emoji: item.emoji, sentence: item.sentence, options: shuffle(options)
    };
  });
}

module.exports = {
  classifiers: classifiers,
  generateQuiz: generateQuiz
};
