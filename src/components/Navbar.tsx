"use client";

import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  
  // Scroll hide / show states
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrolledDown = prevScrollPos < currentScrollPos;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollPos > 120) {
        setVisible(!scrolledDown);
      } else {
        setVisible(true);
      }
      
      setPrevScrollPos(currentScrollPos);
      setScrolled(currentScrollPos > 20);

      // Section spy logic
      const sections = navItems.map(item => item.href.substring(1));
      let currentSection = "hero";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ 
        y: visible ? 0 : -100, 
        x: "-50%", 
        opacity: 1 
      }}
      transition={{ 
        y: { type: "spring", stiffness: 260, damping: 24 },
        opacity: { duration: 0.5, delay: 0.3 } // Slide down delay of 300ms
      }}
      className={`fixed top-4 left-1/2 z-50 w-[95%] max-w-5xl rounded-full transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-blue-950/10 py-3"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleClick(e, "#hero")}
          className="flex items-center space-x-2 font-display text-lg font-bold text-white hover:text-primary transition-colors"
        >
          <span className="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
            VC.
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-sans font-medium flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="hidden sm:inline">Active</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all relative ${
                activeSection === item.href.substring(1)
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {activeSection === item.href.substring(1) && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action icons / Socials */}
        <div className="hidden md:flex items-center space-x-4">
          <Magnetic range={0.3}>
            <a
              href="https://github.com/vijaychelumalla"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-1"
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
              className="text-gray-400 hover:text-white transition-colors p-1"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </Magnetic>

          <Magnetic range={0.25}>
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-primary hover:bg-primary-hover text-white transition-all shadow-md shadow-blue-900/30 active:scale-95"
            >
              Hire Me
            </a>
          </Magnetic>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -mr-2 text-gray-400 hover:text-white md:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 glass rounded-3xl mx-2 p-6 shadow-2xl flex flex-col space-y-4 md:hidden"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "bg-blue-500/10 text-white border-l-2 border-blue-500"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="h-px bg-white/10 my-2" />

            <div className="flex items-center justify-between px-2">
              <div className="flex space-x-4">
                <a
                  href="https://github.com/vijaychelumalla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <a
                href="#contact"
                onClick={(e) => handleClick(e, "#contact")}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary hover:bg-primary-hover text-white text-center transition-all"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
