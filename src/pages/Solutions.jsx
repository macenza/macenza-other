import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/Section';
import Footer from '../components/Footer';
import {
  Brain, Code, Globe, Smartphone, Zap, Cloud,
  Search, Target, Rocket, Shield, ArrowRight,
  Database, Layers, Cpu, CheckCircle2, MessageSquare,
  Mic, UserCheck, BarChart3, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    name: "AI Solutions",
    icon: "🧠",
    services: ["Custom AI Development", "Machine Learning Models", "AI Chatbots", "Generative AI Applications", "AI Agents", "Computer Vision"],
    bgClass: "bg-violet-500/10"
  },
  {
    name: "Software Development",
    icon: "💻",
    services: ["Custom SaaS Platforms", "Enterprise Software", "CRM Development", "ERP Systems", "Business Dashboards", "Admin Panels"],
    bgClass: "bg-blue-500/10"
  },
  {
    name: "Web Solutions",
    icon: "🌐",
    services: ["Corporate Websites", "Landing Pages", "Web Applications", "E-commerce Stores", "Progressive Web Apps", "Customer Portals"],
    bgClass: "bg-teal-500/10"
  },
  {
    name: "Mobile Applications",
    icon: "📱",
    services: ["iOS Apps", "Android Apps", "Cross-platform Apps", "Startup MVP Apps", "On-demand Apps"],
    bgClass: "bg-rose-500/10"
  },
  {
    name: "Automation Solutions",
    icon: "⚡",
    services: ["Workflow Automation", "Business Process Automation", "CRM Automation", "AI Automation", "Email Automation", "RPA Solutions"],
    bgClass: "bg-amber-500/10"
  },
  {
    name: "Cloud & DevOps",
    icon: "☁️",
    services: ["AWS Deployment", "Azure Cloud", "CI/CD Pipelines", "Cloud Migration", "Scalable Infrastructure", "Server Management"],
    bgClass: "bg-sky-500/10"
  }
];

const industries = [
  { name: "Healthcare Technology", icon: "🏥", bg: "bg-emerald-500/10", hoverBg: "group-hover:bg-emerald-500/20" },
  { name: "Fintech Solutions", icon: "💳", bg: "bg-indigo-500/10", hoverBg: "group-hover:bg-indigo-500/20" },
  { name: "Manufacturing ERP", icon: "🏭", bg: "bg-cyan-500/10", hoverBg: "group-hover:bg-cyan-500/20" },
  { name: "Retail Automation", icon: "🛒", bg: "bg-amber-500/10", hoverBg: "group-hover:bg-amber-500/20" },
  { name: "Education Platforms", icon: "🎓", bg: "bg-violet-500/10", hoverBg: "group-hover:bg-violet-500/20" },
  { name: "Real Estate Tech", icon: "🏢", bg: "bg-sky-500/10", hoverBg: "group-hover:bg-sky-500/20" },
  { name: "Hospitality Software", icon: "🏨", bg: "bg-rose-500/10", hoverBg: "group-hover:bg-rose-500/20" },
  { name: "Logistics Systems", icon: "🚚", bg: "bg-pink-500/10", hoverBg: "group-hover:bg-pink-500/20" }
];

const aiAgents = [
  { name: "Sales AI Agent", icon: "🎯", bg: "bg-rose-500/10" },
  { name: "Customer Support AI", icon: "💬", bg: "bg-sky-500/10" },
  { name: "Voice AI Assistant", icon: "🎙️", bg: "bg-violet-500/10" },
  { name: "Recruitment AI Agent", icon: "👥", bg: "bg-emerald-500/10" },
  { name: "Lead Generation AI", icon: "🚀", bg: "bg-amber-500/10" },
  { name: "Business Intelligence AI", icon: "📊", bg: "bg-pink-500/10" }
];

const processSteps = [
  { title: "Discovery", desc: "Understanding your vision and objectives." },
  { title: "Strategy", desc: "Mapping out the technical architecture." },
  { title: "Design", desc: "Crafting intuitive user experiences." },
  { title: "Development", desc: "Building with AI-first engineering." },
  { title: "Testing", desc: "Rigorous quality assurance and optimization." },
  { title: "Launch", desc: "Deploying to production with scale." },
  { title: "Scale", desc: "Continuous improvement and growth." }
];

const CaseStudyCard = ({ title, description, image }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl shadow-black/5">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500"></div>
      <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
        <button className="px-6 py-3 bg-white/90 backdrop-blur-md text-black rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
          View Success Story <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
    <h4 className="text-3xl font-bold text-black group-hover:text-primary transition-colors duration-300">{title}</h4>
    <p className="text-black/60 font-light mt-3 leading-relaxed">{description}</p>
  </div>
);

const Solutions = () => {
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

      // Stagger solution cards when solution grid enters the viewport
      gsap.from(".solution-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".solution-grid",
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });
    }, pageRef);

    // Refresh ScrollTrigger after a timeout to fix late rendering layout shifts
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
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-left w-full flex flex-col items-start justify-center">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-primary/5 rounded-full text-primary font-bold text-xs uppercase tracking-widest mb-6 reveal-up">
              Intelligent Innovation
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black mb-8 reveal-up leading-tight">
              Smart Solutions. <br />
              <span className="text-primary">Built for scale.</span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-black/60 font-light reveal-up mb-12">
              We deploy advanced artificial intelligence, automation systems, and transformative digital solutions to optimize your business workflows.
            </p>
            <div className="flex justify-start reveal-up">
              <Link to="/contact" className="px-12 py-5 bg-primary text-white rounded-full font-bold text-lg glow-blue hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/20 text-center">
                Book Consultation
              </Link>
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
            <pattern id="dotGridSolutions" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.5" />
            </pattern>
            <rect width="120" height="160" fill="url(#dotGridSolutions)" />
          </svg>

          {/* Glowing Tech Waves (Flowing data particles) */}
          <svg className="absolute right-[-10%] bottom-[-5%] w-[110%] h-[55%] pointer-events-none z-0" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="glowSolutions" cx="50%" cy="50%" r="50%">
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
            <circle cx="350" cy="320" r="14" fill="url(#glowSolutions)" opacity="0.7" className="animate-node-pulse" />
            <circle cx="350" cy="320" r="4" fill="#ffffff" className="animate-node-pulse" />

            <circle cx="550" cy="260" r="16" fill="url(#glowSolutions)" opacity="0.8" className="animate-node-pulse-delayed" />
            <circle cx="550" cy="260" r="5" fill="#ffffff" className="animate-node-pulse-delayed" />

            <circle cx="750" cy="200" r="12" fill="url(#glowSolutions)" opacity="0.6" className="animate-node-pulse" />
            <circle cx="750" cy="200" r="3.5" fill="#ffffff" className="animate-node-pulse" />

            <circle cx="200" cy="290" r="10" fill="url(#glowSolutions)" opacity="0.5" className="animate-node-pulse-delayed" />
            <circle cx="200" cy="290" r="3" fill="#93c5fd" className="animate-node-pulse-delayed" />
          </svg>

          <img
            src="/hero-robot.png"
            alt="Macenza AI Robot"
            className="w-full h-full object-contain object-right-bottom select-none relative z-10 animate-float"
          />
        </div>
        {/* Bottom Fade Mask */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-30"></div>
      </section>

      {/* Core Solutions Grid */}
      <Section id="core-solutions" title="Our Core Solutions" subtitle="Empowering your business with high-performance digital tools.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 solution-grid">
          {solutions.map((sol, idx) => (
            <div key={idx} className="solution-card p-10 rounded-[3rem] glass-morphism border border-black/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-colors transition-shadow duration-500 group">
              <div className={`mb-8 p-5 rounded-2xl w-fit transition-all duration-500 text-4xl group-hover:scale-110 ${sol.bgClass}`}>
                {sol.icon}
              </div>
              <h3 className="text-2xl font-bold text-black mb-6">{sol.name}</h3>
              <ul className="space-y-4">
                {sol.services.map((service, i) => (
                  <li key={i} className="flex items-center gap-3 text-black/60 group-hover:text-black/80 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="font-light">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* AI Agents Showcase */}
      <Section id="ai-agents" className="bg-white text-black overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[180px]"></div>
        </div>
        <div className="relative z-10 text-center mb-20 reveal-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">AI Agents Built by <span className="text-primary">Macenza</span></h2>
          <p className="text-xl text-black/60 font-light max-w-3xl mx-auto">Our custom-trained autonomous agents handle everything from high-volume sales outreach to real-time customer support.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10 reveal-up">
          {aiAgents.map((agent, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white border border-black/5 hover:border-primary/50 transition-all duration-300 text-center group cursor-default shadow-sm">
              <div className={`mb-6 w-12 h-12 rounded-xl flex items-center justify-center mx-auto transition-all duration-500 text-2xl group-hover:scale-110 ${agent.bg}`}>
                {agent.icon}
              </div>
              <span className="text-sm font-bold block leading-tight text-black">{agent.name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Industry Solutions */}
      <Section id="industries" title="Solutions by Industry" subtitle="Tailored technology for specialized sectors.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal-up">
          {industries.map((industry, i) => (
            <div key={i} className="p-10 rounded-[2rem] border border-black/5 hover:border-primary/20 hover:shadow-xl transition-all duration-500 text-center group">
              <div className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 mx-auto text-3xl group-hover:scale-110 ${industry.bg} ${industry.hoverBg}`}>
                {industry.icon}
              </div>
              <h4 className="font-bold text-black group-hover:text-primary transition-colors">{industry.name}</h4>
            </div>
          ))}
        </div>
      </Section>

      {/* Development Process */}
      <Section id="process" className="bg-white text-black overflow-hidden">
        <div className="text-center mb-20 reveal-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-black">How We <span className="text-primary">Build</span></h2>
        </div>
        <div className="relative reveal-up">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/10 hidden lg:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-10">
            {processSteps.map((step, i) => (
              <div key={i} className="relative z-10 group">
                <div className="mb-6 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-125 transition-transform duration-500">
                  {i + 1}
                </div>
                <h4 className="text-xl font-bold mb-3 text-black">{step.title}</h4>
                <p className="text-sm text-black/50 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Case Studies */}
      <Section id="cases" title="Success Stories" subtitle="Real-world impact delivered through intelligent design.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 reveal-up">
          <CaseStudyCard
            title="Healthcare AI Assistant"
            description="A specialized LLM-powered assistant for patient triage and support, reducing administrative load by 65%."
            image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200"
          />
          <CaseStudyCard
            title="Manufacturing ERP System"
            description="Custom enterprise platform for real-time inventory tracking and predictive maintenance in multi-site facilities."
            image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200"
          />
          <CaseStudyCard
            title="Retail Automation Platform"
            description="Automated workflow engine for multi-channel e-commerce stores, managing everything from stock to shipping."
            image="https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200"
          />
          <CaseStudyCard
            title="SaaS CRM Platform"
            description="A highly scalable CRM with integrated AI lead scoring and automated sales pipelines for growing startups."
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"
          />
        </div>
      </Section>

      {/* Tech Stack */}
      <section id="stack" className="py-20 border-y border-black/5 overflow-hidden relative w-full marquee-container">
        {/* Edge Fades for premium high-end look */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

        <div className="text-center mb-16 reveal-up">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-black/30">Technologies We Use</h3>
        </div>

        {/* Infinite scrolling wrapper container */}
        <div className="flex w-max select-none animate-marquee-stats opacity-40 hover:opacity-100 transition-opacity duration-700">
          {/* Group 1 */}
          <div className="flex gap-16 md:gap-32 pr-16 md:pr-32 flex-shrink-0">
            {["React", "Next.js", "Node.js", "Python", "OpenAI", "LangChain", "TensorFlow", "AWS", "Docker", "MongoDB", "PostgreSQL", "Flutter"].map((tech, i) => (
              <span key={i} className="text-3xl md:text-5xl font-black text-black tracking-tighter hover:text-primary transition-colors duration-300 select-none">{tech}</span>
            ))}
          </div>

          {/* Group 2 */}
          <div className="flex gap-16 md:gap-32 pr-16 md:pr-32 flex-shrink-0" aria-hidden="true">
            {["React", "Next.js", "Node.js", "Python", "OpenAI", "LangChain", "TensorFlow", "AWS", "Docker", "MongoDB", "PostgreSQL", "Flutter"].map((tech, i) => (
              <span key={`g2-${i}`} className="text-3xl md:text-5xl font-black text-black tracking-tighter hover:text-primary transition-colors duration-300 select-none">{tech}</span>
            ))}
          </div>

          {/* Group 3 */}
          <div className="flex gap-16 md:gap-32 pr-16 md:pr-32 flex-shrink-0" aria-hidden="true">
            {["React", "Next.js", "Node.js", "Python", "OpenAI", "LangChain", "TensorFlow", "AWS", "Docker", "MongoDB", "PostgreSQL", "Flutter"].map((tech, i) => (
              <span key={`g3-${i}`} className="text-3xl md:text-5xl font-black text-black tracking-tighter hover:text-primary transition-colors duration-300 select-none">{tech}</span>
            ))}
          </div>

          {/* Group 4 */}
          <div className="flex gap-16 md:gap-32 pr-16 md:pr-32 flex-shrink-0" aria-hidden="true">
            {["React", "Next.js", "Node.js", "Python", "OpenAI", "LangChain", "TensorFlow", "AWS", "Docker", "MongoDB", "PostgreSQL", "Flutter"].map((tech, i) => (
              <span key={`g4-${i}`} className="text-3xl md:text-5xl font-black text-black tracking-tighter hover:text-primary transition-colors duration-300 select-none">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <Section id="models" title="Flexible Engagement Models" subtitle="Choosing the right partnership for your business growth.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 reveal-up">
          {[
            { title: "Fixed Cost Project", desc: "Best for clearly defined projects with specific scopes and deadlines.", accent: "bg-white" },
            { title: "Dedicated Team", desc: "An extension of your internal team for long-term development needs.", accent: "bg-white" },
            { title: "Monthly Retainer", desc: "Ongoing support and improvements for your digital products.", accent: "bg-white" },
            { title: "Startup MVP", desc: "Rapid 8-12 week build to get your product to market and start scaling.", accent: "bg-white" }
          ].map((model, i) => (
            <div key={i} className={`p-10 rounded-[3rem] border border-black/5 shadow-sm ${model.accent} transition-all duration-300 hover:-translate-y-2`}>
              <h4 className="text-2xl font-bold mb-6 text-black">{model.title}</h4>
              <p className="font-light leading-relaxed mb-10 text-black/60">
                {model.desc}
              </p>
              <Link to="/contact" className="block w-full py-4 rounded-full font-bold text-sm bg-black text-white hover:bg-primary transition-all text-center">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose Macenza */}
      <Section id="why-choose" className="bg-white text-black">
        <div className="text-center mb-20 reveal-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-black">Why Businesses Choose <span className="text-primary">Macenza</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "AI-first engineering", desc: "Every solution is built with artificial intelligence at its core.", icon: "🧠", bg: "bg-violet-500/10" },
            { title: "Startup speed", desc: "We move at the speed of thought to bring your ideas to market.", icon: "⚡", bg: "bg-amber-500/10" },
            { title: "Enterprise reliability", desc: "Robust, secure, and reliable for high-stakes environments.", icon: "🛡️", bg: "bg-blue-500/10" },
            { title: "Scalable architecture", desc: "Cloud-native systems designed to grow with your ambition.", icon: "🚀", bg: "bg-pink-500/10" },
            { title: "Future-ready solutions", desc: "Building technology that stays relevant in a shifting world.", icon: "🎯", bg: "bg-rose-500/10" },
            { title: "Global innovation mindset", desc: "Drawing inspiration from the world's leading tech hubs.", icon: "🌐", bg: "bg-teal-500/10" },
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-black/5 shadow-sm reveal-up hover:border-primary/50 transition-all duration-300 flex gap-6 items-start group">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 ${item.bg}`}>
                {item.icon}
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-3 text-black">{item.title}</h4>
                <p className="text-black/50 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section id="final-cta" className="text-center">
        <div className="max-w-6xl mx-auto p-20 rounded-[4rem] bg-white border border-black/5 text-black relative overflow-hidden reveal-up shadow-2xl shadow-primary/5">
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]"></div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-black">
            Build Your Next <br /> <span className="text-primary">Intelligent Product</span>
          </h2>
          <p className="text-2xl text-black/60 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Partner with Macenza to transform your ideas into powerful digital solutions.
          </p>
          <Link to="/contact" className="inline-block px-8 py-4 sm:px-16 sm:py-6 bg-primary text-white rounded-full font-bold text-base sm:text-xl hover:bg-black transition-all duration-300 shadow-xl shadow-primary/20 text-center whitespace-nowrap">
            Start Your Project
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Solutions;
