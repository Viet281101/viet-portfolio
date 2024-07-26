import { useEffect } from 'react';

export const useFlowFieldEffect = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
		const debouncedResizeCanvas = debounce(resizeCanvas, 100);
		window.addEventListener('resize', debouncedResizeCanvas);
		resizeCanvas();

		class Particle {
			effect: Effect;
			x: number; y: number;
			speedX: number; speedY: number;
			speedModifier: number;
			history: { x: number; y: number }[];
			maxLength: number;
			angle: number;
			timer: number;
			colors: string[];
			color: string;
			constructor(effect: Effect) {
				this.effect = effect;
				this.x = Math.floor(Math.random() * this.effect.width);
				this.y = Math.floor(Math.random() * this.effect.height);
				this.speedX = 0;
				this.speedY = 0;
				this.speedModifier = Math.floor(Math.random() * 5 + 1);
				this.history = [{ x: this.x, y: this.y }];
				this.maxLength = Math.floor(Math.random() * 200 + 10);
				this.angle = 0;
				this.timer = this.maxLength * 2;
				this.colors = ["#3bc9f3", "#38c5f1", "#1a99dc", "#1591d8"];
				this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
			}
			draw(context: CanvasRenderingContext2D) {
				context.beginPath();
				context.moveTo(this.history[0].x, this.history[0].y);
				for (let i = 0; i < this.history.length; i++) {
					context.lineTo(this.history[i].x, this.history[i].y);
				}
				context.lineWidth = Math.floor(Math.random() * 0.5 + 0.2);
				context.strokeStyle = this.color;
				context.stroke();
			}
			update() {
				this.timer--;
				if (this.timer >= 1) {
					const x = Math.floor(this.x / this.effect.cellSize);
					const y = Math.floor(this.y / this.effect.cellSize);
					const index = y * this.effect.cols + x;
					this.angle = this.effect.flowField[index];
					this.speedX = Math.cos(this.angle);
					this.speedY = Math.sin(this.angle);
					this.x += this.speedX * this.speedModifier;
					this.y += this.speedY * this.speedModifier;
					this.history.push({ x: this.x, y: this.y });
					if (this.history.length > this.maxLength) {
						this.history.shift();
					}
				} else if (this.history.length > 1) { this.history.shift(); }
				else { this.reset(); }
			}
			reset() {
				this.x = Math.floor(Math.random() * this.effect.width);
				this.y = Math.floor(Math.random() * this.effect.height);
				this.history = [{ x: this.x, y: this.y }];
				this.timer = this.maxLength * 2;
			}
		}

		class Effect {
			canvas: HTMLCanvasElement;
			width: number;
			height: number;
			particles: Particle[];
			numberParticles: number;
			cellSize: number;
			rows: number;
			cols: number;
			flowField: number[];
			curve: number;
			zoom: number;
			debug: boolean;
			constructor(canvas: HTMLCanvasElement) {
				this.canvas = canvas;
				this.width = this.canvas.width;
				this.height = this.canvas.height;
				this.particles = [];
				this.numberParticles = this.getNumberOfParticles(window.innerWidth);
				this.cellSize = window.innerWidth <= 768 ? 30 : 40;
				this.rows = 0;
				this.cols = 0;
				this.flowField = [];
				this.curve = 9;
				this.zoom = 0.01;
				this.debug = false;
				this.init();
				window.addEventListener('resize', debouncedResizeCanvas);
			}
			getNumberOfParticles(width: number): number {
				return width <= 768 ? 25 : 60;
			}
			init() {
				this.rows = Math.floor(this.height / this.cellSize);
				this.cols = Math.floor(this.width / this.cellSize);
				this.flowField = [];
				for (let y = 0; y < this.rows; y++) {
					for (let x = 0; x < this.cols; x++) {
						const angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
						this.flowField.push(angle);
					}
				}
				this.particles = [];
				for (let i = 0; i < this.numberParticles; i++) {
					this.particles.push(new Particle(this));
				}
			}
			drawGrid(context: CanvasRenderingContext2D) {
				context.save();
				context.strokeStyle = 'white';
				context.lineWidth = 0.3;
				for (let c = 0; c < this.cols; c++) {
					context.beginPath();
					context.moveTo(this.cellSize * c, 0);
					context.lineTo(this.cellSize * c, this.height);
					context.stroke();
				}
				for (let r = 0; r < this.rows; r++) {
					context.beginPath();
					context.moveTo(0, this.cellSize * r);
					context.lineTo(this.width, this.cellSize * r);
					context.stroke();
				}
				context.restore();
			}
			resize(width: number, height: number) {
				this.canvas.width = width;
				this.canvas.height = height;
				this.width = this.canvas.width;
				this.height = this.canvas.height;
				this.numberParticles = this.getNumberOfParticles(width);
				this.cellSize = width <= 768 ? 30 : 40;
				this.init();
			}
			render(context: CanvasRenderingContext2D) {
				if (this.debug) this.drawGrid(context);
				this.particles.forEach(particle => {
					particle.draw(context);
					particle.update();
				});
			}
		}
		const effect = new Effect(canvas);
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			effect.render(ctx);
			requestAnimationFrame(animate);
		};
		animate();
		return () => { window.removeEventListener('resize', debouncedResizeCanvas); };
	}, [canvasRef]);
};

function debounce(func: (...args: any[]) => void, wait: number) {
	let timeout: NodeJS.Timeout;
	return (...args: any[]) => { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); };
};
