import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';
import { IMAGES } from '../../constants/images';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg' 
          : 'bg-white/0'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <img 
              src={IMAGES.logo}
              alt="Xable Logo" 
              className="h-10 w-10 rounded-lg shadow-lg"
            />
            <span className={`ml-2 text-xl font-semibold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-gray-800'
            }`}>Xable</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#home" isScrolled={isScrolled}>Home</NavLink>
            <NavLink href="#services" isScrolled={isScrolled}>Services</NavLink>
            <NavLink href="#approach" isScrolled={isScrolled}>Our Approach</NavLink>
            <NavLink href="#team" isScrolled={isScrolled}>Team</NavLink>
            <NavLink href="#blog" isScrolled={isScrolled}>Blog</NavLink>
            <NavLink href="#contact" isScrolled={isScrolled}>Contact</NavLink>
            <button className={`px-4 py-2 rounded-md transition-all duration-300 ${
              isScrolled
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}>
              Book Consultation
            </button>
          </div>
          
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className={`h-6 w-6 transition-colors duration-300 ${
              isScrolled ? 'text-gray-600' : 'text-gray-500'
            }`} />
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </header>
  );
}