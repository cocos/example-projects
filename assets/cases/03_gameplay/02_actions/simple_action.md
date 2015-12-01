## Action 使用说明

点击 Play 按钮预览游戏，可以看到小怪物跳起又落下的动作。
目前 Action 只能通过脚本使用，以后的版本会加入组件化和数据化的 action 支持。

SimpleAction.js 脚本中大部分都是使用了原来的 cocos2d-js action 接口，唯一需要注意的是在运行 action 时目前必须使用：

myNode._sgNode.runAction(action);

后续版本中会支持正常的写法：

myNode.runAction(action);
