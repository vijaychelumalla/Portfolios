"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, FileText, Sparkles } from "lucide-react";
import HeroCanvas from "./HeroCanvas";
import Magnetic from "./Magnetic";
import Tilt from "./Tilt";

interface HeroProps {
  loading?: boolean;
}

export default function Hero({ loading = false }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  // Mouse coords for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax
  const springX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  // Transforms for parallax shift (subtle)
  const textX = useTransform(springX, [-300, 300], [-10, 10]);
  const textY = useTransform(springY, [-300, 300], [-10, 10]);
  const bgX = useTransform(springX, [-300, 300], [-25, 25]);
  const bgY = useTransform(springY, [-300, 300], [-25, 25]);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Calculate offset from center
      const offsetX = clientX - innerWidth / 2;
      const offsetY = clientY - innerHeight / 2;
      mouseX.set(offsetX);
      mouseY.set(offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Page Entry Variants
  const entryVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 12 }
    }
  };

  if (!mounted) return null;

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 pb-16 px-6 max-w-6xl mx-auto z-10 w-full"
    >
      {/* 3D R3F Particle background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loading ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 2, delay: 1.4 }}
        className="absolute inset-0 pointer-events-none"
      >
        <HeroCanvas />
      </motion.div>

      {/* Parallax moving background blobs */}
      <motion.div 
        style={{ x: bgX, y: bgY }}
        initial={{ opacity: 0 }}
        animate={loading ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.3 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
        {/* Left Column: Intro Text */}
        <motion.div
          variants={entryVariants}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
          style={{ x: textX, y: textY }}
          className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          {/* Available status badge */}
          <motion.div 
            variants={childVariants}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-blue-500/20 shadow-lg"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-gray-300 tracking-wide font-sans">
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={childVariants} className="space-y-3">
            <p 
              className="text-sm md:text-base font-semibold tracking-widest text-primary uppercase font-sans"
            >
              Backend & Full Stack Engineer
            </p>
            <h1 
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white font-display leading-[0.95] tracking-tight"
            >
              Vijay <br className="hidden lg:block" />
              <span className="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">Chelumalla</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p 
            variants={childVariants}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl font-sans leading-relaxed"
          >
            Designing high-performance backend systems, REST APIs, and database schemas. Specialized in <span className="text-white font-medium">Node.js</span>, <span className="text-white font-medium">Express</span>, and <span className="text-white font-medium">MongoDB</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={childVariants}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start w-full sm:w-auto pt-2"
          >
            <Magnetic range={0.2}>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold transition-all shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 flex items-center justify-center space-x-2 border border-blue-400/20 active:scale-95"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Magnetic>

            <Magnetic range={0.2}>
              <a
                href="#"
                className="w-full sm:w-auto px-8 py-4 rounded-full glass text-gray-200 hover:text-white font-semibold transition-all hover:bg-white/5 flex items-center justify-center space-x-2 active:scale-95"
              >
                <FileText className="w-4 h-4 text-gray-400" />
                <span>Download Resume</span>
              </a>
            </Magnetic>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={childVariants}
            className="flex items-center space-x-5 pt-2"
          >
            <Magnetic range={0.3}>
              <a
                href="https://github.com/vijaychelumalla"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all shadow-md"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </Magnetic>

            <Magnetic range={0.3}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Magnetic>

            <Magnetic range={0.3}>
              <a
                href="mailto:vijay.chelumalla21@gmail.com"
                className="p-3 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all shadow-md"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Interactive Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={loading ? { opacity: 0, scale: 0.9, y: 30 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 1.15 }}
          className="lg:col-span-5 flex justify-center"
        >
          <Tilt maxTilt={15}>
            {/* Continuous float and breath animation */}
            <motion.div
              animate={{ 
                y: [0, -12, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full group cursor-pointer"
            >
              {/* Outer Glowing Border Ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-60 group-hover:opacity-100 blur-[8px] group-hover:blur-[12px] transition-all duration-500 animate-pulse" />

              {/* Inner container */}
              <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-[#0B0B0B] bg-[#111] z-10 flex items-center justify-center">
                {/* Profile Image */}
                <img
                  src="https://avatars.githubusercontent.com/u/192370240?v=4"
                  alt="Vijay Chelumalla Profile"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Overlay card */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              </div>

              {/* Decorative tags */}
              <div className="absolute -bottom-2 right-4 glass px-3 py-1 rounded-full border border-blue-500/30 text-[10px] font-semibold text-blue-400 z-20 flex items-center space-x-1.5 shadow-xl">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                <span>Backend Developer</span>
              </div>
            </motion.div>
          </Tilt>
        </motion.div>
      </div>

      {/* Scroll indicator animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={loading ? { opacity: 0 } : { opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] text-gray-500 font-sans tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-gray-600 flex justify-center p-1.5">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-blue-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
