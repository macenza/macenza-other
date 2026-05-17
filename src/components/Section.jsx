import React from 'react';

const Section = ({ title, subtitle, children, id, className = "" }) => {
  return (
    <section id={id} className={`py-20 px-6 md:py-32 bg-white ${className}`}>
      <div className="container mx-auto">
        {(title || subtitle) && (
          <div className="mb-16 max-w-3xl">
            {title && (
              <h2 className="text-4xl md:text-6xl font-bold text-dark mb-6 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-dark/60 font-light leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
