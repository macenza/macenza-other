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
    icon: <Monitor className="w-8 h-8" />,
    technologies: ["React", "Next.js", "Vue.js", "TailwindCSS", "TypeScript", "GSAP"]
  },
  {
    name: "Backend Engineering",
    icon: <Server className="w-8 h-8" />,
    technologies: ["Node.js", "Python", "FastAPI", "Express.js", "Django", "NestJS"]
  },
  {
    name: "Mobile Engineering",
    icon: <Smartphone className="w-8 h-8" />,
    technologies: ["Flutter", "React Native", "Swift", "Kotlin"]
  },
  {
    name: "Databases",
    icon: <Database className="w-8 h-8" />,
    technologies: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"]
  },
  {
    name: "AI / Machine Learning",
    icon: <Brain className="w-8 h-8" />,
    technologies: ["OpenAI", "LangChain", "TensorFlow", "PyTorch", "Hugging Face", "LlamaIndex"]
  },
  {
    name: "Cloud & DevOps",
    icon: <Cloud className="w-8 h-8" />,
    technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "GitHub Actions"]
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
      // Reveal animations
      gsap.from(".reveal-up", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".reveal-up",
          start: "top 85%",
        }
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
        }
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-white text-black min-h-screen">
      {/* Simple Navbar */}
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
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${item === "Technology" ? "text-primary font-bold" : "text-black/70 hover:text-primary"}`}
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
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05)_0%,transparent_50%)]"></div>
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-block px-4 py-2 bg-primary/5 rounded-full text-primary font-bold text-xs uppercase tracking-widest mb-6 reveal-up">
            Deep-Tech Engineering
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black mb-8 reveal-up leading-[0.9]">
            Technology That <br /> 
            <span className="text-primary italic">Powers Intelligence.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-black/60 font-light reveal-up mb-12">
            Macenza engineers cutting-edge AI infrastructure, scalable software systems, and intelligent digital architectures built for the future.
          </p>
          <div className="flex flex-wrap justify-center gap-6 reveal-up">
            <button className="px-10 py-5 bg-primary text-white rounded-full font-bold text-lg glow-blue hover:bg-primary-dark transition-all duration-300 flex items-center gap-3 shadow-xl shadow-primary/20">
              Explore Stack <ArrowDown className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 glass-morphism text-black rounded-full font-bold text-lg hover:bg-white/40 transition-all duration-300 border border-black/5">
              Talk to Engineers
            </button>
          </div>

          {/* Visual Element Placeholder */}
          <div className="mt-20 w-full max-w-4xl aspect-[21/9] glass-morphism rounded-[3rem] border border-black/5 flex items-center justify-center relative overflow-hidden reveal-up">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
            <div className="flex gap-10 items-center animate-float opacity-50">
              <Cpu className="w-20 h-20 text-primary" />
              <div className="w-[1px] h-20 bg-black/10"></div>
              <Code className="w-20 h-20 text-accent" />
              <div className="w-[1px] h-20 bg-black/10"></div>
              <Layers className="w-20 h-20 text-primary" />
            </div>
            <div className="absolute top-10 left-10 text-[10px] font-mono text-black/20 text-left">
              {"{ \"status\": \"optimized\", \"agent\": \"active\", \"load\": 0.12 }"}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <Section id="tech-stack" title="Our Technology Stack" subtitle="A robust, multi-layered foundation for the next generation of digital products.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((category, idx) => (
            <div key={idx} className="p-10 rounded-[3rem] glass-morphism border border-black/5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group reveal-up">
              <div className="mb-8 p-5 bg-primary/5 rounded-2xl w-fit group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                {React.cloneElement(category.icon, { className: "w-8 h-8 group-hover:text-white transition-colors" })}
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
      <Section id="ai-capabilities" className="bg-black text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[200px] opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 reveal-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">AI <span className="text-primary italic">Capabilities</span></h2>
            <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">Pushing the boundaries of what artificial intelligence can achieve for modern enterprise.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-up">
            {capabilities.map((cap, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex items-center gap-6 hover:bg-white/10 hover:border-primary transition-all duration-300 group">
                <div className="w-3 h-3 bg-primary rounded-full group-hover:scale-150 transition-transform"></div>
                <span className="text-lg font-bold">{cap}</span>
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
      <Section id="innovation" className="bg-black text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Macenza <span className="text-primary">Innovation Lab</span></h2>
            <p className="text-xl text-white/60 font-light leading-relaxed mb-10">
              Our dedicated R&D wing where we experiment with the next frontier of human-AI interaction, decentralized computing, and adaptive interfaces.
            </p>
            <div className="space-y-6">
              {[
                "Neural Interface Research", "Adaptive UI Prototypes", "LLM Fine-tuning Experiments", "Decentralized AI Infrastructure"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-video glass-morphism rounded-[3rem] border border-white/10 overflow-hidden reveal-up">
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
        <div className="metrics-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {metrics.map((m, i) => (
            <div key={i} className="metric-card p-10 rounded-[2.5rem] glass-morphism border border-black/5 text-center shadow-sm">
              <div className="text-4xl md:text-5xl font-black text-black mb-2 tracking-tighter">{m.label}</div>
              <div className="text-xs font-bold text-black/40 uppercase tracking-widest">{m.sub}</div>
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
          <button className="px-16 py-6 bg-primary text-white rounded-full font-bold text-xl hover:bg-black transition-all duration-300 shadow-xl shadow-primary/20">
            Talk to Our Engineers
          </button>
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
