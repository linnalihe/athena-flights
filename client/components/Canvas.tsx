import React, { useRef, useEffect, useState, CSSProperties } from 'react';
import { drawspacefield } from '../theme/drawspacefield';

interface CanvasProps {
  width?: number;
  height?: number;
}

const canvasStyle: CSSProperties = {
  position: 'absolute',
  zIndex: -999,
};

const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = width ? width : window.innerWidth;
    canvas.height = height ? height : window.innerHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawspacefield(canvas, ctx);
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} style={canvasStyle} />;
};

export default Canvas;
