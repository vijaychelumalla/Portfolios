"use client";

import AnimatedHeading from "./AnimatedHeading";
import MagicBento from "./MagicBento";

export default function Timeline() {
  return (
    <section id="experience" className="py-24 px-6 relative z-10 max-w-6xl mx-auto border-t border-white/5">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-xs font-semibold tracking-widest text-primary uppercase font-sans mb-3">
          TIMELINE
        </h2>
        <AnimatedHeading
          text="Experience & Milestones"
          tag="h3"
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white"
        />
        <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm sm:text-base">
          A chronological history of my professional internship, academic background, and key project launches.
        </p>
      </div>

      {/* Bento Grid Showcase */}
      <div className="max-w-6xl mx-auto mt-12">
        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={320}
          particleCount={10}
          glowColor="59, 130, 246"
        />
      </div>
    </section>
  );
}
