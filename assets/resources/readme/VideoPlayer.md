## VideoPlayer（视频组件）使用说明

1. 【Play】-- 播放视频
2. 【Pause】-- 暂停视频
3. 【Stop】-- 停止视频并且把视频当前时间初始为 0
4. 【Switch local video】-- 切换本地视频资源
5. 【Switch remote video】-- 切换远程视频资源
6. 【Visibility】-- 隐藏或显示视频
7. 【Toggle_Fullscreen】-- 是否全屏播放视频
8. 【Keep_Ratio_Switch】-- 是否保持视频原来的宽高比（PC Web 端不支持）

[Current Time] -- 表示当前时间 + 总时间
[Status] -- 表示视频组件当前的状态（PLAYING、PAUSED、STOPPED、COMPLETED、META_LOADED、CLICKED、READY_TO_PLAY）

注意事项：

    [android] qq 浏览器与微信浏览器的表现：点击播放会单独出现一个播放视频的全屏界面（这个不是 bug 是 x5 内核浏览器特有的限制）

    [ios] 全屏播放它限制与手机自身的朝向来决定的，如果手机设置竖屏，那怕项目显示的横屏也会变成竖屏播放（这个不是 bug）



