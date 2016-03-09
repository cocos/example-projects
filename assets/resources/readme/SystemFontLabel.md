## Label Overflow 文字排版模式使用说明

本示例中包括三种排版模式，下面将详细说明每种排版模式的用法

### Clamp（截断），无换行

1. 点击选中 "NO_Warp\CLAMP\Label" 节点，可以看到 Overflow 属性设为 CLAMP，Enable Wrap Text 属性关闭
2. 修改节点的 size，可以看到不管如何设置 size，文字大小保持不变，在 bounding box 以外的文字会被截断，不会出现换行情况

### Clamp（截断），换行

1. 点击选中 "Warp\CLAMP\Label" 节点，可以看到 Overflow 属性设为 CLAMP，Enable Wrap Text 属性开启
2. 修改节点 size 中的宽度，可以看到当宽度不足以显示整行文字时，会先将英文单词换置下一行
3. 输入中文的情况下，会以字为单位换行
4. 换行后如果高度不足以显示多行，会直接截断下面的文字行

### Shrink（自动缩小），无换行

1. 点击选中 "NO_Warp\SHRINK\Label" 节点，可以看到 Overflow 属性设为 SHRINK，Enable Wrap Text 属性关闭
2. 修改节点 size 中的宽度，可以看到当宽度不足以显示整行文字时，会将文字缩小以适应宽度
3. 修改 Font Size 属性，使用较小的值。可以看到文字可以自由缩小到希望的数值，但增大 Font Size 时不能超过宽度允许的限度

### Shrink（自动缩小），换行

1. 点击选中 "Warp\SHRINK\Label" 节点，可以看到 Overflow 属性设为 SHRINK，Enable Wrap Text 属性开启
2. 修改节点 size 中的宽度，可以看到当宽度不足以显示整行文字时，会优先将文字换行
3. 换行后仍然没有足够宽度或高度显示文字时，会自动缩小文字以显示全部内容

### RESIZE_HEIGHT（自动修改节点 size 适应文字内容），换行

1. 点击选中 "RESIZE_HEIGHT" 节点，可以看到 Overflow 属性设为 RESIZE_HEIGHT，Enable Wrap Text 属性开启
2. 在 String 属性中输入更多文字内容，可以看到该节点 size 的高度自动随着文本内容增多而增加
3. 修改节点 size 中的宽度，可以看到节点的高度会自动更改以匹配刚设置的新宽度，文字的显示尺寸不会受到影响
4. 目前 Resize 模式必须配合 Enable Wrap Text 开启才能使用