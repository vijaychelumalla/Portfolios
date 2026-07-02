"use client";

import { motion } from "framer-motion";
import { Server, Shield, Database, Layout, MapPin } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  const pillars = [
    {
      icon: <Server className="w-6 h-6 text-blue-500" />,
      title: "Backend Development",
      description: "Building scalable and modular web servers using Node.js and Express with RESTful paradigms."
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-400" />,
      title: "Authentication & Security",
      description: "Implementing JWT authentication, Role-Based Access Control (RBAC), OTP validations, and secure cookies."
    },
    {
      icon: <Database className="w-6 h-6 text-blue-400" />,
      title: "Database Modeling",
      description: "Designing efficient schemas and handling aggregate queries in MongoDB using Mongoose."
    },
    {
      icon: <Layout className="w-6 h-6 text-purple-400" />,
      title: "Full Stack Integration",
      description: "Integrating complex backend APIs with responsive client apps built in React and Tailwind."
    }
  ];

  return (
    <section id="about" className="py-24 px-6 relative z-10 max-w-6xl mx-auto border-t border-white/5">
      {/* Title */}
      <div className="text-center md:text-left mb-16">
        <h2 className="text-xs font-semibold tracking-widest text-primary uppercase font-sans mb-3">
          ABOUT ME
        </h2>
        <AnimatedHeading
          text="Who is Vijay Chelumalla?"
          tag="h3"
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Summary Description (Fades In / Slide Left-to-Right) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6 text-gray-400 text-base md:text-lg leading-relaxed"
        >
          <p>
            I'm a developer who builds things the best way I know how — try, break, curse quietly, fix, and repeat until it finally feels right. Totally normal process. Definitely not chaotic.
          </p>
          <p>
            I work with React, JavaScript, and full-stack tools, but the part that actually keeps me up at night (besides bugs, obviously) is the why — how an interface feels, how users actually behave, and how one tiny detail can make or break the whole experience.
          </p>
          <p>
            If I come across a website that looks too good? I don't just admire it and move on like a normal person. I rebuild it. From scratch. Because apparently that's just how I learn — dissecting structure, training my eye for design, and convincing myself I'll stop after just one more component.
          </p>
          <p>
            I'm not here to just push code and collect PRs. I'm here to build things that are clean, thoughtful, and actually enjoyable to use — and to get a little better (and a little more humbled) with every project.
          </p>
          <div className="pt-2 flex items-center gap-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-gray-500">Location:</span>
            <span className="text-white font-medium">Gujarat, India</span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-6">
            <div className="glass p-4 rounded-2xl border border-white/5 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white font-display">6+</div>
              <div className="text-xs text-gray-500 mt-1 uppercase font-sans">API Projects</div>
            </div>
            <div className="glass p-4 rounded-2xl border border-white/5 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white font-display">100%</div>
              <div className="text-xs text-gray-500 mt-1 uppercase font-sans">Node/Express</div>
            </div>
            <div className="glass p-4 rounded-2xl border border-white/5 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white font-display">B.Tech</div>
              <div className="text-xs text-gray-500 mt-1 uppercase font-sans">IT Student</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Technical Focus Pillars (Alternating entrance direction from right-to-left) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-5 grid grid-cols-1 gap-4"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="glass p-5 rounded-2xl border border-white/5 flex gap-4 hover:border-blue-500/20 hover:bg-white/5 transition-all duration-300 hover:scale-[1.02] cursor-default"
            >
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 shrink-0 self-start">
                {pillar.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-white text-base md:text-lg">{pillar.title}</h4>
                <p className="text-sm text-gray-500 leading-normal">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
