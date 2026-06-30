"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-md relative z-10 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Tagline */}
        <div className="text-center md:text-left">
          <div className="font-display text-xl font-bold text-white mb-2">
            Vijay <span className="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">Chelumalla</span>
          </div>
          <p className="text-sm text-gray-500 max-w-sm">
            Crafting scalable backend architectures, RESTful APIs, and responsive full-stack solutions.
          </p>
        </div>

        {/* Center: Social Handles */}
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/vijaychelumalla"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:vijay.chelumalla21@gmail.com"
            className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
            aria-label="Send Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Right: Copyright and Scroll To Top */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all cursor-pointer group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <div className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Vijay Chelumalla. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
