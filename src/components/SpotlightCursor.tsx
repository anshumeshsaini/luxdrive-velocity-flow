
import React, { useEffect, useState } from 'react';

const SpotlightCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [size, setSize] = useState({ width: 300, height: 300 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    const handleMouseOver = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setSize({ width: 350, height: 350 });
    };

    const handleMouseUp = () => {
      setSize({ width: 300, height: 300 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseout', handleMouseOut);
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mousedown', handleMouseDown);
    document.body.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseout', handleMouseOut);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mousedown', handleMouseDown);
      document.body.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="spotlight-cursor" 
      style={{ 
        left: position.x, 
        top: position.y,
        width: size.width,
        height: size.height,
      }}
    />
  );
};

export default SpotlightCursor;
