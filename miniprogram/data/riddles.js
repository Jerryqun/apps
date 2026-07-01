// 趣味字谜数据 —— 一年级常见字谜

var riddles = [
  { id: 1, riddle: "一口咬掉牛尾巴", hint: "口+牛的下半部分", answer: "告", explain: "口在上，牛去掉上面一横", options: ["告", "吃", "听", "叫"] },
  { id: 2, riddle: "人在云上走", hint: "人+云", answer: "会", explain: "人字头下面一个云", options: ["会", "合", "全", "众"] },
  { id: 3, riddle: "一人一口", hint: "人+口合在一起", answer: "合", explain: "上面人，下面一口", options: ["合", "会", "金", "令"] },
  { id: 4, riddle: "两个人", hint: "两个人字", answer: "从", explain: "两个人紧挨在一起", options: ["从", "众", "比", "北"] },
  { id: 5, riddle: "三个人", hint: "三个人字", answer: "众", explain: "上面一人，下面两人", options: ["众", "森", "品", "从"] },
  { id: 6, riddle: "一火", hint: "一+火", answer: "灭", explain: "一横盖住了火", options: ["灭", "炎", "烟", "灯"] },
  { id: 7, riddle: "王先生坐在石头上", hint: "王+石", answer: "碧", explain: "王和白在石上面", options: ["碧", "磊", "研", "砍"] },
  { id: 8, riddle: "一加一不是二", hint: "两个一组合", answer: "王", explain: "一+一再竖着连起来", options: ["王", "丰", "井", "干"] },
  { id: 9, riddle: "一口吃掉一个虫", hint: "口里有个虫", answer: "虹", explain: "虫字旁加个工", options: ["虹", "蚂", "蛇", "蝶"] },
  { id: 10, riddle: "日月同辉", hint: "日+月", answer: "明", explain: "日和月组合在一起", options: ["明", "晚", "暗", "朝"] },
  { id: 11, riddle: "一字十三点", hint: "汁的谐音", answer: "汁", explain: "三点水加一个十", options: ["汁", "计", "汗", "江"] },
  { id: 12, riddle: "田里长草", hint: "田+草字头", answer: "苗", explain: "草字头下面一个田", options: ["苗", "草", "花", "芽"] },
  { id: 13, riddle: "大口套小口", hint: "一大一小两个口", answer: "回", explain: "大的口里面一个小口", options: ["回", "因", "国", "围"] },
  { id: 14, riddle: "一人立在大字旁", hint: "人+大", answer: "天", explain: "一横在大字上面", options: ["天", "太", "夫", "央"] },
  { id: 15, riddle: "木字旁边有个目", hint: "木+目", answer: "相", explain: "木和目组合", options: ["相", "想", "杨", "村"] },
  { id: 16, riddle: "四面都是山", hint: "四个山围起来的感觉", answer: "田", explain: "田字四面像被围住", options: ["田", "画", "男", "甲"] },
  { id: 17, riddle: "两棵树", hint: "两个木", answer: "林", explain: "两个木字并排", options: ["林", "森", "树", "村"] },
  { id: 18, riddle: "三棵树", hint: "三个木", answer: "森", explain: "三个木字组合", options: ["森", "林", "树", "楼"] }
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
  var pool = shuffle(riddles).slice(0, count || 8);
  return pool.map(function (item) {
    return {
      id: item.id, riddle: item.riddle, hint: item.hint,
      answer: item.answer, explain: item.explain,
      options: shuffle(item.options.slice())
    };
  });
}

module.exports = {
  riddles: riddles,
  generateQuiz: generateQuiz
};
