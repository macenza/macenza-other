import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/Section';
import Footer from '../components/Footer';
import { 
  Rocket, Brain, Target, Zap, Lightbulb, Globe,
  Search, ArrowRight, CheckCircle2, Star, Users,
  Heart, Briefcase, MapPin, Clock, ArrowDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const jobs = [
  { title: "Frontend Engineer", location: "Remote", type: "Full Time" },
  { title: "Backend Developer", location: "Remote", type: "Full Time" },
  { title: "AI Engineer", location: "Remote", type: "Full Time" },
  { title: "Machine Learning Engineer", location: "Remote", type: "Full Time" },
  { title: "UI/UX Designer", location: "Remote", type: "Full Time" },
  { title: "DevOps Engineer", location: "Remote", type: "Full Time" },
  { title: "Mobile App Developer", location: "Remote", type: "Full Time" },
  { title: "Product Manager", location: "Remote", type: "Full Time" },
];

const culturePoints = [
  "Fast-paced innovation", "AI-first mindset", "Remote collaboration",
  "Creative engineering", "Rapid experimentation", "Startup ownership"
];

const hiringSteps = [
  "Application Review", "Initial Screening", "Technical Interview",
  "Team Discussion", "Final Interview", "Offer & Onboarding"
];

const benefits = [
  "Remote Work Flexibility", "Competitive Salary", "Learning Budget",
  "Innovation Projects", "Flexible Work Hours", "Global Collaboration",
  "Career Growth", "Creative Work Culture"
];

const testimonials = [
  {
    name: "Elena Volkov",
    role: "Senior AI Engineer",
    content: "Working at Macenza feels like living in the future. We don't just use AI; we build the infrastructure that makes it meaningful.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop"
  },
  {
    name: "Marcus Thorne",
    role: "Lead Designer",
    content: "The creative freedom here is unmatched. Every pixel and interaction we design aims to redefine human-technology boundaries.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop"
  }
];

const Careers = () => {
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

      // Stagger job cards once the job grid enters the viewport
      gsap.from(".job-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".job-grid",
          start: "top 75%",
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
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${item === "Careers" ? "text-primary font-bold" : "text-black/70 hover:text-primary"}`}
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
      <section className="relative min-h-[75vh] flex flex-col items-center justify-start overflow-hidden pt-44 pb-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-2 bg-primary/5 rounded-full text-primary font-bold text-xs uppercase tracking-widest mb-6 reveal-up">
            Join the Revolution
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black mb-8 reveal-up leading-tight">
            Build the Future <br /> 
            <span className="text-primary italic">With Macenza.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-black/60 font-light reveal-up mb-12">
            Join a team of innovators, engineers, AI builders, and creators shaping the future of intelligent technology.
          </p>
          <div className="flex flex-wrap justify-center gap-6 reveal-up">
            <button className="px-10 py-5 bg-primary text-white rounded-full font-bold text-lg glow-blue hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/20 flex items-center gap-3">
              View Open Positions <ArrowDown className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 glass-morphism text-black rounded-full font-bold text-lg hover:bg-white/40 transition-all duration-300 border border-black/5">
              Join Our Mission
            </button>
          </div>
        </div>
      </section>

      {/* Why Join Macenza */}
      <Section id="why-join" title="Why Work With Us" subtitle="Relentless innovation meets radical ownership.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Startup Speed", icon: <Zap />, desc: "Work in a fast-moving environment where ideas become products quickly." },
            { title: "AI Innovation", icon: <Brain />, desc: "Build cutting-edge AI systems, automation tools, and next-gen digital products." },
            { title: "Ownership Culture", icon: <Target />, desc: "Take ownership like a founder and shape meaningful technology." },
            { title: "Learning Growth", icon: <Rocket />, desc: "Continuous technical learning, mentorship, and innovation." },
            { title: "Creative Freedom", icon: <Lightbulb />, desc: "Experiment, create, and solve problems without unnecessary barriers." },
            { title: "Global Opportunities", icon: <Globe />, desc: "Collaborate with international teams and global clients." }
          ].map((feature, i) => (
            <div key={i} className="p-10 rounded-[3rem] glass-morphism border border-black/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group reveal-up">
              <div className="mb-8 p-5 bg-primary/5 rounded-2xl w-fit group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                {React.cloneElement(feature.icon, { className: "w-8 h-8 group-hover:text-white transition-colors" })}
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">{feature.title}</h3>
              <p className="text-black/60 font-light leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Company Culture Showcase */}
      <Section id="culture" className="bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[150px] -rotate-12 translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto text-center mb-20 reveal-up relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Life at <span className="text-primary italic">Macenza</span></h2>
          <p className="text-xl text-white/60 font-light leading-relaxed">
            We don't just build software; we build a culture of relentless innovation. At Macenza, every engineer is a founder, and every designer is an architect of the future.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10 reveal-up">
          {culturePoints.map((point, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary transition-all duration-300 text-center group">
              <div className="mb-4 w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform">
                <Star className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold block leading-tight">{point}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Open Positions */}
      <Section id="positions" title="Current Open Roles" subtitle="Find your place in the future of intelligence.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 job-grid">
          {jobs.map((job, i) => (
            <div key={i} className="job-card p-10 rounded-[2.5rem] border border-black/5 hover:border-primary/20 hover:shadow-xl transition-colors transition-shadow duration-500 group flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h4 className="text-2xl font-bold text-black mb-2 group-hover:text-primary transition-colors">{job.title}</h4>
                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-1.5 text-black/40 text-sm font-medium">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-black/40 text-sm font-medium">
                    <Clock className="w-4 h-4" /> {job.type}
                  </span>
                </div>
              </div>
              <button className="px-8 py-4 bg-black text-white rounded-full font-bold text-sm hover:bg-primary transition-all duration-300 shadow-lg group-hover:shadow-primary/20">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* Hiring Process */}
      <Section id="process" className="bg-white text-black overflow-hidden">
        <div className="text-center mb-20 reveal-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-black">Our Hiring <span className="text-primary italic">Journey</span></h2>
        </div>
        <div className="relative reveal-up">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/10 hidden lg:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
            {hiringSteps.map((step, i) => (
              <div key={i} className="relative z-10 group">
                <div className="mb-6 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-125 transition-transform duration-500">
                  {i + 1}
                </div>
                <h4 className="text-lg font-bold mb-2 text-black">{step}</h4>
                <div className="w-8 h-[2px] bg-primary/20 group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section id="benefits" title="Perks & Benefits" subtitle="We invest in our people as much as our technology.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal-up">
          {benefits.map((benefit, i) => (
            <div key={i} className="p-8 rounded-[2rem] border border-black/5 hover:border-primary/20 hover:shadow-lg transition-all duration-500 text-center group">
              <div className="mb-6 w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-black text-sm uppercase tracking-wider">{benefit}</h4>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="p-12 rounded-[3rem] glass-morphism border border-black/5 reveal-up hover:shadow-2xl transition-colors transition-shadow duration-500 flex flex-col md:flex-row gap-8 items-center md:items-start">
              <img src={t.image} alt={t.name} className="w-24 h-24 rounded-full object-cover shadow-xl border-4 border-white" />
              <div>
                <p className="text-xl text-black/70 font-light italic leading-relaxed mb-8">"{t.content}"</p>
                <h4 className="text-lg font-bold text-black">{t.name}</h4>
                <p className="text-sm text-primary font-bold uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Team Gallery Placeholder */}
      <Section id="gallery" title="Meet the Builders" subtitle="A diverse team united by a singular vision.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal-up">
          {[
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600",
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600",
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600"
          ].map((img, i) => (
            <div key={i} className="aspect-[4/3] rounded-[2rem] overflow-hidden group">
              <img src={img} alt="Team Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
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
            Ready to Build <br /> <span className="text-primary italic">What’s Next?</span>
          </h2>
          <p className="text-2xl text-black/60 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Join Macenza and shape the future of AI, software, and digital innovation.
          </p>
          <button className="px-16 py-6 bg-primary text-white rounded-full font-bold text-xl hover:bg-black transition-all duration-300 shadow-xl shadow-primary/20">
            Apply Now
          </button>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Careers;
