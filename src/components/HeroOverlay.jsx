import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Users, Rocket, Globe, Shield, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroOverlay = () => {
  const overlayRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightStatsRef = useRef(null);
  const brandStripRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animations
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });

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
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        0.8
      );

      tl.fromTo(".hero-btns",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        1.0
      );

      tl.fromTo(rightStatsRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2 },
        1.2
      );

      tl.fromTo(brandStripRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        1.4
      );

      tl.fromTo(scrollIndicatorRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        1.4
      );
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: <Users className="w-5 h-5 text-accent" />, title: "500+", subtitle: "Happy Clients" },
    { icon: <Rocket className="w-5 h-5 text-accent" />, title: "120+", subtitle: "AI Solutions" },
    { icon: <Globe className="w-5 h-5 text-accent" />, title: "25+", subtitle: "Countries" },
    { icon: <Shield className="w-5 h-5 text-accent" />, title: "99.9%", subtitle: "Uptime" },
  ];

  const brands = ["Aether", "Symmetry", "Neuralis", "Vortex", "Zentry", "Axiom"];

  return (
    <div ref={overlayRef} className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 pb-3 md:p-12 overflow-hidden">

      {/* Hero Content (Left) & Stats (Right) */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 sm:gap-12 mt-16 sm:mt-20">

        {/* Left Hero Content */}
        <div ref={leftContentRef} className="max-w-[600px] pointer-events-auto -mt-0 md:mt-0">
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
          <p className="hero-desc text-lg md:text-xl text-black/65 leading-relaxed mb-12 sm:mb-16 md:mb-10 max-w-[480px]">
            Macenza builds next-generation AI solutions that empower businesses and elevate human potential.
          </p>
          <div className="hero-btns flex flex-wrap gap-4">
            <Link to="/solutions" className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 glow-blue hover:bg-primary-dark transition-all duration-300">
              Explore Solutions <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-white text-black rounded-2xl font-bold flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-300 border border-black/5 shadow-lg shadow-black/5">
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
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
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-8 mt-auto w-full">

        <div
          ref={brandStripRef}
          className="mx-auto md:mx-0 glass-morphism rounded-[2rem] md:rounded-full px-8 py-4 flex flex-col md:flex-row items-center gap-4 md:gap-6 pointer-events-auto shadow-lg w-[92%] sm:w-auto"
        >
          <span className="text-xs font-bold text-dark/40 uppercase tracking-[0.2em] whitespace-nowrap text-center">
            Trusted by Industry Leaders
          </span>
          <div className="h-4 w-[1px] bg-dark/10 hidden md:block" />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:gap-x-8 md:gap-y-0 items-center">
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
          className="hidden sm:flex items-center gap-4 pointer-events-auto"
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
