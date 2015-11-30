## Sprite Animation 基本用法

1. 打开 Timeline 面板（Main-Menu/Panel/Timeline）
2. 选中 sheep 节点，应该可以看到 Timeline 中显示了 cc.Sprite.sprite 轨道和动画帧
3. [Timeline面板]点击播放按钮，可以预览动画播放；在刻度区域点击鼠标，可以操作动画指针显示指定关键帧位置的图像
4. [Timeline面板]点击 clip 下拉菜单，可以从 sheep_run 和 sheep_jump 中选择，并可以用上述方法预览
5. 点击编辑器的预览按钮，在浏览器中打开场景，游戏启动后会先循环播放 sheep_run，2秒钟后播放 sheep_jump
6. 查看 Sheep_Animation_1.js 文件，了解 cc.AnimationComponent.play() 接口的用法。


## Sprite Animation 创建工作流程（后续会大幅简化）

1. 新建一个节点，为其添加 Sprite 和 AnimationComponent 组件
2. 在 Asset 面板新建一个 AnimationClip，并妥善命名
3. 选中刚才的节点，在 AnimationComponent 组件里把 Animations 列表的容量设为 1 或更多
4. 将刚才新建的 AnimationClip 拖入 AnimationComponent.Animations 列表中
5. 打开 Timeline 面板，在选中刚才新建节点的情况下，确认 clip 下拉菜单里已经选中刚创建的 AnimationClip
6. [Timeline] 在 property 列表中点击 Add Property 按钮，选择添加 cc.Sprite.sprite 属性轨道
7. 从 Asset 面板中拖拽你希望在动画中显示的 Sprite 资源到 cc.Sprite.sprite 轨道，拖拽时可以指定添加该关键帧的时间轴位置。
8. [Timeline] 点击播放按钮预览帧动画