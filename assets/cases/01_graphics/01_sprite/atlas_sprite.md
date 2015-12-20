## 图集 Sprite 使用说明

1. 场景中显示两个绵羊 Sprite。名为 Sprite_From_Atlas 的绵羊图像来自图集中的资源
2. 选中`Canvas/Sprite_From_Atlas`，在属性检查器中的Sprite组件的Sprite属性可以看到引用的资源是 `res/atlas/sheep` 这个 atlas 下的某个 SpriteFrame。
3. 拖拽另一个 `res/atlas/sheep` 下的 SpriteFrame 到 Sprite 属性中，可以看到绵羊的图像发生变化。

## 补充说明

图集文件可以通过 TexturePacker 等图集工具生成。