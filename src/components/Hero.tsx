import React, { useRef, useEffect } from 'react';
import ComputersCanvas from './Computers';

const Hero: React.FC = () => {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const graphicCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        context.fillStyle = '#000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        return () => { window.removeEventListener('resize', resizeCanvas) };
      }
    }
  }, []);

  useEffect(() => {
    const canvas = graphicCanvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        context.clearRect(0, 0, canvas.width, canvas.height);

        return () => { window.removeEventListener('resize', resizeCanvas) };
      }
    }
  }, []);

  return (
    <div id="hero-container" className="hero">
      <canvas id="bg-canvas" ref={bgCanvasRef} className='absolute left-0 top-0 h-max w-max' />
      <div id="hero-text-container" className="hero-content z-10 flex flex-col justify-between h-full">
        <div id="hero-text" className="flex-1 flex items-center justify-center">
          <div>
            <h1>VIET NGUYEN</h1>
            <p>Creative Developer</p>
          </div>
        </div>
        <div id="computers-canvas" className="flex-1">
          <ComputersCanvas />
        </div>
      </div>
      <canvas id="hero-graphic" ref={graphicCanvasRef} className="hero-canvas z-10" />
    </div>
  );
};

export default Hero;
