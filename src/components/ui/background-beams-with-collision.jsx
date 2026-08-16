import { cn } from "../../lib/utils";
import React from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}) => {
  const beams = [
    { initialX: "5%", duration: 6, delay: 0 },
    { initialX: "20%", duration: 4.5, delay: 2 },
    { initialX: "35%", duration: 7, delay: 1 },
    { initialX: "50%", duration: 5, delay: 3 },
    { initialX: "65%", duration: 8, delay: 0.5 },
    { initialX: "80%", duration: 4, delay: 2.5 },
    { initialX: "95%", duration: 6.5, delay: 1.5 },
  ];

  return (
    <div
      className={cn(
        "h-96 md:h-[40rem] bg-gradient-to-b from-white to-neutral-100 relative flex items-center w-full justify-center overflow-hidden",
        className
      )}
    >
      {/* Falling Light Beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {beams.map((beam, idx) => (
          <div
            key={idx}
            className="absolute top-0 w-px h-24 bg-gradient-to-b from-transparent via-primary/70 to-indigo-500/90 rounded-full animate-beam-fall"
            style={{
              left: beam.initialX,
              animationDuration: `${beam.duration}s`,
              animationDelay: `${beam.delay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear'
            }}
          >
            {/* Impact Glow / Particle */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/80 blur-[2px] animate-pulse" />
          </div>
        ))}
      </div>

      {children}

      <div
        className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none h-1"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      />
    </div>
  );
};
