"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Shuffle from "./Shuffle";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({
  onComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Generate particles only once
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        y: -60 - Math.random() * 60,
        x: (Math.random() - 0.5) * 40,
        duration: 8 + Math.random() * 8,
      })),
    []
  );

  // Smooth counter over 2 seconds
  useEffect(() => {
    setIsClient(true);
    const startTime = Date.now();
    const duration = 2000;

    let frame: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= duration) {
        setProgress(100);
      } else {
        setProgress(Math.floor((elapsed / duration) * 100));
        frame = requestAnimationFrame(updateProgress);
      }
    };

    frame = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(frame);
  }, []);

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  // Exit animation
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  // Disable scrolling
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [visible]);

  const loaderVariants: any = {
    initial: {
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      filter: "blur(12px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const textVariants: any = {
    initial: {
      opacity: 0,
      scale: 0.92,
      filter: "blur(12px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      scale: 1.03,
      opacity: 0,
      filter: "blur(4px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const breathTransition: any = {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          variants={loaderVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden select-none"
        >
          {/* Noise */}
          <div className="absolute -inset-[50%] animate-grain bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%%22 height=%22100%%22 filter=%22url(%23noise)%22/></svg>')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.03] blur-[130px] pointer-events-none" />

          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {isClient && particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white/10"
                style={{
                  top: `${particle.top}%`,
                  left: `${particle.left}%`,
                }}
                animate={{
                  y: [0, particle.y],
                  x: [0, particle.x],
                  opacity: [0, 0.35, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <style>{`
            @keyframes grain {
              0%,100% { transform: translate(0,0); }
              10% { transform: translate(-2%,-4%); }
              20% { transform: translate(-6%,2%); }
              30% { transform: translate(3%,-8%); }
              40% { transform: translate(-2%,8%); }
              50% { transform: translate(-6%,4%); }
              60% { transform: translate(6%,0%); }
              70% { transform: translate(0%,6%); }
              80% { transform: translate(1%,10%); }
              90% { transform: translate(-4%,4%); }
            }

            .animate-grain {
              animation: grain 6s steps(6) infinite;
            }
          `}</style>

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.div
              variants={textVariants}
              initial="initial"
              animate={hasEntered ? { scale: [1, 1.01, 1] } : "animate"}
              exit="exit"
              transition={hasEntered ? breathTransition : undefined}
            >
              <Shuffle
                text="Vijay Chelumalla"
                tag="h1"
                shuffleDirection="down"
                duration={0.7}
                animationMode="random"
                maxDelay={0.4}
                shuffleTimes={3}
                ease="power3.out"
                stagger={0.03}
                threshold={0.1}
                triggerOnce
                triggerOnHover
                respectReducedMotion
                scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%"
                className="text-5xl sm:text-7xl md:text-[140px] lg:text-[150px] font-black tracking-tighter leading-none text-white"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={
                hasEntered
                  ? { opacity: 0.6, y: 0 }
                  : { opacity: 0 }
              }
              transition={{
                delay: 0.6,
                duration: 0.6,
              }}
              className="mt-4 text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-gray-400"
            >
              Full Stack Developer
            </motion.p>

            <div className="mt-8 flex flex-col items-center space-y-1">
              <span className="text-[11px] uppercase tracking-[0.25em] text-gray-500 font-mono">
                loading...
              </span>

              <span className="text-[13px] font-mono text-gray-400 tabular-nums">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}