## 交叉引用示例

1. 资源管理器中有两个脚本 Foo 和 Bar，Foo 引用 Bar，Bar 引用 Foo。
2. 场景中有两个节点，分别添加组件 Foo 和 Bar。
3. 将 Bar 赋给 Foo.refToBar，将 Foo 赋给 Bar.refToFoo。

## 测试说明

1. 运行场景，显示："Foo has reference to Bar" 和 "Bar has reference to Foo"。
