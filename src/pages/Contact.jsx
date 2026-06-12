import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/Section';
import Footer from '../components/Footer';
import { Send, ChevronDown, Loader2 } from 'lucide-react';
import ReactGlobe from 'react-globe.gl';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { title: "Email", value: "info@macenza.com", icon: "✉️", bgClass: "bg-violet-500/10" },
  { title: "Business Inquiries", value: "shanki9414@gmail.com", icon: "💬", bgClass: "bg-teal-500/10" },
  { title: "Phone", value: "+91 94146 60123", icon: "📞", bgClass: "bg-emerald-500/10" },
  { title: "Working Hours", value: "Mon - Sat | 10 AM - 6 PM", icon: "⏰", bgClass: "bg-amber-500/10" }
];

const countries = [
  { name: "Rajasthan, India", city: "Headquarters", lat: 26.4499, lng: 74.6399, isHQ: true },
  { name: "Czech Republic", city: "Prague", lat: 50.0755, lng: 14.4378 },
  { name: "Australia", city: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "New Zealand", city: "Auckland", lat: -36.8485, lng: 174.7633 },
  { name: "United States", city: "New York", lat: 40.7128, lng: -74.0060 },
  { name: "France", city: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Dubai", city: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Uzbekistan", city: "Tashkent", lat: 41.2995, lng: 69.2401 },
  { name: "Thailand", city: "Bangkok", lat: 13.7563, lng: 100.5018 }
];

const arcsData = [
  { startLat: 26.4499, startLng: 74.6399, endLat: 50.0755, endLng: 14.4378, color: ['rgba(234, 88, 12, 0.9)', 'rgba(255, 255, 255, 1)', 'rgba(37, 99, 235, 1)'] }, // Ajmer to Prague
  { startLat: 26.4499, startLng: 74.6399, endLat: -33.8688, endLng: 151.2093, color: ['rgba(234, 88, 12, 0.9)', 'rgba(255, 255, 255, 1)', 'rgba(37, 99, 235, 1)'] }, // Ajmer to Sydney
  { startLat: 26.4499, startLng: 74.6399, endLat: -36.8485, endLng: 174.7633, color: ['rgba(234, 88, 12, 0.9)', 'rgba(255, 255, 255, 1)', 'rgba(37, 99, 235, 1)'] }, // Ajmer to Auckland
  { startLat: 26.4499, startLng: 74.6399, endLat: 40.7128, endLng: -74.0060, color: ['rgba(234, 88, 12, 0.9)', 'rgba(255, 255, 255, 1)', 'rgba(37, 99, 235, 1)'] }, // Ajmer to New York
  { startLat: 26.4499, startLng: 74.6399, endLat: 48.8566, endLng: 2.3522, color: ['rgba(234, 88, 12, 0.9)', 'rgba(255, 255, 255, 1)', 'rgba(37, 99, 235, 1)'] }, // Ajmer to Paris
  { startLat: 26.4499, startLng: 74.6399, endLat: 25.2048, endLng: 55.2708, color: ['rgba(234, 88, 12, 0.9)', 'rgba(255, 255, 255, 1)', 'rgba(37, 99, 235, 1)'] }, // Ajmer to Dubai
  { startLat: 26.4499, startLng: 74.6399, endLat: 41.2995, endLng: 69.2401, color: ['rgba(234, 88, 12, 0.9)', 'rgba(255, 255, 255, 1)', 'rgba(37, 99, 235, 1)'] }, // Ajmer to Tashkent
  { startLat: 26.4499, startLng: 74.6399, endLat: 13.7563, endLng: 100.5018, color: ['rgba(234, 88, 12, 0.9)', 'rgba(255, 255, 255, 1)', 'rgba(37, 99, 235, 1)'] }  // Ajmer to Bangkok
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
  const containerRef = useRef(null);
  const globeRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 700 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_type: 'AI Development',
    budget: '',
    details: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Name and Email are required.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          project_type: formData.project_type,
          budget: formData.budget,
          details: formData.details.trim()
        });

      if (error) throw error;

      toast.success('Message sent successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        project_type: 'AI Development',
        budget: '',
        details: ''
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight || 700
      });

      const handleResize = () => {
        if (containerRef.current) {
          setDimensions({
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight || 700
          });
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.0;
      controls.enableZoom = false;

      // Dynamically calculate the target camera zoom based on the viewport width
      const isMobile = window.innerWidth < 768;
      const targetAltitude = isMobile ? 2.5 : 1.8;
      globeRef.current.pointOfView({ altitude: targetAltitude });
    }
  }, [globeRef.current, dimensions.width]);

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

      // Reveal globe container when it enters viewport
      gsap.from(".globe-container", {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".globe-container",
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
      <section className="relative min-h-[80vh] lg:min-h-[85vh] flex flex-col items-center justify-start overflow-hidden pt-44 pb-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-left w-full flex flex-col items-start justify-center">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-primary/5 rounded-full text-primary font-bold text-xs uppercase tracking-widest mb-6 reveal-up">
              Connect With Macenza
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black mb-8 reveal-up leading-tight">
              Let's connect. <br />
              <span className="text-primary italic">Create the future.</span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-black/60 font-light reveal-up mb-12">
              Connect with Macenza to build AI solutions, software platforms, automation systems, and next-generation digital products.
            </p>
            <div className="flex justify-start reveal-up">
              <button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-5 bg-primary text-white rounded-full font-bold text-lg glow-blue hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/20 text-center"
              >
                Book Consultation
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
          <svg className="absolute left-[15%] top-[50%] w-[120px] h-[160px] text-primary/15 pointer-events-none z-0" fill="currentColor" viewBox="0 0 120 160">
            <pattern id="dotGridContact" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.5" />
            </pattern>
            <rect width="120" height="160" fill="url(#dotGridContact)" />
          </svg>

          {/* Glowing Tech Waves (Flowing data particles) */}
          <svg className="absolute right-[-10%] bottom-[-5%] w-[110%] h-[55%] pointer-events-none z-0" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="glowContact" cx="50%" cy="50%" r="50%">
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
            <circle cx="350" cy="320" r="14" fill="url(#glowContact)" opacity="0.7" className="animate-node-pulse" />
            <circle cx="350" cy="320" r="4" fill="#ffffff" className="animate-node-pulse" />

            <circle cx="550" cy="260" r="16" fill="url(#glowContact)" opacity="0.8" className="animate-node-pulse-delayed" />
            <circle cx="550" cy="260" r="5" fill="#ffffff" className="animate-node-pulse-delayed" />

            <circle cx="750" cy="200" r="12" fill="url(#glowContact)" opacity="0.6" className="animate-node-pulse" />
            <circle cx="750" cy="200" r="3.5" fill="#ffffff" className="animate-node-pulse" />

            <circle cx="200" cy="290" r="10" fill="url(#glowContact)" opacity="0.5" className="animate-node-pulse-delayed" />
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
                  <div className={`mb-4 w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all group-hover:scale-110 ${info.bgClass}`}>
                    {info.icon}
                  </div>
                  <h4 className="text-sm font-black text-black/30 uppercase tracking-[0.2em] mb-1">{info.title}</h4>
                  <p className="text-black font-bold break-words">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-up">
            <div className="glass-morphism rounded-[3rem] p-10 md:p-14 border border-black/5 shadow-2xl shadow-primary/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Phone Number</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Company Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none"
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Project Type</label>
                    <select
                      value={formData.project_type}
                      onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none appearance-none cursor-pointer"
                    >
                      <option>AI Development</option>
                      <option>Software Development</option>
                      <option>Automation</option>
                      <option>Mobile App</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Budget Range</label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none"
                      placeholder="Enter your budget range"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-black/40 ml-4">Project Details</label>
                  <textarea
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-primary/20 transition-all text-black font-medium outline-none min-h-[150px] resize-none"
                    placeholder="Describe your project vision..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-black transition-all duration-300 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      Sending... <Loader2 className="w-5 h-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Global Presence Map */}
      <Section id="global-presence" className="bg-white overflow-hidden">
        <div className="text-center mb-20 reveal-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">Our <span className="text-primary italic">Global Customers</span></h2>
          <p className="text-xl text-black/60 font-light max-w-3xl mx-auto leading-relaxed">
            Macenza works with clients and businesses across multiple international markets, bringing intelligent solutions to the world's most innovative regions.
          </p>
        </div>

        <div ref={containerRef} className="globe-container relative h-[380px] md:h-[700px] w-full overflow-hidden flex items-center justify-center">
          <ReactGlobe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl=""
            backgroundColor="rgba(0,0,0,0)"
            showAtmosphere={true}
            atmosphereColor="#2563eb"
            atmosphereAltitude={0.18}

            // Arcs
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.45}
            arcDashGap={2}
            arcDashAnimateTime={2000}
            arcStroke={0.8}
            arcAltitude={0.28}

            // Points (Rippling or glowing landmarks)
            pointsData={countries}
            pointLat="lat"
            pointLng="lng"
            pointColor={d => d.isHQ ? '#ea580c' : '#2563eb'}
            pointAltitude={d => d.isHQ ? 0.09 : 0.06}
            pointRadius={d => d.isHQ ? 0.8 : 0.5}

            // Labels
            labelsData={countries}
            labelLat="lat"
            labelLng="lng"
            labelText="city"
            labelSize={d => d.isHQ ? 2.0 : 1.5}
            labelColor={d => d.isHQ ? '#fff' : '#fff'}
            labelDotRadius={d => d.isHQ ? 0.8 : 0.5}
            labelResolution={2}
          />
        </div>
      </Section>

      {/* Why Businesses Choose Us */}
      <Section id="why-choose" title="Why Businesses Choose Us" subtitle="Excellence in engineering, driven by intelligence.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "AI-first engineering", icon: "🧠", desc: "Every solution is built with artificial intelligence at its core.", bg: "bg-violet-500/10" },
            { title: "Fast startup execution", icon: "⚡", desc: "We move at the speed of thought to bring your ideas to market.", bg: "bg-amber-500/10" },
            { title: "Enterprise-grade solutions", icon: "🛡️", desc: "Robust, secure, and reliable for high-stakes environments.", bg: "bg-blue-500/10" },
            { title: "Global delivery capability", icon: "🌐", desc: "Delivering world-class products across international borders.", bg: "bg-teal-500/10" },
            { title: "Scalable architecture", icon: "🚀", desc: "Cloud-native systems designed to grow with your ambition.", bg: "bg-pink-500/10" },
            { title: "Future-ready technology", icon: "🎯", desc: "Building the foundations for a smarter, digital tomorrow.", bg: "bg-rose-500/10" }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-black/5 shadow-sm reveal-up hover:border-primary/50 transition-colors duration-300 flex gap-6 items-start group">
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
        <div className="max-w-5xl mx-auto p-20 rounded-[4rem] bg-primary text-white relative overflow-hidden reveal-up">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
            Ready to Launch Your <br /> Next Big Idea?
          </h2>
          <p className="text-2xl text-white/80 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Partner with Macenza and build future-ready digital solutions.
          </p>
          <button
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative z-10 inline-block px-8 py-4 sm:px-16 sm:py-6 bg-white text-primary rounded-full font-bold text-base sm:text-xl hover:bg-dark hover:text-white transition-all duration-300 shadow-2xl whitespace-nowrap"
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
