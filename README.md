# Cocos Creator 开发范例

本项目同时面向 Cocos Creator 引擎开发人员和最终用户，目的是建立一套贯穿开发、测试、学习使用的完整的功能范例。

## 项目结构

```
assets
  |--cases （范例场景和脚本存放位置）
  |    |--01_graphics （图像相关）
  |    |--02_ui（用户界面相关）
  |    |--03_gameplay（玩法相关）
  |    |--04_audio （音效效果）
  |    |--import（外部数据导入相关）
  |    |--data（用户数据处理）
  |--res（范例使用的资源）
  |   |--atlas（图集资源）
  |   |--font（字体）
  |   |--imported（外部导入资源）
  |   |--textures（贴图资源）
  |--scripts（公共脚本）
```

每一类范例里可以根据需要再次细分类别，每个范例首先要有一个场景文件，里面包括了范例功能的展示。

在范例场景所在目录下，放置所需要的脚本，外加一个和范例场景同名的`md`文件，里面是范例功能的使用说明。请参考已有的`md`文件来书写。


## 开发者要求

开发者在开发新功能时，请新建一个范例后使用范例作为功能展示和测试用途。在功能开发完成后，书写使用说明，以方便 QA 测试跟进，和最终用户及时准确的掌握用法。

场景名使用驼峰命名，文件夹名使用下划线分割。


## 范例说明索引

每篇说明文档都和范例场景同名，并且放在同一个目录下。

### 图像相关 Graphics

- [01_sprite](assets/cases/01_graphics/01_sprite)
  - [Simple Sprite](assets/resources/readme/SimpleSprite.md)
  - [Atlas Sprite](assets/resources/readme/AtlasSprite.md)
  - [Sliced Sprite](assets/resources/readme/SlicedSprite.md)
   
- [02_particle](assets/cases/01_graphics/02_particle)
  - [Toggle Particle](assets/resources/readme/ToggleParticle.md)


### 界面相关 UI

- [01_widget](assets/cases/02_ui/01_widget) 
  - [Widget Align](assets/resources/readme/WidgetAlign.md)
  - [Auto Resize](assets/resources/readme/AutoResize.md)

- [02_label](assets/cases/02_ui/02_label)
  - [System Font Label](assets/resources/readme/SystemFontLabel.md)

- [03_button](assets/cases/02_ui/03_button)
  - [Simple Button](assets/resources/readme/SimpleButton.md)

### 玩法相关 Gameplay

- [01_player_control](assets/cases/03_gameplay/01_player_control)
  - [Keyboard Input](assets/resources/readme/KeyboardInput.md)
  - [Touch Input](assets/resources/readme/TouchInput.md)

- [02_actions](assets/cases/03_gameplay/02_actions)
  - [Simple Action](assets/resources/readme/SimpleAction.md)

- [03_animation](assets/cases/03_gameplay/03_animation)
  - [Sprite Animation](assets/resources/readme/SpriteAnimation.md)

### 音效相关 Audio

- [Simple Audio](assets/resources/readme/SimpleAudio.md)



