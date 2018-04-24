## SequenceAction 使用说明

1. 场景内 YellowMonster 通过脚本 SequenceAction 控制，默认实现 4 次上下移动。
2. ElapseTime 会用于显示最终执行所有动作的消耗时间，最终误差在 0.05s 以内，ElapseTime 显示为绿色，表示为可接受误差范围。若出现较大误差，最终 ElapseTime 显示为红色字样，表示超出误差范围。