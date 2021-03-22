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
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = width ? width : canvas.width;
    canvas.height = height ? height : canvas.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawspacefield(canvas, ctx);
    }
    return;
  }, [canvasRef, windowDimension.width, windowDimension.height]);

  useEffect(() => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight - 56,
    });
  }, [windowDimension.width, windowDimension.height]);

  return (
    <canvas
      ref={canvasRef}
      style={canvasStyle}
      width={windowDimension.width}
      height={windowDimension.height}
    />
  );
};

export default Canvas;
