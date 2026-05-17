import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Footer from '../components/Footer';

const Policy = () => {
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
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, upload images, or contact us for support. This may include your name, email address, and any images you upload to our service."
    },
    {
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, process your requests, and communicate with you. Your uploaded images are processed to generate AI-powered fashion recommendations and are not shared with third parties."
    },
    {
      title: "Data Security",
      content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure."
    },
    {
      title: "Data Retention",
      content: "We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy. You may request deletion of your data at any time."
    },
    {
      title: "Third-Party Services",
      content: "Our service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies."
    },
    {
      title: "Children's Privacy",
      content: "Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us."
    },
    {
      title: "Changes to This Policy",
      content: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the \"Last Updated\" date."
    },
    {
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your information. To exercise these rights, please contact us."
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
            Privacy <span className="text-primary italic">Policy</span>
          </h1>
          <p className="text-black/40 text-sm font-bold tracking-widest uppercase reveal-up">
            Last Updated: 29th July 2025
          </p>
        </div>
      </section>

      {/* Main Content */}
      <Section id="privacy-content" className="py-20">
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
              If you have any questions or concerns regarding this privacy policy or how we handle your personal data, feel free to reach out to us at any time.
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

export default Policy;
