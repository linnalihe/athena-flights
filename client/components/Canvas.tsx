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

  const handleResize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = width ? width : windowDimension.width;
    canvas.height = height ? height : windowDimension.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return drawspacefield(canvas, ctx);
    }
  }, [canvasRef, windowDimension]);

  useEffect(() => {
    if (window && windowDimension.width === 0) {
      handleResize();
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  return <canvas ref={canvasRef} style={canvasStyle} />;
};

export default Canvas;
