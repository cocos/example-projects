// The Plugin Sciprt will be loaded before the engine is initialized,
// so you can modify the parameters required for engine initialization,
// such as cc.macro

if (!CC_EDITOR) {
    /**
     * !#en
     * Boolean that indicates if the WebGL context is created with `antialias` option turned on, default value is false.
     * Set it to true could make your game graphics slightly smoother, like texture hard edges when rotated.
     * Whether to use this really depend on your game design and targeted platform,
     * device with retina display usually have good detail on graphics with or without this option,
     * you probably don't want antialias if your game style is pixel art based.
     * Also, it could have great performance impact with some browser / device using software MSAA.
     * You can set it to true before `cc.game.run`.
     * Web only.
     * !#zh
     * 用于设置在创建 WebGL Context 时是否开启抗锯齿选项，默认值是 false。
     * 将这个选项设置为 true 会让你的游戏画面稍稍平滑一些，比如旋转硬边贴图时的锯齿。是否开启这个选项很大程度上取决于你的游戏和面向的平台。
     * 在大多数拥有 retina 级别屏幕的设备上用户往往无法区分这个选项带来的变化；如果你的游戏选择像素艺术风格，你也多半不会想开启这个选项。
     * 同时，在少部分使用软件级别抗锯齿算法的设备或浏览器上，这个选项会对性能产生比较大的影响。
     * 你可以在 `cc.game.run` 之前设置这个值，否则它不会生效。
     * 仅支持 Web
     * @property {Boolean} ENABLE_WEBGL_ANTIALIAS
     * @default false
     */
    cc.macro.ENABLE_WEBGL_ANTIALIAS = true;
}
