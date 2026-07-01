const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
// 获取openid
const getOpenId = async () => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  };
};

// ============ 学汉字小程序：用户体系相关云函数 ============

const USER_COLLECTION = "hanzi_user";

// 确保用户集合存在（首次调用时自动创建，已存在则忽略）
const ensureUserCollection = async () => {
  try {
    await db.createCollection(USER_COLLECTION);
  } catch (e) {
    // 集合已存在会抛错，属正常情况，忽略
  }
};

// 用户登录：用 openid 查找用户记录，不存在则创建。
// 入参 event.localData 为前端本地已有的学习数据，用于首次登录时合并上云。
const userLogin = async (event) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  await ensureUserCollection();

  const queryResult = await db
    .collection(USER_COLLECTION)
    .where({ _openid: openid })
    .get();

  const local = event.localData || {};

  // 已存在用户：合并本地新数据后返回云端最新数据
  if (queryResult.data.length > 0) {
    const cloudUser = queryResult.data[0];
    const mergedLearned = mergeUniqueArray(cloudUser.learnedChars, local.learnedChars);
    const mergedFavorites = mergeUniqueArray(cloudUser.favoriteChars, local.favoriteChars);
    const bestScore = Math.max(cloudUser.quizBestScore || 0, local.quizBestScore || 0);
    const playCount = (cloudUser.quizPlayCount || 0) > (local.quizPlayCount || 0)
      ? cloudUser.quizPlayCount
      : (local.quizPlayCount || 0);
    const mergedCheckLog = mergeCheckLog(cloudUser.checkLog, local.checkLog);
    const mergedMathScores = mergeMathScores(cloudUser.mathScores, local.mathScores);
    const mergedHabitsLog = mergeHabitsLog(cloudUser.habitsLog, local.habitsLog);
    const mergedFocusLog = mergeFocusLog(cloudUser.focusLog, local.focusLog);

    await db
      .collection(USER_COLLECTION)
      .doc(cloudUser._id)
      .update({
        data: {
          learnedChars: mergedLearned,
          favoriteChars: mergedFavorites,
          quizBestScore: bestScore,
          quizPlayCount: playCount,
          checkLog: mergedCheckLog,
          mathScores: mergedMathScores,
          habitsLog: mergedHabitsLog,
          focusLog: mergedFocusLog,
          updateTime: db.serverDate()
        }
      });

    return {
      success: true,
      openid: openid,
      userData: {
        avatarUrl: cloudUser.avatarUrl || "",
        nickName: cloudUser.nickName || "",
        learnedChars: mergedLearned,
        favoriteChars: mergedFavorites,
        quizBestScore: bestScore,
        quizPlayCount: playCount,
        checkLog: mergedCheckLog,
        mathScores: mergedMathScores,
        habitsLog: mergedHabitsLog,
        focusLog: mergedFocusLog
      }
    };
  }

  // 新用户：用本地数据初始化云端记录
  const newUser = {
    _openid: openid,
    avatarUrl: "",
    nickName: "",
    learnedChars: local.learnedChars || [],
    favoriteChars: local.favoriteChars || [],
    quizBestScore: local.quizBestScore || 0,
    quizPlayCount: local.quizPlayCount || 0,
    checkLog: (local.checkLog && typeof local.checkLog === "object") ? local.checkLog : {},
    mathScores: (local.mathScores && typeof local.mathScores === "object") ? local.mathScores : {},
    habitsLog: (local.habitsLog && typeof local.habitsLog === "object") ? local.habitsLog : {},
    focusLog: (local.focusLog && typeof local.focusLog === "object") ? local.focusLog : {},
    createTime: db.serverDate(),
    updateTime: db.serverDate()
  };
  await db.collection(USER_COLLECTION).add({ data: newUser });

  return {
    success: true,
    openid: openid,
    userData: {
      avatarUrl: "",
      nickName: "",
      learnedChars: newUser.learnedChars,
      favoriteChars: newUser.favoriteChars,
      quizBestScore: newUser.quizBestScore,
      quizPlayCount: newUser.quizPlayCount,
      checkLog: newUser.checkLog,
      mathScores: newUser.mathScores,
      habitsLog: newUser.habitsLog,
      focusLog: newUser.focusLog
    }
  };
};

// 同步用户学习数据到云端
// 入参 event.data: { learnedChars, favoriteChars, quizBestScore, quizPlayCount, checkLog, mathScores }
const syncUserData = async (event) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const data = event.data || {};

  const updateData = {
    updateTime: db.serverDate()
  };
  if (Array.isArray(data.learnedChars)) {
    updateData.learnedChars = data.learnedChars;
  }
  if (Array.isArray(data.favoriteChars)) {
    updateData.favoriteChars = data.favoriteChars;
  }
  if (typeof data.quizBestScore === "number") {
    updateData.quizBestScore = data.quizBestScore;
  }
  if (typeof data.quizPlayCount === "number") {
    updateData.quizPlayCount = data.quizPlayCount;
  }

  // checkLog 需要合并而非覆盖：先读云端已有记录，合并后再写入
  const queryResult = await db
    .collection(USER_COLLECTION)
    .where({ _openid: openid })
    .get();

  if (queryResult.data.length > 0) {
    const cloudUser = queryResult.data[0];
    if (data.checkLog && typeof data.checkLog === "object") {
      const cloudCheckLog = cloudUser.checkLog || {};
      updateData.checkLog = mergeCheckLog(cloudCheckLog, data.checkLog);
    }
    // 数学分数合并（取较大值）
    if (data.mathScores && typeof data.mathScores === "object") {
      updateData.mathScores = mergeMathScores(cloudUser.mathScores, data.mathScores);
    }
    // 习惯打卡合并
    if (data.habitsLog && typeof data.habitsLog === "object") {
      updateData.habitsLog = mergeHabitsLog(cloudUser.habitsLog, data.habitsLog);
    }
    // 专注记录合并
    if (data.focusLog && typeof data.focusLog === "object") {
      updateData.focusLog = mergeFocusLog(cloudUser.focusLog, data.focusLog);
    }
  } else {
    if (data.checkLog) updateData.checkLog = data.checkLog;
    if (data.mathScores) updateData.mathScores = data.mathScores;
    if (data.habitsLog) updateData.habitsLog = data.habitsLog;
    if (data.focusLog) updateData.focusLog = data.focusLog;
  }

  const result = await db
    .collection(USER_COLLECTION)
    .where({ _openid: openid })
    .update({ data: updateData });

  return { success: true, updated: result.stats.updated };
};

// 更新用户头像昵称
// 入参 event.data: { avatarUrl, nickName }
const updateUserProfile = async (event) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const data = event.data || {};

  const result = await db
    .collection(USER_COLLECTION)
    .where({ _openid: openid })
    .update({
      data: {
        avatarUrl: data.avatarUrl || "",
        nickName: data.nickName || "",
        updateTime: db.serverDate()
      }
    });

  return { success: true, updated: result.stats.updated };
};

// 合并两个数组并去重（用于合并本地与云端的已学/收藏汉字）
function mergeUniqueArray(cloudArr, localArr) {
  const base = Array.isArray(cloudArr) ? cloudArr.slice() : [];
  const extra = Array.isArray(localArr) ? localArr : [];
  extra.forEach(function (item) {
    if (base.indexOf(item) === -1) {
      base.push(item);
    }
  });
  return base;
}

// 合并两个打卡记录对象（取并集，所有打卡日期都保留）
// checkLog 格式：{ "2026-6-22": true, "2026-6-21": true }
function mergeCheckLog(cloudLog, localLog) {
  const merged = {};
  const cloud = (cloudLog && typeof cloudLog === "object") ? cloudLog : {};
  const local = (localLog && typeof localLog === "object") ? localLog : {};
  Object.keys(cloud).forEach(function (key) { merged[key] = true; });
  Object.keys(local).forEach(function (key) { merged[key] = true; });
  return merged;
}

// 合并数学分数（每个gameId取较大值）
// mathScores 格式：{ "calc": 80, "compare": 60 }
function mergeMathScores(cloudScores, localScores) {
  const merged = {};
  const cloud = (cloudScores && typeof cloudScores === "object") ? cloudScores : {};
  const local = (localScores && typeof localScores === "object") ? localScores : {};
  const allKeys = Object.keys(cloud).concat(Object.keys(local));
  allKeys.forEach(function (key) {
    merged[key] = Math.max(cloud[key] || 0, local[key] || 0);
  });
  return merged;
}

// 合并习惯打卡记录（每天的列表取并集）
// habitsLog 格式：{ "2026-6-22": ["bag","read"], ... }
function mergeHabitsLog(cloudLog, localLog) {
  const cloud = (cloudLog && typeof cloudLog === "object") ? cloudLog : {};
  const local = (localLog && typeof localLog === "object") ? localLog : {};
  const merged = {};
  const allDays = Object.keys(cloud).concat(Object.keys(local));
  allDays.forEach(function (day) {
    if (merged[day]) return; // 已处理过
    const cloudArr = Array.isArray(cloud[day]) ? cloud[day] : [];
    const localArr = Array.isArray(local[day]) ? local[day] : [];
    const combined = cloudArr.slice();
    localArr.forEach(function (id) {
      if (combined.indexOf(id) === -1) combined.push(id);
    });
    merged[day] = combined;
  });
  return merged;
}

// 合并专注记录（每天取较大值）
// focusLog 格式：{ "2026-6-22": 3, ... }
function mergeFocusLog(cloudLog, localLog) {
  const cloud = (cloudLog && typeof cloudLog === "object") ? cloudLog : {};
  const local = (localLog && typeof localLog === "object") ? localLog : {};
  const merged = {};
  const allDays = Object.keys(cloud).concat(Object.keys(local));
  allDays.forEach(function (day) {
    if (merged[day] !== undefined) return;
    merged[day] = Math.max(cloud[day] || 0, local[day] || 0);
  });
  return merged;
}

// ============ 用户体系云函数结束 ============

// ============ 汉字数据云端存储 ============

const CAT_COLLECTION = "hanzi_category";
const CHAR_COLLECTION = "hanzi_char";

// 确保集合存在
const ensureHanziCollections = async () => {
  try { await db.createCollection(CAT_COLLECTION); } catch (e) { /* 已存在 */ }
  try { await db.createCollection(CHAR_COLLECTION); } catch (e) { /* 已存在 */ }
};

// 获取所有汉字分类
const getHanziCategories = async () => {
  const result = await db
    .collection(CAT_COLLECTION)
    .orderBy("order", "asc")
    .limit(50)
    .get();
  return { success: true, categories: result.data };
};

// 按分类分页获取汉字
// 入参 event.catId: 分类ID, event.page: 页码(从1开始), event.pageSize: 每页数量(默认20)
const getHanziByCategory = async (event) => {
  const catId = event.catId;
  const page = event.page || 1;
  const pageSize = event.pageSize || 20;
  const skip = (page - 1) * pageSize;

  const countResult = await db
    .collection(CHAR_COLLECTION)
    .where({ catId: catId })
    .count();

  const result = await db
    .collection(CHAR_COLLECTION)
    .where({ catId: catId })
    .orderBy("order", "asc")
    .skip(skip)
    .limit(pageSize)
    .get();

  return {
    success: true,
    list: result.data,
    total: countResult.total,
    page: page,
    pageSize: pageSize,
    hasMore: skip + result.data.length < countResult.total
  };
};

// 批量导入汉字数据到云数据库
// 入参 event.categories: 分类数组, event.chars: 汉字数组
// 分两步调用：先传 categories，再分批传 chars
const importHanziData = async (event) => {
  await ensureHanziCollections();

  // 导入分类
  if (event.categories && event.categories.length > 0) {
    for (const cat of event.categories) {
      // 先删除已有同 catId 的记录，避免重复
      await db.collection(CAT_COLLECTION).where({ catId: cat.catId }).remove();
      await db.collection(CAT_COLLECTION).add({ data: cat });
    }
    return { success: true, imported: event.categories.length, type: "category" };
  }

  // 导入汉字（分批，每次最多50个）
  if (event.chars && event.chars.length > 0) {
    let imported = 0;
    for (const charItem of event.chars) {
      // 先删已有同 char 的记录
      await db.collection(CHAR_COLLECTION).where({ char: charItem.char }).remove();
      await db.collection(CHAR_COLLECTION).add({ data: charItem });
      imported++;
    }
    return { success: true, imported: imported, type: "char" };
  }

  return { success: false, errMsg: "no data provided" };
};

// ============ 汉字数据云端存储结束 ============

// ============ TTS 文字转语音 ============
const https = require("https");
const http = require("http");

// 通用 HTTP GET，支持重定向，支持 http/https
const httpGet = (url) => {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    mod.get(url, { headers: { "User-Agent": "Mozilla/5.0", "Referer": "https://fanyi.baidu.com" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        httpGet(res.headers.location).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
};

// TTS：百度翻译 TTS（稳定可用）
const getTTS = async (event) => {
  const text = event.text;
  if (!text) return { success: false, errMsg: "text is empty" };

  const safeName = Buffer.from(text, "utf8").toString("hex").slice(0, 40);
  const cloudPath = "tts_cache/" + safeName + ".mp3";

  const encodedText = encodeURIComponent(text);
  // 百度翻译 TTS，spd=5 正常语速
  const url = "https://fanyi.baidu.com/gettts?lan=zh&text=" + encodedText + "&spd=5&source=web";

  let audioBuffer;
  try {
    audioBuffer = await httpGet(url);
  } catch (e) {
    return { success: false, errMsg: "download failed: " + e.message };
  }

  if (audioBuffer.length < 500) {
    return { success: false, errMsg: "audio too small, got " + audioBuffer.length + " bytes" };
  }

  // 上传到云存储
  const uploadResult = await cloud.uploadFile({
    cloudPath: cloudPath,
    fileContent: audioBuffer,
  });

  return { success: true, fileID: uploadResult.fileID };
};

// ============ TTS 结束 ============

// ============ 拼音音频 ============
// 声母→呼读音映射（用于从 GitHub 音频库获取对应发音）
const SHENGMU_MAP = {
  b: "bo1", p: "po1", m: "mo1", f: "fo1",
  d: "de2", t: "te4", n: "ne4", l: "le4",
  g: "ge1", k: "ke1", h: "he1",
  j: "ji1", q: "qi1", x: "xi1",
  zh: "zhi1", ch: "chi1", sh: "shi1", r: "ri4",
  z: "zi4", c: "ci2", s: "si1",
  y: "yi1", w: "wu1"
};

// 韵母→音频文件映射
const YUNMU_MAP = {
  a: "a1", o: "o1", e: "e1",
  i: "yi1", u: "wu1", "ü": "yu1",
  ai: "ai1", ei: "ei1", ui: "hui1",
  ao: "ao1", ou: "ou1", iu: "liu1",
  ie: "jie1", "üe": "yue1", er: "er2",
  an: "an1", en: "en1", "in": "yin1", un: "wen1", "ün": "yun1",
  ang: "ang1", eng: "eng1", ing: "ying1", ong: "dong1"
};

// 整体认读→音频文件映射
const ZHENGTI_MAP = {
  zhi: "zhi1", chi: "chi1", shi: "shi1", ri: "ri4",
  zi: "zi4", ci: "ci2", si: "si1",
  yi: "yi1", wu: "wu1", yu: "yu1",
  ye: "ye1", yue: "yue1", yuan: "yuan2",
  yin: "yin1", yun: "yun2", ying: "ying1"
};

const getPinyinAudio = async (event) => {
  const pinyin = event.pinyin;
  if (!pinyin) return { success: false, errMsg: "pinyin is empty" };

  // 查找对应音频文件名
  const audioName = SHENGMU_MAP[pinyin] || YUNMU_MAP[pinyin] || ZHENGTI_MAP[pinyin];
  if (!audioName) return { success: false, errMsg: "unknown pinyin: " + pinyin };

  const cloudPath = "pinyin_audio/" + audioName + ".mp3";

  // 先检查云存储是否已缓存
  try {
    const tempUrl = await cloud.getTempFileURL({ fileList: ["cloud://cloud1-d1gfxg66v1189fa18.636c-cloud1-d1gfxg66v1189fa18-1439573675/" + cloudPath] });
    if (tempUrl.fileList && tempUrl.fileList[0] && tempUrl.fileList[0].tempFileURL) {
      return { success: true, fileID: "cloud://cloud1-d1gfxg66v1189fa18.636c-cloud1-d1gfxg66v1189fa18-1439573675/" + cloudPath };
    }
  } catch (e) {
    // 未缓存，继续下载
  }

  // 从 GitHub CDN 下载
  const cdnUrl = "https://cdn.jsdelivr.net/gh/davinfifield/mp3-chinese-pinyin-sound/mp3/" + audioName + ".mp3";
  let audioBuffer;
  try {
    audioBuffer = await httpGet(cdnUrl);
  } catch (e) {
    return { success: false, errMsg: "download failed: " + e.message };
  }

  if (audioBuffer.length < 200) {
    return { success: false, errMsg: "audio too small: " + audioBuffer.length + " bytes" };
  }

  // 上传到云存储缓存
  const uploadResult = await cloud.uploadFile({
    cloudPath: cloudPath,
    fileContent: audioBuffer,
  });

  return { success: true, fileID: uploadResult.fileID };
};

// ============ 拼音音频结束 ============

// ============ 趣味小知识 ============
const FACT_COLLECTION = "fun_facts";

const getRandomFact = async () => {
  try {
    // 先获取总数
    const countResult = await db.collection(FACT_COLLECTION).count();
    const total = countResult.total;
    if (total === 0) {
      return { success: false, errMsg: "no facts" };
    }
    // 随机跳过，取1条
    const skip = Math.floor(Math.random() * total);
    const result = await db.collection(FACT_COLLECTION).skip(skip).limit(1).get();
    if (result.data.length > 0) {
      return { success: true, fact: result.data[0] };
    }
    return { success: false, errMsg: "no facts found" };
  } catch (e) {
    return { success: false, errMsg: e.message };
  }
};

const importFunFacts = async (event) => {
  const facts = event.facts;
  if (!facts || !facts.length) {
    return { success: false, errMsg: "facts array is empty" };
  }
  try {
    await db.createCollection(FACT_COLLECTION);
  } catch (e) {
    // 集合已存在，忽略
  }
  let imported = 0;
  for (const fact of facts) {
    try {
      await db.collection(FACT_COLLECTION).add({ data: fact });
      imported++;
    } catch (e) {
      console.error("import fact failed:", e);
    }
  }
  return { success: true, imported: imported };
};

// ============ 趣味小知识结束 ============

// ============ 题库数据（古诗/字谜/看图说话/连词成句） ============

// 获取题库数据
// event.collection: 集合名 (quiz_poems, quiz_riddles, quiz_pictures, quiz_sentences)
const getQuizData = async (event) => {
  const collection = event.collection;
  if (!collection) return { success: false, errMsg: "collection is required" };

  try {
    const countResult = await db.collection(collection).count();
    const total = countResult.total;
    if (total === 0) return { success: false, errMsg: "no data", total: 0 };

    // 小程序云数据库单次最多取100条，分批取
    let allData = [];
    const batchSize = 100;
    for (let i = 0; i < total; i += batchSize) {
      const batch = await db.collection(collection).skip(i).limit(batchSize).get();
      allData = allData.concat(batch.data);
    }
    return { success: true, data: allData, total: total };
  } catch (e) {
    return { success: false, errMsg: e.message };
  }
};

// 导入题库数据（支持清空后全量导入）
// event.collection: 集合名, event.items: 数据数组, event.clear: 是否先清空
const importQuizData = async (event) => {
  const collection = event.collection;
  const items = event.items;
  if (!collection || !items || !items.length) {
    return { success: false, errMsg: "collection and items required" };
  }

  try { await db.createCollection(collection); } catch (e) { /* 已存在 */ }

  // 清空已有数据
  if (event.clear) {
    while (true) {
      const res = await db.collection(collection).limit(100).get();
      if (res.data.length === 0) break;
      for (const item of res.data) {
        await db.collection(collection).doc(item._id).remove();
      }
    }
  }

  let imported = 0;
  for (const item of items) {
    await db.collection(collection).add({ data: item });
    imported++;
  }
  return { success: true, imported: imported };
};

// ============ 题库数据结束 ============

// 获取小程序二维码
const getMiniProgramCode = async () => {
  // 获取小程序二维码的buffer
  const resp = await cloud.openapi.wxacode.get({
    path: "pages/index/index",
  });
  const { buffer } = resp;
  // 将图片上传云存储空间
  const upload = await cloud.uploadFile({
    cloudPath: "code.png",
    fileContent: buffer,
  });
  return upload.fileID;
};

// 创建集合
const createCollection = async () => {
  try {
    // 创建集合
    await db.createCollection("sales");
    await db.collection("sales").add({
      // data 字段表示需新增的 JSON 数据
      data: {
        region: "华东",
        city: "上海",
        sales: 11,
      },
    });
    await db.collection("sales").add({
      // data 字段表示需新增的 JSON 数据
      data: {
        region: "华东",
        city: "南京",
        sales: 11,
      },
    });
    await db.collection("sales").add({
      // data 字段表示需新增的 JSON 数据
      data: {
        region: "华南",
        city: "广州",
        sales: 22,
      },
    });
    await db.collection("sales").add({
      // data 字段表示需新增的 JSON 数据
      data: {
        region: "华南",
        city: "深圳",
        sales: 22,
      },
    });
    return {
      success: true,
    };
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    return {
      success: true,
      data: "create collection success",
    };
  }
};

// 查询数据
const selectRecord = async () => {
  // 返回数据库查询结果
  return await db.collection("sales").get();
};

// 更新数据
const updateRecord = async (event) => {
  try {
    // 遍历修改数据库信息
    for (let i = 0; i < event.data.length; i++) {
      await db
        .collection("sales")
        .where({
          _id: event.data[i]._id,
        })
        .update({
          data: {
            sales: event.data[i].sales,
          },
        });
    }
    return {
      success: true,
      data: event.data,
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e,
    };
  }
};

// 新增数据
const insertRecord = async (event) => {
  try {
    const insertRecord = event.data;
    // 插入数据
    await db.collection("sales").add({
      data: {
        region: insertRecord.region,
        city: insertRecord.city,
        sales: Number(insertRecord.sales),
      },
    });
    return {
      success: true,
      data: event.data,
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e,
    };
  }
};

// 删除数据
const deleteRecord = async (event) => {
  try {
    await db
      .collection("sales")
      .where({
        _id: event.data._id,
      })
      .remove();
    return {
      success: true,
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e,
    };
  }
};

// const getOpenId = require('./getOpenId/index');
// const getMiniProgramCode = require('./getMiniProgramCode/index');
// const createCollection = require('./createCollection/index');
// const selectRecord = require('./selectRecord/index');
// const updateRecord = require('./updateRecord/index');
// const fetchGoodsList = require('./fetchGoodsList/index');
// const genMpQrcode = require('./genMpQrcode/index');
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case "getOpenId":
      return await getOpenId();
    case "getMiniProgramCode":
      return await getMiniProgramCode();
    case "createCollection":
      return await createCollection();
    case "selectRecord":
      return await selectRecord();
    case "updateRecord":
      return await updateRecord(event);
    case "insertRecord":
      return await insertRecord(event);
    case "deleteRecord":
      return await deleteRecord(event);
    case "userLogin":
      return await userLogin(event);
    case "syncUserData":
      return await syncUserData(event);
    case "updateUserProfile":
      return await updateUserProfile(event);
    case "getHanziCategories":
      return await getHanziCategories();
    case "getHanziByCategory":
      return await getHanziByCategory(event);
    case "importHanziData":
      return await importHanziData(event);
    case "getTTS":
      return await getTTS(event);
    case "getRandomFact":
      return await getRandomFact(event);
    case "importFunFacts":
      return await importFunFacts(event);
    case "getPinyinAudio":
      return await getPinyinAudio(event);
    case "getQuizData":
      return await getQuizData(event);
    case "importQuizData":
      return await importQuizData(event);
  }
};
