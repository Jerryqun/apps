// 成就徽章数据
var badges = [
  // 打卡类
  { id: "streak3", name: "坚持小将", icon: "🌟", desc: "连续打卡3天", type: "streak", target: 3 },
  { id: "streak7", name: "习惯达人", icon: "🏅", desc: "连续打卡7天", type: "streak", target: 7 },
  { id: "streak30", name: "毅力之星", icon: "👑", desc: "连续打卡30天", type: "streak", target: 30 },
  // 识字类
  { id: "char50", name: "识字新手", icon: "📗", desc: "累计学会50个字", type: "learned", target: 50 },
  { id: "char100", name: "识字能手", icon: "📘", desc: "累计学会100个字", type: "learned", target: 100 },
  { id: "char300", name: "识字大王", icon: "📙", desc: "累计学会300个字", type: "learned", target: 300 },
  // 数学类
  { id: "math5", name: "数学新星", icon: "⭐", desc: "完成5种数学游戏", type: "mathGames", target: 5 },
  { id: "math10", name: "数学高手", icon: "🎖️", desc: "完成10种数学游戏", type: "mathGames", target: 10 },
  // 专注类
  { id: "focus5", name: "专注小蜜蜂", icon: "🐝", desc: "累计专注5次", type: "totalFocus", target: 5 },
  { id: "focus20", name: "专注大师", icon: "🧘", desc: "累计专注20次", type: "totalFocus", target: 20 },
  // 习惯类
  { id: "habit7", name: "好习惯标兵", icon: "🎀", desc: "习惯全勤完成7天", type: "habitPerfect", target: 7 }
];

module.exports = badges;
