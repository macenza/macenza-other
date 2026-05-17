import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socials = [
    { 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ), 
      href: "https://instagram.com/macenza.ai", 
      label: "Instagram" 
    },
    { 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ), 
      href: "https://in.linkedin.com/company/macenza", 
      label: "LinkedIn" 
    },
    { 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ), 
      href: "https://github.com/macenza", 
      label: "GitHub" 
    },
    { 
      icon: <Mail className="w-5 h-5" />, 
      href: "mailto:info@macenza.com", 
      label: "Email" 
    }
  ];

  return (
    <footer className="py-20 border-t border-black/5 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="text-2xl font-black tracking-tighter text-black">
            MACENZA
          </div>
          <div className="text-sm text-black/30">
            © 2026 Macenza AI. All rights reserved.
          </div>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center gap-6">
          {socials.map((social, i) => (
            <a 
              key={i} 
              href={social.href} 
              target={social.href.startsWith('mailto:') ? undefined : "_blank"}
              rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
              className="p-3 bg-black/5 rounded-full text-black/60 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 shadow-sm flex items-center justify-center"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="flex gap-10 text-sm font-medium text-black/50">
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
