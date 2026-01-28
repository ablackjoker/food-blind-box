import React, { useEffect, useRef, useState } from 'react';
import './Roulette.css';

const Roulette = ({ restaurants, isSpinning, onSpinComplete }) => {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B4D9', '#A2D5AB'
  ];

  useEffect(() => {
    drawRoulette();
  }, [restaurants, rotation]);

  useEffect(() => {
    if (isSpinning) {
      spinRoulette();
    }
  }, [isSpinning]);

  const drawRoulette = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (restaurants.length === 0) return;

    const anglePerSlice = (2 * Math.PI) / restaurants.length;

    // Draw slices
    restaurants.forEach((restaurant, index) => {
      const startAngle = index * anglePerSlice + rotation;
      const endAngle = startAngle + anglePerSlice;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();

      // Draw border
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSlice / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 3;
      
      const text = restaurant.place_name || restaurant.name;
      const maxLength = 15;
      const displayText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
      
      ctx.fillText(displayText, radius * 0.6, 5);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw pointer (at the top)
    ctx.beginPath();
    ctx.moveTo(centerX, 10);
    ctx.lineTo(centerX - 15, 40);
    ctx.lineTo(centerX + 15, 40);
    ctx.closePath();
    ctx.fillStyle = '#FF4444';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const spinRoulette = () => {
    const randomSpins = 5 + Math.random() * 3; // 5-8 full rotations
    const randomAngle = Math.random() * 2 * Math.PI;
    const totalRotation = randomSpins * 2 * Math.PI + randomAngle;
    
    const duration = 4000; // 4 seconds
    const startTime = Date.now();
    const startRotation = rotation;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + totalRotation * easeOut;

      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Calculate selected restaurant
        const normalizedRotation = currentRotation % (2 * Math.PI);
        const anglePerSlice = (2 * Math.PI) / restaurants.length;
        
        // The pointer is at the top (90 degrees or PI/2)
        // We need to find which slice is at the top
        let pointerAngle = (3 * Math.PI / 2 - normalizedRotation) % (2 * Math.PI);
        if (pointerAngle < 0) pointerAngle += 2 * Math.PI;
        
        const selectedIdx = Math.floor(pointerAngle / anglePerSlice);
        const selected = restaurants[selectedIdx];
        
        setSelectedIndex(selectedIdx);
        onSpinComplete(selected);
      }
    };

    animate();
  };

  return (
    <div className="roulette-container">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="roulette-canvas"
      />
    </div>
  );
};

export default Roulette;
