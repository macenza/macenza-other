import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter text-dark">
          MACENZA
        </div>
        
        <div className="hidden md:flex space-x-8 items-center">
          {['Home', 'Services', 'AI Solutions', 'Software Development', 'Portfolio'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-medium text-dark/70 hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="px-6 py-2 bg-dark text-white rounded-full text-sm font-semibold hover:bg-primary transition-all duration-300">
            Contact
          </button>
        </div>

        {/* Mobile Toggle - Simple version */}
        <div className="md:hidden text-dark">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
