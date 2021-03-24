import { vec3 } from 'gl-matrix';

interface CanvasInput {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export const drawspacefield: CanvasInput = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  let drawFlag: boolean = true;

  let halfw: number = canvas.width / 2;
  let halfh: number = canvas.height / 2;
  let warpZ: number = 12;
  let speed: number = 0.075;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  function rnd(num1: number, num2: number) {
    return Math.floor(Math.random() * num2 * 2) + num1;
  }

  function getColor() {
    return 'hsla(200,100%, ' + rnd(50, 100) + '%, 1)';
  }

  let star = function () {
    let v = vec3.fromValues(
      rnd(0 - halfw, halfw),
      rnd(0 - halfh, halfh),
      rnd(1, warpZ)
    );
    this.x = v[0];
    this.y = v[1];
    this.z = v[2];
    this.color = getColor();

    this.reset = function () {
      v = vec3.fromValues(
        rnd(0 - halfw, halfw),
        rnd(0 - halfh, halfh),
        rnd(1, warpZ)
      );

      this.x = v[0];
      this.y = v[1];
      this.color = getColor();
      vel = this.calcVel();
    };

    this.calcVel = function () {
      return vec3.fromValues(0, 0, 0 - speed);
    };

    let vel = this.calcVel();

    this.draw = function () {
      vel = this.calcVel();
      v = vec3.add(vec3.create(), v, vel);
      let x = v[0] / v[2];
      let y = v[1] / v[2];
      let x2 = v[0] / (v[2] + speed * 0.5);
      let y2 = v[1] / (v[2] + speed * 0.5);

      ctx.strokeStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      if (x < 0 - halfw || x > halfw || y < 0 - halfh || y > halfh) {
        this.reset();
      }
    };
  };

  let starfield = function () {
    let numOfStars = 250;

    let stars = [];

    function _init() {
      for (let i = 0, len = numOfStars; i < len; i++) {
        stars.push(new star());
      }
    }

    _init();

    this.draw = function () {
      ctx.translate(halfw, halfh);

      for (let i = 0, len = stars.length; i < len; i++) {
        let currentStar = stars[i];

        currentStar.draw();
      }
    };
  };

  let mStarField = new starfield();

  function setDrawFlag() {
    drawFlag = false;
  }

  function draw() {
    speed = 0.025;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    mStarField.draw();

    if (drawFlag) {
      window.requestAnimationFrame(draw);
    }
  }
  draw();

  return setDrawFlag;
};
