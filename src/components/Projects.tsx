"use client";

import { useState, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate 
} from "framer-motion";
import { 
  ExternalLink, 
  Github, 
  Sparkles, 
  Terminal, 
  Shield, 
  Ticket, 
  ChevronRight, 
  X, 
  CheckCircle2 
} from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";
import Magnetic from "./Magnetic";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

interface Project {
  title: string;
  category: "Full Stack" | "Backend API" | "Utility";
  badge: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  github: string;
  demo?: string;
  icon: React.ReactNode;
  themeColor: string;
}

// ----------------------------------------------------
// LIVE CODE-VISUALIZATION DASHBOARD PREVIEWS
// ----------------------------------------------------

const AIInterviewPreview = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="w-full h-full bg-[#050B14]/90 rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-3 select-none relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      <div className="flex items-center justify-between border-b border-white/5 pb-2 z-10">
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
        </div>
        <div className="text-[9px] text-gray-500 font-mono tracking-wider">AI_EVALUATOR_SERVICE</div>
        <div className="text-[8px] bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-1.5 py-0.5 rounded font-mono uppercase font-semibold">Active</div>
      </div>

      <div className="grid grid-cols-12 gap-3 items-center z-10 flex-1 my-2">
        <div className="col-span-6 h-full flex flex-col justify-center space-y-1.5">
          <span className="text-[8px] text-gray-500 font-mono uppercase">Voice Input wave</span>
          <div className="flex items-end justify-between h-14 px-2 bg-black/40 border border-white/5 rounded-lg py-1.5 relative overflow-hidden">
            <div className="absolute top-1 left-1.5 flex items-center space-x-1">
              <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[7px] text-red-400/80 font-mono">REC</span>
            </div>
            {Array.from({ length: 14 }).map((_, barIdx) => (
              <motion.div
                key={barIdx}
                className="w-[3px] rounded-full bg-gradient-to-t from-blue-600 to-cyan-400"
                animate={{
                  height: isHovered 
                    ? [8, Math.random() * 32 + 10, 8]
                    : [10, Math.random() * 12 + 6, 10]
                }}
                transition={{
                  duration: Math.random() * 0.5 + 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: barIdx * 0.02
                }}
              />
            ))}
          </div>
        </div>

        <div className="col-span-6 flex flex-col items-center justify-center relative">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="22" stroke="rgba(255,255,255,0.03)" strokeWidth="3.5" fill="transparent" />
              <motion.circle
                cx="28"
                cy="28"
                r="22"
                stroke="#EAB308"
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray={138}
                initial={{ strokeDashoffset: 138 - (138 * 0.6) }}
                animate={{
                  strokeDashoffset: isHovered ? 138 - (138 * 0.96) : 138 - (138 * 0.6)
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-white font-mono">4.8</span>
              <span className="text-[6px] text-gray-500 uppercase font-semibold">Grade</span>
            </div>
          </div>

          <div className="w-full mt-1.5 space-y-1">
            <div className="flex justify-between text-[7px] text-gray-400 font-mono">
              <span>Llama-3.3 Eval</span>
              <span className="text-yellow-400">96%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-yellow-500 rounded-full"
                initial={{ width: "40%" }}
                animate={{ width: isHovered ? "96%" : "60%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FoodiesPreview = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="w-full h-full bg-[#0E0606]/90 rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-3 select-none relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      <div className="flex items-center justify-between border-b border-white/5 pb-2 z-10">
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
        </div>
        <div className="text-[9px] text-gray-500 font-mono tracking-wider">FOODIES_STORE_V4</div>
        <div className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono uppercase font-semibold">Live</div>
      </div>

      <div className="grid grid-cols-2 gap-2 z-10 flex-1 items-center my-2">
        <div className="bg-white/5 border border-white/5 rounded-xl p-2 flex flex-col justify-between h-[64px] relative overflow-hidden group/item">
          <div className="text-[8.5px] font-bold text-white truncate">Double Cheese Burger</div>
          <div className="text-[7.5px] text-gray-500 font-mono">Cheddar & beef</div>
          <div className="flex justify-between items-center mt-1 pt-1 border-t border-white/5">
            <span className="text-[8.5px] font-bold text-emerald-400">$12.99</span>
            <span className="text-[7.5px] bg-red-500/20 text-red-400 rounded-full px-1.5 py-0.2">ADD</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-2 flex flex-col justify-between h-[64px] relative overflow-hidden group/item">
          <div className="text-[8.5px] font-bold text-white truncate">Spicy Ramen Bowl</div>
          <div className="text-[7.5px] text-gray-500 font-mono">Hot rich broth</div>
          <div className="flex justify-between items-center mt-1 pt-1 border-t border-white/5">
            <span className="text-[8.5px] font-bold text-emerald-400">$15.49</span>
            <span className="text-[7.5px] bg-red-500/20 text-red-400 rounded-full px-1.5 py-0.2">ADD</span>
          </div>
        </div>
      </div>

      <motion.div 
        className="bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-1.5 flex items-center justify-between text-[8px] font-mono text-emerald-400 z-10"
        animate={{
          y: isHovered ? [0, -2, 0] : 0
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="flex items-center space-x-1">
          <span>🛒</span>
          <span className="font-bold text-white">Cart:</span>
          <span>2 Items</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span>Subtotal:</span>
          <span className="font-bold text-white">$28.48</span>
          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
        </div>
      </motion.div>
    </div>
  );
};

const HelpdeskPreview = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="w-full h-full bg-[#07090E]/90 rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-3 select-none relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      <div className="flex items-center justify-between border-b border-white/5 pb-2 z-10">
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
        </div>
        <div className="text-[9px] text-gray-500 font-mono tracking-wider">HELPDESK_API_SWAGGER</div>
        <div className="text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded font-mono uppercase font-semibold">Docs</div>
      </div>

      <div className="flex-1 bg-black/60 border border-white/5 rounded-xl p-2.5 font-mono text-[8px] text-gray-400 flex flex-col justify-between overflow-hidden z-10 my-2 h-[86px]">
        <div className="space-y-1">
          <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1 text-gray-500">
            <span>API ROUTING GATEWAY</span>
            <span className="text-emerald-400 font-semibold">ONLINE</span>
          </div>
          <div className="flex items-center space-x-1 text-[7.5px]">
            <span className="text-emerald-400 font-bold">POST</span>
            <span className="text-white truncate max-w-[80px]">/api/tickets</span>
            <span className="text-emerald-400/80 bg-emerald-950/20 px-1 rounded ml-auto">201</span>
          </div>
          <div className="flex items-center space-x-1 text-[7.5px]">
            <span className="text-blue-400 font-bold">GET</span>
            <span className="text-white truncate max-w-[80px]">/api/tickets/TKT-892</span>
            <span className="text-blue-400/80 bg-blue-950/20 px-1 rounded ml-auto">200</span>
          </div>
        </div>

        <div className="border-t border-white/5 pt-1 mt-1 text-[6.5px] text-gray-500 flex flex-col space-y-0.5">
          <div className="flex justify-between items-center">
            <span className="text-indigo-400">[09:41:02]</span>
            <span className="truncate">RBAC Auth check: role verified</span>
          </div>
          <div className="flex justify-between items-center text-white/70">
            <span className="text-indigo-400">[09:42:15]</span>
            <span className="truncate">Ticket priority elevated to HIGH</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// TACTILE CLICK RIPPLE COMPONENT FOR BUTTONS
// ----------------------------------------------------

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const RippleButton = ({
  href,
  children,
  className = "",
  ariaLabel
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      <span className="relative z-10 flex items-center justify-center gap-1.5">
        {children}
      </span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute rounded-full bg-white/20 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "24px",
              height: "24px",
              transform: "translate(-50%, -50%)",
            }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }}
          />
        ))}
      </AnimatePresence>
    </a>
  );
};

// ----------------------------------------------------
// PROJECT CARD: 3D PERSPECTIVE TILT + MICROINTERACTIONS
// ----------------------------------------------------

function ProjectCard({ 
  project, 
  idx 
}: { 
  project: Project; 
  idx: number; 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  // Motion Values for cursor tilt coords (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs to control card angles dynamically
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });

  // Spring to control card lift up y offset and border opacity glow
  const cardY = useSpring(0, { stiffness: 120, damping: 20 });
  const scale = useSpring(1, { stiffness: 150, damping: 18 });
  const borderVal = useSpring(0.08, { stiffness: 120, damping: 20 });
  const bgVal = useSpring(0.05, { stiffness: 120, damping: 20 });

  // Parallax shifts inside the card mockup
  const previewShiftX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 20 });
  const previewShiftY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xCoords = (e.clientX - rect.left) / rect.width - 0.5;
    const yCoords = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xCoords);
    mouseY.set(yCoords);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    cardY.set(-12);
    scale.set(1.02);
    borderVal.set(0.24); // glowing border
    bgVal.set(0.08); // brighter glass bg
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    cardY.set(0);
    scale.set(1);
    borderVal.set(0.08);
    bgVal.set(0.05);
  };

  const cardBorder = useMotionTemplate`1px solid rgba(255, 255, 255, ${borderVal})`;
  const cardBg = useMotionTemplate`rgba(255, 255, 255, ${bgVal})`;

  // Render the specific visual dashboard or screenshot
  const renderVisualMockup = () => {
    switch (idx) {
      case 0: return (
        <div className="w-full h-full relative overflow-hidden rounded-2xl bg-black/40">
          <motion.img
            src="/ai_interview.png"
            alt="AI Interview App Screenshot"
            className="w-full h-full object-cover object-top"
            animate={isHovered ? { scale: 1.08, y: -4 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      );
      case 1: return (
        <div className="w-full h-full relative overflow-hidden rounded-2xl bg-black/40">
          <motion.img
            src="/foodies.png"
            alt="Foodies App Screenshot"
            className="w-full h-full object-cover object-top"
            animate={isHovered ? { scale: 1.08, y: -4 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      );
      case 2: return (
        <div className="w-full h-full relative overflow-hidden rounded-2xl bg-black/40">
          <motion.img
            src="/helpdesk.png"
            alt="Helpdesk Ticketing System Screenshot"
            className="w-full h-full object-cover object-top"
            animate={isHovered ? { scale: 1.08, y: -4 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      );
      default: return null;
    }
  };

  // Entry transitions
  const cardEntryVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.92, 
      filter: "blur(8px)" 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  // Tech Badge container hover staggered reveal
  const badgeContainer = {
    hover: { transition: { staggerChildren: 0.04 } }
  };

  const badgeItem = {
    initial: { y: 0, opacity: 0.8, scale: 1 },
    hover: { 
      y: -4, 
      opacity: 1, 
      scale: 1.05,
      transition: { type: "spring", stiffness: 150, damping: 10 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardEntryVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        y: cardY,
        scale,
        rotateX: tiltX,
        rotateY: tiltY,
        transformStyle: "preserve-3d",
        perspective: 1200
      }}
      className="relative rounded-[24px] overflow-hidden flex flex-col justify-between h-[540px] cursor-pointer group shadow-xl"
    >
      {/* Background glass board */}
      <motion.div 
        style={{
          border: cardBorder,
          background: cardBg,
          backdropFilter: "blur(20px)"
        }}
        className="absolute inset-0 rounded-[24px] pointer-events-none z-0"
      />

      {/* Internal visual highlights glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 bg-radial-gradient"
        style={{
          background: `radial-gradient(circle at center, ${project.themeColor} 0%, transparent 65%)`
        }}
      />

      {/* Card Border Glow */}
      <div 
        className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 border border-white/10"
        style={{
          boxShadow: `0 0 40px ${project.themeColor}20`,
        }}
      />

      {/* Content wrapper */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between relative z-10 select-none">
        
        {/* Header Details */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.div 
                animate={isHovered ? { rotate: 8, scale: 1.05 } : { rotate: 0, scale: 1 }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center shadow-inner"
              >
                {project.icon}
              </motion.div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-sans">
                {project.category}
              </span>
            </div>
            <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300 font-sans font-medium uppercase tracking-wider">
              {project.badge}
            </span>
          </div>

          {/* Large Preview Area */}
          <motion.div 
            style={{
              x: previewShiftX,
              y: previewShiftY,
              transformStyle: "preserve-3d"
            }}
            className="w-full h-[220px] rounded-2xl overflow-hidden mb-5 border border-white/5 relative bg-black/30 shadow-inner group-hover:border-white/10 transition-colors duration-300 z-20"
          >
            {showIframe && project.demo ? (
              <div className="w-full h-full relative z-30">
                <iframe
                  src={project.demo}
                  title={`${project.title} Demo`}
                  className="w-full h-full border-0 bg-[#0A0A0A] pb-8"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
                {/* Exit Demo button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowIframe(false);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/85 hover:bg-black/95 text-white border border-white/10 transition-colors shadow-lg z-40 cursor-pointer"
                  title="Close Live View"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Helpful new-tab link for iframe blockages (Vercel SSO, browser tracking blockers) */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/80 px-2.5 py-1.5 rounded-lg border border-white/5 text-[9px] font-sans text-gray-400 backdrop-blur-md z-40 select-none">
                  <span>Blocked or loading issue?</span>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-0.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open in new tab <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ) : (
              <>
                {renderVisualMockup()}
                
                {/* Hover Buttons Overlay - specifically on top of the mockup/photo */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center gap-3 z-35 pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Magnetic range={0.25}>
                        <RippleButton
                          href={project.github}
                          className="px-4.5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2"
                          ariaLabel="GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                          <span>GitHub</span>
                        </RippleButton>
                      </Magnetic>

                      {project.demo && (
                        <Magnetic range={0.25}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowIframe(true);
                            }}
                            className="px-4.5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </button>
                        </Magnetic>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
            
            {/* Vignette Overlay (Only shows when iframe is not active) */}
            {!showIframe && <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-10" />}
          </motion.div>

          {/* Title & Desc */}
          <h4 className="text-xl sm:text-2xl font-bold font-display text-white mb-2 group-hover:text-white/90 transition-colors">
            {project.title}
          </h4>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Badges and Actions Panel */}
        <div className="mt-4">
          
          {/* Tech Badges */}
          <motion.div 
            variants={badgeContainer}
            animate={isHovered ? "hover" : "initial"}
            className="flex flex-wrap gap-1.5 mb-6"
          >
            {project.technologies.slice(0, 4).map((tech, tIdx) => (
              <motion.span 
                key={tIdx} 
                variants={badgeItem}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 font-sans border border-white/5 hover:border-white/15 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[9px] px-2.5 py-1 text-gray-500 font-sans flex items-center">
                +{project.technologies.length - 4} more
              </span>
            )}
          </motion.div>

          {/* Action Trigger Link / Info */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5 h-10 relative overflow-hidden">
            {/* Left: Indicator Link (Hidden on Hover) */}
            <motion.span 
              animate={{
                y: isHovered ? -25 : 0,
                opacity: isHovered ? 0 : 1
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="text-xs font-semibold text-blue-400 flex items-center gap-1 font-sans"
            >
              Explore Details <ChevronRight className="w-3.5 h-3.5" />
            </motion.span>

            {/* Right: Informational text (slides up) */}
            <motion.div
              animate={{
                y: isHovered ? 0 : 30,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 flex items-center justify-between text-[11px] font-sans text-gray-500"
            >
              <span>Click card for detailed features</span>
              <span className="text-blue-400 font-medium">Read more</span>
            </motion.div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// MAIN PROJECTS SECTION CONTAINER
// ----------------------------------------------------

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll linked values to morph background based on entry
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacityBlue = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0, 0.85, 0.4, 0]
  );

  const opacityViolet = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0, 0.2, 0.85, 0]
  );

  const projectsList: Project[] = [
    {
      title: "AI Interview App",
      category: "Full Stack",
      badge: "AI Showcase",
      themeColor: "rgba(234,179,8,0.18)", // Gold Theme
      description: "An AI-powered mock interview platform generating custom questions, recording responses, and providing Llama-3.3-70b evaluated grading.",
      longDescription: "A full-stack candidate screening application. It generates specialized mock interview queues across five technical roles (Frontend, Backend, Fullstack, HR, DSA) and three difficulties. Responses are graded out of 5 with constructive strengths and weaknesses assessments using the Llama-3.3-70b-versatile LLM via the Groq SDK.",
      technologies: ["React 19", "React Router v7", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Groq API (Llama 3.3)", "Axios"],
      features: [
        "Interactive mock interviews with timed submission mechanics.",
        "Granular AI evaluation scores (out of 5) and feedback reports per answer.",
        "Candidate Dashboard tracking performance histories.",
        "Secure Admin Portal showing aggregate user stats and managing candidate accounts."
      ],
      github: "https://github.com/vijaychelumalla/AI-Interview-App",
      demo: "https://ai-interview-app-hugd.vercel.app",
      icon: <Sparkles className="w-5 h-5 text-yellow-400" />
    },
    {
      title: "Foodies App (Zomato Clone)",
      category: "Full Stack",
      badge: "Featured Full Stack",
      themeColor: "rgba(239,68,68,0.14)", // Red Theme
      description: "A fast-loading Zomato clone with category browsing, cart calculations, shipping forms, order logs, and admin controls.",
      longDescription: "A full-scale food ordering application built with modern standards. Features high-performance state management using React Context API for shopping cart updates, custom registration forms, shipping checks, and backend services to process order registries.",
      technologies: ["React.js", "Vite", "Node.js", "Express.js", "MongoDB", "Mongoose", "Tailwind CSS v4", "JWT", "GitHub Actions"],
      features: [
        "Categorized menu exploration with search matching and custom tag descriptors.",
        "Instant React Context cart calculations (totals, item add/remove).",
        "Comprehensive Order Dashboard tracking status changes (Pending, Out for Delivery, Delivered).",
        "CI/CD workflow integrating GitHub Actions to deploy static pages to GitHub Pages."
      ],
      github: "https://github.com/vijaychelumalla/foodie-app",
      demo: "https://vijay-vijay21.vercel.app",
      icon: <Terminal className="w-5 h-5 text-red-400" />
    },
    {
      title: "Helpdesk / Ticketing System API",
      category: "Backend API",
      badge: "Swagger Documented",
      themeColor: "rgba(59,130,246,0.16)", // Blue Theme
      description: "A secure CRM ticketing backend with role-based restrictions, comments, file attachments, and activity history logs.",
      longDescription: "A CRM helpdesk ticketing backend API. It enforces Role-Based Access Control (RBAC) across customers, support agents, and administrators. Supports attachment uploads, communication thread histories, dashboard aggregation metrics, and is fully documented via Swagger.",
      technologies: ["Node.js (ESM)", "Express.js", "MongoDB", "Mongoose ODM", "JWT", "bcryptjs", "Multer (File Upload)", "Swagger UI Docs"],
      features: [
        "Role-scoped endpoint paths (Customers see own tickets, Agents see assigned, Admin full control).",
        "Complete ticketing workflows tracking priorities (Low, Medium, High) and status lifecycles.",
        "Support communication comments attached to tickets.",
        "Activity audit logs storing record modifications dynamically.",
        "Interactive documentation hosted under /api-docs with swagger-ui-express."
      ],
      github: "https://github.com/vijaychelumalla/helpdesk-ticketing-system",
      icon: <Ticket className="w-5 h-5 text-blue-400" />
    }
  ];

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  // Ambient floating particle dots configuration
  const particles = [
    { size: 1.5, x: 12, y: 15, duration: 18, delay: 0 },
    { size: 2.5, x: 78, y: 22, duration: 25, delay: -4 },
    { size: 1.0, x: 45, y: 38, duration: 22, delay: -2 },
    { size: 2.0, x: 28, y: 65, duration: 20, delay: -7 },
    { size: 1.5, x: 88, y: 72, duration: 28, delay: -3 },
    { size: 3.0, x: 62, y: 48, duration: 30, delay: -9 },
    { size: 1.2, x: 5, y: 82, duration: 15, delay: -1 },
    { size: 2.0, x: 92, y: 12, duration: 24, delay: -5 },
    { size: 1.5, x: 52, y: 88, duration: 21, delay: -6 }
  ];

  return (
    <motion.section 
      id="projects" 
      ref={sectionRef}
      style={{ backgroundColor: "#0B0B0B" }}
      className="relative z-10 w-full py-32 px-6 border-t border-white/5 overflow-hidden transition-all duration-700"
    >
      {/* Dynamic Ambient Background Layers (GPU Composited) */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          opacity: opacityBlue,
          background: "radial-gradient(circle at 50% 50%, rgba(20,24,35,0.85) 0%, rgba(11,11,11,1) 100%)"
        }}
      />
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          opacity: opacityViolet,
          background: "radial-gradient(circle at 50% 50%, rgba(16,14,35,0.85) 0%, rgba(11,11,11,1) 100%)"
        }}
      />

      {/* Background Ambient Mesh Light Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <motion.div
          animate={{
            x: [-60, 60, -60],
            y: [-30, 90, -30],
            scale: [0.85, 1.15, 0.85],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[15%] left-[5%] w-[450px] h-[450px] rounded-full bg-blue-600/10 blur-[130px]"
        />
        <motion.div
          animate={{
            x: [60, -60, 60],
            y: [50, -50, 50],
            scale: [1.15, 0.85, 1.15],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[25%] right-[5%] w-[550px] h-[550px] rounded-full bg-indigo-700/10 blur-[150px]"
        />
        <motion.div
          animate={{
            x: [-30, 30, -30],
            y: [80, -20, 80],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute bottom-0 left-[20%] w-[380px] h-[380px] rounded-full bg-violet-600/10 blur-[120px]"
        />
      </div>

      {/* Floating particles background overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full bg-blue-500/15"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: ["0%", "100%", "0%"],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            }}
          />
        ))}
      </div>

      {/* Section Content Wrapper */}
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title Group with cinematic scroll entry */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
            whileInView={{ opacity: 0.6, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[10px] tracking-[0.25em] text-blue-400 font-bold uppercase font-sans mb-4"
          >
            PORTFOLIO SHOWCASE
          </motion.h2>

          <AnimatedHeading
            text="Featured Projects"
            tag="h3"
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white tracking-tight"
          />

          <motion.p 
            initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-gray-400 mt-6 max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            A collection of projects showcasing backend engineering, scalable APIs, authentication systems, and full-stack development.
          </motion.p>
        </div>

        {/* Scroll Stacking Showcase */}
        <div className="max-w-4xl mx-auto mt-16">
          <ScrollStack
            useWindowScroll={true}
            className="window-scroll"
            itemDistance={120}
            itemStackDistance={35}
            stackPosition="15%"
            scaleEndPosition="5%"
            baseScale={0.88}
            itemScale={0.03}
            blurAmount={1.5}
          >
            {projectsList.map((project, idx) => (
              <ScrollStackItem key={idx}>
                <ProjectCard 
                  project={project} 
                  idx={idx} 
                />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

      </div>

    </motion.section>
  );
}
