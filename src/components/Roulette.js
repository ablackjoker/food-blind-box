import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Roulette.css';

const colors = [
  '#c94f3d',
  '#2d7f75',
  '#e1a638',
  '#476a9f',
  '#7a5aa6',
  '#d46f3a',
  '#37895d',
  '#a63f67',
  '#3f7d9d',
  '#b78b2d'
];

const Roulette = ({ items, isSpinning, onSpinComplete }) => {
  const canvasRef = useRef(null);
  const itemsRef = useRef(items);
  const rotationRef = useRef(0);
  const onSpinCompleteRef = useRef(onSpinComplete);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    onSpinCompleteRef.current = onSpinComplete;
  }, [onSpinComplete]);

  const drawRoulette = useCallback(() => {
    const entries = items;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 12;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (entries.length === 0) return;

    const anglePerSlice = (2 * Math.PI) / entries.length;

    entries.forEach((item, index) => {
      const startAngle = index * anglePerSlice + rotation;
      const endAngle = startAngle + anglePerSlice;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSlice / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = '700 15px "Microsoft YaHei", "PingFang SC", Arial, sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 4;

      const text = item.place_name || item.name;
      const maxLength = 7;
      const displayText = text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

      ctx.fillText(displayText, radius * 0.62, 5);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, 36, 0, 2 * Math.PI);
    ctx.fillStyle = '#241d18';
    ctx.fill();
    ctx.strokeStyle = '#fff8ee';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#fff8ee';
    ctx.font = '800 14px "Microsoft YaHei", "PingFang SC", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('开盒', centerX, centerY);

    ctx.beginPath();
    ctx.moveTo(centerX, 8);
    ctx.lineTo(centerX - 18, 44);
    ctx.lineTo(centerX + 18, 44);
    ctx.closePath();
    ctx.fillStyle = '#f0c44c';
    ctx.fill();
    ctx.strokeStyle = '#fff8ee';
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [items, rotation]);

  useEffect(() => {
    drawRoulette();
  }, [drawRoulette]);

  useEffect(() => {
    if (!isSpinning) return undefined;

    const currentItems = itemsRef.current;
    if (currentItems.length === 0) return undefined;

    let animationFrameId;
    const randomSpins = 5 + Math.random() * 3;
    const randomAngle = Math.random() * 2 * Math.PI;
    const totalRotation = randomSpins * 2 * Math.PI + randomAngle;
    const duration = 3800;
    const startTime = performance.now();
    const startRotation = rotationRef.current;

    const animate = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + totalRotation * easeOut;

      rotationRef.current = currentRotation;
      setRotation(currentRotation);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        const normalizedRotation = currentRotation % (2 * Math.PI);
        const anglePerSlice = (2 * Math.PI) / currentItems.length;
        let pointerAngle = (3 * Math.PI / 2 - normalizedRotation) % (2 * Math.PI);
        if (pointerAngle < 0) pointerAngle += 2 * Math.PI;

        const selectedIdx = Math.floor(pointerAngle / anglePerSlice);
        onSpinCompleteRef.current(currentItems[selectedIdx]);
      }
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isSpinning]);

  return (
    <div className="roulette-container">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="roulette-canvas"
        aria-label="美食盲盒转盘"
      />
    </div>
  );
};

export default Roulette;
