"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  animate,
  MotionValue,
} from "framer-motion";
import {
  HtmlIcon,
  CssIcon,
  JsIcon,
  TsIcon,
  ReactIcon,
  NextIcon,
  TailwindIcon,
  NodeIcon,
  ExpressIcon,
  MongoIcon,
  GitIcon,
  GithubIcon,
} from "./icons";

interface SkillItem {
  readonly id: string;
  readonly name: string;
  readonly icon: React.ReactNode;
  readonly color: string;
}

const SKILLS: readonly SkillItem[] = [
  { id: "html5", name: "HTML5", icon: <HtmlIcon />, color: "rgba(241, 101, 41, 0.2)" },
  { id: "css3", name: "CSS3", icon: <CssIcon />, color: "rgba(41, 101, 241, 0.2)" },
  { id: "js", name: "JavaScript", icon: <JsIcon />, color: "rgba(245, 222, 25, 0.2)" },
  { id: "ts", name: "TypeScript", icon: <TsIcon />, color: "rgba(0, 122, 204, 0.2)" },
  { id: "react", name: "React", icon: <ReactIcon />, color: "rgba(97, 218, 251, 0.2)" },
  { id: "nextjs", name: "Next.js", icon: <NextIcon />, color: "rgba(255, 255, 255, 0.2)" },
  { id: "tailwind", name: "Tailwind CSS", icon: <TailwindIcon />, color: "rgba(56, 189, 248, 0.2)" },
  { id: "nodejs", name: "Node.js", icon: <NodeIcon />, color: "rgba(51, 153, 51, 0.2)" },
  { id: "express", name: "Express", icon: <ExpressIcon />, color: "rgba(136, 136, 136, 0.2)" },
  { id: "mongodb", name: "MongoDB", icon: <MongoIcon />, color: "rgba(19, 170, 82, 0.2)" },
  { id: "git", name: "Git", icon: <GitIcon />, color: "rgba(240, 50, 50, 0.2)" },
  { id: "github", name: "GitHub", icon: <GithubIcon />, color: "rgba(255, 255, 255, 0.2)" },
] as const;


export default function FrontendSkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  const cardsCount = SKILLS.length;

  // Track responsive screen size
  const isMobileMV = useMotionValue(0);
  useEffect(() => {
    const handleResize = () => {
      const mob = window.innerWidth < 768;
      setIsMobile(mob);
      isMobileMV.set(mob ? 1 : 0);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMV]);

  // 1. Framer Motion values for performance (no state re-renders)
  const activeIndex = useMotionValue(0);
  const floatValue = useMotionValue(0);

  // General container mouse tilt targets
  const targetTiltX = useMotionValue(0);
  const targetTiltY = useMotionValue(0);

  // Springs for container tilt with premium high-inertia dampening (stiffness 80, damping 24, mass 1.1)
  const tiltX = useSpring(targetTiltX, { stiffness: 80, damping: 24, mass: 1.1 });
  const tiltY = useSpring(targetTiltY, { stiffness: 80, damping: 24, mass: 1.1 });

  // Blue lagging glow orb coordinates
  const targetOrbX = useMotionValue(0);
  const targetOrbY = useMotionValue(0);

  // Spring values for lagging cursor orb (damping 15, mass 1.2 for trailing delay)
  const orbX = useSpring(targetOrbX, { stiffness: 60, damping: 15, mass: 1.2 });
  const orbY = useSpring(targetOrbY, { stiffness: 60, damping: 15, mass: 1.2 });

  // Lists of motion values for card hover progress, tilts, and intro reveals
  const hoverProgressList = useRef<MotionValue<number>[]>([]);
  const cardTiltXList = useRef<MotionValue<number>[]>([]);
  const cardTiltYList = useRef<MotionValue<number>[]>([]);
  const introProgressList = useRef<MotionValue<number>[]>([]);

  if (hoverProgressList.current.length === 0) {
    for (let i = 0; i < cardsCount; i++) {
      hoverProgressList.current.push(new MotionValue(0));
      cardTiltXList.current.push(new MotionValue(0));
      cardTiltYList.current.push(new MotionValue(0));
      introProgressList.current.push(new MotionValue(0));
    }
  }

  // Track active card index reactively for the background spotlight color
  const [activeSkillIdx, setActiveSkillIdx] = useState(0);
  useEffect(() => {
    const unsubscribe = activeIndex.on("change", (v) => {
      const normalized = Math.round(v) % cardsCount;
      const activeIdx = normalized < 0 ? normalized + cardsCount : normalized;
      setActiveSkillIdx(activeIdx);
    });
    return () => unsubscribe();
  }, [activeIndex, cardsCount]);

  // Click & Drag Horizontal Cylinder Rotation Physics
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const lastPointerX = useRef(0);
  const dragVelocity = useRef(0);
  const lastFrameTime = useRef(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastPointerX.current = e.clientX;
    dragVelocity.current = 0;
    lastFrameTime.current = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;

    const sensitivity = isMobile ? 3.0 : 4.5;
    const deltaIndex = -(dx / window.innerWidth) * sensitivity;

    // Direct activeIndex translation offset
    activeIndex.set(activeIndex.get() + deltaIndex);

    // Track frame velocity
    const now = performance.now();
    const dt = (now - lastFrameTime.current) / 1000;
    if (dt > 0) {
      dragVelocity.current = deltaIndex / dt;
    }
    lastFrameTime.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // 2. Main animation frame loops
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const defaultSpeed = 0.4; // 0.4 cards/sec
    let currentVelocity = defaultSpeed;

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isDragging.current) {
        // If drag moves have stopped/stalled (no moves for 80ms), decay speed to 0
        const timeSinceLastMove = now - lastFrameTime.current;
        if (timeSinceLastMove > 80) {
          dragVelocity.current = dragVelocity.current * Math.exp(-15.0 * dt);
        }
        currentVelocity = dragVelocity.current;
      } else if (isHovered.current) {
        // Graceful slide-to-pause deceleration when hovered
        const friction = Math.exp(-2.5 * dt);
        currentVelocity = currentVelocity * friction;

        // Apply physics translation step (decelerating to stop)
        activeIndex.set(activeIndex.get() + dt * currentVelocity);
        dragVelocity.current = currentVelocity;
      } else {
        // Inertia phase (decay velocity via friction)
        const friction = Math.exp(-4.0 * dt);
        currentVelocity = currentVelocity * friction;

        // Smooth recovery blend back to default slow auto-spin speed
        if (Math.abs(currentVelocity) < defaultSpeed) {
          currentVelocity = currentVelocity * 0.96 + defaultSpeed * 0.04;
        }

        // Apply physics translation step
        activeIndex.set(activeIndex.get() + dt * currentVelocity);
        dragVelocity.current = currentVelocity;
      }

      // Gentle floating cycle (4s frequency)
      const floatTime = now / 1000;
      floatValue.set(Math.sin((floatTime * Math.PI * 2) / 4));

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [activeIndex, floatValue]);

  // 3. Staggered Scroll Reveal entrance triggered once section is in view
  useEffect(() => {
    if (isInView) {
      for (let i = 0; i < cardsCount; i++) {
        setTimeout(() => {
          animate(introProgressList.current[i], 1, {
            type: "spring",
            stiffness: 120,
            damping: 18,
            mass: 0.9,
          });
        }, i * 120); // 120ms staggered delay
      }
    }
  }, [isInView, cardsCount]);

  // Global mousemove within section (handles lagging orb and container tilt)
  const handleMouseMoveSection = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Track cursor for orb
    targetOrbX.set(e.clientX - rect.left);
    targetOrbY.set(e.clientY - rect.top);

    // Track cursor offset from center for carousel tilt
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    targetTiltY.set(normX * 12); // Rotate Y axis based on mouse X
    targetTiltX.set(-normY * 12); // Rotate X axis based on mouse Y
  };

  const handleMouseLeaveSection = () => {
    targetTiltX.set(0);
    targetTiltY.set(0);
  };

  // Card Mouse Actions (local spring tilts and spotlights)
  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    if (isMobile) return;
    const cardEl = cardRefs.current[idx];
    if (!cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    // Tilt card toward cursor using spring animations on the motion values
    animate(cardTiltXList.current[idx], -normY * 15, { type: "spring", stiffness: 120, damping: 18, mass: 0.9 });
    animate(cardTiltYList.current[idx], normX * 15, { type: "spring", stiffness: 120, damping: 18, mass: 0.9 });

    // CSS variables updated for relative glow spotlight positioning
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    cardEl.style.setProperty("--mouse-x", `${px}%`);
    cardEl.style.setProperty("--mouse-y", `${py}%`);
  };

  const handleMouseEnterCard = (idx: number) => {
    animate(hoverProgressList.current[idx], 1, { type: "spring", stiffness: 120, damping: 18, mass: 0.9 });
  };

  const handleMouseLeaveCard = (idx: number) => {
    animate(hoverProgressList.current[idx], 0, { type: "spring", stiffness: 120, damping: 18, mass: 0.9 });
    animate(cardTiltXList.current[idx], 0, { type: "spring", stiffness: 120, damping: 18, mass: 0.9 });
    animate(cardTiltYList.current[idx], 0, { type: "spring", stiffness: 120, damping: 18, mass: 0.9 });
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={handleMouseMoveSection}
      onMouseLeave={handleMouseLeaveSection}
      className="relative w-screen pt-20 pb-12 overflow-hidden bg-[#050508] flex flex-col items-center z-20 border-t border-white/5 select-none"
    >
      {/* BACKGROUND EFFECTS */}
      {/* Shifting Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_30%,#1e293b_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#0f172a_0%,transparent_50%)]" />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.8%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')] pointer-events-none z-0" />

      {/* Light beams */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div 
          className="absolute -top-[50%] left-[30%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-blue-500 to-transparent rotate-[25deg] blur-[1px]"
          style={{ animation: "pulse 12s ease-in-out infinite" }}
        />
        <div 
          className="absolute -top-[50%] right-[30%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-indigo-500 to-transparent rotate-[25deg] blur-[1px]"
          style={{ animation: "pulse 16s ease-in-out infinite", animationDelay: "4s" }}
        />
      </div>

      {/* Floating Blurred Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[350px] h-[350px] rounded-full bg-blue-900/10 blur-[100px] top-[10%] left-[15%] animate-[floatBlob_20s_ease-in-out_infinite]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[110px] bottom-[15%] right-[10%] animate-[floatBlob_28s_ease-in-out_infinite_reverse]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-900/10 blur-[90px] top-[60%] left-[50%] animate-[floatBlob_24s_ease-in-out_infinite]" />
      </div>

      {/* Floating glowing orb on the top-right */}
      <div 
        className="absolute top-[12%] right-[8%] w-[180px] h-[180px] rounded-full bg-blue-500/10 blur-[70px] pointer-events-none z-0"
        style={{
          animation: "floatBlob 14s ease-in-out infinite",
        }}
      />

      {/* Active Card Glowing Spotlight behind the carousel */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[100px] opacity-70 pointer-events-none z-0 mix-blend-screen transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${SKILLS[activeSkillIdx]?.color.replace("0.2", "0.7")} 0%, transparent 70%)`,
        }}
      />

      {/* Particle streams */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => {
          const delay = (i * 0.7).toFixed(1);
          const duration = (12 + (i % 5) * 4).toString();
          const left = ((i * 17) % 100).toString();
          const top = ((i * 23) % 100).toString();
          return (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>

      {/* Diagonal Moving Light Beams */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_45%,rgba(255,255,255,0.015)_50%,transparent_55%)] bg-[length:200%_200%] animate-[shimmer_15s_linear_infinite]" />
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,5,8,0.95)_100%)]" />

      {/* LAGGING MOUSE GLOW ORB */}
      {!isMobile && (
        <motion.div
          style={{
            x: useTransform(orbX, (val) => val - 96),
            y: useTransform(orbY, (val) => val - 96),
          }}
          className="absolute w-48 h-48 rounded-full pointer-events-none z-0 mix-blend-screen opacity-70 blur-[45px] transition-opacity duration-300 bg-[radial-gradient(circle,rgba(56,189,248,0.3)_0%,rgba(37,99,235,0.15)_50%,transparent_100%)]"
        />
      )}

      {/* CENTERED TITLE & SUBTITLE AT TOP */}
      <div className="text-center w-full z-10 select-none mb-10 flex flex-col items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center space-x-2"
        >
          <h2
            className="font-bold tracking-tight bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: "1.1",
            }}
          >
            Frontend
          </h2>
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 animate-pulse self-center mb-2" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 0.6, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto mt-3 font-sans tracking-wide leading-relaxed"
        >
          Technologies and tools I use to build modern and responsive interfaces.
        </motion.p>
      </div>

      {/* 3D CAROUSEL WRAPPER */}
      <div
        style={{
          perspective: "1800px",
          transformStyle: "preserve-3d",
        }}
        className="w-full h-[410px] flex items-center justify-center relative z-10 -mt-16"
      >
        <motion.div
          ref={carouselRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerEnter={() => { isHovered.current = true; }}
          onPointerLeave={() => { isHovered.current = false; }}
          style={{
            rotateX: useTransform(tiltX, (x) => (x as number) - 4),
            rotateY: useTransform([tiltY, activeIndex], ([tY, active]) => (tY as number) + -(active as number) * (360 / cardsCount)),
            transformStyle: "preserve-3d",
            touchAction: "none",
          }}
          className="relative w-full h-[340px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {SKILLS.map((tech, idx) => {
            // Static offset angle for this card on the cylinder (in degrees)
            const cardAngle = (idx * 360) / cardsCount;

            // Relative coverflow distance calculations mapping activeIndex MotionValue
            const d = useTransform(activeIndex, (v) => {
              let diff = idx - (v % cardsCount);
              if (diff > cardsCount / 2) diff -= cardsCount;
              if (diff < -cardsCount / 2) diff += cardsCount;
              return diff;
            });

            // Calculate absolute distance for scaling and depth layering
            const absD = useTransform(d, (val) => Math.abs(val));

            // Mapping requested values:
            // Center (0): Scale 1.15, translateZ 140px, no rotation
            // Beside (1): Scale 0.90, translateZ -70px, rotateY 35deg
            // Outer (2): Scale 0.72, translateZ -140px, rotateY 55deg, opacity 0.35, blur 2px
            // Background (6): Scale 0.60, translateZ -220px, opacity 0.15, blur 4px
            const scale = useTransform(absD, [0, 1, 2, 6], [1.15, 0.90, 0.72, 0.60]);
            const localZ = useTransform(absD, [0, 1, 2, 6], [140, -70, -140, -220]);
            const opacity = useTransform(absD, [0, 1, 2, 6], [1.0, 0.85, 0.35, 0.15]);
            const blur = useTransform(absD, [0, 1, 2, 6], [0, 0.5, 2.0, 4.0]);

            // Local rotateY CoverFlow tilt: left card tilt right (35deg), right card tilt left (-35deg)
            const localRotateY = useTransform(d, [-2, -1, 0, 1, 2], [-55, -35, 0, 35, 55]);

            // Dynamic depth layering
            const zIndex = useTransform(absD, [0, 1, 2, 6], [120, 80, 40, 10]);

            // Card variables combining local hover/stagger parameters
            const hp = hoverProgressList.current[idx];
            const ip = introProgressList.current[idx];
            const tiltXVal = cardTiltXList.current[idx];
            const tiltYVal = cardTiltYList.current[idx];

            // Hover state modifiers
            const finalScale = useTransform([scale, hp, ip], ([s, h, intro]) => (s as number) * (1 + (h as number) * 0.08) * (0.7 + 0.3 * (intro as number)));
            const finalOpacity = useTransform([opacity, ip], ([op, intro]) => (op as number) * (intro as number));
            const finalBlur = useTransform([blur, ip], ([b, intro]) => (b as number) + (1 - (intro as number)) * 10);

            // Active Card Floater (Gentle sine offset on Y axis & RotateZ)
            const activeWeight = useTransform(d, (val) => Math.max(0, 1 - Math.abs(val)));
            const floatY = useTransform([floatValue, activeWeight], ([f, w]) => (f as number) * 6 * (w as number));
            const floatR = useTransform([floatValue, activeWeight], ([f, w]) => (f as number) * 2 * (w as number));

            // Hover lift vertical offset
            const hoverYOffset = useTransform(hp, (h) => h * -22);
            const totalY = useTransform([floatY, hoverYOffset], ([fY, hY]) => (fY as number) + (hY as number));

            // Reactive radius based on responsive state
            const radius = useTransform(isMobileMV, (mob) => (mob === 1 ? 190 : 365));

            // Combined CSS Transforms template matching a physical cylinder layout
            const transform = useMotionTemplate`rotateY(${cardAngle}deg) translateZ(${radius}px) rotateY(${localRotateY}deg) rotateY(${tiltYVal}deg) rotateX(${tiltXVal}deg) rotateZ(${floatR}deg) scale(${finalScale}) translate3d(0, ${totalY}px, ${localZ}px)`;

            // Styling variables updated reactively (glassmorphism bg & glow borders & soft shadows)
            const bgVal = useTransform(hp, (h) => `rgba(255, 255, 255, ${0.03 + h * 0.03})`);
            const borderVal = useTransform([hp], ([h]) => {
              const borderOpacity = 0.08 + (h as number) * 0.08;
              return (h as number) > 0.01 
                ? tech.color.replace("0.2", (0.1 + (h as number) * 0.35).toFixed(2))
                : `rgba(255, 255, 255, ${borderOpacity})`;
            });
            const shadowVal = useTransform(hp, (h) => `0 ${8 + h * 16}px ${30 + h * 15}px rgba(0, 0, 0, ${0.4 + h * 0.2})`);

            return (
              <motion.div
                key={tech.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onMouseMove={(e) => handleMouseMoveCard(e, idx)}
                onMouseEnter={() => handleMouseEnterCard(idx)}
                onMouseLeave={() => handleMouseLeaveCard(idx)}
                style={{
                  transform,
                  opacity: finalOpacity,
                  zIndex,
                  filter: useTransform(finalBlur, (b) => (b > 0.1 ? `blur(${b.toFixed(1)}px)` : "none")),
                  backgroundColor: bgVal,
                  borderColor: borderVal,
                  boxShadow: shadowVal,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                className="absolute w-[170px] h-[230px] rounded-[24px] border flex flex-col items-center justify-center p-6 backdrop-blur-[24px] cursor-pointer transition-colors duration-300 overflow-hidden group select-none"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(80px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${tech.color.replace("0.2", "0.15")}, transparent 80%)`,
                  }}
                />

                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-0 bg-[linear-gradient(135deg,transparent_30%,#fff_50%,transparent_70%)] bg-[length:200%_200%]"
                  style={{
                    backgroundPosition: "var(--mouse-x, 50%) var(--mouse-y, 50%)",
                  }}
                />

                <div 
                  className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 border border-transparent"
                  style={{
                    boxShadow: `inset 0 0 12px ${tech.color.replace("0.2", "0.4")}`,
                  }}
                />

                <motion.div
                  style={{
                    scale: useTransform(hp, (h) => 1 + h * 0.1),
                  }}
                  className="w-16 h-16 flex items-center justify-center pointer-events-none select-none z-10"
                >
                  {tech.icon}
                </motion.div>

                <motion.span
                  style={{
                    y: useTransform(hp, (h) => h * -12),
                    opacity: useTransform(hp, (h) => 0.4 + h * 0.6),
                    color: useTransform(hp, (h) => `rgba(255, 255, 255, ${0.4 + h * 0.6})`),
                  }}
                  className="text-xs sm:text-sm font-semibold tracking-wide mt-6 font-display pointer-events-none select-none z-10"
                >
                  {tech.name}
                </motion.span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Floating glass pill bottom controls */}
      <div className="mt-8 flex justify-center z-20 px-4 select-none">
        <div className="glass px-5 py-2.5 rounded-full border border-white/10 flex items-center space-x-3.5 text-[10px] sm:text-xs font-semibold text-gray-400 backdrop-blur-xl shadow-xl">
          <span className="flex items-center space-x-1">
            <span>🖱</span>
            <span>Drag to rotate</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center space-x-1">
            <span>🔄</span>
            <span>Auto rotating</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center space-x-1">
            <span>✨</span>
            <span>Hover to explore</span>
          </span>
        </div>
      </div>

      {/* Inline styles for custom backgrounds */}
      <style jsx global>{`
        @keyframes mesh {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes floatBlob {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(20px, -30px, 0) scale(1.1);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 200%;
          }
        }
      `}</style>
    </section>
  );
}
