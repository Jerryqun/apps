// 用户体系工具：统一管理登录、云端数据同步、本地缓存
//
// 设计：
// - 身份：通过云函数 quickstartFunctions(type=userLogin) 拿到 openid（前端不可伪造）
// - 数据：学习数据以云数据库 hanzi_user 集合为准，按 openid 存储
// - 同步：登录时把本地历史数据合并上云；之后所有写操作既更新本地缓存（保证离线/即时响应），
//         也回写云端（保证换设备不丢）

const CLOUD_FUNCTION = "quickstartFunctions";

// 本地缓存 key
const STORAGE_KEYS = {
  learned: "learnedChars",
  favorite: "favoriteChars",
  bestScore: "quizBestScore",
  playCount: "quizPlayCount",
  checkLog: "checkLog"
};

// 读取本地学习数据
function readLocalData() {
  return {
    learnedChars: wx.getStorageSync(STORAGE_KEYS.learned) || [],
    favoriteChars: wx.getStorageSync(STORAGE_KEYS.favorite) || [],
    quizBestScore: wx.getStorageSync(STORAGE_KEYS.bestScore) || 0,
    quizPlayCount: wx.getStorageSync(STORAGE_KEYS.playCount) || 0,
    checkLog: wx.getStorageSync(STORAGE_KEYS.checkLog) || {}
  };
}

// 把云端数据写回本地缓存
function writeLocalData(userData) {
  wx.setStorageSync(STORAGE_KEYS.learned, userData.learnedChars || []);
  wx.setStorageSync(STORAGE_KEYS.favorite, userData.favoriteChars || []);
  wx.setStorageSync(STORAGE_KEYS.bestScore, userData.quizBestScore || 0);
  wx.setStorageSync(STORAGE_KEYS.playCount, userData.quizPlayCount || 0);
  // checkLog 采用合并策略而非覆盖，避免本地刚新增的打卡被云端旧数据冲掉
  var localCheckLog = wx.getStorageSync(STORAGE_KEYS.checkLog) || {};
  var cloudCheckLog = userData.checkLog || {};
  var merged = {};
  Object.keys(localCheckLog).forEach(function (k) { merged[k] = true; });
  Object.keys(cloudCheckLog).forEach(function (k) { merged[k] = true; });
  wx.setStorageSync(STORAGE_KEYS.checkLog, merged);
}

// 调用云函数的统一封装，返回 Promise
function callCloud(type, payload) {
  return new Promise(function (resolve, reject) {
    wx.cloud.callFunction({
      name: CLOUD_FUNCTION,
      data: Object.assign({ type: type }, payload),
      success: function (res) {
        resolve(res.result);
      },
      fail: function (error) {
        reject(error);
      }
    });
  });
}

// 登录：拿 openid + 合并本地数据上云 + 返回云端最新用户数据
// 返回 Promise<{ openid, userData }>
function login() {
  const app = getApp();
  const localData = readLocalData();

  return callCloud("userLogin", { localData: localData }).then(function (result) {
    if (!result || !result.success) {
      throw new Error("登录失败");
    }
    // 缓存到全局
    app.globalData.openid = result.openid;
    app.globalData.userInfo = {
      avatarUrl: result.userData.avatarUrl,
      nickName: result.userData.nickName
    };
    // 云端数据回写本地，保证后续页面读本地缓存即为最新
    writeLocalData(result.userData);
    return result;
  });
}

// 把当前本地学习数据同步到云端（写操作后调用）
// 静默执行，失败不阻塞用户操作（本地已生效）
function syncToCloud() {
  const app = getApp();
  if (!app.globalData.openid) {
    // 未登录则不同步，仅保留在本地
    return Promise.resolve();
  }
  const localData = readLocalData();
  return callCloud("syncUserData", { data: localData }).catch(function (error) {
    console.warn("同步学习数据到云端失败（已保留在本地）：", error);
  });
}

// 更新头像昵称：同时写云端和全局缓存
// profile: { avatarUrl, nickName }
function updateProfile(profile) {
  const app = getApp();
  return callCloud("updateUserProfile", { data: profile }).then(function (result) {
    app.globalData.userInfo = {
      avatarUrl: profile.avatarUrl,
      nickName: profile.nickName
    };
    return result;
  });
}

// 获取当前用户信息（头像昵称），未登录返回 null
function getUserInfo() {
  const app = getApp();
  return app.globalData.userInfo;
}

module.exports = {
  login: login,
  syncToCloud: syncToCloud,
  updateProfile: updateProfile,
  getUserInfo: getUserInfo,
  readLocalData: readLocalData
};
