import React from 'react';

const Footer = () => {
  return (
    <footer className="py-20 border-t border-black/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-2xl font-black tracking-tighter text-black">
          MACENZA
        </div>
        <div className="flex gap-10 text-sm font-medium text-black/50">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Cookies</a>
        </div>
        <div className="text-sm text-black/30">
          © 2026 Macenza AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
