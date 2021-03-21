import React, { useRef, useState, useEffect } from 'react';
import { vec3 } from 'gl-matrix';

export const Spacefield = () => {
  const canvasRef = useRef(null);
  let canvasObj;
  let ctx;

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      canvasObj = canvasRef.current;
      canvasObj.width = window.innerWidth;
      canvasObj.height = window.innerHeight;
      ctx = canvasObj.getContext('2d');
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvasObj.width, canvasObj.height);

      var flr = Math.floor;

      canvasObj.width = canvasObj.offsetWidth;
      canvasObj.height = canvasObj.offsetHeight;

      var halfw = canvasObj.width / 2,
        halfh = canvasObj.height / 2,
        step = 2,
        warpZ = 12,
        speed = 0.075;

      var ctx = canvasObj.getContext('2d');

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvasObj.width, canvasObj.height);

      function rnd(num1, num2) {
        return flr(Math.random() * num2 * 2) + num1;
      }

      function getColor() {
        return 'hsla(200,100%, ' + rnd(50, 100) + '%, 1)';
      }

      var star = function () {
        var v = vec3.fromValues(
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

        var vel = this.calcVel();

        this.draw = function () {
          vel = this.calcVel();
          v = vec3.add(vec3.create(), v, vel);
          var x = v[0] / v[2];
          var y = v[1] / v[2];
          var x2 = v[0] / (v[2] + speed * 0.5);
          var y2 = v[1] / (v[2] + speed * 0.5);

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

      var starfield = function () {
        var numOfStars = 250;

        var stars = [];

        function _init() {
          for (var i = 0, len = numOfStars; i < len; i++) {
            stars.push(new star());
          }
        }

        _init();

        this.draw = function () {
          ctx.translate(halfw, halfh);

          for (var i = 0, len = stars.length; i < len; i++) {
            var currentStar = stars[i];

            currentStar.draw();
          }
        };
      };

      var mStarField = new starfield();

      function draw() {
        // make 5 seconds
        var millSeconds = 1000 * 10;

        var currentTime = new Date();

        speed = 0.025;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(0, 0, canvasObj.width, canvasObj.height);

        mStarField.draw();

        window.requestAnimationFrame(draw);
      }

      draw();
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Spacefield;
