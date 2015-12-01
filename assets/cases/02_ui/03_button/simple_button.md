## Button 使用说明

场景中应该显示一左一右两个按钮。点击 play 按钮预览游戏，按钮会有如下行为：

- 移动鼠标到左边按钮上时，按钮图案变成问号
- 按下左边按钮时，按钮图案变成惊叹号，同时上方有文字显示"Left Button Clicked"
- 移动鼠标到右边按钮上时，按钮颜色加深
- 按下右边按钮时，按钮颜色变得更深，同时上方文字显示"Right Button Clicked"

### 贴图切换

1. 选中 Button_Switch_Sprite 节点，关注 Button 组件
2. Target 属性规定了 Button 状态变化时，应该更新哪个对象的图像
3. Interactable 规定了 Button 是否可以交互
4. Transition 属性里选择 SPRITE，就是状态改变时切换 Sprite 图像显示的模式
5. Normal/Pressed/Hover/Disabled 属性分别指定在相应状态下显示的 Sprite 图像资源
6. Click Events 里可以指定按钮按下后的事件处理方法

### 颜色变化

1. 选中 Button_Switch_Color 节点，关注 Button 组件
2. Transition 属性里选择 COLOR，就是状态改变时过渡 Sprite 颜色显示的模式
3. Normal/Pressed/Hover/Disabled 属性分别指定在相应状态下 Sprite 的颜色
4. Duration 属性指定颜色过渡的时长

### 添加点击事件处理

1. 选中 Button_Switch_Sprite，关注 Button 组件
2. 在 Click Events 列表里，添加一个新的点击事件
3. 将事件监听脚本所在节点拖拽到该事件的 Target 属性上
4. 在 Component 属性列表中选择事件监听脚本所属的组件
5. 在 Handler 属性列表中选择事件发生时调用的方法