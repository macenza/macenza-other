import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Search, ArrowRight, Play, Users, Rocket, Globe, Shield, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroOverlay = () => {
  const overlayRef = useRef(null);
  const navbarRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightStatsRef = useRef(null);
  const brandStripRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animations
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });

      tl.fromTo(navbarRef.current, 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2 }, 
        0.2
      );

      tl.fromTo(".hero-line-1", 
        { x: -100, opacity: 0 }, 
        { x: 0, opacity: 1 }, 
        0.4
      );

      tl.fromTo(".hero-line-2", 
        { x: -100, opacity: 0 }, 
        { x: 0, opacity: 1 }, 
        0.6
      );

      tl.fromTo(".hero-desc", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1 }, 
        0.8
      );

      tl.fromTo(".hero-btns", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1 }, 
        1.0
      );

      tl.fromTo(".stat-card", 
        { x: 100, opacity: 0, stagger: 0.1 }, 
        { x: 0, opacity: 1, stagger: 0.1 }, 
        0.6
      );

      tl.fromTo(brandStripRef.current, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1 }, 
        1.2
      );

      tl.fromTo(scrollIndicatorRef.current, 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1 }, 
        1.4
      );

      // Floating animation for stats cards
      gsap.to(".stat-card", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.2,
          from: "random"
        }
      });
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: <Users className="w-5 h-5 text-accent" />, title: "500+", subtitle: "Happy Clients" },
    { icon: <Rocket className="w-5 h-5 text-accent" />, title: "120+", subtitle: "AI Solutions" },
    { icon: <Globe className="w-5 h-5 text-accent" />, title: "25+", subtitle: "Countries" },
    { icon: <Shield className="w-5 h-5 text-accent" />, title: "99.9%", subtitle: "Uptime" },
  ];

  const brands = ["Google", "Microsoft", "AWS", "IBM", "NVIDIA", "Adobe"];

  return (
    <div ref={overlayRef} className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 md:p-12 overflow-hidden">
      
      {/* Navbar */}
      <nav 
        ref={navbarRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] h-[78px] glass-morphism rounded-full px-8 flex items-center justify-between z-50 pointer-events-auto shadow-xl"
      >
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center glow-blue">
              <span className="text-white font-black text-xl">M</span>
            </div>
            <span className="text-2xl font-bold tracking-tighter text-black">MACENZA</span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {["Home", "About", "Solutions", "Technology", "Careers", "Contact"].map((item) => (
            <Link 
              key={item} 
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
              className="text-sm font-medium text-black/70 hover:text-primary transition-all duration-300 hover:scale-105"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-black/60 hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="hidden md:block px-6 py-3 bg-primary text-white rounded-full font-bold text-sm glow-blue hover:bg-primary-dark transition-all duration-300 active:scale-95">
            Get Started
          </button>
          <button 
            className="lg:hidden p-2 text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-black transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-full bg-black transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-black transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-[90px] left-0 w-full glass-morphism rounded-3xl p-6 flex flex-col gap-4 lg:hidden pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-300">
            {["Home", "About", "Solutions", "Technology", "Careers", "Contact"].map((item) => (
              <Link 
                key={item} 
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                className="text-lg font-bold text-black/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold glow-blue mt-2">
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Content (Left) & Stats (Right) */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 mt-20">
        
        {/* Left Hero Content */}
        <div ref={leftContentRef} className="max-w-[600px] pointer-events-auto">
          <div className="overflow-hidden mb-2">
            <h1 className="hero-line-1 text-6xl md:text-8xl font-black text-black tracking-tight leading-[0.9]">
              Intelligence
            </h1>
          </div>
          <div className="overflow-hidden mb-6">
            <h1 className="hero-line-2 text-6xl md:text-8xl font-black text-primary tracking-tight leading-[0.9]">
              Redefined.
            </h1>
          </div>
          <p className="hero-desc text-lg md:text-xl text-black/65 leading-relaxed mb-10 max-w-[480px]">
            Macenza builds next-generation AI solutions that empower businesses and elevate human potential.
          </p>
          <div className="hero-btns flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 glow-blue hover:bg-primary-dark transition-all duration-300">
              Explore Solutions <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 glass-morphism text-black rounded-2xl font-bold flex items-center gap-2 hover:bg-white/40 transition-all duration-300 border border-black/10">
              <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 fill-black" />
              </div>
              Watch Video
            </button>
          </div>
        </div>

        {/* Right Floating Stats */}
        <div ref={rightStatsRef} className="hidden lg:flex flex-col gap-6 pointer-events-auto">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="stat-card w-64 glass-morphism rounded-[28px] p-6 flex items-center gap-4 transition-all duration-500 hover:scale-110 hover:shadow-2xl cursor-default group"
            >
              <div className="p-3 bg-black/5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-black text-black tracking-tight">{stat.title}</div>
                <div className="text-xs font-medium text-black/50 uppercase tracking-wider">{stat.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Area */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 mt-auto">
        
        {/* Brand Strip */}
        <div 
          ref={brandStripRef}
          className="mx-auto md:mx-0 glass-morphism rounded-full px-8 py-4 flex flex-col md:flex-row items-center gap-6 pointer-events-auto shadow-lg"
        >
          <span className="text-xs font-bold text-dark/40 uppercase tracking-[0.2em] whitespace-nowrap">
            Trusted by Industry Leaders
          </span>
          <div className="h-4 w-[1px] bg-dark/10 hidden md:block" />
          <div className="flex items-center gap-8">
            {brands.map((brand) => (
              <span key={brand} className="text-sm font-black text-dark/30 hover:text-dark/60 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="flex items-center gap-4 pointer-events-auto"
        >
          <span className="text-sm font-bold text-dark/40 uppercase tracking-widest hidden md:block">
            Scroll to Explore
          </span>
          <button className="w-16 h-16 glass-morphism rounded-2xl flex items-center justify-center hover:bg-white/40 transition-all duration-300 group">
            <ChevronDown className="w-6 h-6 text-dark group-hover:translate-y-1 transition-transform animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroOverlay;
