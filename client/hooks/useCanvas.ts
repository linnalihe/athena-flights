import React, { useState, useEffect, useRef } from 'react';

const useCanvas = () => {
  const canvasRef = useRef(null);
  const [coord, setCoord] = useState([]);

  useEffect(() => {
    const canvasObj: any = canvasRef.current;
    const ctx = canvasObj.getContext('2d');
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);
  });
};

export default useCanvas;
