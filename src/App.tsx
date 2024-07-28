import React, { useState, useEffect, Suspense, lazy, useCallback, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Courses = lazy(() => import('./pages/Courses'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const Footer = lazy(() => import('./Footer'));

import menuIcon from '/menu.png';
import closeIcon from '/x_close.png';

const App = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [scrollDirection, setScrollDirection] = useState('up');
	const [footerVisible, setFooterVisible] = useState(false);
	const footerRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => { if (entries[0].isIntersecting) { setFooterVisible(true); observer.disconnect(); } }, 
			{ threshold: 0.1 } 
		);
		if (footerRef.current) { observer.observe(footerRef.current); }
		return () => { if (footerRef.current) { observer.unobserve(footerRef.current); } };
	}, [footerRef]);

	return (
		<div className="flex flex-col min-h-screen">
		<header className={`bg-gray-800 text-white p-4 fixed w-full top-0 z-50 transition-transform duration-300 ease-in-out ${scrollDirection === 'down' && 'transform -translate-y-full'} md:transform-none`}>
			<nav className="relative flex justify-between items-center">
			<div className="text-3xl font-bold ps-4 animate-zoom-appear">
				<Link to="/" onClick={handleLinkClick}>Viet Nguyen</Link>
			</div>
			<div className="hidden md:flex space-x-20 text-2xl animate-slide-right">
				<Link to="/about" className="hover:text-[#3ac8f2] active:text-[#16cfd9]">About</Link>
				<Link to="/projects" className="hover:text-[#3ac8f2] active:text-[#16cfd9]">Projects</Link>
				<Link to="/courses" className="hover:text-[#3ac8f2] active:text-[#16cfd9]">Courses</Link>
				<Link to="/blog" className="hover:text-[#3ac8f2] active:text-[#16cfd9]">Blog</Link>
				<Link to="/contact" className="hover:text-[#3ac8f2] active:text-[#16cfd9]">Contact</Link>
			</div>
			</nav>
			{isMenuOpen && (
			<div className={`absolute left-0 right-0 mt-4 space-y-8 text-xl bg-gray-800 p-4 md:hidden ${isClosing ? 'animate-slide-right-disappear' : 'animate-slide-right'}`}>
				<Link to="/about" className="block hover:text-[#3ac8f2] active:text-[#16cfd9]" onClick={handleLinkClick}>About</Link>
				<Link to="/projects" className="block hover:text-[#3ac8f2] active:text-[#16cfd9]" onClick={handleLinkClick}>Projects</Link>
				<Link to="/courses" className="block hover:text-[#3ac8f2] active:text-[#16cfd9]" onClick={handleLinkClick}>Courses</Link>
				<Link to="/blog" className="block hover:text-[#3ac8f2] active:text-[#16cfd9]" onClick={handleLinkClick}>Blog</Link>
				<Link to="/contact" className="block hover:text-[#3ac8f2] active:text-[#16cfd9]" onClick={handleLinkClick}>Contact</Link>
			</div>
			)}
		</header>
		<button id="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="fixed top-4 right-4 z-50 md:hidden transition-transform duration-300 ease-in-out">
			<img src={menuIcon} alt="Menu" className={`w-8 h-8 transform ${isMenuOpen ? 'scale-0' : 'scale-100'}`} style={{ transition: 'transform 0.3s ease-in-out' }} />
			<img src={closeIcon} alt="Close" className={`absolute top-0 left-0 w-8 h-8 transform ${isMenuOpen ? 'scale-100' : 'scale-0'}`} style={{ transition: 'transform 0.3s ease-in-out' }} />
		</button>
		<main className="flex-grow pt-16 z-10">
			<Suspense fallback={<div>Loading...</div>}>
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
		<div ref={footerRef} className="h-4"></div>
		{footerVisible && (
			<Suspense fallback={<div>Loading...</div>}>
			<Footer />
			</Suspense>
		)}
		</div>
	);
}

export default React.memo(App);