/**
 * @author Javen 
 * @copyright 2018-09-22 17:30:58 javendev@126.com 
 * @description QQ玩一玩工具类 
 */

var Global = require("Global");
/**
 * 日志输出
 * @param {String} msg 
 */
function log(msg) {
    if (Global.isDebug) {
        cc.log(msg);
    }
}
/**
 * post 请求
 * @param {*} url 
 * @param {*} data 
 * @param {*} callBack 
 */
function post(url, data, callBack) {
    log("请求参数:" + data);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        let status = xhr.status;
        if (xhr.readyState == 4 && status == 200) {
            var responseBody = xhr.responseText;
            log("响应的结果：" + responseBody);
            callBack(status, JSON.parse(responseBody));
        }
    };
    xhr.open("POST", url, true);
    xhr.send(data);
}

/**
 * get请求
 * @param {*} url 
 * @param {*} data 
 * @param {*} callBack 
 */
function get(url, data, callBack) {
    log("请求参数:" + data);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        let status = xhr.status;
        if (xhr.readyState == 4 && status == 200) {
            var responseBody = xhr.responseText;
            log("响应的结果：" + responseBody);
            callBack(status, JSON.parse(responseBody));
        }
    };
    xhr.open("GET", url + "?" + encodeURIComponent(data), true);
    xhr.send();
}

function BKGet(url, callback, custom) {
    let httpUtil = new BK.HttpUtil(url);
    httpUtil.setHttpMethod("get");
    httpUtil.custom = custom;
    //绑定回调对象
    httpUtil.requestAsync(callback.bind(httpUtil));
}

/**
 * 新建文件夹
 * @param {String} dirPath 
 */
function makeDir(dirPath) {
    if (BK.FileUtil.isFileExist(dirPath)) {
        log("已存在直接返回..." + dirPath);
        return true;
    }
    log("makeDir....");
    return BK.FileUtil.makeDir(dirPath);
}

/**
 * 跳转到其他游戏
 * @param {Number} gameId 
 */
function skipGame(gameId) {
    BK.QQ.skipGame(gameId, "IJPay");
}
/**
 * 判断手Q版本
 * @param {String} ver1 7.1.1.1
 * @param {String} ver2 6.3.3.3
 */
function versionCompare(ver1, ver2) {
    ver1 = parseInt(ver1.replace(/\./g, ""));
    ver2 = parseInt(ver2.replace(/\./g, ""));
    if (ver1 >= ver2) {
        return true;
    } else {
        return false;
    }
}

/**
 * 生成指定范围的随机数
 * @param {*} min 
 * @param {*} max 
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * 获取分享信息
 * @param {String} localPicPath 
 */
function getShareInfo(localPicPath) {
    if (!localPicPath) {
        localPicPath = "GameRes://qrcode.png";
    }
    let summarys = ["IJPay 让支付触手可及!", "JPay简易而不简单的Android支付SDK!", "游戏太刺激了，邀请还能领抱枕!", "快上车!"];
    let shareInfo = {
        summary: summarys[getRandomInt(0, 3)],
        picUrl: "https://javen205.gitee.io/ijpay/doc/assets/IJPay-t.png", //支持HTTPS
        extendInfo: Global.openId,
        localPicPath: localPicPath, //分享至空间、微信、朋友圈时需要的图。（选填，若无该字段，系统使用游戏对应的二维码）
    };
    return shareInfo;
}

/**
 * 分享
 * @param {*} shareInfo 
 * @param {*} callback 
 */
function toShare(shareInfo, callback) {
    if (cc.sys.platform == cc.sys.QQ_PLAY) {
        BK.QQ.share(shareInfo, function (retCode, shareDest, isFirstShare) {
            log("分享结果 retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
            if (retCode == 0) {
                if (callback) {
                    callback(0);
                }
                if (shareDest == 0) {
                    //聊天窗
                    log("成功分享至QQ");
                } else if (shareDest == 1) {
                    //空间
                    log("成功分享至空间");
                } else if (shareDest == 2) {
                    //微信
                    log("成功分享至微信");
                } else if (shareDest == 3) {
                    // 朋友圈
                    log("成功分享至朋友圈");
                }
            } else if (retCode == 1) {
                if (callback) {
                    callback(-1);
                }
                log("分享失败" + retCode);
            } else if (retCode == 2) {
                if (callback) {
                    callback(-1);
                }
                log("分享失败，用户取消分享：" + retCode);
            }
        });
    } else {
        if (callback) {
            callback(0);
        }
    }

}
/**
 * 关注公众号
 */
function follow() {
    log("Global.PUIN>" + Global.PUIN);
    BK.QQ.enterPubAccountCard(Global.PUIN);
}
/**
 * 游戏事件以及生命周期
 */
function addGameEvent() {
    new BK.Game({
        //游戏启动后
        onLoad: function (app) {
            log("BK.Game.onLoad");
        },
        //进入点击最大化后
        onMaximize: function (app) {
            log("BK.Game.onMaxmize");
        },
        //进入点击最小化后
        onMinimize: function (app) {
            log("BK.Game.onMinmize");
        },
        //进入后台后响应
        onEnterBackground: function (app) {
            log("BK.Game.onEnterbackground");
        },
        //回到前台后响应
        onEnterForeground: function (app) {
            log("BK.Game.onEnterforeground");
        },
        //点击“分享游戏”后响应。（可选）
        onShare: function (app) {
            log("BK.Game.onShare");
            return getShareInfo();
        },
        //分享成功
        onShareComplete: function (app, retCode, shareDest, isFirstShare) {
            log("BK.Game.onShareComplete retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
        },
        //进入点击关闭响应
        onClose: function (app) {
            log("BK.Game.onClose");
        },
        //网络环境切换事件
        onNetworkChange: function (app, state) {
            log("BK.Game.onNetworkChange:STATE :" + state);
        },
        //全局异常监听
        onException: function () {
            log("BK.Game.onException msg:" + this.errorMessage() + " ,stack:" + this.errorStacktace());
        }
    });
}

/**
 * 成绩上报
 * @param {*} isWin 
 * @param {*} callback 
 */
function uploadScore(isWin, callback) {
    if (cc.sys.platform != cc.sys.QQ_PLAY) {
        if (callback) {
            callback(-1, "此接口只支持QQ玩一玩平台");
        }
        return;
    }
    if (!isWin) {
        isWin = 0;
    } else {
        isWin = 1;
    }
    var data = {
        userData: [{
            openId: GameStatusInfo.openId,
            startMs: Global.startGameTime.toString(),
            endMs: ((new Date()).getTime()).toString(),
            scoreInfo: {
                score: isWin,
            },
        }, ],
        attr: {
            score: {
                type: 'rank',
                order: 3,
            }
        },
    };
    BK.QQ.uploadScoreWithoutRoom(1, data, function (errCode, cmd, data) {
        log("uploadScoreWithoutRoom callback  cmd" + cmd + " errCode:" + errCode + "  data:" + JSON.stringify(data));
        if (callback) {
            callback(errCode, data);
        }
    });
}
/**
 * 拉取排行榜数据
 * @param {*} callback 
 */
function getRankList(callback) {
    if (cc.sys.platform != cc.sys.QQ_PLAY) {
        if (callback) {
            callback(-1, "此接口只支持QQ玩一玩平台");
        }
        return;
    }
    let attr = "score";
    let order = 3;
    let rankType = 0;
    BK.QQ.getRankListWithoutRoom(attr, order, rankType, function (errCode, cmd, data) {
        log("getRankListWithoutRoom callback  cmd" + cmd + " errCode:" + errCode);
        if (errCode != 0) {
            callback(errCode);
            return;
        }
        if (data) {
            let rankList = data.data.ranking_list;
            log("data not null " + rankList.length);
            log(JSON.stringify(data));
            // rankList.forEach(element => {
            //   log("....华丽的分割线....");
            //   log("score:" + element.score);
            //   log("nick:" + element.nick);
            //   log("....华丽的分割线....");
            // });
            if (callback) {
                callback(errCode, rankList);
            }
        }
    });
}


/**
 * 加载视频广告
 */
function fetchVideoAd(videoType) {
    if (!videoType) {
        videoType = 0;
    }
    log("开始加载视频广告..." + videoType);
    BK.Advertisement.fetchVideoAd(videoType, function (retCode, msg, handle) {
        log("retCode:" + retCode + " msg:" + msg);
        //返回码0表示成功 
        if (retCode == 0) {
            Global.videoHandle = handle;
            //广告监听在业务逻辑中处理
        } else {
            log("拉取视频广告失败error:" + retCode + " msg:" + msg);
        }
    }.bind(this));
    log("加载了视频广告...");
}

/**
 * 加载条幅广告
 */
function fetchBannerAd() {
    BK.Advertisement.fetchBannerAd(function (retCode, msg, bannerHandle) {
        log("retCode:" + retCode + " msg:" + msg);
        if (retCode == 0) {
            Global.bannerHandle = bannerHandle;
            bannerHandle.onClickContent(function () {
                log("用户点击了落地页");
            });
            bannerHandle.onClickClose(function () {
                log("用户点击了X关闭广告");
            });
        } else {
            log("fetchBannerAd failed. retCode:" + retCode);
        }
    }.bind(this));
}

function closeBannerAd() {
    log("关闭广告....");
    if (Global.bannerHandle) {
        Global.bannerHandle.close();
        Global.bannerHandle = undefined;
    }
}

function loadBannerAd() {
    if (cc.sys.platform == cc.sys.QQ_PLAY) {
        log("预加载Banner");
        fetchBannerAd();
    }
}

function loadVideoAd() {
    if (cc.sys.platform == cc.sys.QQ_PLAY) {
        log("预加载Video");
        fetchVideoAd();
    }
}

function getNick(callback) {
    if (cc.sys.platform == cc.sys.QQ_PLAY) {
        BK.MQQ.Account.getNick(GameStatusInfo.openId, callback);
    }
}
module.exports = {
    makeDir: makeDir, //新建文件夹
    post: post, //post请求
    get: get, //get请求
    skipGame: skipGame, //启动其他游戏
    versionCompare: versionCompare, //版本对比
    toShare: toShare, //QQ玩一玩分享
    getShareInfo: getShareInfo, //获取分享信息
    follow: follow, //关注公众号
    addGameEvent: addGameEvent, //添加游戏时间以及生命周期的回调
    log: log, //日志
    BKGet: BKGet,
    uploadScore: uploadScore,
    getRankList: getRankList,
    loadVideoAd: loadVideoAd,
    loadBannerAd: loadBannerAd,
    closeBannerAd: closeBannerAd,
    getNick: getNick,

};