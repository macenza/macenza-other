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
      {/* Hero Section */}

{/* Hero Section */}
<section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-36 pb-24">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-[0.25] scale-105"
    style={{
      backgroundImage: "url('about/image1.png')",
    }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/75 to-primary/10"></div>

  {/* Glow Effects */}
  <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px]" />

  <div className="container mx-auto px-6 relative z-10">
    <div className="grid lg:grid-cols-2 items-center gap-16">

      {/* LEFT CONTENT */}
      <div>

        <div className="inline-flex items-center gap-4 mb-8 reveal-up">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.3em]">
            Intelligent Innovation
          </span>

          <div className="w-20 h-[1px] bg-primary"></div>
        </div>

        <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tight text-black mb-8 leading-[0.95] reveal-up">
          Intelligent Solutions
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            for the Future.
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-black/60 font-light leading-relaxed mb-10 reveal-up">
          Macenza delivers AI-powered software, automation systems,
          and transformative digital solutions for modern businesses.
        </p>

        <div className="flex flex-wrap items-center gap-5 reveal-up">
          <Link
            to="/contact"
            className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/20"
          >
            Book Consultation
          </Link>

          <Link
            to="/technology"
            className="px-8 py-4 border border-black/10 rounded-full font-bold text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            Explore Technology
          </Link>
        </div>

        {/* STATS */}
        <div className="flex flex-wrap gap-10 mt-16 reveal-up">

          <div>
            <h3 className="text-4xl font-black text-primary">120+</h3>
            <p className="text-black/50 text-sm uppercase tracking-widest">
              AI Solutions
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-primary">500+</h3>
            <p className="text-black/50 text-sm uppercase tracking-widest">
              Clients
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-primary">25+</h3>
            <p className="text-black/50 text-sm uppercase tracking-widest">
              Countries
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="relative flex justify-center lg:justify-end reveal-up">

        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />

        {/* Main Image */}
        <img
          src="about/image2.png"
          alt="AI Technology"
          className="relative z-10 w-full max-w-[650px] object-contain drop-shadow-[0_20px_80px_rgba(124,58,237,0.25)] animate-float"
        />

      </div>
    </div>
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
