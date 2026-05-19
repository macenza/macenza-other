import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/Section';
import Footer from '../components/Footer';
import {
  Monitor, Server, Smartphone, Database, Brain, Cloud,
  Shield, Zap, Cpu, Globe, Rocket, Terminal,
  Layers, Code, Lock, Activity, Search, ArrowRight,
  ArrowDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  {
    name: "Frontend Engineering",
    icon: "💻",
    technologies: ["React", "Next.js", "Vue.js", "TailwindCSS", "TypeScript", "GSAP"],
    bgClass: "bg-sky-500/10"
  },
  {
    name: "Backend Engineering",
    icon: "🖥️",
    technologies: ["Node.js", "Python", "FastAPI", "Express.js", "Django", "NestJS"],
    bgClass: "bg-blue-500/10"
  },
  {
    name: "Mobile Engineering",
    icon: "📱",
    technologies: ["Flutter", "React Native", "Swift", "Kotlin"],
    bgClass: "bg-rose-500/10"
  },
  {
    name: "Databases",
    icon: "💾",
    technologies: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    bgClass: "bg-cyan-500/10"
  },
  {
    name: "AI / Machine Learning",
    icon: "🧠",
    technologies: ["OpenAI", "LangChain", "TensorFlow", "PyTorch", "Hugging Face", "LlamaIndex"],
    bgClass: "bg-violet-500/10"
  },
  {
    name: "Cloud & DevOps",
    icon: "☁️",
    technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "GitHub Actions"],
    bgClass: "bg-emerald-500/10"
  }
];

const capabilities = [
  "Generative AI", "AI Agents", "Computer Vision", "Natural Language Processing",
  "Voice AI Systems", "Recommendation Engines", "Predictive Analytics", "Intelligent Automation"
];

const architectureSteps = [
  "Frontend Experience Layer", "API Gateway Layer", "Business Logic Engine",
  "AI Intelligence Layer", "Database Layer", "Cloud Infrastructure"
];

const securityFeatures = [
  "End-to-End Encryption", "Secure API Architecture", "Role-Based Access Control",
  "Cloud Security Monitoring", "Compliance-Ready Infrastructure", "Real-Time Monitoring & Logging"
];

const engineeringExcellence = [
  "Clean Code Architecture", "Scalable Systems Design", "CI/CD Pipelines",
  "Performance Optimization", "Automated Testing", "Microservices Architecture"
];

const agentStack = [
  "OpenAI API", "LangChain", "Vector Databases", "RAG Architecture",
  "Prompt Orchestration", "Memory Systems", "Tool Calling", "Autonomous Workflow Agents"
];

const metrics = [
  { label: "99.99% Uptime", sub: "Enterprise Reliability" },
  { label: "<200ms Response", sub: "API Performance" },
  { label: "10M+ Requests", sub: "Handled Daily" },
  { label: "Enterprise-Scale", sub: "Global Deployments" },
  { label: "Global Cloud", sub: "Infrastructure" }
];

const partners = ["OpenAI", "AWS", "Microsoft Azure", "Google Cloud", "Docker", "NVIDIA", "GitHub", "MongoDB"];

const devTools = ["VS Code", "GitHub", "Postman", "Docker Desktop", "Jupyter", "Figma", "Vercel", "Netlify"];

const Technology = () => {
  const pageRef = useRef(null);
  const diagramRef = useRef(null);

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

      // Diagram animation
      const lines = diagramRef.current.querySelectorAll('.flow-line');
      lines.forEach((line, i) => {
        gsap.fromTo(line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            delay: i * 0.3,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: diagramRef.current,
              start: "top 60%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Metric counters
      gsap.from(".metric-card", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".metrics-grid",
          start: "top 80%",
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
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden pt-40 pb-24">

        {/* Background Images */}
        <div className="absolute inset-0 z-0">

          {/* Left Background Image */}
          <img
            src="/image1.png"
            alt="Technology Background"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-25"
          />

          {/* Right Overlay Image */}
          <img
            src="/image2.png"
            alt="Technology Overlay"
            className="absolute top-0 right-0 w-full h-full object-cover opacity-20 mix-blend-screen"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-white/70"></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-white"></div>

          {/* Glow Effects */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>

          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 
bg-emerald-400/10 border border-emerald-400/20 
backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgba(16,185,129,0.15)] 
mb-8 reveal-up group transition-all duration-300 hover:scale-105">

            {/* Glow Dot */}
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.9)]"></div>

            {/* Text */}
            <span className="text-emerald-600 font-semibold text-xs uppercase tracking-[0.28em]">
              Deep-Tech Engineering
            </span>

          </div>
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-700 mb-8 reveal-up leading-[0.9]">
            Technology That <br />
            <span className="text-blue-500 ">
              Powers Intelligence.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-black/70 font-light reveal-up mb-12 leading-relaxed">
            Macenza engineers cutting-edge AI infrastructure, scalable software systems,
            and intelligent digital architectures built for the future.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-6 reveal-up">

            <button className="btn-ai-primary">
              Explore Stack
            </button>


            <Link to="/contact"><button className="btn-ai-outline">
              Talk to Engineers
            </button></Link>
          </div>

        </div>
      </section>

      {/* Tech Stack Showcase */}
      <Section id="tech-stack" title="Our Technology Stack" subtitle="A robust, multi-layered foundation for the next generation of digital products.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((category, idx) => (
            <div key={idx} className="p-10 rounded-[3rem] glass-morphism border border-black/5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-colors transition-shadow duration-500 group reveal-up">
              <div className={`mb-8 p-5 rounded-2xl w-fit transition-all duration-500 text-4xl group-hover:scale-110 ${category.bgClass}`}>
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold text-black mb-6">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-black/5 rounded-full text-xs font-bold text-black/70 hover:bg-primary hover:text-white transition-all cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* AI Capabilities */}
      <Section id="ai-capabilities" className="relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[200px] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 reveal-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">AI <span className="text-primary italic">Capabilities</span></h2>
            <p className="text-xl text-black/60 font-light max-w-2xl mx-auto">Pushing the boundaries of what artificial intelligence can achieve for modern enterprise.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-up">
            {capabilities.map((cap, i) => (
              <div key={i} className="p-8 rounded-[2rem] glass-morphism border border-black/5 flex items-center gap-6 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group">
                <div className="w-3 h-3 bg-primary rounded-full group-hover:scale-150 transition-transform"></div>
                <span className="text-lg font-bold text-black">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* System Architecture Diagram */}
      <Section id="architecture" title="System Architecture" subtitle="How we structure complex digital ecosystems for scale and resilience.">
        <div ref={diagramRef} className="max-w-4xl mx-auto py-20 relative">
          <div className="flex flex-col items-center gap-16">
            {architectureSteps.map((step, i) => (
              <React.Fragment key={i}>
                <div className="w-full md:w-2/3 p-8 glass-morphism rounded-3xl border border-black/5 text-center shadow-lg hover:border-primary/40 transition-all duration-500 reveal-up">
                  <span className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2 block">Level 0{i + 1}</span>
                  <h4 className="text-2xl font-bold text-black">{step}</h4>
                </div>
                {i < architectureSteps.length - 1 && (
                  <div className="h-16 w-[2px] bg-gradient-to-b from-primary/40 to-transparent flow-line origin-top"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Section>

      {/* Security & Engineering Showcase */}
      <Section id="engineering" className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="reveal-up">
            <div className="flex items-center gap-4 mb-8">
              <Shield className="w-10 h-10 text-primary" />
              <h2 className="text-4xl font-bold text-black">Security & Infrastructure</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityFeatures.map((f, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <CheckCircle className="w-5 h-5 text-primary mt-1" />
                  <span className="text-black/70 font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-up">
            <div className="flex items-center gap-4 mb-8">
              <Terminal className="w-10 h-10 text-primary" />
              <h2 className="text-4xl font-bold text-black">Engineering Excellence</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {engineeringExcellence.map((f, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <CheckCircle className="w-5 h-5 text-primary mt-1" />
                  <span className="text-black/70 font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* AI Agent Stack */}
      <Section id="agent-stack" className="bg-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 reveal-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">AI Agent <span className="text-primary italic">Infrastructure</span></h2>
            <p className="text-xl text-black/60 font-light max-w-2xl mx-auto">The deep-tech stack powering our autonomous and semi-autonomous AI agents.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal-up">
            {agentStack.map((tech, i) => (
              <div key={i} className="p-8 rounded-3xl glass-morphism border border-black/5 hover:border-primary/30 transition-all text-center group shadow-sm">
                <div className="text-black font-bold group-hover:text-primary transition-colors">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Innovation Lab */}
      <Section id="innovation" className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">Macenza <span className="text-primary">Innovation Lab</span></h2>
            <p className="text-xl text-black/60 font-light leading-relaxed mb-10">
              Our dedicated R&D wing where we experiment with the next frontier of human-AI interaction, decentralized computing, and adaptive interfaces.
            </p>
            <div className="space-y-6">
              {[
                "Neural Interface Research", "Adaptive UI Prototypes", "LLM Fine-tuning Experiments", "Decentralized AI Infrastructure"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-lg font-medium text-black">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-video glass-morphism rounded-[3rem] border border-black/10 bg-black/90 shadow-2xl overflow-hidden reveal-up">
            <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
            <div className="p-10 font-mono text-xs text-primary/40 space-y-2">
              <div>&gt; INITIALIZING NEURAL_LAYER...</div>
              <div>&gt; CONNECTING TO CLOUD_CLUSTER_7...</div>
              <div>&gt; RUNNING EXPERIMENT_42: ADAPTIVE_LEARNING_PROTOCOL</div>
              <div className="text-white">&gt; SUCCESS: INTERFACE_ADAPTED</div>
              <div className="mt-10 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Metrics */}
      <Section id="metrics">
        <div className="metrics-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="metric-card p-6 sm:p-8 lg:p-6 xl:p-8 rounded-3xl sm:rounded-[2rem] glass-morphism border border-black/5 text-center shadow-sm flex flex-col justify-center">
              <div className="text-xl sm:text-2xl xl:text-3xl font-black text-black mb-2 tracking-tight leading-tight">{m.label}</div>
              <div className="text-[10px] sm:text-xs font-bold text-black/40 uppercase tracking-widest">{m.sub}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Partners */}
      <Section id="partners" className="py-20 border-y border-black/5">
        <div className="text-center mb-16 reveal-up">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-black/30 mb-12">Technology Ecosystem</h3>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-10 items-center opacity-40 hover:opacity-100 transition-opacity duration-700">
            {partners.map((p) => (
              <span key={p} className="text-2xl font-black text-black">{p}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* Developer Tools */}
      <Section id="dev-tools" title="Developer Tooling" subtitle="The precision instruments our engineers use to build excellence.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal-up">
          {devTools.map((tool, i) => (
            <div key={i} className="p-8 rounded-3xl border border-black/5 hover:border-primary/20 hover:shadow-xl transition-all duration-500 text-center group">
              <h4 className="font-bold text-black group-hover:text-primary transition-colors">{tool}</h4>
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
            Build Future-Ready <br /> <span className="text-primary italic">Technology.</span>
          </h2>
          <p className="text-2xl text-black/60 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Partner with Macenza to engineer intelligent systems designed for tomorrow.
          </p>
          <Link to="/contact" className="inline-block px-8 py-4 sm:px-16 sm:py-6 bg-primary text-white rounded-full font-bold text-base sm:text-xl hover:bg-black transition-all duration-300 shadow-xl shadow-primary/20 text-center whitespace-nowrap">
            Talk to Our Engineers
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export default Technology;
