"use client";

import { motion } from "framer-motion";
import { Server, Shield, Database, Layout } from "lucide-react";
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
            I am a highly motivated <span className="text-white font-medium">Backend & Full Stack Developer</span> specializing in building robust web architectures. With a strong foundation in <span className="text-white font-medium">B.Tech Information Technology</span>, I enjoy turning complex database structures and API specifications into clean, scalable server code.
          </p>
          <p>
            My key projects include a full-scale mock interview app integrating the <span className="text-white font-semibold">Llama-3.3-70b AI model</span> for candidate grading, and a CRM helpdesk ticking system with intricate role-based operations and real-time activity tracking.
          </p>
          <p>
            I focus on writing modular code, designing clean API paths documented via Swagger, and employing standard middleware practices (CORS, file-handling via Multer, token verification) to deliver production-grade products.
          </p>

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
