// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

interface AniBase {
    attr?:string;
    stay:number;
    duration: number;
}

interface AniRange extends AniBase{
    from: number;
    to: number;
    step: number;
}
interface AniEnum extends AniBase{
    values: any[];
    callback?:(v)=>void|any;
}
interface AniCallback extends AniBase{
    update: (p: number, f, t) => any|void;
    before?: (f, t) => any|void;
    after?: (f, t) => any|void;
    from:any;
    to: any;
    interval: number;
    _time?:number;
}

interface LabelAttrAnimation<T> {
    loop: boolean;
    list: (AniRange | AniEnum | AniCallback)[];
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label_size: cc.Label = null;

    @property(cc.Label)
    label_color: cc.Label = null;

    @property(cc.Label)
    label_align: cc.Label = null;

    @property(cc.Label)
    label_lineheight: cc.Label = null;

    @property(cc.Label)
    label_effects: cc.Label = null;

    @property(cc.Label)
    label_overflow: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}



    schedule_attributes<T>(label: cc.Label, ani: LabelAttrAnimation<T>, idx?: number) {

        if (typeof idx === "undefined") {
            idx = 0;
        }

        if (!!!ani.list[idx]) {
            return;
        }

        let cfg = ani.list[idx];
        if ("step" in cfg) {
            let array = [];
            for (let v = cfg.from; v < cfg.to; v += cfg.step) {
                let delay = cfg.duration * (v - cfg.from) / (cfg.to - cfg.from);
                this.scheduleOnce(() => {
                    if(cfg.attr) {
                        label[cfg.attr] = v;
                    }
                }, delay)
            }
            let lastValue = cfg.to;
            this.scheduleOnce(() => {
                if(cfg.attr) {
                    label[cfg.attr] = lastValue;
                }
            }, cfg.duration);

            this.scheduleOnce(() => {
                if (ani.loop) {
                    idx = (idx + 1) % ani.list.length;
                } else {
                    idx += 1;
                }
                this.schedule_attributes(label, ani, idx);
            }, cfg.duration + cfg.step)
        } else if ("values" in cfg) {
            let step = cfg.duration / cfg.values.length;
            let vs = cfg.values;
            let cb = cfg.callback;
            for (let i = 0; i < cfg.values.length; i++) {
                this.scheduleOnce(() => {
                    if(cfg.attr){
                        label[cfg.attr] = vs[i];
                    }
                    if(cb) cb(vs[i]);
                }, i * step);
            }
            this.scheduleOnce(() => {
                if(cfg.attr)
                    label[cfg.attr] = vs[vs.length - 1];
                if(cb)
                    cb(vs[vs.length -1]);
            }, cfg.duration);

            this.scheduleOnce(() => {
                if (ani.loop) {
                    idx = (idx + 1) % ani.list.length;
                } else {
                    idx += 1;
                }
                this.schedule_attributes(label, ani, idx);
            }, cfg.duration + cfg.stay);
        } else if ("update" in cfg) {

            if(cfg._time == undefined && cfg.before) {
                let ret = cfg.before(cfg.from, cfg.to);
                if(ret!=undefined && cfg.attr) {
                    label[cfg.attr] = ret;
                }
                cfg._time = 1;
            }

            let times = Math.floor(cfg.duration / cfg.interval);
            let i = 0;
            let updatecb = cfg.update;
            let from = cfg.from;
            let to = cfg.to;
            let after = cfg.after;
            this.schedule(() => {
                let ret = updatecb(i / times, from, to);
                if(ret != undefined && cfg.attr)
                    label[cfg.attr] = ret;
                i+=1;
                if(i >= times) {
                    if(after) after(from, to);
                    delete (cfg as any)._time;
                }
            }, cfg.interval, times , 0);
            this.scheduleOnce(() => {
                if (ani.loop) {
                    idx = (idx + 1) % ani.list.length;
                } else {
                    idx += 1;
                }
                this.schedule_attributes(label, ani, idx);
            }, cfg.duration + cfg.stay);
        }
    }

    start() {
        this.setup_fontsize();
        this.setup_font_color();
        this.setup_label_align();
        this.setup_line_height();
        this.setup_label_decoration();
        this.setup_label_overflow();
    }

    setup_fontsize() {
        let label = "Update FontSize/Anchor";
        this.label_size.string = label;
        let label_size = this.label_size;
        this.schedule_attributes(this.label_size, {
            loop: true,
            list: [
            {
                attr: "fontSize",
                values: [25, 10, 30, 22],
                duration: 3,
                stay: 1
            }, 
            {
                from: new cc.Vec2(0, 0),
                to: new cc.Vec2(1, 1),
                update: (p, f, t) => {
                    let x = f.x * (1 - p) + p * t.y;
                    let y = f.y * (1 - p) + p * t.y;
                    label_size.node.setAnchorPoint(x, y);
                    label_size.string = "Update Node Anchor: " +x.toFixed(2) +", "+y.toFixed(2);
                },
                duration: 3,
                stay: 1,
                interval: 0.2,
                before :(f, t)=> {
                    label_size.string = "Update Node Anchor";
                },
                after: (f, t)=>{
                    label_size.string = label;
                    label_size.node.setAnchorPoint(0.5, 0.5);
                }
            }]
        });
    }

    setup_font_color() {
        let label = "Update Font Color";
        this.label_color.string = label;
        let label_color = this.label_color;
        let old_color = label_color.node.color;
        this.schedule_attributes(this.label_color, {
            loop: true,
            list: [{
                from: new cc.Color(255, 0, 0),
                to: new cc.Color(255, 255, 0),
                update: (p, f, t) => {
                    let r = f.getR() * (1 - p) + p * t.getR();
                    let g = f.getG() * (1 - p) + p * t.getG();
                    let b = f.getB() * (1 - p) + p * t.getB();
                    let c= new cc.Color(r, g, b);
                    label_color.node.color = c;
                },
                duration: 3,
                stay: 1,
                interval: 0.1,
                before :(f, t)=> {
                    label_color.string = "Update Node Color";
                    label_color.node.color = old_color;
                    label_color.node.opacity = 255;
                },
                after: (f, t)=>{
                    label_color.node.color= old_color;
                }
            }, {
                from: 0,
                to: 255,
                update: (p, f, t) => {
                    label_color.node.opacity = (1-p) * f + t * p;
                },
                duration: 3,
                stay: 1,
                interval: 0.1,
                before :(f, t)=> {
                    label_color.string = "Update Node Alpha";
                    label_color.node.opacity = 255;
                },
                after: (f, t)=>{
                    label_color.node.opacity = 255;
                }
            } 

        ]
        });
    }

    setup_label_align() {

        let label = "Update Label \nParamaters\nLines";
        this.label_align.string = label;
        let label_align = this.label_align;

        this.schedule_attributes(label_align, {
            loop:true, 
            list: [
                {
                    attr: "horizontalAlign",
                    values:[0,1,2],
                    duration: 3,
                    stay: 1
                },
                {
                    attr: "verticalAlign",
                    values: [0,1,2],
                    duration: 3,
                    stay: 1
                }
            ]
        })
    }

    setup_line_height() {

        let label = "Update Label \Line Height\nSpaceing x";
        this.label_lineheight.string = label;
        let label_lineheight = this.label_lineheight;

        this.schedule_attributes(label_lineheight, {
            loop:true, 
            list: [
                {
                    attr: "lineHeight",
                    values:[10,20,30],
                    duration: 3,
                    stay: 1
                },
                {
                    attr: "spacingX",
                    from: 0,
                    to: 10, 
                    update: (p, f, t) =>{
                        return (1 - p) * f + p * t;
                    },
                    duration: 3,
                    stay: 1,
                    interval: 0.1,
                    after: function() {
                        label_lineheight.spacingX = 0;
                    } 
                }
            ]
        });
    }

    setup_label_decoration() {
        let label = "Update Label \LDecoration";
        this.label_effects.string = label;
        let label_effects = this.label_effects;
        label_effects.fontSize = 20;
        label_effects.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        let values =[];
        for(let i = 0; i<= (1 << 2); i++) {
            values.push(
                {
                    enableItalic : ((i>>0) & 0x1) == 1,
                    enableUnderline : ((i>>1) & 0x1) == 1,
                   // enableBold : ((i >> 2) & 0x1) == 1,
                }
            )
        }

        this.schedule_attributes(label_effects, {
            loop:true, 
            list: [
                {
                    values:values,
                    duration: 8,
                    stay: 1,
                    callback: (value) =>{
                       // label_effects.enableItalic = value.enableBold;
                        label_effects.enableBold = value.enableBold;
                        label_effects.enableUnderline = value.enableUnderline;
                        let tex = [];
                        for(let k in value) {
                            tex.push(`${k}: ${value[k]}`);
                        }
                        label_effects.string = tex.join("\n");
                    }
                },
            ]
        });
    }


    setup_label_overflow() {
        let label = "Update Label \nOverFlow\nLong Line Text\n";
        this.label_overflow.string = label;
        let label_overflow = this.label_overflow;
        label_overflow.fontSize = 40;
        let values = [
            cc.Label.Overflow.NONE,
            cc.Label.Overflow.CLAMP,
            cc.Label.Overflow.RESIZE_HEIGHT,
            cc.Label.Overflow.SHRINK
        ]
        this.schedule_attributes(label_overflow, {
            loop:true, 
            list: [
                {
                    attr:"overflow",
                    values:values,
                    duration: 4,
                    stay: 1,
                    callback: (v) =>{
                        label_overflow.string = label + v;
                    }
                },
            ]
        });
    }
    // update (dt) {}
}
