import React, { useRef, useEffect } from 'react'

const Hero: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (canvas) {
			const context = canvas.getContext('2d')
			if (context) {
				const resizeCanvas = () => {
					canvas.width = window.innerWidth
					canvas.height = window.innerHeight
				}

				window.addEventListener('resize', resizeCanvas)
				resizeCanvas()

				context.fillStyle = 'black'
				context.fillRect(0, 0, canvas.width, canvas.height)

				return () => { window.removeEventListener('resize', resizeCanvas) }
			}
		}
	}, []);
	return <canvas ref={canvasRef} style={{ display: 'block' }} />
};

export default Hero
