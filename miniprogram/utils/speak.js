// 语音朗读工具 —— 云存储音频方案
//
// 音频文件存放在云存储 audio/X.mp3（X 为汉字），按需下载到本地临时文件后播放。
// 已下载的音频会缓存在内存中，同一个字只下载一次，后续直接播放。
// 不依赖任何外部域名或插件，完全走微信云开发内部链路，稳定可靠。

let sharedAudioContext = null;
// 缓存：{ 汉字: 本地临时文件路径 }
const audioCache = {};

function getAudioContext() {
  if (!sharedAudioContext) {
    sharedAudioContext = wx.createInnerAudioContext();
    sharedAudioContext.onError(function (error) {
      console.error("音频播放失败：", error);
    });
  }
  return sharedAudioContext;
}

function playLocal(filePath) {
  var audioContext = getAudioContext();
  audioContext.stop();
  audioContext.src = filePath;
  audioContext.play();
}

// 朗读单个汉字：从云存储下载 audio/X.mp3 到本地临时文件后播放
// 传入多字文本时只读第一个字（本地只有单字音频）
function speak(text) {
  if (!text) {
    return;
  }
  var char = text.charAt(0);

  // 命中缓存直接播放
  if (audioCache[char]) {
    playLocal(audioCache[char]);
    return;
  }

  // 从云存储下载
  var fileID = "cloud://cloud1-d1gfxg66v1189fa18.636c-cloud1-d1gfxg66v1189fa18-1439573675/audio/" + char + ".mp3";
  wx.cloud.downloadFile({
    fileID: fileID,
    success: function (res) {
      if (res.tempFilePath) {
        audioCache[char] = res.tempFilePath;
        playLocal(res.tempFilePath);
      }
    },
    fail: function (error) {
      console.error("朗读下载失败：", char, error);
    }
  });
}

// TTS 朗读（词语、句子）—— 通过云函数下载有道 TTS 音频后播放
const ttsCache = {};

function speakTTS(text) {
  if (!text) return;

  // 命中缓存直接播放
  if (ttsCache[text]) {
    playLocal(ttsCache[text]);
    return;
  }

  // 调用云函数获取 TTS 音频
  wx.cloud.callFunction({
    name: "quickstartFunctions",
    data: { type: "getTTS", text: text },
    success: function (res) {
      var result = res.result;
      if (result && result.success && result.fileID) {
        // 从云存储下载临时文件播放
        wx.cloud.downloadFile({
          fileID: result.fileID,
          success: function (dlRes) {
            if (dlRes.tempFilePath) {
              ttsCache[text] = dlRes.tempFilePath;
              playLocal(dlRes.tempFilePath);
            }
          }
        });
      }
    },
    fail: function (err) {
      console.error("TTS朗读失败：", text, err);
    }
  });
}

function destroy() {
  if (sharedAudioContext) {
    sharedAudioContext.destroy();
    sharedAudioContext = null;
  }
}

module.exports = {
  speak: speak,
  speakTTS: speakTTS,
  destroy: destroy
};
