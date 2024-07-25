import React, { useRef } from 'react';
import { useFlowFieldEffect } from '../hooks/useFlowFieldEffect';
import ComputersCanvas from './Computers';

const Hero: React.FC = () => {
	const bgCanvasRef = useRef<HTMLCanvasElement>(null);
	const graphicCanvasRef = useRef<HTMLCanvasElement>(null);

	useFlowFieldEffect(bgCanvasRef);

	return (
		<div id="hero-container" className="hero">
			<canvas id="bg-canvas" ref={bgCanvasRef} className="absolute left-0 top-0 h-max w-max" />
			<div id="hero-text-container" className="hero-content z-20 flex flex-col justify-between h-full">
				<div id="hero-text" className="flex-1 flex items-center justify-center">
					<div>
						<h1>VIET NGUYEN</h1>
						<p>Creative Developer & Programmer</p>
					</div>
				</div>
				<div id="computers-canvas" className="flex-1 z-20">
					<ComputersCanvas />
				</div>
			</div>
			<canvas id="hero-graphic" ref={graphicCanvasRef} className="hero-canvas z-20" />
		</div>
	);
};

export default Hero;
