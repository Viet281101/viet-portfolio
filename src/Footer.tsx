import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
	const handleLinkClick = useCallback((url: string) => {
		window.open(url, '_blank', 'noopener,noreferrer');
	}, []);

	return (
		<footer className="bg-gray-900 text-[cyan] p-4 z-50 animate-zoom-appear">
		<div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
			<div className="md:order-1 order-2">
			<Link to="/" className="neon-text">Viet Nguyen</Link> / © 2024 Viet NGUYEN
			</div>
			<div className="md:order-2 order-1 space-x-4 text-xl">
			<Link to="/about" className="neon-text">About</Link> <span className="text-2xl text-[#3ac8f2]">/</span>
			<Link to="/projects" className="neon-text">Projects</Link> <span className="text-2xl text-[#3ac8f2]">/</span>
			<Link to="/courses" className="neon-text">Courses</Link>
			</div>
			<div className="md:order-3 order-3 flex space-x-4">
			<button onClick={() => handleLinkClick('https://github.com/Viet281101')} className="hover:scale-125">
				<FaGithub size={24} />
			</button>
			<button onClick={() => handleLinkClick('https://linkedin.com')} className="hover:scale-125">
				<FaLinkedin size={24} />
			</button>
			<button onClick={() => handleLinkClick('https://twitter.com')} className="hover:scale-125">
				<FaTwitter size={24} />
			</button>
			</div>
		</div>
		</footer>
	);
}

export default React.memo(Footer);
