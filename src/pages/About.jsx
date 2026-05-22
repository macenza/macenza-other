import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/Section';
import Footer from '../components/Footer';
import {
  Users, Rocket, Globe, Shield, Heart, Zap,
  Lightbulb, Target, Sparkles, ArrowRight, ArrowDown,
  Search, Menu, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const teamMembers = [

  { name: "Shashank Shubham", role: "Founder & CEO", image: "/Team/Shashank Shubham.png" },
  { name: "Garima", role: "CTO", image: "/Team/Garima CTO.png" },
  { name: "Anamika Sharma", role: "Frontend Developer", image: "/Team/Anamika Sharma Frontend Developer.png" },
  { name: "Deepti Solanki", role: "AI/ML Engineer", image: "/Team/Deepti Solanki AI ML Engineer.png" },
  { name: "Devendra Singh", role: "Backend Engineer", image: "/Team/Devendra Singh Backend Engineer.png" },
  { name: "Kavita Yadhav", role: "Frontend Engineer", image: "/Team/Kavita Yadhav Frontend Engineer.png" },
  { name: "Kuldeep Kothari", role: "Cybersecurity Engineer", image: "/Team/Kuldeep kothari Cybersecurity Engineer.png" },
  { name: "Neha Jaiswal", role: "Fullstack Developer", image: "/Team/NEHA JAISWAL Fullstack Developer.png" },
  { name: "Piyush Saini", role: "Fullstack Developer", image: "/Team/Piyush Saini Fullstack Developer.png" },
  { name: "Preeti", role: "UI/UX Designer", image: "/Team/Preeti UI UX Designer.png" },
  { name: "Priyanka Berwa", role: "HR", image: "/Team/Priyanka HR.png" },
  { name: "Riva Sha", role: "Fullstack Developer", image: "/Team/Riva Sha FullStack Developer.png" },
  { name: "Rohit", role: "Tester & Backend Developer", image: "/Team/Rohit Tester & Backend Developer.png" },
  { name: "Yashika Agarwal", role: "Data Scientist", image: "/Team/Yashika Agarwal Data Scientist.png" }
];

const About = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Animate each reveal-up element individually when it enters the viewport
      gsap.utils.toArray(".reveal-up").forEach((elem) => {
        gsap.from(elem, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 96%",
            toggleActions: "play none none none"
          }
        });
      });

      // Stagger animate team cards once the team grid comes into view
      gsap.from(".team-card", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });
    }, pageRef);

    // Refresh ScrollTrigger after a timeout to fix late rendering layout shifts (e.g. unsplash story images loading)
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1500);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={pageRef} className="bg-white text-black min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] lg:min-h-[85vh] flex flex-col items-center justify-start overflow-hidden pt-44 pb-24">
        {/* Glow ambient backgrounds on z-0 layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>

        {/* Text content on middle layer z-10 */}
        <div className="container mx-auto px-6 relative z-10 text-left w-full flex flex-col items-start justify-center">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-primary/5 rounded-full text-primary font-bold text-xs uppercase tracking-widest mb-6 reveal-up">
              Our Journey
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black mb-8 reveal-up leading-tight">
              Building Smarter <br />
              <span className="text-accent">Digital Futures.</span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-black/60 font-light reveal-up mb-12">
              Macenza is a next-generation AI and software company building digital products, automation systems, and transformative technology experiences.
            </p>
            <div className="flex flex-wrap justify-start gap-6 reveal-up">
              <button
                onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-primary text-white rounded-full font-bold text-lg glow-blue hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/20 flex items-center gap-3"
              >
                Meet our Team <ArrowDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Background Hero Robot Image & decorations on top layer z-20 (pointer-events-none passes all clicks through) */}
        <div className="absolute right-0 bottom-0 top-0 w-full lg:w-1/2 opacity-15 lg:opacity-100 pointer-events-none z-20 overflow-hidden">
          {/* Tech Circle Background */}
          <div className="absolute right-[5%] top-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-primary/[0.04] to-accent/[0.04] border border-primary/15 pointer-events-none z-0 blur-[1px]"></div>
          <div className="absolute right-[10%] top-[15%] w-[450px] h-[450px] rounded-full border border-dashed border-primary/25 pointer-events-none z-0 animate-[spin_40s_linear_infinite]"></div>
          <div className="absolute right-[12%] top-[17%] w-[410px] h-[410px] rounded-full border border-dashed border-accent/20 pointer-events-none z-0 animate-[spin_25s_linear_infinite_reverse]"></div>

          {/* Decorative Dot Grid */}
          <svg className="absolute left-[15%] top-[25%] w-[120px] h-[160px] text-primary/15 pointer-events-none z-0" fill="currentColor" viewBox="0 0 120 160">
            <pattern id="dotGridAbout" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.5" />
            </pattern>
            <rect width="120" height="160" fill="url(#dotGridAbout)" />
          </svg>

          {/* Glowing Tech Waves (Flowing data particles) */}
          <svg className="absolute right-[-10%] bottom-[-5%] w-[110%] h-[55%] pointer-events-none z-0" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="glowAbout" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Main dense dot-stream wave */}
            <path className="animate-flow-dots-fast" d="M -50 340 Q 150 240, 350 320 T 750 200 T 950 260" stroke="#3b82f6" strokeWidth="5" strokeDasharray="0 16" strokeLinecap="round" opacity="0.8" />

            {/* Secondary overlapping wave */}
            <path className="animate-flow-dots-medium" d="M -50 310 Q 130 220, 330 300 T 730 180 T 930 240" stroke="#60a5fa" strokeWidth="3" strokeDasharray="0 12" strokeLinecap="round" opacity="0.6" />

            {/* Accent wave with thin line + sparse glowing dots */}
            <path d="M -50 280 Q 180 180, 380 270 T 780 150 T 980 210" stroke="#93c5fd" strokeWidth="1" opacity="0.2" />
            <path className="animate-flow-dots-reverse" d="M -50 280 Q 180 180, 380 270 T 780 150 T 980 210" stroke="#3b82f6" strokeWidth="6" strokeDasharray="0 48" strokeLinecap="round" opacity="0.8" />

            {/* Bottom thick blurred ambient wave */}
            <path className="animate-flow-dots-slow" d="M -50 370 Q 170 270, 370 350 T 770 230 T 970 290" stroke="#3b82f6" strokeWidth="8" strokeDasharray="0 24" strokeLinecap="round" opacity="0.15" />

            {/* Standalone large glowing nodes */}
            <circle cx="350" cy="320" r="14" fill="url(#glowAbout)" opacity="0.7" className="animate-node-pulse" />
            <circle cx="350" cy="320" r="4" fill="#ffffff" className="animate-node-pulse" />

            <circle cx="550" cy="260" r="16" fill="url(#glowAbout)" opacity="0.8" className="animate-node-pulse-delayed" />
            <circle cx="550" cy="260" r="5" fill="#ffffff" className="animate-node-pulse-delayed" />

            <circle cx="750" cy="200" r="12" fill="url(#glowAbout)" opacity="0.6" className="animate-node-pulse" />
            <circle cx="750" cy="200" r="3.5" fill="#ffffff" className="animate-node-pulse" />

            <circle cx="200" cy="290" r="10" fill="url(#glowAbout)" opacity="0.5" className="animate-node-pulse-delayed" />
            <circle cx="200" cy="290" r="3" fill="#93c5fd" className="animate-node-pulse-delayed" />
          </svg>

          <img
            src="/hero-robot.png"
            alt="Macenza AI Robot"
            className="w-full h-full object-contain object-right-bottom select-none relative z-10 animate-float"
          />
          {/* Bottom Fade Mask */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20"></div>
        </div>
      </section>

      {/* Company Story */}
      <Section id="story" className="bg-white text-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight text-black">
              Who <span className="text-primary">We Are</span>
            </h2>
            <div className="space-y-6 text-black/70 text-lg font-light leading-relaxed">
              <p>
                Founded at the intersection of human creativity and artificial intelligence, Macenza emerged from a singular vision: to bridge the gap between complex technology and meaningful human experiences. We are a collective of dreamers, engineers, and strategists dedicated to redefining what's possible.
              </p>
              <p>
                As a futuristic startup, we specialize in building AI-first products that don't just solve problems—they anticipate them. From enterprise-grade web platforms to bespoke automation solutions, our work is defined by speed, precision, and an unwavering commitment to excellence.
              </p>
              <p>
                Today, Macenza stands as a beacon of digital transformation, helping businesses worldwide navigate the rapidly evolving technological landscape with confidence and clarity.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-[1px] bg-primary"></div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Founded in 2024</span>
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden group reveal-up">
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000"
              alt="Macenza Team"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
            />
          </div>
        </div>
      </Section>

      {/* Mission Vision Values */}
      <Section id="mission">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-12 rounded-[3rem] glass-morphism border border-dark/5 reveal-up hover:shadow-2xl transition-colors transition-shadow duration-500 hover:border-violet-500/20 group">
            <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-300">
              🎯
            </div>
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-black/60 font-light leading-relaxed">
              To empower every business with intelligent technology that amplifies human potential and drives sustainable global innovation.
            </p>
          </div>
          <div className="p-12 rounded-[3rem] glass-morphism border border-dark/5 reveal-up hover:shadow-2xl transition-colors transition-shadow duration-500 bg-primary/5 hover:border-amber-500/20 group">
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-300">
              💡
            </div>
            <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
            <p className="text-black/60 font-light leading-relaxed">
              To become the world's most trusted partner in AI-driven digital transformation, building the foundations for a smarter tomorrow.
            </p>
          </div>
          <div className="p-12 rounded-[3rem] glass-morphism border border-dark/5 reveal-up hover:shadow-2xl transition-colors transition-shadow duration-500 hover:border-rose-500/20 group">
            <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-300">
              ❤️
            </div>
            <h3 className="text-3xl font-bold mb-6">Our Values</h3>
            <div className="flex flex-wrap gap-3">
              {["Innovation", "Speed", "Trust", "Creativity", "Excellence", "Ownership"].map((v) => (
                <span key={v} className="px-4 py-2 bg-white rounded-full text-sm font-bold text-black/70 border border-dark/5 shadow-sm">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Startup Culture */}
      <Section id="culture" className="bg-white text-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] -rotate-12 translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto text-center mb-20 reveal-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">Startup Culture at <span className="text-primary">Macenza</span></h2>
          <p className="text-xl text-black/60 font-light leading-relaxed">
            We don't just build software; we build a culture of relentless innovation and radical ownership. At Macenza, every engineer is a founder, and every designer is an architect of the future.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-up">
          {[
            { title: "Fast-paced innovation", icon: "⚡", bg: "bg-amber-500/10" },
            { title: "Remote-first collaboration", icon: "🌐", bg: "bg-sky-500/10" },
            { title: "AI-first mindset", icon: "✨", bg: "bg-violet-500/10" },
            { title: "Creative engineering", icon: "💡", bg: "bg-pink-500/10" },
            { title: "Startup ownership culture", icon: "🎯", bg: "bg-rose-500/10" },
            { title: "Rapid experimentation", icon: "🚀", bg: "bg-indigo-500/10" },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/50 border border-dark/5 flex items-center gap-6 hover:bg-white/80 transition-all duration-300 shadow-sm group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 ${item.bg} group-hover:scale-110`}>{item.icon}</div>
              <span className="text-lg font-bold text-black">{item.title}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats Section (Infinite Marquee) */}
      <section id="stats" className="py-20 bg-white overflow-hidden relative w-full marquee-container">
        {/* Edge Fades for a premium, high-end look */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

        {/* Infinite scrolling wrapper container (4-group seamless train) */}
        <div className="flex w-max select-none animate-marquee-stats">
          {/* Group 1 */}
          <div className="flex gap-12 md:gap-24 pr-12 md:pr-24 flex-shrink-0">
            {[
              { value: "120+", label: "AI Solutions" },
              { value: "500+", label: "Happy Clients" },
              { value: "25+", label: "Countries Served" },
              { value: "99.9%", label: "Uptime" },
              { value: "50+", label: "Products Delivered" },
            ].map((stat, i) => (
              <div key={i} className="text-center min-w-[200px] flex-shrink-0 select-none">
                <div className="text-5xl md:text-7xl font-black text-primary mb-3 tracking-tighter transition-all duration-300 hover:scale-105 hover:text-blue-700">{stat.value}</div>
                <div className="text-xs md:text-sm font-bold text-black/40 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Group 2 */}
          <div className="flex gap-12 md:gap-24 pr-12 md:pr-24 flex-shrink-0" aria-hidden="true">
            {[
              { value: "120+", label: "AI Solutions" },
              { value: "500+", label: "Happy Clients" },
              { value: "25+", label: "Countries Served" },
              { value: "99.9%", label: "Uptime" },
              { value: "50+", label: "Products Delivered" },
            ].map((stat, i) => (
              <div key={`g2-${i}`} className="text-center min-w-[200px] flex-shrink-0 select-none">
                <div className="text-5xl md:text-7xl font-black text-primary mb-3 tracking-tighter transition-all duration-300 hover:scale-105 hover:text-blue-700">{stat.value}</div>
                <div className="text-xs md:text-sm font-bold text-black/40 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Group 3 */}
          <div className="flex gap-12 md:gap-24 pr-12 md:pr-24 flex-shrink-0" aria-hidden="true">
            {[
              { value: "120+", label: "AI Solutions" },
              { value: "500+", label: "Happy Clients" },
              { value: "25+", label: "Countries Served" },
              { value: "99.9%", label: "Uptime" },
              { value: "50+", label: "Products Delivered" },
            ].map((stat, i) => (
              <div key={`g3-${i}`} className="text-center min-w-[200px] flex-shrink-0 select-none">
                <div className="text-5xl md:text-7xl font-black text-primary mb-3 tracking-tighter transition-all duration-300 hover:scale-105 hover:text-blue-700">{stat.value}</div>
                <div className="text-xs md:text-sm font-bold text-black/40 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Group 4 */}
          <div className="flex gap-12 md:gap-24 pr-12 md:pr-24 flex-shrink-0" aria-hidden="true">
            {[
              { value: "120+", label: "AI Solutions" },
              { value: "500+", label: "Happy Clients" },
              { value: "25+", label: "Countries Served" },
              { value: "99.9%", label: "Uptime" },
              { value: "50+", label: "Products Delivered" },
            ].map((stat, i) => (
              <div key={`g4-${i}`} className="text-center min-w-[200px] flex-shrink-0 select-none">
                <div className="text-5xl md:text-7xl font-black text-primary mb-3 tracking-tighter transition-all duration-300 hover:scale-105 hover:text-blue-700">{stat.value}</div>
                <div className="text-xs md:text-sm font-bold text-black/40 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <Section
        id="team"
        title="Meet Our Team"
        subtitle="The brilliant minds behind Macenza's technological breakthroughs."
        className=""
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 team-grid">
          {teamMembers.map((member, i) => (
            <div key={i} className="team-card group">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-4 shadow-xl shadow-dark/5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 className="text-xl font-bold text-black">{member.name}</h4>
              <p className="text-sm text-black/50 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose Macenza */}
      <Section id="why" className="bg-white text-black">
        <div className="text-center mb-20 reveal-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-black">Why Choose <span className="text-primary">Macenza?</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "AI-first engineering", desc: "Every solution is built with artificial intelligence at its core." },
            { title: "Fast product delivery", desc: "We move at the speed of thought to bring your ideas to market." },
            { title: "Scalable architecture", desc: "Cloud-native systems designed to grow with your ambition." },
            { title: "Startup agility", desc: "Lean, efficient, and focused on results over bureaucracy." },
            { title: "Global innovation", desc: "Drawing talent and inspiration from around the world." },
            { title: "Enterprise-ready solutions", desc: "Robust, secure, and reliable for high-stakes environments." },
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-dark/5 shadow-sm reveal-up hover:border-primary/50 transition-colors duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-black">{item.title}</h4>
              <p className="text-black/50 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Join Our Journey CTA */}
      <Section id="join" className="text-center">
        <div className="max-w-5xl mx-auto p-20 rounded-[4rem] bg-primary text-white relative overflow-hidden reveal-up">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-[100px]"></div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
            Join Us in Building Tomorrow
          </h2>
          <p className="text-2xl text-white/80 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Macenza is creating the future of intelligent digital experiences. Are you ready to be part of the journey?
          </p>
          <Link to="/contact" className="inline-block px-8 py-4 sm:px-16 sm:py-6 bg-white text-primary rounded-full font-bold text-base sm:text-xl hover:bg-dark hover:text-white transition-all duration-300 shadow-2xl whitespace-nowrap">
            Contact Us
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default About;
