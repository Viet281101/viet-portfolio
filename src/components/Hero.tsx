import React, { useRef, useEffect } from 'react';

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

				context.fillStyle = '#043c50';
				context.fillRect(0, 0, canvas.width, canvas.height);

				return () => { window.removeEventListener('resize', resizeCanvas) };
			}
		}
	}, []);

	return (
		<div id="hero-container" className="hero">
			<canvas id="bg-canvas" ref={bgCanvasRef} className='absolute left-0 top-0 h-max w-max' />
			<div id="hero-text" className="hero-content z-10">
				<h1>VIET NGUYEN</h1>
				<p>Creative Developer</p>
			</div>
			<canvas id="hero-graphic" ref={graphicCanvasRef} className="hero-canvas z-10" />
		</div>
	);
};

export default Hero;
