"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setHasMounted(true);

    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            onCompleteRef.current();
          }, 450); // Small delay after 100%
          return 100;
        }
        // Increment randomly for natural feel (averages 3% per tick)
        const next = prev + Math.floor(Math.random() * 3) + 2;
        return next > 100 ? 100 : next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Floating background particles
  const particles = Array.from({ length: 25 });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0B0B]"
        >
          {/* Subtle Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {hasMounted && particles.map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-blue-500/20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100 - Math.random() * 100],
                  x: [0, (Math.random() - 0.5) * 50],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Logo / Initials */}
          <div className="relative flex flex-col items-center space-y-6 z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(5px)" }}
              animate={{ 
                scale: [0.95, 1.05, 1], 
                opacity: 1, 
                filter: "blur(0px)" 
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-4 rounded-full bg-blue-500/10 blur-xl animate-pulse" />
              
              {/* Logo Circle */}
              <div className="w-24 h-24 rounded-full bg-black/40 border border-white/10 flex items-center justify-center shadow-2xl relative z-10 backdrop-blur-md">
                <span className="font-display text-3xl font-black bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent tracking-tighter">
                  VC
                </span>
              </div>
            </motion.div>

            {/* Title / Description */}
            <div className="text-center space-y-1">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs font-semibold tracking-widest text-primary uppercase font-sans"
              >
                Vijay Chelumalla
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] text-gray-500 font-sans uppercase tracking-wider"
              >
                Backend Architect
              </motion.p>
            </div>

            {/* Elegant Progress line */}
            <div className="w-48 h-0.5 bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-400"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>
            
            {/* Percentage Text */}
            <motion.div 
              className="text-[10px] font-mono text-gray-600 tracking-wider"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {progress}% LOADED
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
