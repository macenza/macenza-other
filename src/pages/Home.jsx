import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSequence from '../components/HeroSequence';
import HeroOverlay from '../components/HeroOverlay';
import Section from '../components/Section';
import Footer from '../components/Footer';
import { Cpu, Code, Globe, Smartphone, Zap, Cloud, ArrowRight } from 'lucide-react';
import LogoLoop from '../components/LogoLoop';

const Home = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Portfolio Cards Reveal Animation
      gsap.from(".portfolio-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#portfolio",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });

    // Refresh ScrollTrigger after a timeout to fix late rendering layout shifts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1500);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  const services = [
    { icon: <Cpu className="w-8 h-8 text-primary" />, title: "AI Development", desc: "Custom machine learning models and neural networks tailored to your business needs." },
    { icon: <Code className="w-8 h-8 text-primary" />, title: "Custom Software", desc: "Enterprise-grade software solutions built with scalability and performance in mind." },
    { icon: <Globe className="w-8 h-8 text-primary" />, title: "Web Applications", desc: "Next-generation web experiences using the latest frontend and backend technologies." },
    { icon: <Smartphone className="w-8 h-8 text-primary" />, title: "Mobile Apps", desc: "High-performance iOS and Android applications with seamless user interfaces." },
    { icon: <Zap className="w-8 h-8 text-primary" />, title: "Automation Solutions", desc: "Streamline your workflows with intelligent RPA and process automation." },
    { icon: <Cloud className="w-8 h-8 text-primary" />, title: "Cloud Infrastructure", desc: "Secure, scalable, and resilient cloud architectures for modern digital products." },
  ];

  const portfolioProjects = [
    {
      name: "DIPLIM.COM",
      category: "AI Fashion / Digital Creative Platform",
      desc: "AI-powered fashion visualization, futuristic branding, and premium digital creative experiences.",
      image: "/portfolio/diplim_fashion.png",
      buttonText: "View Project"
    },
    {
      name: "HRMS Platform",
      category: "Human Resource Management System",
      desc: "Complete employee management platform with payroll, attendance, leave tracking, recruitment, and analytics dashboards.",
      image: "/portfolio/hrms_saas.png",
      buttonText: "View Project"
    },
    {
      name: "AI Customer Support Agent",
      category: "AI Automation Platform",
      desc: "24/7 intelligent AI chatbot and voice assistant for customer support, lead qualification, and business automation.",
      image: "/portfolio/ai_support.png",
      buttonText: "View Project"
    },
    {
      name: "Manufacturing ERP System",
      category: "Enterprise Manufacturing Software",
      desc: "Advanced ERP system for production planning, inventory management, quality control, purchasing, and reporting.",
      image: "/portfolio/manufacturing_erp.png",
      buttonText: "View Project"
    }
  ];

  const techLogos = [
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">React</span>, title: "React", href: "https://react.dev" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">Next.js</span>, title: "Next.js", href: "https://nextjs.org" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">TypeScript</span>, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">Tailwind CSS</span>, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">Node.js</span>, title: "Node.js", href: "https://nodejs.org" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">Python</span>, title: "Python", href: "https://www.python.org" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">OpenAI</span>, title: "OpenAI", href: "https://openai.com" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">TensorFlow</span>, title: "TensorFlow", href: "https://www.tensorflow.org" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">AWS</span>, title: "AWS", href: "https://aws.amazon.com" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">Docker</span>, title: "Docker", href: "https://www.docker.com" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">PostgreSQL</span>, title: "PostgreSQL", href: "https://www.postgresql.org" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">NVIDIA</span>, title: "NVIDIA", href: "https://www.nvidia.com" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">Figma</span>, title: "Figma", href: "https://www.figma.com" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">GitHub</span>, title: "GitHub", href: "https://github.com" },
    { node: <span className="text-3xl font-black text-black/30 hover:text-primary transition-all duration-300 tracking-tight">Google</span>, title: "Google", href: "https://google.com" },
  ];

  const handleLoadingComplete = () => {
    ScrollTrigger.refresh();
  };

  return (
    <div className="relative">
      <div id="hero-trigger" className="relative">
        <HeroSequence onLoadingComplete={handleLoadingComplete}>
          <div className="hero-overlay-container absolute inset-0 z-30">
            <HeroOverlay />
          </div>
        </HeroSequence>
      </div>

      {/* Technology & Partners Logo Carousel */}
      <div className="py-16 bg-white border-y border-black/5 overflow-hidden">
        <div className="container mx-auto px-6 mb-8">
          <p className="text-xs font-bold text-center text-black/40 uppercase tracking-[0.25em]">
            Empowering Next-Gen AI & Core Tech Stacks
          </p>
        </div>
        <LogoLoop
          logos={techLogos}
          speed={40}
          direction="left"
          logoHeight={48}
          gap={60}
          fadeOut={true}
          fadeOutColor="#ffffff"
          scaleOnHover={true}
          pauseOnHover={true}
          ariaLabel="Technology Partners and Tools Loop"
        />
      </div>

      <Section
        id="services"
        title="Our Expertise"
        subtitle="We combine deep technical knowledge with creative thinking to solve the world's most complex digital challenges."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-10 rounded-3xl border border-dark/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group"
            >
              <div className="mb-6 p-4 bg-primary/5 rounded-2xl w-fit group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                {React.cloneElement(service.icon, { className: "w-8 h-8 group-hover:text-white transition-colors" })}
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">{service.title}</h3>
              <p className="text-black/60 font-light leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="why-macenza" className="bg-white text-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-black">
              Why <span className="text-primary">Macenza?</span>
            </h2>
            <div className="space-y-8">
              {[
                { title: "AI-First Engineering", desc: "We don't just add AI; we build systems from the ground up with artificial intelligence at the core." },
                { title: "Fast Product Delivery", desc: "Our agile methodology ensures your product goes from concept to launch in record time without compromising quality." },
                { title: "Scalable Architecture", desc: "We build for tomorrow, ensuring your infrastructure grows seamlessly with your user base." },
                { title: "Enterprise-Grade Systems", desc: "Security and reliability are non-negotiable. We deliver production-ready code for the most demanding environments." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-black">{item.title}</h4>
                    <p className="text-black/60 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <img
              src="/macenza-ad.png"
              alt="AI Technology"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
            />
          </div>
        </div>
      </Section>

      <Section
        id="portfolio"
        title="Selected Works"
        subtitle="Explore our portfolio of groundbreaking projects across various industries."
        className="bg-white text-black"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {portfolioProjects.map((project, index) => (
            <div
              key={index}
              className="portfolio-card group relative rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-black/5 hover:border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.12)] p-6 md:p-8 transition-all duration-700 ease-out flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 shadow-[0_15px_35px_rgba(0,0,0,0.05)] border border-black/5">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[800ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-500">
                    <span className="px-6 py-3 bg-white/95 backdrop-blur-md text-black rounded-full font-bold text-sm shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                      {project.buttonText} <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-primary text-xs font-black tracking-[0.2em] uppercase">
                    {project.category}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-xs font-bold text-black/40 group-hover:text-primary group-hover:border-primary/30 transition-colors duration-300">
                    0{index + 1}
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-black group-hover:text-primary transition-colors duration-300 tracking-tight">
                  {project.name}
                </h3>
                <p className="text-black/60 font-light mt-4 leading-relaxed text-[0.95rem] md:text-base">
                  {project.desc}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" className="text-center bg-white">
        <div className="max-w-4xl mx-auto py-20 px-10 rounded-[4rem] bg-black text-white relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
            Build the <span className="text-primary">Future</span> with Macenza
          </h2>
          <p className="text-xl text-white/60 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Our team of experts is standing by to help you build the next big thing.
          </p>
          <button className="px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-xl shadow-white/5">
            Get in Touch
          </button>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Home;
