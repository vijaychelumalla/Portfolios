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
  NodeIcon,
  ExpressIcon,
  MongoIcon,
} from "./icons";

// Custom inline SVG icons for remaining backend skills
const NestIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nest-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E0234E" />
        <stop offset="100%" stopColor="#A90F33" />
      </linearGradient>
    </defs>
    <path d="M32 4L8 16v32l24 12 24-12V16L32 4z" fill="url(#nest-grad)" />
    <path d="M32 12l16 8v16L32 44V12z" fill="#FFF" opacity="0.15" />
    <path d="M32 18L18 25v14l14 7 14-7V25L32 18z" fill="#1A1A1A" />
    <path d="M32 23l9 4.5v5l-9 4.5-9-4.5v-5l9-4.5z" fill="url(#nest-grad)" />
  </svg>
);

const MysqlIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mysql-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00758F" />
        <stop offset="100%" stopColor="#F29111" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="12" fill="#1C1C1E" stroke="url(#mysql-grad)" strokeOpacity="0.2" strokeWidth="2" />
    <path d="M18 20h28v8H18v-8z" fill="#00758F" opacity="0.8" />
    <path d="M18 32h28v8H18v-8z" fill="#00758F" opacity="0.6" />
    <path d="M18 44h28v8H18v-8z" fill="#F29111" opacity="0.8" />
    <ellipse cx="32" cy="20" rx="14" ry="4" fill="#00758F" />
    <ellipse cx="32" cy="32" rx="14" ry="4" fill="#005B6F" />
    <ellipse cx="32" cy="44" rx="14" ry="4" fill="#D57A00" />
  </svg>
);

const PostgresIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#336791" />
        <stop offset="100%" stopColor="#2F5E85" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="12" fill="url(#pg-grad)" />
    <path d="M18 32c0-8.8 7.2-16 16-16s16 7.2 16 16c0 6.6-4 12.2-9.7 14.5L34 50v-6h-4v6l-6.3-3.5C18 44.2 18 38.6 18 32z" fill="#FFF" opacity="0.2" />
    <path d="M30 22h8v16h-8z" fill="#FFF" />
    <circle cx="34" cy="26" r="3" fill="#336791" />
  </svg>
);

const RedisIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="redis-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D82C20" />
        <stop offset="100%" stopColor="#A31C13" />
      </linearGradient>
    </defs>
    <g transform="translate(10, 10)">
      <path d="M22 28l18-9-18-9-18 9 18 9z" fill="url(#redis-grad)" />
      <path d="M4 19v6l18 9 18-9v-6l-18 9L4 19z" fill="#75110B" />
      <path d="M22 18l18-9-18-9-18 9 18 9z" fill="#EC564C" />
      <path d="M4 9v6l18 9 18-9V9l-18 9L4 9z" fill="#A31C13" />
    </g>
  </svg>
);

const JwtIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="jwt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D63AFF" />
        <stop offset="100%" stopColor="#00B9FF" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" stroke="url(#jwt-grad)" strokeWidth="3" fill="#13131A" />
    <text x="32" y="38" fill="#FFF" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="0.05em" fontFamily="sans-serif">JWT</text>
    <path d="M32 10a22 22 0 0115.5 6.5" stroke="#D63AFF" strokeWidth="4" strokeLinecap="round" />
    <path d="M47.5 47.5A22 22 0 0116.5 32" stroke="#00B9FF" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const RestApiIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rest-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#007ACC" />
        <stop offset="100%" stopColor="#005A9E" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="12" fill="url(#rest-grad)" />
    <text x="32" y="32" fill="#FFF" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">REST</text>
    <text x="32" y="48" fill="#FFF" opacity="0.6" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">API</text>
    <path d="M14 20h36M14 44h36" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
  </svg>
);

const SocketIoIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill="#010102" stroke="#FFF" strokeWidth="2" />
    <path d="M32 10L18 34h12l-4 20L44 30H32l4-20z" fill="#FFF" />
  </svg>
);

const PrismaIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="prisma-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1A202C" />
        <stop offset="100%" stopColor="#5A67D8" />
      </linearGradient>
    </defs>
    <path d="M32 4L6 48l26 12L58 48 32 4z" fill="url(#prisma-grad)" />
    <path d="M32 4v56L58 48 32 4z" fill="#06B6D4" opacity="0.35" />
    <path d="M32 14v32l16-8-16-24z" fill="#FFF" opacity="0.8" />
  </svg>
);

const MongooseIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mongoose-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" stopOpacity="1" />
        <stop offset="100%" stopColor="#1D4ED8" stopOpacity="1" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="12" fill="#13131A" stroke="url(#mongoose-grad)" strokeOpacity="0.2" strokeWidth="2" />
    <path d="M16 16h32v8H16v-8zm0 16h32v8H16v-8z" fill="url(#mongoose-grad)" opacity="0.7" />
    <ellipse cx="32" cy="16" rx="16" ry="4" fill="url(#mongoose-grad)" />
    <ellipse cx="32" cy="32" rx="16" ry="4" fill="#1D4ED8" />
    <path d="M16 32v16c0 2.2 7.2 4 16 4s16-1.8 16-4V32" fill="url(#mongoose-grad)" opacity="0.5" />
    <ellipse cx="32" cy="48" rx="16" ry="4" fill="#FFF" opacity="0.2" />
  </svg>
);

interface SkillItem {
  readonly id: string;
  readonly name: string;
  readonly icon: React.ReactNode;
  readonly color: string;
}

const SKILLS: readonly SkillItem[] = [
  { id: "nodejs", name: "Node.js", icon: <NodeIcon />, color: "rgba(51, 153, 51, 0.2)" },
  { id: "express", name: "Express", icon: <ExpressIcon />, color: "rgba(136, 136, 136, 0.2)" },
  { id: "nestjs", name: "NestJS", icon: <NestIcon />, color: "rgba(224, 35, 78, 0.2)" },
  { id: "mongodb", name: "MongoDB", icon: <MongoIcon />, color: "rgba(19, 170, 82, 0.2)" },
  { id: "mysql", name: "MySQL", icon: <MysqlIcon />, color: "rgba(0, 117, 143, 0.2)" },
  { id: "postgresql", name: "PostgreSQL", icon: <PostgresIcon />, color: "rgba(51, 103, 145, 0.2)" },
  { id: "redis", name: "Redis", icon: <RedisIcon />, color: "rgba(216, 44, 32, 0.2)" },
  { id: "jwt", name: "JWT", icon: <JwtIcon />, color: "rgba(245, 140, 25, 0.2)" },
  { id: "rest", name: "REST API", icon: <RestApiIcon />, color: "rgba(0, 122, 204, 0.2)" },
  { id: "socketio", name: "Socket.IO", icon: <SocketIoIcon />, color: "rgba(255, 255, 255, 0.2)" },
  { id: "prisma", name: "Prisma", icon: <PrismaIcon />, color: "rgba(90, 103, 216, 0.2)" },
  { id: "mongoose", name: "Mongoose", icon: <MongooseIcon />, color: "rgba(51, 153, 51, 0.2)" },
] as const;

export default function BackendSkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  const cardsCount = SKILLS.length;

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

  const activeIndex = useMotionValue(0);
  const floatValue = useMotionValue(0);

  const targetTiltX = useMotionValue(0);
  const targetTiltY = useMotionValue(0);

  const tiltX = useSpring(targetTiltX, { stiffness: 80, damping: 24, mass: 1.1 });
  const tiltY = useSpring(targetTiltY, { stiffness: 80, damping: 24, mass: 1.1 });

  const targetOrbX = useMotionValue(0);
  const targetOrbY = useMotionValue(0);

  const orbX = useSpring(targetOrbX, { stiffness: 60, damping: 15, mass: 1.2 });
  const orbY = useSpring(targetOrbY, { stiffness: 60, damping: 15, mass: 1.2 });

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

  const [activeSkillIdx, setActiveSkillIdx] = useState(0);
  useEffect(() => {
    const unsubscribe = activeIndex.on("change", (v) => {
      const normalized = Math.round(v) % cardsCount;
      const activeIdx = normalized < 0 ? normalized + cardsCount : normalized;
      setActiveSkillIdx(activeIdx);
    });
    return () => unsubscribe();
  }, [activeIndex, cardsCount]);

  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const lastPointerX = useRef(0);
  const dragVelocity = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    let animId: number;
    const defaultSpeed = 0.4;
    let currentVelocity = defaultSpeed;
    lastTime.current = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime.current) / 1000, 0.1);
      lastTime.current = time;

      floatValue.set(Math.sin(time * 0.0022));

      if (isDragging.current) {
        currentVelocity = dragVelocity.current;
      } else {
        const deceleration = isHovered.current ? 2.5 : 4.0;
        currentVelocity += (defaultSpeed - currentVelocity) * (1 - Math.exp(-deceleration * dt));
      }

      activeIndex.set(activeIndex.get() + dt * currentVelocity);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [activeIndex, floatValue]);

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
        }, i * 120);
      }
    }
  }, [isInView, cardsCount]);

  const handleMouseMoveSection = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    targetOrbX.set(e.clientX - rect.left);
    targetOrbY.set(e.clientY - rect.top);

    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    targetTiltY.set(normX * 12);
    targetTiltX.set(-normY * 12);
  };

  const handleMouseLeaveSection = () => {
    targetTiltX.set(0);
    targetTiltY.set(0);
  };

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    if (isMobile) return;
    const cardEl = cardRefs.current[idx];
    if (!cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    animate(cardTiltXList.current[idx], -normY * 15, { type: "spring", stiffness: 120, damping: 18, mass: 0.9 });
    animate(cardTiltYList.current[idx], normX * 15, { type: "spring", stiffness: 120, damping: 18, mass: 0.9 });

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

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastPointerX.current = e.clientX;
    dragVelocity.current = 0;
    carouselRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;

    const dragFactor = isMobile ? 0.08 : 0.055;
    activeIndex.set(activeIndex.get() - deltaX * dragFactor);
    dragVelocity.current = -deltaX * dragFactor * 60;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    carouselRef.current?.releasePointerCapture(e.pointerId);

    const decayFactor = 0.85;
    let v = dragVelocity.current * decayFactor;

    const animateInertia = () => {
      if (isDragging.current) return;
      if (Math.abs(v) < 0.05) {
        dragVelocity.current = 0;
        return;
      }
      activeIndex.set(activeIndex.get() + v * 0.016);
      v *= decayFactor;
      requestAnimationFrame(animateInertia);
    };

    if (Math.abs(v) > 0.1) {
      requestAnimationFrame(animateInertia);
    }
  };

  return (
    <section
      id="backend-skills"
      ref={sectionRef}
      onMouseMove={handleMouseMoveSection}
      onMouseLeave={handleMouseLeaveSection}
      className="relative w-screen pt-20 pb-12 overflow-hidden bg-[#050508] flex flex-col items-center z-20 border-t border-white/5 select-none"
    >
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_30%,#1e293b_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#0f172a_0%,transparent_50%)]" />
      </div>

      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.8%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')] pointer-events-none z-0" />

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

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[350px] h-[350px] rounded-full bg-blue-900/10 blur-[100px] top-[10%] left-[15%] animate-[floatBlob_20s_ease-in-out_infinite]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[110px] bottom-[15%] right-[10%] animate-[floatBlob_28s_ease-in-out_infinite_reverse]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-900/10 blur-[90px] top-[60%] left-[50%] animate-[floatBlob_24s_ease-in-out_infinite]" />
      </div>

      <div 
        className="absolute top-[12%] right-[8%] w-[180px] h-[180px] rounded-full bg-blue-500/10 blur-[70px] pointer-events-none z-0"
        style={{
          animation: "floatBlob 14s ease-in-out infinite",
        }}
      />

      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[100px] opacity-70 pointer-events-none z-0 mix-blend-screen transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${SKILLS[activeSkillIdx]?.color.replace("0.2", "0.7")} 0%, transparent 70%)`,
        }}
      />

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

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_45%,rgba(255,255,255,0.015)_50%,transparent_55%)] bg-[length:200%_200%] animate-[shimmer_15s_linear_infinite]" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,5,8,0.95)_100%)]" />

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
            Backend
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
          Building scalable APIs, authentication systems and backend architectures.
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
            const cardAngle = (idx * 360) / cardsCount;

            const d = useTransform(activeIndex, (v) => {
              let diff = idx - (v % cardsCount);
              if (diff > cardsCount / 2) diff -= cardsCount;
              if (diff < -cardsCount / 2) diff += cardsCount;
              return diff;
            });

            const absD = useTransform(d, (val) => Math.abs(val));

            const scale = useTransform(absD, [0, 1, 2, 6], [1.15, 0.90, 0.72, 0.60]);
            const localZ = useTransform(absD, [0, 1, 2, 6], [140, -70, -140, -220]);
            const opacity = useTransform(absD, [0, 1, 2, 6], [1.0, 0.85, 0.35, 0.15]);
            const blur = useTransform(absD, [0, 1, 2, 6], [0, 0.5, 2.0, 4.0]);

            const localRotateY = useTransform(d, [-2, -1, 0, 1, 2], [-55, -35, 0, 35, 55]);

            const zIndex = useTransform(absD, [0, 1, 2, 6], [120, 80, 40, 10]);

            const hp = hoverProgressList.current[idx];
            const ip = introProgressList.current[idx];
            const tiltXVal = cardTiltXList.current[idx];
            const tiltYVal = cardTiltYList.current[idx];

            const finalScale = useTransform([scale, hp, ip], ([s, h, intro]) => (s as number) * (1 + (h as number) * 0.08) * (0.7 + 0.3 * (intro as number)));
            const finalOpacity = useTransform([opacity, ip], ([op, intro]) => (op as number) * (intro as number));
            const finalBlur = useTransform([blur, ip], ([b, intro]) => (b as number) + (1 - (intro as number)) * 10);

            const activeWeight = useTransform(d, (val) => Math.max(0, 1 - Math.abs(val)));
            const floatY = useTransform([floatValue, activeWeight], ([f, w]) => (f as number) * 6 * (w as number));
            const floatR = useTransform([floatValue, activeWeight], ([f, w]) => (f as number) * 2 * (w as number));

            const hoverYOffset = useTransform(hp, (h) => h * -22);
            const totalY = useTransform([floatY, hoverYOffset], ([fY, hY]) => (fY as number) + (hY as number));

            const radius = useTransform(isMobileMV, (mob) => (mob === 1 ? 190 : 365));

            const transform = useMotionTemplate`rotateY(${cardAngle}deg) translateZ(${radius}px) rotateY(${localRotateY}deg) rotateY(${tiltYVal}deg) rotateX(${tiltXVal}deg) rotateZ(${floatR}deg) scale(${finalScale}) translate3d(0, ${totalY}px, ${localZ}px)`;

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
