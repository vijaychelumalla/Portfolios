"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Position coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animations for smooth trailing effect
  const springConfig = { damping: 40, stiffness: 450, mass: 0.4 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  // Declared at top-level to obey rules of hooks (never call inside conditionally evaluated JSX)
  const ringX = useTransform(cursorSpringX, (val) => (val as number) - 16);
  const ringY = useTransform(cursorSpringY, (val) => (val as number) - 16);
  const dotX = useTransform(cursorX, (val) => (val as number) - 3);
  const dotY = useTransform(cursorY, (val) => (val as number) - 3);

  useEffect(() => {
    // Hide default cursor in CSS
    document.body.style.cursor = "none";
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Event listeners to detect hover on interactive tags
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest(".cursor-pointer") !== null ||
        target.getAttribute("role") === "button";
      
      if (isClickable) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  // Render a dual cursor: a small core dot and a larger trailing ring
  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/60 bg-white/5 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          scale: clicked ? 0.8 : hovered ? 1.6 : 1,
          mixBlendMode: "difference",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[9999] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
