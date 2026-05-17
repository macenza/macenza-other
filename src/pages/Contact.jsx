import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/Section';
import Footer from '../components/Footer';
import { 
  Mail, Phone, Clock, Globe, MapPin, MessageSquare, 
  Send, ChevronDown, CheckCircle2, Shield, Rocket,
  Zap, Brain, Target, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { title: "Email", value: "hello@macenza.com", icon: <Mail /> },
  { title: "Business Inquiries", value: "projects@macenza.com", icon: <MessageSquare /> },
  { title: "Phone", value: "+91 Business Contact Number", icon: <Phone /> },
  { title: "Working Hours", value: "Mon - Sat | 9 AM - 7 PM", icon: <Clock /> }
];

const countries = [
  { name: "Czech Republic", city: "Prague", top: "35%", left: "48%" },
  { name: "Australia", city: "Sydney", top: "75%", left: "85%" },
  { name: "New Zealand", city: "Auckland", top: "82%", left: "92%" },
  { name: "United States", city: "New York", top: "40%", left: "25%" },
  { name: "France", city: "Paris", top: "38%", left: "45%" },
  { name: "Dubai", city: "Dubai", top: "52%", left: "58%" },
  { name: "Uzbekistan", city: "Tashkent", top: "42%", left: "62%" },
  { name: "Thailand", city: "Bangkok", top: "60%", left: "75%" }
];

const faqs = [
  {
    question: "How quickly can Macenza start a project?",
    answer: "We typically initiate projects within 1-2 weeks after the initial strategy session. Our agile onboarding process ensures that we align on goals and technical requirements rapidly to move from concept to development at startup speed."
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, Macenza operates on a global scale. We have successfully delivered AI and software solutions to clients across the US, Europe, Middle East, and Asia-Pacific. Our remote-first culture ensures seamless collaboration regardless of time zones."
  },
  {
    question: "Can Macenza build AI products from scratch?",
    answer: "Absolutely. We specialize in end-to-end AI product development. From R&D and data modeling to deploying scalable LLM-powered applications and autonomous agents, we provide the full engineering stack required for intelligent innovation."
  },
  {
    question: "Do you offer dedicated teams?",
    answer: "Yes, we offer dedicated development teams for long-term partnerships. This model allows businesses to extend their internal capabilities with our specialized AI engineers, developers, and designers working exclusively on their product roadmap."
  }
];

const Contact = () => {
  const pageRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);

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

      // Animate map markers when the map container enters the viewport
      gsap.from(".map-marker", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".map-container",
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
      {/* Simple Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] h-[78px] glass-morphism rounded-full px-8 flex items-center justify-between z-[9999] pointer-events-auto shadow-xl">
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
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${item === "Contact" ? "text-primary font-bold" : "text-black/70 hover:text-primary"}`}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-black/60 hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/contact" className="px-6 py-3 bg-primary text-white rounded-full font-bold text-sm glow-blue hover:bg-primary-dark transition-all duration-300 active:scale-95">
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
            Connect With Macenza
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black mb-8 reveal-up leading-tight">
            Let’s Build Something <br /> 
            <span className="text-primary italic">Extraordinary.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-black/60 font-light reveal-up mb-12">
            Connect with Macenza to build AI solutions, software platforms, automation systems, and next-generation digital products.
          </p>
          <div className="flex justify-center reveal-up">
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-5 bg-primary text-white rounded-full font-bold text-lg glow-blue hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/20 text-center"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Split Layout */}
      <Section id="contact-form">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="reveal-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight text-black">
              Get <span className="text-primary">In Touch</span>
            </h2>
            <p className="text-black/60 text-lg font-light mb-12 leading-relaxed">
              Have a visionary project in mind? Our team of engineers and AI experts is ready to transform your ideas into scalable reality. Fill out the form, and we'll get back to you within 24 hours.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {contactInfo.map((info, i) => (
                <div key={i} className="p-8 rounded-[2rem] glass-morphism border border-black/5 hover:border-primary/20 transition-all group">
                  <div className="mb-4 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {React.cloneElement(info.icon, { className: "w-5 h-5" })}
                  </div>
                  <h4 className="text-sm font-black text-black/30 uppercase tracking-[0.2em] mb-1">{info.title}</h4>
                  <p className="text-black font-bold break-words">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-up">
            <div className="glass-morphism rounded-[3rem] p-10 md:p-14 border border-black/5 shadow-2xl shadow-primary/5">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Email Address</label>
                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Phone Number</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none" placeholder="+1 234 567 890" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Company Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none" placeholder="Acme Inc." />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Project Type</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none appearance-none cursor-pointer">
                      <option>AI Development</option>
                      <option>Software Development</option>
                      <option>Automation</option>
                      <option>Mobile App</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Budget Range</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none appearance-none cursor-pointer">
                      <option>$10k - $25k</option>
                      <option>$25k - $50k</option>
                      <option>$50k - $100k</option>
                      <option>$100k+</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Project Details</label>
                  <textarea className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none min-h-[150px] resize-none" placeholder="Describe your project vision..."></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-black transition-all duration-300 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98]">
                  Send Message <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Global Presence Map */}
      <Section id="global-presence" className="bg-white overflow-hidden">
        <div className="text-center mb-20 reveal-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">Our <span className="text-primary italic">Global Presence</span></h2>
          <p className="text-xl text-black/60 font-light max-w-3xl mx-auto leading-relaxed">
            Macenza works with clients and businesses across multiple international markets, bringing intelligent solutions to the world's most innovative regions.
          </p>
        </div>
        
        <div className="map-container relative aspect-[21/9] w-full glass-morphism rounded-[3rem] border border-black/5 overflow-hidden reveal-up shadow-inner bg-black/5">
          {/* Simple Vector-style Map Background Placeholder */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-center bg-no-repeat bg-contain"></div>
          
          {countries.map((country, i) => (
            <div 
              key={i} 
              className="map-marker absolute group cursor-pointer" 
              style={{ top: country.top, left: country.left }}
            >
              <div className="w-4 h-4 bg-primary rounded-full glow-blue animate-pulse relative z-10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/20 rounded-full animate-ping"></div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0">
                <div className="glass-morphism px-4 py-2 rounded-xl border border-black/5 shadow-xl text-center whitespace-nowrap">
                  <div className="text-[10px] font-black text-primary uppercase tracking-widest">{country.name}</div>
                  <div className="text-sm font-bold text-black">{country.city}</div>
                </div>
                <div className="w-2 h-2 bg-white border-r border-b border-black/5 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
              </div>
            </div>
          ))}

          {/* Connection Lines simulation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <path d="M25% 40% Q 40% 30%, 45% 38%" stroke="var(--primary)" strokeWidth="1" fill="none" strokeDasharray="5,5" className="animate-dash" />
            <path d="M45% 38% Q 50% 35%, 58% 52%" stroke="var(--primary)" strokeWidth="1" fill="none" strokeDasharray="5,5" className="animate-dash" />
            <path d="M58% 52% Q 65% 55%, 75% 60%" stroke="var(--primary)" strokeWidth="1" fill="none" strokeDasharray="5,5" className="animate-dash" />
            <path d="M75% 60% Q 80% 65%, 85% 75%" stroke="var(--primary)" strokeWidth="1" fill="none" strokeDasharray="5,5" className="animate-dash" />
          </svg>
        </div>
      </Section>

      {/* Why Businesses Choose Us */}
      <Section id="why-choose" title="Why Businesses Choose Us" subtitle="Excellence in engineering, driven by intelligence.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "AI-first engineering", icon: <Brain />, desc: "Every solution is built with artificial intelligence at its core." },
            { title: "Fast startup execution", icon: <Zap />, desc: "We move at the speed of thought to bring your ideas to market." },
            { title: "Enterprise-grade solutions", icon: <Shield />, desc: "Robust, secure, and reliable for high-stakes environments." },
            { title: "Global delivery capability", icon: <Globe />, desc: "Delivering world-class products across international borders." },
            { title: "Scalable architecture", icon: <Rocket />, desc: "Cloud-native systems designed to grow with your ambition." },
            { title: "Future-ready technology", icon: <Target />, desc: "Building the foundations for a smarter, digital tomorrow." }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-black/5 shadow-sm reveal-up hover:border-primary/50 transition-colors duration-300 flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                {React.cloneElement(item.icon, { className: "w-6 h-6" })}
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-3 text-black">{item.title}</h4>
                <p className="text-black/50 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq" title="Frequently Asked Questions" subtitle="Quick answers to common inquiries about working with Macenza.">
        <div className="max-w-4xl mx-auto space-y-4 reveal-up">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-3xl border border-black/5 overflow-hidden transition-all duration-300 hover:border-primary/20">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full px-10 py-8 flex items-center justify-between text-left group"
              >
                <span className="text-xl font-bold text-black group-hover:text-primary transition-colors">{faq.question}</span>
                <ChevronDown className={`w-6 h-6 text-black/20 group-hover:text-primary transition-all duration-500 ${activeFaq === i ? 'rotate-180 text-primary' : ''}`} />
              </button>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeFaq === i ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-10 pb-10 text-black/60 font-light leading-relaxed">
                  {faq.answer}
                </div>
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
            Ready to Launch Your <br /> <span className="text-primary italic">Next Big Idea?</span>
          </h2>
          <p className="text-2xl text-black/60 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Partner with Macenza and build future-ready digital solutions.
          </p>
          <button 
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-16 py-6 bg-primary text-white rounded-full font-bold text-xl hover:bg-black transition-all duration-300 shadow-xl shadow-primary/20"
          >
            Start Your Project
          </button>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Contact;
