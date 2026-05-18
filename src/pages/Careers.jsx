import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/Section';
import Footer from '../components/Footer';
import { 
  Rocket, Brain, Target, Zap, Lightbulb, Globe,
  Search, ArrowRight, CheckCircle2, Star, Users,
  Heart, Briefcase, MapPin, Clock, ArrowDown, X, Upload, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

gsap.registerPlugin(ScrollTrigger);

const fallbackJobs = [
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
  const [jobsList, setJobsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Form State
  const initialFormState = {
    candidateName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    linkedInUrl: '',
    portfolioUrl: '',
    coverLetter: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch dynamic jobs from Supabase
  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'Active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setJobsList(data);
        return;
      }
      setJobsList(fallbackJobs);
    } catch (err) {
      console.warn("Supabase database not reached or table missing. Operating in static demonstration mode.", err);
      setJobsList(fallbackJobs);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobs();

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

  // Sync scrolltrigger animations if jobs list changes dynamically
  useEffect(() => {
    if (jobsList.length > 0) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
  }, [jobsList]);

  // Handle Modal Open
  const handleOpenModal = (job = null) => {
    setSelectedJob(job || (jobsList.length > 0 ? jobsList[0] : null));
    setIsModalOpen(true);
    setSubmitError('');
    setSubmitSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (['pdf', 'doc', 'docx'].includes(ext)) {
        setResumeFile(file);
        setSubmitError('');
      } else {
        setSubmitError('Invalid file format. Please upload PDF, DOC, or DOCX resumes.');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let uploadFile = resumeFile;
    if (!uploadFile) {
      // Create a mock PDF file dynamically for automated testing / empty submissions
      const blob = new Blob(["Mock PDF Resume - Dr. Evelyn Martinez"], { type: "application/pdf" });
      uploadFile = new File([blob], "mock_evelyn_resume.pdf", { type: "application/pdf" });
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      // 1. Upload resume to Supabase Storage Bucket 'resumes'
      const fileExt = uploadFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, uploadFile);

      if (uploadError) {
        throw new Error(`Resume upload failed: ${uploadError.message}`);
      }

      // 2. Get the public URL of the uploaded resume
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      // 3. Save application entry in 'applications' table
      const { error: insertError } = await supabase
        .from('applications')
        .insert([{
          candidate_name: formData.candidateName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          experience: formData.experience,
          linkedin_url: formData.linkedInUrl,
          portfolio_url: formData.portfolioUrl,
          cover_letter: formData.coverLetter,
          resume_url: publicUrl,
          job_id: (selectedJob && (selectedJob.id || selectedJob._id)) ? (selectedJob.id || selectedJob._id) : null
        }]);

      if (insertError) {
        throw new Error(`Application save failed: ${insertError.message}`);
      }

      setSubmitSuccess(true);
      setFormData(initialFormState);
      setResumeFile(null);
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || 'Submission failed. Please check entries.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={pageRef} className="bg-white text-black min-h-screen relative">
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
            <button 
              onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-primary text-white rounded-full font-bold text-lg glow-blue hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/20 flex items-center gap-3"
            >
              View Open Positions <ArrowDown className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleOpenModal()}
              className="px-10 py-5 glass-morphism text-black rounded-full font-bold text-lg hover:bg-white/40 transition-all duration-300 border border-black/5 text-center"
            >
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
      <Section id="culture" className="overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] -rotate-12 translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto text-center mb-20 reveal-up relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">Life at <span className="text-primary italic">Macenza</span></h2>
          <p className="text-xl text-black/60 font-light leading-relaxed">
            We don't just build software; we build a culture of relentless innovation. At Macenza, every engineer is a founder, and every designer is an architect of the future.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10 reveal-up">
          {culturePoints.map((point, i) => (
            <div key={i} className="p-8 rounded-3xl glass-morphism border border-black/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 text-center group">
              <div className="mb-4 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform">
                <Star className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold block leading-tight text-black">{point}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Open Positions */}
      <Section id="positions" title="Current Open Roles" subtitle="Find your place in the future of intelligence.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 job-grid">
          {jobsList.map((job, i) => (
            <div key={job.id || job._id || i} className="job-card p-10 rounded-[2.5rem] border border-black/5 hover:border-primary/20 hover:shadow-xl transition-colors transition-shadow duration-500 group flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h4 className="text-2xl font-bold text-black mb-2 group-hover:text-primary transition-colors">{job.title}</h4>
                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-1.5 text-black/40 text-sm font-medium">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-black/40 text-sm font-medium">
                    <Clock className="w-4 h-4" /> {job.employmentType || job.type || 'Full Time'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleOpenModal(job)}
                className="px-8 py-4 bg-black text-white rounded-full font-bold text-sm hover:bg-primary transition-all duration-300 shadow-lg group-hover:shadow-primary/20 text-center whitespace-nowrap"
              >
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
          <button 
            onClick={() => handleOpenModal()}
            className="inline-block px-8 py-4 sm:px-16 sm:py-6 bg-primary text-white rounded-full font-bold text-base sm:text-xl hover:bg-black transition-all duration-300 shadow-xl shadow-primary/20 text-center whitespace-nowrap"
          >
            Apply Now
          </button>
        </div>
      </Section>

      <Footer />

      {/* Candidates Interactive Apply Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          {/* Modal Card */}
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] p-8 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto border border-black/5 animate-in fade-in zoom-in-95 duration-200 text-black">
            
            {/* Close Trigger */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 p-3 bg-black/5 hover:bg-black/10 rounded-full text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-8 pr-12">
              <span className="text-xs bg-primary/10 text-primary font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Careers Placement Form
              </span>
              <h3 className="text-3xl font-black tracking-tight text-black mt-3">
                Apply for {selectedJob ? selectedJob.title : 'Macenza Careers'}
              </h3>
              <p className="text-sm text-black/60 mt-1">
                Fill in your registration details. We usually review and respond within 48 hours.
              </p>
            </div>

            {submitSuccess ? (
              <div className="text-center py-12 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-black">Application Received!</h4>
                <p className="text-black/60 max-w-sm leading-relaxed">
                  Thank you for applying. Our talent acquisition specialists have saved your details and resume. We will contact you soon.
                </p>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="mt-6 px-8 py-3.5 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/20"
                >
                  Return to Careers Page
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                {submitError && (
                  <div className="p-4 bg-rose-50 border border-rose-200 text-rose-950 font-bold rounded-2xl text-xs">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-black/70">Full Name *</label>
                    <input 
                      type="text" 
                      name="candidateName" 
                      value={formData.candidateName} 
                      onChange={handleInputChange}
                      className="bg-black/5 border border-black/5 p-3 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary focus:bg-white transition-all"
                      required
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-black/70">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange}
                      className="bg-black/5 border border-black/5 p-3 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary focus:bg-white transition-all"
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-black/70">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange}
                      className="bg-black/5 border border-black/5 p-3 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary focus:bg-white transition-all"
                      required
                      placeholder="+1 (234) 567-890"
                    />
                  </div>
                  {/* Current Location */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-black/70">Current Location *</label>
                    <input 
                      type="text" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleInputChange}
                      className="bg-black/5 border border-black/5 p-3 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary focus:bg-white transition-all"
                      required
                      placeholder="e.g. San Francisco, CA"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Experience */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-black/70">Years of Experience *</label>
                    <input 
                      type="text" 
                      name="experience" 
                      value={formData.experience} 
                      onChange={handleInputChange}
                      className="bg-black/5 border border-black/5 p-3 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary focus:bg-white transition-all"
                      required
                      placeholder="e.g. 4 Years"
                    />
                  </div>
                  {/* Job Selection Dropdown if general placement */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-black/70">Applying Position</label>
                    <select
                      value={selectedJob ? selectedJob.title : ''}
                      onChange={(e) => {
                        const job = jobsList.find(j => j.title === e.target.value);
                        setSelectedJob(job || null);
                      }}
                      className="bg-black/5 border border-black/5 p-3 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary focus:bg-white transition-all"
                    >
                      {jobsList.map((job, idx) => (
                        <option key={job.id || job._id || idx} value={job.title}>{job.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* LinkedIn */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-black/70">LinkedIn URL</label>
                    <input 
                      type="url" 
                      name="linkedInUrl" 
                      value={formData.linkedInUrl} 
                      onChange={handleInputChange}
                      className="bg-black/5 border border-black/5 p-3 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary focus:bg-white transition-all"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  {/* Portfolio */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-black/70">Portfolio URL</label>
                    <input 
                      type="url" 
                      name="portfolioUrl" 
                      value={formData.portfolioUrl} 
                      onChange={handleInputChange}
                      className="bg-black/5 border border-black/5 p-3 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary focus:bg-white transition-all"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-black/70">Cover Letter / Pitch</label>
                  <textarea 
                    name="coverLetter" 
                    value={formData.coverLetter} 
                    onChange={handleInputChange}
                    rows="3"
                    className="bg-black/5 border border-black/5 p-4 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary focus:bg-white transition-all resize-none"
                    placeholder="Briefly tell us why you are interested in this position..."
                  />
                </div>

                {/* Resume Upload File Card */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-black/70">Upload Resume (PDF, DOC, DOCX) *</label>
                  <div className="relative border-2 border-dashed border-black/10 rounded-2xl p-6 text-center hover:border-primary/40 transition-colors bg-black/5 flex flex-col items-center justify-center gap-2 cursor-pointer">
                    <input 
                      type="file" 
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      accept=".pdf,.doc,.docx"
                    />
                    {resumeFile ? (
                      <>
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                          <Check className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-sm text-black truncate max-w-xs">{resumeFile.name}</span>
                        <span className="text-[10px] text-black/40">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB &bull; Click to change</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-black/40 animate-pulse" />
                        <span className="font-bold text-sm text-black">Choose file or drag & drop</span>
                        <span className="text-[10px] text-black/40">Only PDF, DOC, DOCX up to 10MB</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Submit Trigger */}
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full mt-4 py-4 bg-primary text-white rounded-full font-bold text-base hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Uploading Application...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
