import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Footer from '../components/Footer';

const Terms = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger);

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

  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using our custom AI solutions, digital products, and software engineering services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "Use License",
      content: "Permission is granted to temporarily use our service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials, use them for any commercial purpose, or remove any copyright or other proprietary notations."
    },
    {
      title: "User Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must not upload any content that is illegal, harmful, threatening, abusive, or violates any applicable laws or regulations."
    },
    {
      title: "Service Availability",
      content: "We strive to maintain the highest level of service availability, but we do not guarantee that our service will be uninterrupted or error-free. We reserve the right to modify, suspend, or discontinue the service at any time without notice."
    },
    {
      title: "Intellectual Property",
      content: "The service and its original content, features, and functionality are and will remain the exclusive property of our company and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent."
    },
    {
      title: "Limitation of Liability",
      content: "In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service."
    },
    {
      title: "Termination",
      content: "We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the service."
    },
    {
      title: "Governing Law",
      content: "These Terms shall be interpreted and governed by the laws of the jurisdiction in which our company operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights."
    },
    {
      title: "Changes to Terms",
      content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion."
    }
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-black font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Header */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center overflow-hidden pt-44 pb-20 bg-black/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-2 bg-primary/5 rounded-full text-primary font-bold text-xs uppercase tracking-widest mb-6 reveal-up">
            Legal & Compliance
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-6 reveal-up">
            Terms & <span className="text-primary italic">Conditions</span>
          </h1>
          <p className="text-black/40 text-sm font-bold tracking-widest uppercase reveal-up">
            Last Updated: 29th July 2025
          </p>
        </div>
      </section>

      {/* Main Content */}
      <Section id="terms-content" className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {sections.map((sec, idx) => (
              <div key={idx} className="reveal-up border-b border-black/5 pb-10 last:border-none">
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 flex items-center gap-4">
                  <span className="text-primary text-lg font-mono">0{idx + 1}.</span>
                  {sec.title}
                </h2>
                <p className="text-black/70 text-lg font-light leading-relaxed">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Box */}
          <div className="mt-20 p-10 md:p-14 rounded-[3rem] bg-primary/5 border border-primary/10 reveal-up text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
              Questions & Inquiries
            </h3>
            <p className="text-black/60 text-lg font-light mb-8 max-w-xl mx-auto leading-relaxed">
              If you have any questions or concerns regarding these Terms and Conditions, feel free to reach out to us at any time.
            </p>
            <a 
              href="mailto:info@macenza.com" 
              className="inline-block px-10 py-5 bg-primary text-white rounded-full font-bold text-lg hover:bg-black transition-all duration-300 shadow-xl shadow-primary/20"
            >
              info@macenza.com
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Terms;
