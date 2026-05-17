import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/Section';
import Footer from '../components/Footer';
import { 
  Users, Rocket, Globe, Shield, Heart, Zap, 
  Lightbulb, Target, Sparkles, ArrowRight,
  Search, Menu, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const teamMembers = [
  { name: "Alex Rivera", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop" },
  { name: "Sarah Chen", role: "CTO", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&fit=crop" },
  { name: "Marcus Thorne", role: "AI Engineer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&fit=crop" },
  { name: "Elena Volkov", role: "Senior Developer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&fit=crop" },
  { name: "David Kim", role: "Frontend Engineer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&fit=crop" },
  { name: "Priya Sharma", role: "Backend Engineer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&fit=crop" },
  { name: "Liam O'Neill", role: "DevOps Engineer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&fit=crop" },
  { name: "Sophie Dubois", role: "UI/UX Designer", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=400&fit=crop" },
  { name: "James Wilson", role: "AI Researcher", image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=400&h=400&fit=crop" },
  { name: "Maya Patel", role: "Cloud Architect", image: "https://images.unsplash.com/photo-1567532939847-893993796ecf?q=80&w=400&h=400&fit=crop" },
  { name: "Thomas Wright", role: "Product Manager", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400&h=400&fit=crop" },
  { name: "Isabella Garcia", role: "Data Scientist", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&fit=crop" },
  { name: "Ryan Cooper", role: "Automation Engineer", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&h=400&fit=crop" },
  { name: "Grace Lee", role: "Mobile App Developer", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&h=400&fit=crop" },
  { name: "Oliver Bennett", role: "Cybersecurity Engineer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&fit=crop" },
  { name: "Amara Okoro", role: "QA Lead", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&h=400&fit=crop" },
  { name: "Lucas Müller", role: "Business Strategist", image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=400&h=400&fit=crop" },
  { name: "Zoe Taylor", role: "Growth Lead", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&h=400&fit=crop" },
  { name: "Ethan Hunt", role: "Creative Director", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&h=400&fit=crop" },
  { name: "Nadia Petrova", role: "Solutions Architect", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400&h=400&fit=crop" },
  { name: "Wei Zhang", role: "ML Engineer", image: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=80&w=400&h=400&fit=crop" },
  { name: "Ava Robinson", role: "Operations Manager", image: "https://images.unsplash.com/photo-1598550874175-4d0fe4a2c90b?q=80&w=400&h=400&fit=crop" },
  { name: "Felix Vogt", role: "Innovation Lead", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=400&h=400&fit=crop" },
  { name: "Sofia Rossi", role: "Technical Consultant", image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=400&h=400&fit=crop" },
  { name: "Gabriel Silva", role: "Customer Success Lead", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop" },
];

const About = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Animate each reveal-up element individually when it enters the viewport
      gsap.utils.toArray(".reveal-up").forEach((elem) => {
        gsap.from(elem, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
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
      {/* Simple Navbar for About Page */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] h-[78px] glass-morphism rounded-full px-8 flex items-center justify-between z-50 pointer-events-auto shadow-xl">
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
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${item === "About" ? "text-primary font-bold" : "text-black/70 hover:text-primary"}`}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-black/60 hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/" className="px-6 py-3 bg-primary text-white rounded-full font-bold text-sm glow-blue hover:bg-primary-dark transition-all duration-300 active:scale-95">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-2 bg-primary/5 rounded-full text-primary font-bold text-xs uppercase tracking-widest mb-6 reveal-up">
            Our Journey
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black mb-8 reveal-up leading-tight">
            Building the Future <br /> 
            <span className="text-accent">with Intelligence.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-black/60 font-light reveal-up">
            Macenza is a next-generation AI and software company building intelligent digital products, automation systems, and transformative technology experiences.
          </p>
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
          <div className="p-12 rounded-[3rem] glass-morphism border border-dark/5 reveal-up hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-black/60 font-light leading-relaxed">
              To empower every business with intelligent technology that amplifies human potential and drives sustainable global innovation.
            </p>
          </div>
          <div className="p-12 rounded-[3rem] glass-morphism border border-dark/5 reveal-up hover:shadow-2xl transition-all duration-500 bg-primary/5">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
            <p className="text-black/60 font-light leading-relaxed">
              To become the world's most trusted partner in AI-driven digital transformation, building the foundations for a smarter tomorrow.
            </p>
          </div>
          <div className="p-12 rounded-[3rem] glass-morphism border border-dark/5 reveal-up hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
              <Heart className="w-8 h-8" />
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
            { title: "Fast-paced innovation", icon: <Zap /> },
            { title: "Remote-first collaboration", icon: <Globe /> },
            { title: "AI-first mindset", icon: <Sparkles /> },
            { title: "Creative engineering", icon: <Lightbulb /> },
            { title: "Startup ownership culture", icon: <Target /> },
            { title: "Rapid experimentation", icon: <Rocket /> },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/50 border border-dark/5 flex items-center gap-6 hover:bg-white/80 transition-all duration-300 shadow-sm">
              <div className="text-primary">{React.cloneElement(item.icon, { className: "w-6 h-6" })}</div>
              <span className="text-lg font-bold text-black">{item.title}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats Section */}
      <Section id="stats">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 reveal-up">
          {[
            { value: "120+", label: "AI Solutions" },
            { value: "500+", label: "Happy Clients" },
            { value: "25+", label: "Countries Served" },
            { value: "99.9%", label: "Uptime" },
            { value: "50+", label: "Products Delivered" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-6xl font-black text-primary mb-2 tracking-tighter">{stat.value}</div>
              <div className="text-sm font-bold text-black/40 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

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
            <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-dark/5 shadow-sm reveal-up hover:border-primary/50 transition-all duration-300">
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
          <Link to="/" className="px-16 py-6 bg-white text-primary rounded-full font-bold text-xl hover:bg-dark hover:text-white transition-all duration-300 shadow-2xl">
            Contact Us
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default About;
