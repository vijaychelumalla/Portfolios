"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// High-fidelity custom inline SVG icons for all 12 technologies
const HTML5Icon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="html5-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B4A" />
        <stop offset="100%" stopColor="#F13C12" />
      </linearGradient>
    </defs>
    <path d="M1.5 22L0 2.5h24L22.5 22 12 24.5L1.5 22z" fill="url(#html5-grad)" />
    <path d="M12 4.5v16.3l7.1-2 1.15-13H12z" fill="#E34F26" opacity="0.3" />
    <path d="M12 7.5H7.75l.3 3.3H12v-3.3zm0 5.4H9.65l.18 2 2.17.6V12.9z" fill="#FFF" />
    <path d="M12 7.5v3.3h4.45l-.45 4.8-4 1.1v-9.2z" fill="#EAEAEA" />
    <path d="M12 12.9v2.6l1.85-.5.2-1.9H12z" fill="#EAEAEA" />
  </svg>
);

const CSS3Icon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="css3-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#30A9DC" />
        <stop offset="100%" stopColor="#1572B6" />
      </linearGradient>
    </defs>
    <path d="M1.5 22L0 2.5h24L22.5 22 12 24.5L1.5 22z" fill="url(#css3-grad)" />
    <path d="M12 4.5v16.3l7.1-2 1.15-13H12z" fill="#115D8C" opacity="0.3" />
    <path d="M12 7.5H7.75l.3 3.3H12v-3.3zm0 5.4H9.65l.18 2 2.17.6V12.9z" fill="#FFF" opacity="0.9" />
    <path d="M12 7.5v3.3h4.45l-.45 4.8-4 1.1v-9.2z" fill="#EAEAEA" />
    <path d="M12 12.9v2.6l1.85-.5.2-1.9H12z" fill="#EAEAEA" />
  </svg>
);

const JSIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="js-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBE335" />
        <stop offset="100%" stopColor="#F7DF1E" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="5" fill="url(#js-grad)" />
    <path d="M18.8 19.2c-0.8 1.4-2.2 2-4 2-2.5 0-3.8-1.4-4-3.4h2.5c0.1 0.9 0.6 1.4 1.5 1.4 0.9 0 1.4-0.4 1.4-1.2V9.8h2.6v8.2c0 0.8 0 1.2 0 1.2zM8.8 15.3c0.2 1.2 1 1.9 2.2 1.9 1 0 1.7-0.5 1.7-1.4 0-1-0.7-1.4-1.9-1.9l-0.7-0.3c-1.8-0.7-2.9-1.7-2.9-3.5 0-2.1 1.7-3.6 4.1-3.6 2.3 0 3.7 1.2 3.9 3.2h-2.5c-0.1-0.9-0.6-1.4-1.4-1.4-0.7 0-1.3 0.4-1.3 1.1 0 0.8 0.5 1.1 1.5 1.5l0.7 0.3c2 0.8 3.3 1.7 3.3 3.7 0 2.2-1.7 3.8-4.4 3.8-2.6 0-4.3-1.4-4.5-3.8h2.3z" fill="#181818" />
  </svg>
);

const TSIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ts-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3194D6" />
        <stop offset="100%" stopColor="#007ACC" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="5" fill="url(#ts-grad)" />
    <path d="M7 9.5h3.6V20H13V9.5h3.6V7H7v2.5zm11.7 5.8c0.2 1.2 1 1.9 2.2 1.9 1 0 1.7-0.5 1.7-1.4 0-1-0.7-1.4-1.9-1.9l-0.7-0.3c-1.8-0.7-2.9-1.7-2.9-3.5 0-2.1 1.7-3.6 4.1-3.6 2.3 0 3.7 1.2 3.9 3.2h-2.5c-0.1-0.9-0.6-1.4-1.4-1.4-0.7 0-1.3 0.4-1.3 1.1 0 0.8 0.5 1.1 1.5 1.5l0.7 0.3c2 0.8 3.3 1.7 3.3 3.7 0 2.2-1.7 3.8-4.4 3.8-2.6 0-4.3-1.4-4.5-3.8h2.3z" fill="#FFF" />
  </svg>
);

const ReactIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="react-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00F2FE" />
        <stop offset="100%" stopColor="#4FACFE" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="2" fill="url(#react-grad)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="url(#react-grad)" strokeWidth="1.5" fill="none" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="url(#react-grad)" strokeWidth="1.5" fill="none" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="url(#react-grad)" strokeWidth="1.5" fill="none" transform="rotate(150 12 12)" />
  </svg>
);

const NextjsIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11.5" fill="#000" stroke="#FFF" strokeOpacity="0.2" strokeWidth="1" />
    <path d="M17.5 18l-6.8-9h-1.7v7.5h1.5v-5.2l5.4 7.2c.5-.4 1-.9 1.6-1.5z" fill="#FFF" />
    <rect x="15" y="9" width="1.5" height="7.5" fill="#FFF" />
  </svg>
);

const TailwindIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="tw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>
    <path d="M12 5.5c-2.4 0-4.2 1.2-5.4 3.6 1.8-.6 3.3-.3 4.5.9.9.9 1.5 2.1 2.7 3.3 2 2 4.4 2.7 7.2 2.1 1.8-.4 3.2-1.6 4-3.6-1.8.6-3.3.3-4.5-.9-.9-.9-1.5-2.1-2.7-3.3-2-2-4.4-2.7-7.2-2.1zM6 11.5c-2.4 0-4.2 1.2-5.4 3.6 1.8-.6 3.3-.3 4.5.9.9.9 1.5 2.1 2.7 3.3 2 2 4.4 2.7 7.2 2.1 1.8-.4 3.2-1.6 4-3.6-1.8.6-3.3.3-4.5-.9-.9-.9-1.5-2.1-2.7-3.3-2-2-4.4-2.7-7.2-2.1z" fill="url(#tw-grad)" />
  </svg>
);

const NodejsIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="node-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#689F63" />
        <stop offset="100%" stopColor="#339933" />
      </linearGradient>
    </defs>
    <path d="M12 1L3 6v12l9 5 9-5V6l-9-5zm7.3 15.5l-7.3 4V10.2l7.3-4.1v10.4z" fill="url(#node-grad)" />
    <path d="M12 1L3 6v12l9 5v-2.8l-7.3-4V7.5L12 4.7V1z" fill="#689F63" opacity="0.6" />
  </svg>
);

const ExpressIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="express-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EAEAEA" />
        <stop offset="100%" stopColor="#888888" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="5" fill="#1A1A1A" stroke="url(#express-grad)" strokeOpacity="0.2" strokeWidth="1" />
    <text x="12" y="15.5" fill="url(#express-grad)" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">ex</text>
  </svg>
);

const MongodbIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="mongo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10AA50" />
        <stop offset="100%" stopColor="#13AA52" />
      </linearGradient>
      <linearGradient id="mongo-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#499D4A" />
        <stop offset="100%" stopColor="#3F9040" />
      </linearGradient>
    </defs>
    <path d="M12 1.5c-.3 0-5.8 4.7-5.8 10.3c0 5.2 3.8 8.7 5.8 10.7c2-2 5.8-5.5 5.8-10.7c0-5.6-5.5-10.3-5.8-10.3zm0 2.2c1.7 2.3 3.6 4.7 3.6 8.1c0 3.3-2.1 5.9-3.6 7.4V3.7z" fill="url(#mongo-grad)" />
    <path d="M12 3.7v14.7c-1.5-1.5-3.6-4.1-3.6-7.4c0-3.4 1.9-5.8 3.6-8.1z" fill="url(#mongo-grad2)" opacity="0.8" />
  </svg>
);

const GitIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="git-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F1502F" />
        <stop offset="100%" stopColor="#DE4C30" />
      </linearGradient>
    </defs>
    <path d="M23.2 11L13 1C12.3.4 11.4.4 10.8 1L1 10.8c-.6.6-.6 1.5 0 2.2l10.2 10.2c.6.6 1.5.6 2.2 0L23.2 13c.6-.6.6-1.6 0-2.2z" fill="url(#git-grad)" />
    <circle cx="12" cy="17.5" r="2.5" fill="#FFF" />
    <circle cx="12" cy="7.5" r="2.5" fill="#FFF" />
    <circle cx="7.5" cy="12" r="2.5" fill="#FFF" />
    <path d="M12 10v5M7.5 12h3" stroke="#FFF" strokeWidth="2" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-12 h-12 select-none pointer-events-none" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11.5" fill="#181717" stroke="#FFF" strokeOpacity="0.2" strokeWidth="1" />
    <path d="M12 5.5c-3.6 0-6.5 2.9-6.5 6.5 0 2.9 1.9 5.3 4.5 6.1.3.1.4-.1.4-.3v-1.1c-1.8.4-2.2-.9-2.2-.9-.3-.8-.7-1-.7-1-.6-.4.1-.4.1-.4.6.1 1 .7 1 .7.6 1 1.5.7 1.9.5.1-.4.2-.7.4-.9-1.4-.2-3-0.7-3-3.2 0-.7.3-1.3.7-1.8-.1-.2-.3-.8.1-1.8 0 0 .5-.2 1.8.7a6.2 6.2 0 013.3 0c1.2-.9 1.8-.7 1.8-.7.4 1 .2 1.6.1 1.8.4.5.7 1.1.7 1.8 0 2.5-1.5 3-3 3.2.2.2.5.7.5 1.4v2.1c0 .2.1.4.4.3 2.6-.9 4.5-3.3 4.5-6.1 0-3.6-2.9-6.5-6.5-6.5z" fill="#FFF" />
  </svg>
);

interface TechCard {
  name: string;
  icon: React.ReactNode;
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  const technologies: TechCard[] = [
    { name: "HTML5", icon: <HTML5Icon /> },
    { name: "CSS3", icon: <CSS3Icon /> },
    { name: "JavaScript", icon: <JSIcon /> },
    { name: "TypeScript", icon: <TSIcon /> },
    { name: "React", icon: <ReactIcon /> },
    { name: "Next.js", icon: <NextjsIcon /> },
    { name: "Tailwind CSS", icon: <TailwindIcon /> },
    { name: "Node.js", icon: <NodejsIcon /> },
    { name: "Express", icon: <ExpressIcon /> },
    { name: "MongoDB", icon: <MongodbIcon /> },
    { name: "Git", icon: <GitIcon /> },
    { name: "GitHub", icon: <GithubIcon /> },
  ];

  const cardsCount = technologies.length;

  // Track responsive screen state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set up animation states & physics variables in mutable refs to keep 60 FPS without React re-renders
  const stateRef = useRef({
    autoIndex: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    currentTiltX: 0,
    currentTiltY: 0,
    tiltVelocityX: 0,
    tiltVelocityY: 0,
    targetOrbX: 0,
    targetOrbY: 0,
    currentOrbX: 0,
    currentOrbY: 0,
    orbVelocityX: 0,
    orbVelocityY: 0,
    entryTime: 0,
    isMobile: false,
    hoveredIndex: -1,
    hoverProgress: new Array(cardsCount).fill(0),
    hoverVelocity: new Array(cardsCount).fill(0),
    cardTiltX: new Array(cardsCount).fill(0),
    cardTiltY: new Array(cardsCount).fill(0),
    targetCardTiltX: new Array(cardsCount).fill(0),
    targetCardTiltY: new Array(cardsCount).fill(0),
    cardTiltVelocityX: new Array(cardsCount).fill(0),
    cardTiltVelocityY: new Array(cardsCount).fill(0),
    introProgress: new Array(cardsCount).fill(0),
    introVelocity: new Array(cardsCount).fill(0),
  });

  // Keep stateRef in sync with React states
  useEffect(() => {
    stateRef.current.isMobile = isMobile;
  }, [isMobile]);

  // Handle global mouse moves over the fullscreen section
  const handleMouseMoveSection = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    stateRef.current.targetOrbX = x;
    stateRef.current.targetOrbY = y;

    // Normalised coordinate offset from center (-0.5 to 0.5)
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    // Carousel container rotation targets (max 12 deg)
    stateRef.current.targetTiltY = normX * 12; // Mouse Left/Right
    stateRef.current.targetTiltX = -normY * 12; // Mouse Up/Down
  };

  // Reset container tilt on mouse leave
  const handleMouseLeaveSection = () => {
    stateRef.current.targetTiltX = 0;
    stateRef.current.targetTiltY = 0;
  };

  // Cosine interpolation for organic transition curves
  const interpolateCosine = (x: number, input: number[], output: number[]): number => {
    if (x <= input[0]) return output[0];
    if (x >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (x >= input[i] && x <= input[i + 1]) {
        const t = (x - input[i]) / (input[i + 1] - input[i]);
        const tCos = (1 - Math.cos(t * Math.PI)) / 2;
        return output[i] + tCos * (output[i + 1] - output[i]);
      }
    }
    return output[0];
  };

  // Handle individual card mouse movements for spotlight + card-specific tilt
  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    if (isMobile) return;
    const cardEl = cardRefs.current[idx];
    if (!cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    
    cardEl.style.setProperty("--mouse-x", `${px}%`);
    cardEl.style.setProperty("--mouse-y", `${py}%`);

    // Card relative tilt angles (-0.5 to 0.5 normalized coordinates, max 15 deg tilt)
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    stateRef.current.targetCardTiltX[idx] = -normY * 15;
    stateRef.current.targetCardTiltY[idx] = normX * 15;
  };

  const handleMouseEnterCard = (idx: number) => {
    stateRef.current.hoveredIndex = idx;
  };

  const handleMouseLeaveCard = (idx: number) => {
    stateRef.current.hoveredIndex = -1;
    stateRef.current.targetCardTiltX[idx] = 0;
    stateRef.current.targetCardTiltY[idx] = 0;
  };

  // Main high-performance spring animation loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    // Configuration of spring constants
    const stiffness = 120;
    const damping = 18;
    const mass = 0.9;

    const loop = (now: number) => {
      let dt = (now - lastTime) / 1000; // time delta in seconds
      if (dt > 0.1) dt = 0.1; // Cap time step to avoid physics bugs on background tabs
      lastTime = now;

      const state = stateRef.current;

      // Handle viewport entry timing for Scroll Reveal
      if (isInView) {
        if (state.entryTime === 0) {
          state.entryTime = now;
        }
      }

      // 1. Continuous Auto-Rotation Loop
      // 30 seconds for a complete cycle of cardsCount (12)
      // Speed is 12 / 30 = 0.4 cards per second
      state.autoIndex += dt * 0.4;

      // 2. Spring updates for general container tilt
      const forceTiltX = -stiffness * (state.currentTiltX - state.targetTiltX) - damping * state.tiltVelocityX;
      state.tiltVelocityX += (forceTiltX / mass) * dt;
      state.currentTiltX += state.tiltVelocityX * dt;

      const forceTiltY = -stiffness * (state.currentTiltY - state.targetTiltY) - damping * state.tiltVelocityY;
      state.tiltVelocityY += (forceTiltY / mass) * dt;
      state.currentTiltY += state.tiltVelocityY * dt;

      if (carouselRef.current) {
        carouselRef.current.style.transform = `perspective(1800px) rotateX(${state.currentTiltX}deg) rotateY(${state.currentTiltY}deg)`;
      }

      // 3. Spring updates for lagging mouse orb
      // Initialize orb position to target instantly if it's the very first movement
      if (state.currentOrbX === 0 && state.currentOrbY === 0 && state.targetOrbX !== 0) {
        state.currentOrbX = state.targetOrbX;
        state.currentOrbY = state.targetOrbY;
      } else {
        const forceOrbX = -stiffness * (state.currentOrbX - state.targetOrbX) - damping * state.orbVelocityX;
        state.orbVelocityX += (forceOrbX / mass) * dt;
        state.currentOrbX += state.orbVelocityX * dt;

        const forceOrbY = -stiffness * (state.currentOrbY - state.targetOrbY) - damping * state.orbVelocityY;
        state.orbVelocityY += (forceOrbY / mass) * dt;
        state.currentOrbY += state.orbVelocityY * dt;
      }

      if (orbRef.current) {
        // Center the 192px (w-48) orb on the cursor
        orbRef.current.style.transform = `translate3d(${state.currentOrbX - 96}px, ${state.currentOrbY - 96}px, 0)`;
      }

      // 4. Update and render individual cards positions
      for (let i = 0; i < cardsCount; i++) {
        const cardEl = cardRefs.current[i];
        if (!cardEl) continue;

        // CoverFlow index distance calculation
        let d = i - (state.autoIndex % cardsCount);
        if (d > cardsCount / 2) d -= cardsCount;
        if (d < -cardsCount / 2) d += cardsCount;

        // Check if intro animation is ready (120ms staggered delay per card index)
        const hasTriggeredIntro = isInView && state.entryTime > 0 && (now - state.entryTime >= i * 120);
        const targetIntroVal = hasTriggeredIntro ? 1 : 0;

        // Intro Spring updates
        const forceIntro = -stiffness * (state.introProgress[i] - targetIntroVal) - damping * state.introVelocity[i];
        state.introVelocity[i] += (forceIntro / mass) * dt;
        state.introProgress[i] += state.introVelocity[i] * dt;

        const ip = state.introProgress[i];

        // Hover Progress Spring updates
        const targetHoverVal = state.hoveredIndex === i ? 1 : 0;
        const forceHover = -stiffness * (state.hoverProgress[i] - targetHoverVal) - damping * state.hoverVelocity[i];
        state.hoverVelocity[i] += (forceHover / mass) * dt;
        state.hoverProgress[i] += state.hoverVelocity[i] * dt;

        const hp = state.hoverProgress[i];

        // Card Relative Hover Tilt Spring updates
        const forceCardTiltX = -stiffness * (state.cardTiltX[i] - state.targetCardTiltX[i]) - damping * state.cardTiltVelocityX[i];
        state.cardTiltVelocityX[i] += (forceCardTiltX / mass) * dt;
        state.cardTiltX[i] += state.cardTiltVelocityX[i] * dt;

        const forceCardTiltY = -stiffness * (state.cardTiltY[i] - state.targetCardTiltY[i]) - damping * state.cardTiltVelocityY[i];
        state.cardTiltVelocityY[i] += (forceCardTiltY / mass) * dt;
        state.cardTiltY[i] += state.cardTiltVelocityY[i] * dt;

        // Custom property variables passed to CSS
        cardEl.style.setProperty("--hover-progress", hp.toFixed(4));

        // Coordinate calculations (interpolated piecewise based on index distance 'd')
        let tx = 0;
        let tz = 0;
        let ry = 0;
        let s = 1;
        let op = 1;
        let bl = 0;
        let zi = 50;

        const interpolationPoints = [-3, -2, -1, 0, 1, 2, 3];

        if (state.isMobile) {
          // Mobile responsive coordinates (tighter translateX, smaller scale, lower perspective depth)
          const txOut = [-220, -150, -85, 0, 85, 150, 220];
          const tzOut = [-180, -120, -50, 60, -50, -120, -180];
          const ryOut = [60, 45, 25, 0, -25, -45, -60];
          const sOut  = [0.4, 0.55, 0.72, 0.85, 0.72, 0.55, 0.4];
          const opOut = [0.0, 0.45, 0.95, 1.0, 0.95, 0.45, 0.0];
          const blOut = [6, 2, 0, 0, 0, 2, 6];
          const ziOut = [10, 40, 70, 100, 70, 40, 10];

          tx = interpolateCosine(d, interpolationPoints, txOut);
          tz = interpolateCosine(d, interpolationPoints, tzOut);
          ry = interpolateCosine(d, interpolationPoints, ryOut);
          s  = interpolateCosine(d, interpolationPoints, sOut);
          op = interpolateCosine(d, interpolationPoints, opOut);
          bl = interpolateCosine(d, interpolationPoints, blOut);
          zi = Math.round(interpolateCosine(d, interpolationPoints, ziOut));
        } else {
          // Desktop premium coordinates matching prompt's 3D specifications
          const txOut = [-480, -320, -170, 0, 170, 320, 480];
          const tzOut = [-260, -160, -60, 120, -60, -160, -260];
          const ryOut = [70, 55, 35, 0, -35, -55, -70];
          const sOut  = [0.5, 0.72, 0.88, 1.0, 0.88, 0.72, 0.5];
          const opOut = [0.0, 0.45, 0.95, 1.0, 0.95, 0.45, 0.0];
          const blOut = [6, 2, 0, 0, 0, 2, 6];
          const ziOut = [10, 40, 70, 100, 70, 40, 10];

          tx = interpolateCosine(d, interpolationPoints, txOut);
          tz = interpolateCosine(d, interpolationPoints, tzOut);
          ry = interpolateCosine(d, interpolationPoints, ryOut);
          s  = interpolateCosine(d, interpolationPoints, sOut);
          op = interpolateCosine(d, interpolationPoints, opOut);
          bl = interpolateCosine(d, interpolationPoints, blOut);
          zi = Math.round(interpolateCosine(d, interpolationPoints, ziOut));
        }

        // Active Card Floater: gentle sinus offset on Y & rotateZ (4s cycle)
        const activeWeight = Math.max(0, 1 - Math.abs(d));
        const floatY = Math.sin(now * Math.PI * 2 / 4000) * 6 * activeWeight;
        const floatR = Math.sin(now * Math.PI * 2 / 4000) * 2 * activeWeight;

        // Hover variables
        const hoverYOffset = hp * -22;
        const finalScale = s * (1 + hp * 0.08) * (0.7 + 0.3 * ip); // Combine hover scaling and intro scale reveal (0.7 -> 1)
        const finalRotateY = ry * ip + (1 - ip) * 15; // Combine coverflow rotate and intro rotateY reveal (15deg -> 0deg)

        // Combine hover relative tilt inputs
        const tiltX = state.cardTiltX[i];
        const tiltY = state.cardTiltY[i];

        // Apply final GPU-accelerated transforms
        cardEl.style.transform = `translateX(calc(-50% + ${tx}px)) translateY(calc(-50% + ${floatY + hoverYOffset}px)) translateZ(${tz}px) rotateY(${finalRotateY + tiltY}deg) rotateX(${tiltX}deg) rotateZ(${floatR}deg) scale(${finalScale})`;
        cardEl.style.opacity = (op * ip).toFixed(4);
        cardEl.style.zIndex = zi.toString();

        // Staggered blur reveal
        const finalBlur = bl + (1 - ip) * 10;
        cardEl.style.filter = finalBlur > 0.1 ? `blur(${finalBlur.toFixed(1)}px)` : "none";
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isInView, cardsCount]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={handleMouseMoveSection}
      onMouseLeave={handleMouseLeaveSection}
      className="relative w-full min-h-screen overflow-hidden bg-[#070708] flex flex-col justify-between py-16 px-6 z-20 border-t border-white/5"
    >
      {/* 1. PREMIUM LAYERED BACKGROUNDS */}
      {/* Shifting Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_30%,#1e293b_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#0f172a_0%,transparent_50%)] animate-[mesh_25s_ease-in-out_infinite]" />
      </div>

      {/* Floating Blurred Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[350px] h-[350px] rounded-full bg-blue-900/10 blur-[100px] top-[10%] left-[15%] animate-[floatBlob_20s_ease-in-out_infinite]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[110px] bottom-[15%] right-[10%] animate-[floatBlob_28s_ease-in-out_infinite_reverse]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-900/10 blur-[90px] top-[60%] left-[50%] animate-[floatBlob_24s_ease-in-out_infinite]" />
      </div>

      {/* Tiny drifting particles (Canvasless layout-safe dots) */}
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

      {/* Subtle Moving Diagonal Light Beams */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_45%,rgba(255,255,255,0.015)_50%,transparent_55%)] bg-[length:200%_200%] animate-[shimmer_15s_linear_infinite]" />
      </div>

      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(7,7,8,0.95)_100%)]" />

      {/* 2. LAGGING MOUSE GLOW ORB */}
      {!isMobile && (
        <div
          ref={orbRef}
          className="absolute w-48 h-48 rounded-full pointer-events-none z-0 mix-blend-screen opacity-70 blur-[45px] transition-opacity duration-300 bg-[radial-gradient(circle,rgba(56,189,248,0.3)_0%,rgba(37,99,235,0.15)_50%,transparent_100%)]"
        />
      )}

      {/* 3. CENTERED TITLE AT TOP */}
      <div className="text-center w-full z-10 select-none pt-8">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white tracking-tight"
        >
          Frontend
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.0 }}
          className="text-gray-400 text-xs sm:text-sm font-sans tracking-widest uppercase mt-4"
        >
          Dynamic 3D Interactive Carousel
        </motion.p>
      </div>

      {/* 4. 3D COVERFLOW CAROUSEL CONTAINER */}
      <div
        ref={carouselContainerRef}
        className="w-full flex-1 flex items-center justify-center relative select-none z-10"
        style={{
          perspective: "1800px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          ref={carouselRef}
          className="relative w-full h-[320px] flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onMouseEnter={() => handleMouseEnterCard(idx)}
              onMouseLeave={() => handleMouseLeaveCard(idx)}
              onMouseMove={(e) => handleMouseMoveCard(e, idx)}
              className="absolute left-1/2 top-1/2 w-[170px] h-[230px] rounded-[24px] cursor-pointer overflow-hidden border border-white/8 backdrop-blur-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col items-center justify-center p-6 transition-shadow duration-300 group select-none"
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                // Custom CSS variables for hover progress mapping
                backgroundColor: "rgba(255, 255, 255, calc(0.04 + var(--hover-progress) * 0.04))",
                borderColor: "rgba(255, 255, 255, calc(0.08 + var(--hover-progress) * 0.16))",
              }}
            >
              {/* Local Spotlight Glow Effect */}
              {!isMobile && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  style={{
                    background:
                      "radial-gradient(circle 90px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(56, 189, 248, 0.18), transparent)",
                  }}
                />
              )}

              {/* Logo container scales up slightly on hover */}
              <div
                className="pointer-events-none select-none z-10 transition-transform duration-300 ease-out"
                style={{
                  transform: "scale(calc(1 + var(--hover-progress) * 0.1))",
                }}
              >
                {tech.icon}
              </div>

              {/* Technology name floats upwards and transitions to full white opacity */}
              <span
                className="text-xs sm:text-sm font-semibold tracking-wide mt-6 font-display pointer-events-none select-none z-10 transition-all duration-300"
                style={{
                  transform: "translateY(calc(var(--hover-progress) * -12px))",
                  opacity: "calc(0.4 + var(--hover-progress) * 0.6)",
                  color: "rgb(255 255 255 / calc(0.4 + var(--hover-progress) * 0.6))",
                }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacer / interactive instruction */}
      <div className="w-full text-center z-10 select-none pb-8">
        <span className="text-[10px] sm:text-xs text-gray-500 font-sans tracking-wider uppercase opacity-60">
          {!isMobile ? "Move cursor to tilt perspective • Hover cards to explore" : "Swipe/Wait to watch circular loop"}
        </span>
      </div>

      {/* Inline styles for background animations */}
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
            transform: translate3d(30px, -40px, 0) scale(1.15);
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
