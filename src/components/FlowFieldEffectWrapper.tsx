import React, { useRef } from 'react';
import { useFlowFieldEffect } from '../hooks/useFlowFieldEffect';

const FlowFieldEffectWrapper: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useFlowFieldEffect(canvasRef);
	return <canvas id="bg-canvas" ref={canvasRef} className="absolute left-0 top-0 h-max w-max" />;
};

export default FlowFieldEffectWrapper;
