import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
const FullPage = lazy(() => import('./FullPage'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Courses = lazy(() => import('./pages/Courses'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const Loading = lazy(() => import('./components/Loading'));

import menuIcon from '/menu.png';
import closeIcon from '/x_close.png';

const App = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [scrollDirection, setScrollDirection] = useState('up');

	const handleScrollDirection = (direction: 'up' | 'down') => {
		setScrollDirection(direction);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('nav') && !target.closest('#menu-icon')) { handleMenuClose(); }
		};
		if (isMenuOpen) { document.addEventListener('click', handleClickOutside); }
		else { document.removeEventListener('click', handleClickOutside); }
		return () => { document.removeEventListener('click', handleClickOutside); };
	}, [isMenuOpen]);

	useEffect(() => {
		let lastScrollY = window.scrollY;
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY) { setScrollDirection('down'); }
			else { setScrollDirection('up'); }
			lastScrollY = currentScrollY;
		};
		window.addEventListener('scroll', handleScroll);
		return () => { window.removeEventListener('scroll', handleScroll); };
	}, []);
	const handleMenuClose = useCallback(() => { setIsClosing(true); setTimeout(() => { setIsMenuOpen(false); setIsClosing(false); }, 400); }, []);
	const handleLinkClick = useCallback(() => { if (isMenuOpen) { handleMenuClose(); } }, [isMenuOpen, handleMenuClose]);

	const handleLinkClickFooter = useCallback((url: string) => { window.open(url, '_blank', 'noopener,noreferrer'); }, []);

	return (
		<Suspense fallback={<Loading />}>
			<FullPage enableScroll={false} onScroll={handleScrollDirection}>
				<div className="flex flex-col min-h-screen">
					<header className={`bg-gray-800 text-[#01d9ff] p-4 fixed w-full top-0 z-50 transition-transform duration-300 ease-in-out ${scrollDirection === 'down' && 'transform -translate-y-full'} custom:transform-none`}>
						<nav className="relative flex justify-between items-center">
							<div className="text-3xl font-bold ps-4 animate-zoom-appear"><Link to="/" onClick={handleLinkClick}>Viet Nguyen</Link></div>
							<div className="hidden custom:flex space-x-20 text-2xl animate-slide-right">
								<Link to="/about" className="neon-text">About</Link>
								<Link to="/projects" className="neon-text">Projects</Link>
								<Link to="/courses" className="neon-text">Courses</Link>
								<Link to="/blog" className="neon-text">Blog</Link>
								<Link to="/contact" className="neon-text">Contact</Link>
							</div>
						</nav>
						{isMenuOpen && (
							<div className={`absolute left-0 right-0 mt-4 space-y-8 text-xl bg-gray-800 p-4 custom:hidden ${isClosing ? 'animate-slide-right-disappear' : 'animate-slide-right'}`}>
								<Link to="/about" className="block active:bg-slate-600" onClick={handleLinkClick}>About</Link>
								<Link to="/projects" className="block active:bg-slate-600" onClick={handleLinkClick}>Projects</Link>
								<Link to="/courses" className="block active:bg-slate-600" onClick={handleLinkClick}>Courses</Link>
								<Link to="/blog" className="block active:bg-slate-600" onClick={handleLinkClick}>Blog</Link>
								<Link to="/contact" className="block active:bg-slate-600" onClick={handleLinkClick}>Contact</Link>
							</div>
						)}
					</header>
					<button id="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="fixed top-4 right-4 z-50 custom:hidden transition-transform duration-300 ease-in-out">
						<img src={menuIcon} alt="Menu" className={`w-8 h-8 transform ${isMenuOpen ? 'scale-0' : 'scale-100'}`} style={{ transition: 'transform 0.3s ease-in-out' }}/>
						<img src={closeIcon} alt="Close" className={`absolute top-0 left-0 w-8 h-8 transform ${isMenuOpen ? 'scale-100' : 'scale-0'}`}  style={{ transition: 'transform 0.3s ease-in-out' }}/>
					</button>
					<main className="flex-grow pt-16 z-10">
						<Suspense fallback={<Loading />}>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/about" element={<About />} />
								<Route path="/projects" element={<Projects />} />
								<Route path="/courses" element={<Courses />} />
								<Route path="/blog" element={<Blog />} />
								<Route path="/contact" element={<Contact />} />
							</Routes>
						</Suspense>
					</main>
					<footer className="bg-gray-900 text-[cyan] p-4 z-50">
						<div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
							<div className="md:order-1 order-2">
								<Link to="/" className="neon-text">Viet Nguyen</Link> / © 2024 Viet NGUYEN
							</div>
							<div className="md:order-2 order-1 space-x-4 text-xl">
								<Link to="/about" className="neon-text">About</Link> <span className="text-2xl text-[#3ac8f2]">/</span>
								<Link to="/projects" className="neon-text">Projects</Link> <span className="text-2xl text-[#3ac8f2]">/</span>
								<Link to="/courses" className="neon-text">Courses</Link>
							</div>
							<div className="md:order-3 order-3 flex space-x-5">
								<button onClick={() => handleLinkClickFooter('https://github.com/Viet281101')} className="hover:scale-150"><FaGithub size={28}/></button>
								<button onClick={() => handleLinkClickFooter('https://linkedin.com')} className="hover:scale-150"><FaLinkedin size={28}/></button>
								<button onClick={() => handleLinkClickFooter('https://x.com/vietanh15458684')} className="hover:scale-150"><FaTwitter size={28}/></button>
							</div>
						</div>
					</footer>
				</div>
			</FullPage>
		</Suspense>
	);
};

export default React.memo(App);
