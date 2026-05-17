import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Automatically close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  const navItems = ["Home", "About", "Solutions", "Technology", "Careers", "Contact"];

  const isActive = (item) => {
    if (item === "Home") return currentPath === "/";
    return currentPath === `/${item.toLowerCase()}`;
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] h-[78px] glass-morphism rounded-full px-8 flex items-center justify-between z-[9999] pointer-events-auto shadow-xl">
      {/* Brand Logo */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center glow-blue">
            <span className="text-white font-black text-xl">M</span>
          </div>
          <span className="text-2xl font-bold tracking-tighter text-black">MACENZA</span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => (
          <Link 
            key={item} 
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
            className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isActive(item) 
                ? "text-primary font-bold" 
                : "text-black/70 hover:text-primary"
            }`}
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Get Started Button & Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        <Link to="/contact" className="hidden md:block px-6 py-3 bg-primary text-white rounded-full font-bold text-sm glow-blue hover:bg-primary-dark transition-all duration-300 active:scale-95 text-center">
          Get Started
        </Link>
        <button 
          className="lg:hidden p-2 text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-black transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 w-full bg-black transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-black transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-[90px] left-0 w-full glass-morphism rounded-3xl p-6 flex flex-col gap-4 lg:hidden pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <Link 
              key={item} 
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
              className={`text-lg font-bold transition-colors ${
                isActive(item) 
                  ? "text-primary" 
                  : "text-black/80 hover:text-primary"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link 
            to="/contact" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold glow-blue mt-2 text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
