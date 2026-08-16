import React from 'react';
import './ScrollVelocity.css';

export const ScrollVelocity = ({
  texts = [],
  velocity = 15,
  className = '',
  numCopies = 4,
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle
}) => {
  return (
    <div className="overflow-hidden select-none w-full">
      {texts.map((text, index) => {
        const isReverse = index % 2 !== 0 || velocity < 0;
        const animationClass = isReverse ? 'animate-marquee-right' : 'animate-marquee-left';
        const speed = Math.max(18, Math.round(1200 / Math.abs(velocity || 15)));

        return (
          <div key={index} className={parallaxClassName} style={parallaxStyle}>
            <div
              className={`${scrollerClassName} ${animationClass}`}
              style={{
                ...scrollerStyle,
                animationDuration: `${speed}s`,
              }}
            >
              {Array.from({ length: numCopies * 2 }).map((_, i) => (
                <span className={className} key={i}>
                  {text}&nbsp;
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScrollVelocity;
