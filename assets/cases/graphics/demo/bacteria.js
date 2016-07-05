let isMobileBrowser = cc.sys.platform === cc.sys.MOBILE_BROWSER;

function Particle() {
    this.x = this.y = 0;
    this.vx = this.vy = 0;
    this.scale = 1;
}

function Line(color, id, polars) {
    this.pts = [];
    this.color = color;
    this.segment = 15 + Math.random() * 15;
    this.nPts = 15 + Math.floor(Math.random() * 10);

    this.id = id;
    this.polars = polars;
    // this.ratio = 0.5 + Math.random() * 0.5;
    this.ratio = Math.random();

    for (let i = 0; i < this.nPts; i++) {
      let p = new Particle();
      p.x = 2 * i*(Math.random() * 2 - 1) * this.nPts * this.segment;
      p.y = 2 * i*(Math.random() * 2 - 1) * this.nPts * this.segment;
      this.pts[i] = p;
    }

    this.pts[0].x = 0; this.pts[0].y = 0;
    this.pts[1].x = 100; this.pts[1].y = 100;
    this.pts[2].x = 200; this.pts[2].y = 0;
    this.pts[3].x = 100; this.pts[3].y = -100;

    this.pSpeed = 0.1;
    this.friction = 0.99;
    this.width = Math.pow(Math.random(), 2) * 1.5 + 0.4;

    this.update();
}

Line.prototype = {

    update : function() {
      let p = this.pts[0];
      let r = this.polars[this.id];
      let a = this.polars[this.id + 1];
      p.x = this.ratio * r * Math.cos(a);
      p.y = this.ratio * r * Math.sin(a);

      for (let i = 1; i < this.nPts; i++) {
        p = this.pts[i];
        p.vx += this.pSpeed * (2 * Math.random() - 1);
        p.vy += this.pSpeed * (2 * Math.random() - 1);
        p.vx += 0.000025 * p.x;
        p.vy += 0.000025 * p.y;
        p.vx *= this.friction;
        p.vy *= this.friction;
        p.x += p.vx;
        p.y += p.vy;

        let p2 = this.pts[i - 1];
        let dx = p2.x - p.x;
        let dy = p2.y - p.y;
        let d = dx * dx + dy * dy;
        //if(d < this.segment * this.segment) continue;
        let r = this.segment / Math.sqrt(d);
        p.x = p2.x - r * dx;
        p.y = p2.y - r * dy;
      }
    },

    draw : function(g) {
      g.lineWidth = this.width;
      g.strokeColor = this.color;

      let p = this.pts[0];
      g.moveTo(p.x, p.y);
      for (let i = 1; i < this.nPts - 1; i++) {
        p = this.pts[i];
        let p2 = this.pts[i + 1];
        g.quadraticCurveTo(p.x, p.y, 0.5 * (p.x + p2.x), 0.5 * (p.y + p2.y));
      }

      g.stroke();
    }
};



cc.Class({
    extends: cc.Component,
    
    properties: {
        particleGraphics: {
            default: null,
            type: cc.Graphics
        },
        
        bacteriaGraphics: {
            default: null,
            type: cc.Graphics
        },

        mask: {
            default: null,
            type: cc.Mask
        }
    },

    onLoad: function () {
        if (cc.director.setClearColor) {
            cc.director.setClearColor( cc.Color.WHITE );
        }
        
        this.stencil = new _ccsg.GraphicsNode();
        this.mask._refreshStencil = function () {};
        this.mask.enabled = true;
        this.mask._sgNode.setStencil(this.stencil);

        let nCoords = 200;
        let step = 2 * Math.PI / nCoords;

        let radius = 150;
        let coords = [];
        let polars = [];

        let particlesFriction = 0.99;
        let particlesSpeed = 0.05;
        let particles = [];
        let nParticles = 20;
        let radiusBoundaryForce = 0.00002;
        let separation = 0.0001;

        let particleBg1 = cc.hexToColor( '#ebebeb' );//rgba(0, 0, 0, 20)';
        let particleBg2 = cc.hexToColor( '#333' );//'rgba(0, 0, 0, 204)';
        let particleBg3 = cc.hexToColor( '#f4f4f4' );//'rgba(255, 255, 255, 240)';

        let microParticlesColor = cc.Color.BLACK;


        let lineColor = cc.Color.BLACK;

        for (let i = 0; i < nParticles; i++) {
            let p = new Particle();
            p.size = 40 * Math.pow(i/nParticles, 4) + 5;
            let a = Math.random() * 2 * Math.PI;
            let r = Math.random() * radius;
            p.x = r * Math.cos(a);
            p.y = r * Math.sin(a);

            particles[i] = p;
        }

        let nMicroParticles = 350;
        let microParticles = [];
        for (let i = 0; i < nMicroParticles; i++) {
            let p = new Particle();
            p.x = (Math.random() * 2 - 1) * radius;
            p.y = (Math.random() * 2 - 1) * radius;
            microParticles[i] = p;
        }

        this.time = 0;

        this.generateCoords = function () {
            //x, y
            let s = 0.6;
            for(let i = 0; i < nCoords; i++) {
              let ang = i * step;
              ang += 0.1 * Math.cos(0.01 * this.time + ang);
              ang += 0.25 * Math.cos(0.05 * this.time + ang);
              let r = radius;
              r += s * 15 * Math.cos(5 * ang + 0.1 * this.time);
              r -= s * 15 * Math.cos(2 * ang - 0.1 * this.time);
              r += s * 10 * Math.sin(5 * ang + 0.02 * this.time);
              r -= s * 15 * Math.sin(2 * ang - 0.01 * this.time);
              r += s * 10 * Math.cos(2 * ang + 0.01 * this.time) * Math.sin(5 * ang + 0.1 * this.time);
              r += s * 10 * Math.sin(5 * ang - 0.1 * this.time) * Math.sin(ang + 0.1 * this.time);

              coords[2 * i] = r * Math.cos(ang);
              coords[2 * i + 1] = r * Math.sin(ang);
              polars[2 * i] = r;
              polars[2 * i + 1] = ang;
            }
        }

        this.generateCoords();

        // init lines
        let lines = [];
        let nLines = 10;
        for (let i = 0; i < nLines; i++) {
            let id = 2 * Math.floor(nCoords * Math.random());
            let l = new Line(lineColor, id, polars);
            lines[i] = l;
        }

        this.drawOutline = function (g) {
            g.moveTo(coords[0], coords[1]);
            for(let i = 1; i < nCoords; i++) {
              g.lineTo(coords[2 * i], coords[2 * i + 1]);
            }
            g.lineTo(coords[0], coords[1]);
            g.stroke();
        }

        this.drawHair = function (g) {
            g.fillColor = cc.Color.BLACK;
            g.strokeColor = cc.Color.BLACK;
            g.lineWidth = 1;

            for(let i = 0; i < nCoords; i++) {
              if(!(i % 5)) continue;

              let curr = 2 * i;
              let posX = coords[curr];
              let posY = coords[curr + 1];
              let prev = 2 * (i ? i - 1 : nCoords - 1);
              let next = 2 * (i === nCoords - 1 ? 0 : i + 1);
              let dx1 = posX - coords[prev];
              let dy1 = posY - coords[prev + 1];
              let d1 = 1 / Math.sqrt(dx1 * dx1 + dy1 * dy1);
              dx1 *= d1;
              dy1 *= d1;

              let dx2 = posX - coords[next];
              let dy2 = posY - coords[next + 1];
              let d2 = 1 / Math.sqrt(dx2 * dx2 + dy2 * dy2);
              dx2 *= d2;
              dy2 *= d2;

              let scale = i % 3 ? 0.5 : 1.2;
              let sign = dx1 * dy2 - dx2 * dy1 > 0 ? -1 : 1;
              let dx = 0.5 * (dx1 + dx2);
              let dy = 0.5 * (dy1 + dy2);
              let length = 7 + 7 * (Math.cos(5 * i * step + 0.01 * Math.cos(this.time)) + 2);
              let d = scale * sign * length / Math.sqrt(dx * dx + dy * dy);
              dx *= d;
              dy *= d;

              g.moveTo(posX, posY);
              let a = 0.2 * this.time + 0.3 * i;
              let cpx = posX + 0.5 * dx + 0.5 * dx * (Math.cos(a));
              let cpy = posY + 0.5 * dy + 0.5 * dy * (Math.sin(a));

              g.quadraticCurveTo(cpx, cpy, posX + dx, posY + dy);
              g.stroke();

              if(!(i % 3)) g.fillRect(posX + dx - 1.5, posY + dy - 1.5, 3, 3);
            }
        }

        this.updateLines = function (g) {
            for (let i = 0; i < nLines; i++) {
              let l = lines[i];
              l.update();
              l.draw(g);
            }
        }

        this.updateParticles = function () {
            for (let i = 0; i < nParticles; i++) {
              let p = particles[i];
              p.vx += particlesSpeed * (Math.random() * 2 - 1);
              p.vy += particlesSpeed * (Math.random() * 2 - 1);
              p.vx -= radiusBoundaryForce * p.x;
              p.vy -= radiusBoundaryForce * p.y;

              for(let j = i + 1; j < nParticles; j++)
              {
                let p2 = particles[j];
                let dx = p2.x - p.x;
                let dy = p2.y - p.y;
                let r = p.size + p2.size;
                let d = dx * dx + dy * dy;
                if(d < r * r)
                {
                  p.vx -= separation * dx;
                  p.vy -= separation * dy;
                  p2.vx += separation * dx;
                  p2.vy += separation * dy;
                }
              }
              p.vx *= particlesFriction;
              p.vy *= particlesFriction;
              p.x += p.vx;
              p.y += p.vy;
            }

            for (let i = 0; i < nMicroParticles; i++) {
              let p = microParticles[i];
              p.vx -= 0.00002 * p.x;
              p.vy -= 0.00002 * p.y;
              p.vx = 0.99 * p.vx + 0.1 * (Math.random() * 2 - 1);
              p.vy = 0.99 * p.vy + 0.1 * (Math.random() * 2 - 1);
              p.x += p.vx;
              p.y += p.vy;
            }
        }


        this.drawParticles = function (out) {
            drawParticlesLayer(out, 20, particleBg1);

            out.fillColor = microParticlesColor;
            let w = cc.sys.isNative ? 2 : 1;
            for(let i = 0; i < nMicroParticles; i++) {
              let p = microParticles[i];
              out.fillRect(p.x, p.y, w, w);
            }

            drawParticlesLayer(out, cc.sys.isNative ? 1 : 0.5, particleBg2);
            drawParticlesLayer(out, 0, particleBg3);
        }

        function drawParticlesLayer(out, margin, color) {
            out.fillColor = color;
            for (let i = 0; i < nParticles; i++) {
                let p = particles[i];
                out.moveTo(p.x + p.size + margin, p.y);
                out.circle(p.x, p.y, p.size + margin);
            }
            out.fill();
        }
    },

    update: function (dt) {
        let g = this.bacteriaGraphics;
        let s = this.stencil;
        let pg = this.particleGraphics;
        g.clear();
        pg.clear();
        s.clear();

        this.generateCoords();

        s.strokeColor = cc.Color.WHITE;
        this.drawOutline(s);
        s.fillColor = cc.Color.WHITE;//cellBg;
        s.fill();

        this.updateParticles();
        this.drawParticles(pg);

        this.drawHair(g);

        g.strokeColor = cc.Color.BLACK;
        g.lineWidth = 15;
        this.drawOutline(g);
        g.strokeColor = cc.Color.WHITE;
        g.lineWidth = 13;
        this.drawOutline(g);
        g.strokeColor = cc.Color.BLACK;
        g.lineWidth = 10;
        this.drawOutline(g);
        g.strokeColor = cc.Color.WHITE;
        g.lineWidth = 8;
        this.drawOutline(g);    

        this.updateLines(g);

        this.time += dt * 20;
    },
});
