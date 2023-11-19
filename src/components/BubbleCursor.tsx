import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

export interface BubbleCursorProps {
  ringSize?: number;
  dotSize?: number;
  drag?: number;
  color?: string;
}

const BubbleCursor = ({ ringSize = 35, dotSize = 8, drag = 20, color = '#ffffff' }: BubbleCursorProps) => {
  const [showCursor, setShowCursor] = useState(true);
  const borderRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef([0, 0]);
  const cursorPos = useRef([0, 0]);
  const animationFrameId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = [e.clientX, e.clientY];
    };

    const handleMouseLeave = () => {
      setShowCursor(false);
      document.getElementsByTagName('body')[0].style.cursor = 'auto';
    };

    const handleMouseEnter = () => {
      setShowCursor(true);
      document.getElementsByTagName('body')[0].style.cursor = 'none';
    };

    document.getElementsByTagName('body')[0].style.cursor = 'none';

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    requestAnimationFrame(updateCursorPos);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId?.current || 0);
    };
  }, []);

  const updateCursorPos = () => {
    if (!borderRef.current || !dotRef.current) {
      animationFrameId.current = requestAnimationFrame(updateCursorPos);
      return;
    }
    const newX = cursorPos.current[0] + (mousePos.current[0] - cursorPos.current[0]) * (1 / drag);
    const newY = cursorPos.current[1] + (mousePos.current[1] - cursorPos.current[1]) * (1 / drag);
    borderRef.current.style.left = `${newX}px`;
    borderRef.current.style.top = `${newY}px`;
    cursorPos.current = [newX, newY];
    dotRef.current.style.left = `${mousePos.current[0]}px`;
    dotRef.current.style.top = `${mousePos.current[1]}px`;
    animationFrameId.current = requestAnimationFrame(updateCursorPos);
  };

  return (
    <>
      <div
        ref={borderRef}
        style={{
          opacity: showCursor ? 1 : 0,
          pointerEvents: 'none',
          zIndex: 9998,
          position: 'fixed',
          background: 'inherit',
          color: 'transparent',
          border: `2px solid ${color}`,
          borderRadius: '50%',
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        ref={dotRef}
        style={{
          opacity: showCursor ? 1 : 0,
          pointerEvents: 'none',
          zIndex: 9999,
          position: 'fixed',
          background: color,
          borderRadius: '50%',
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default BubbleCursor;
