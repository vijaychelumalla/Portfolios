"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import SplashCursor from "@/components/SplashCursor";
import GlowEffect from "@/components/GlowEffect";
import FloatingBlobs from "@/components/FloatingBlobs";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FrontendSkillsSection from "@/components/FrontendSkillsSection";
import BackendSkillsSection from "@/components/BackendSkillsSection";
import ToolsSkillsSection from "@/components/ToolsSkillsSection";
import Projects from "@/components/Projects";
import GitHubStats from "@/components/GitHubStats";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Apple Loader */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* Interactive Cursor Trail */}
      {!loading && (
        <>
          <CustomCursor />
          <SplashCursor />
        </>
      )}

      {/* Content Layer */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(6px)", scale: 0.99 }}
        animate={loading ? {} : { opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative min-h-screen bg-[#0B0B0B] text-gray-100 flex flex-col selection:bg-blue-500/30 selection:text-blue-200"
      >
        {/* Visual backgrounds */}
        <GlowEffect />
        <FloatingBlobs />

        {/* Sticky floating header */}
        {!loading && <Navbar />}

        {/* Main Sections */}
        <main className="flex-1 flex flex-col relative z-10 w-full overflow-hidden">
          <Hero />
          <About />
          <FrontendSkillsSection />
          <BackendSkillsSection />
          <ToolsSkillsSection />
          <Projects />
          <GitHubStats />
          <Timeline />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </>
  );
}
