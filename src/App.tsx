import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import menuIcon from '/menu.png';
import closeIcon from '/x_close.png';

function App() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [scrollDirection, setScrollDirection] = useState('up');

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('nav') && !target.closest('#menu-icon')) { setIsMenuOpen(false); }
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
	const handleMenuClose = () => { setIsClosing(true); setTimeout(() => { setIsMenuOpen(false);setIsClosing(false); }, 400); };
	const handleLinkClick = () => { if (isMenuOpen) {handleMenuClose();} };

	return (
		<div className="flex flex-col min-h-screen">
		<header className={`bg-gray-800 text-white p-4 fixed w-full top-0 z-50 transition-transform duration-300 ease-in-out ${scrollDirection === 'down' && 'transform -translate-y-full'} md:transform-none`}>
			<nav className="relative flex justify-between items-center">
			<div className="text-3xl font-bold">
				<Link to="/" onClick={handleLinkClick}>Viet Nguyen</Link>
			</div>
			<div className="hidden md:flex space-x-12 text-2xl">
				<Link to="/about" className="hover:text-[#3ac8f2] active:text-[#16cfd9]">About</Link>
				<Link to="/projects" className="hover:text-[#3ac8f2] active:text-[#16cfd9]">Projects</Link>
				<Link to="/courses" className="hover:text-[#3ac8f2] active:text-[#16cfd9]">Courses</Link>
				<Link to="/contact" className="hover:text-[#3ac8f2] active:text-[#16cfd9]">Contact</Link>
			</div>
			</nav>
			{isMenuOpen && (
			<div className={`absolute left-0 right-0 mt-4 space-y-8 text-xl bg-gray-800 p-4 md:hidden ${isClosing ? 'animate-slide-right-disappear' : 'animate-slide-right'}`}>
				<Link to="/about" className="block hover:text-[#3ac8f2] active:text-[#16cfd9]" onClick={handleLinkClick}>About</Link>
				<Link to="/projects" className="block hover:text-[#3ac8f2] active:text-[#16cfd9]" onClick={handleLinkClick}>Projects</Link>
				<Link to="/courses" className="block hover:text-[#3ac8f2] active:text-[#16cfd9]" onClick={handleLinkClick}>Courses</Link>
				<Link to="/contact" className="block hover:text-[#3ac8f2] active:text-[#16cfd9]" onClick={handleLinkClick}>Contact</Link>
			</div>
			)}
		</header>
		<button id="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="fixed top-4 right-4 z-50 md:hidden transition-transform duration-300 ease-in-out">
			<img src={menuIcon} alt="Menu" className={`w-8 h-8 transform ${isMenuOpen ? 'scale-0' : 'scale-100'}`} style={{ transition: 'transform 0.3s ease-in-out' }} />
			<img src={closeIcon} alt="Close" className={`absolute top-0 left-0 w-8 h-8 transform ${isMenuOpen ? 'scale-100' : 'scale-0'}`} style={{ transition: 'transform 0.3s ease-in-out' }} />
		</button>
		<main className="flex-grow pt-16">
			<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/projects" element={<Projects />} />
			<Route path="/courses" element={<Courses />} />
			<Route path="/contact" element={<Contact />} />
			</Routes>
		</main>
		<footer className="bg-gray-900 text-white p-4">
			<div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
			<div className="md:order-1 order-2">
				<Link to="/" className="hover:text-[#3ac8f2]">Viet Nguyen</Link> / © 2024 Viet NGUYEN
			</div>
			<div className="md:order-2 order-1 space-x-4 text-lg">
				<Link to="/about" className="hover:text-[#3ac8f2]">About</Link> <span className="text-2xl text-[#3ac8f2]">/</span>
				<Link to="/projects" className="hover:text-[#3ac8f2]">Projects</Link> <span className="text-2xl text-[#3ac8f2]">/</span>
				<Link to="/courses" className="hover:text-[#3ac8f2]">Courses</Link>
			</div>
			<div className="md:order-3 order-3 flex space-x-4">
				<a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3ac8f2]"><FaGithub size={24} /></a>
				<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3ac8f2]"><FaLinkedin size={24} /></a>
				<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3ac8f2]"><FaTwitter size={24} /></a>
			</div>
			</div>
		</footer>
		</div>
	);
}

export default App;
