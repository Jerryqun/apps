// app.js
App({
  onLaunch: function () {
    this.globalData = {
      // 云开发环境 ID
      env: "cloud1-d1gfxg66v1189fa18",
      // 当前登录用户信息（登录成功后由 utils/user.js 写入）
      userInfo: null,
      openid: ""
    };

    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
      return;
    }

    wx.cloud.init({
      env: this.globalData.env,
      traceUser: true
    });
  }
});
