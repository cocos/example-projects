## Audio 和 AudioClip 使用说明

点击 Play 按钮预览游戏，可以听到循环播放的背景音乐，并在开始后第一和第二秒听到特殊音效。

### Audio 组件

1. 选中 AudioSource_music 节点，在 Audio 组件里找到 clip 属性，点击其中引用的资源
2. 在 Asset 面板里刚才引用的资源会高亮显示，这个资源就是一个 AudioClip
3. Audio 组件通过引用 AudioClip 资源，可以实现声音资源和音源节点的一对一播放
4. 通过 Loop 和 PlayOnLoad 属性，控制是否循环播放 clip，以及是否在游戏运行时自动开始播放

### 通过脚本播放 AudioClip

1. 点击选中 AudioControl 节点，关注由同名脚本制作的 AudioControl 组件
2. 该脚本会使用 Audio.play() 接口在运行时自动开始播放 AudioSource_music 里的音乐
3. 除此之外，该组件还引用了另外两个 AudioClip，并通过 cc.audioEngine.playEffect 接口播放
