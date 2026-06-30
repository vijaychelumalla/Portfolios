"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const [percent, setPercent] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Smooth scrollbar indicator using spring mechanics
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 origin-left z-[60]"
        style={{ scaleX }}
      />
      
      {/* Floating scroll percentage (bottom right screen corner, only on larger viewports) */}
      <div className="fixed bottom-6 left-6 z-[45] hidden md:block">
        <div className="glass px-3 py-1.5 rounded-full border border-white/5 text-[10px] font-mono tracking-widest text-gray-500 flex items-center space-x-1">
          <span className="text-white font-bold">{percent}%</span>
          <span>SCROLLED</span>
        </div>
      </div>
    </>
  );
}
