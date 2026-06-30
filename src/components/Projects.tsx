"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Sparkles, Terminal, Shield, Ticket, ChevronRight, X, CheckCircle2 } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";
import Tilt from "./Tilt";
import Magnetic from "./Magnetic";

interface Project {
  title: string;
  category: "Full Stack" | "Backend API" | "Utility";
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  github: string;
  demo?: string;
  icon: React.ReactNode;
  gradient: string;
  badge?: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectsList: Project[] = [
    {
      title: "AI Interview App",
      category: "Full Stack",
      badge: "AI Showcase",
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
      icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
      gradient: "from-amber-600/20 via-yellow-500/10 to-transparent border-yellow-500/20"
    },
    {
      title: "Foodies App (Zomato Clone)",
      category: "Full Stack",
      badge: "Featured Full Stack",
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
      icon: <Terminal className="w-6 h-6 text-emerald-400" />,
      gradient: "from-emerald-600/20 via-teal-500/10 to-transparent border-emerald-500/20"
    },
    {
      title: "Helpdesk / Ticketing System API",
      category: "Backend API",
      badge: "Swagger Documented",
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
      icon: <Ticket className="w-6 h-6 text-blue-400" />,
      gradient: "from-blue-600/20 via-indigo-500/10 to-transparent border-blue-500/20"
    },
    {
      title: "Node.js Internship Projects Suite",
      category: "Backend API",
      badge: "Modular APIs",
      description: "A collection of 6 backend API services covering core tasks (OTP verification, Cloudinary file uploads, messaging).",
      longDescription: "A bundled suite of individual backend web applications created during a Node.js backend development internship. Standardizes MVC architecture, route protections, file management layers, and database connectors.",
      technologies: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT Auth", "Cloudinary SDK", "Nodemailer (OTP)", "Multer", "Cookie-Parser"],
      features: [
        "Advanced Authentication API: OTP-based user email verification, logins, password recovery.",
        "Cloudinary Upload API: Direct file integration with Cloudinary cloud storage via Multer stream uploads.",
        "Chat API: Backend database storage structure for messaging streams.",
        "Role-Based Access Control: Modular security middlewares checking token privileges.",
        "User Management API: CRUD route handlers."
      ],
      github: "https://github.com/vijaychelumalla/nodejs-inten-projects",
      icon: <Shield className="w-6 h-6 text-indigo-400" />,
      gradient: "from-indigo-600/20 via-purple-500/10 to-transparent border-indigo-500/20"
    }
  ];

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 35 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  // Badge animation sub-variants
  const badgeContainer = {
    hover: {
      transition: { staggerChildren: 0.05 }
    }
  };

  const badgeItem = {
    initial: { opacity: 0.8, scale: 1 },
    hover: { opacity: 1, scale: 1.05 }
  };

  return (
    <section id="projects" className="py-24 px-6 relative z-10 max-w-6xl mx-auto border-t border-white/5">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-xs font-semibold tracking-widest text-primary uppercase font-sans mb-3">
          PORTFOLIO SHOWCASE
        </h2>
        <AnimatedHeading
          text="Featured Projects"
          tag="h3"
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white"
        />
        <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm sm:text-base">
          Robust, verified codebase projects retrieved directly from my GitHub profile.
        </p>
      </div>

      {/* Projects Grid */}
      <motion.div 
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {projectsList.map((project, idx) => (
          <Tilt key={idx} maxTilt={8}>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className={`glass p-6 sm:p-8 rounded-3xl border bg-gradient-to-br ${project.gradient} transition-all duration-500 group flex flex-col justify-between h-[460px] cursor-pointer hover:border-blue-500/40 relative overflow-hidden`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Background hover light ray glow */}
              <div className="absolute -inset-24 bg-gradient-to-tr from-blue-500/0 via-blue-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />

              <div>
                {/* Header: Icon + Category + Badge */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      variants={{ hover: { rotate: 10 } }}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                    >
                      {project.icon}
                    </motion.div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans">
                      {project.category}
                    </span>
                  </div>
                  {project.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-sans font-medium">
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Visual mockup overlay/preview box (Zooms on hover) */}
                <div className="w-full h-32 rounded-xl bg-black/40 border border-white/5 overflow-hidden mb-4 relative group-hover:border-blue-500/20 transition-colors z-10">
                  {/* Browser top-bar */}
                  <div className="w-full h-6 bg-white/5 border-b border-white/5 px-3 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                    </div>
                    <div className="text-[8px] text-gray-500 font-sans tracking-wide truncate max-w-[120px] select-none">
                      {project.demo || "localhost:3000"}
                    </div>
                    <div className="w-3" />
                  </div>
                  {/* Mock content zoom container */}
                  <div className="w-full h-full overflow-hidden relative">
                    <motion.div
                      variants={{
                        hover: { scale: 1.06, y: -2 }
                      }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      className="p-3 font-mono text-[9px] text-gray-500 space-y-1 h-full select-none pointer-events-none"
                    >
                      {idx === 0 && (
                        <div className="space-y-1.5 text-blue-400/80">
                          <div><span className="text-purple-400">const</span> AI_GRADE = <span className="text-yellow-400">"Llama-3.3-70b"</span>;</div>
                          <div><span className="text-purple-400">await</span> ai.evaluateResponse(candidateAnswer);</div>
                          <div className="text-[8px] text-emerald-400 bg-emerald-950/20 border border-emerald-500/10 px-2 py-0.5 rounded inline-block">Score: 4.8 / 5.0 (Excellent)</div>
                        </div>
                      )}
                      {idx === 1 && (
                        <div className="space-y-1 text-emerald-400/80">
                          <div className="flex justify-between border-b border-white/5 pb-1">
                            <span className="font-semibold text-white">Foodies Cart</span>
                            <span className="text-gray-500">2 Items</span>
                          </div>
                          <div className="flex justify-between pt-1">
                            <span>Double Cheese Burger</span>
                            <span className="text-white">$12.99</span>
                          </div>
                          <div className="flex justify-between text-yellow-400 font-semibold pt-1">
                            <span>Total (incl. tax)</span>
                            <span>$24.50</span>
                          </div>
                        </div>
                      )}
                      {idx === 2 && (
                        <div className="space-y-1 text-gray-400/80">
                          <div><span className="text-purple-400">GET</span> /api/tickets <span className="text-emerald-400">200 OK</span></div>
                          <div className="pl-2 border-l border-white/10 text-gray-500 space-y-0.5">
                            <div>{`{`}</div>
                            <div>&nbsp;&nbsp;id: <span className="text-yellow-400">"TKT-892"</span>,</div>
                            <div>&nbsp;&nbsp;status: <span className="text-yellow-400">"Pending"</span>,</div>
                            <div>&nbsp;&nbsp;role: <span className="text-yellow-400">"Support"</span></div>
                            <div>{`}`}</div>
                          </div>
                        </div>
                      )}
                      {idx === 3 && (
                        <div className="space-y-1 text-indigo-400/80">
                          <div><span className="text-purple-400">import</span> {`{ Multer }`} <span className="text-purple-400">from</span> <span className="text-yellow-400">"multer"</span>;</div>
                          <div><span className="text-purple-400">const</span> uploader = <span className="text-yellow-400">"Cloudinary"</span>;</div>
                          <div className="text-[8px] text-indigo-300 bg-indigo-950/20 border border-indigo-500/10 px-2 py-0.5 rounded inline-block">Cloudinary Stream Verified</div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Title & Desc */}
                <h4 className="text-xl sm:text-2xl font-bold font-display text-white mb-2 group-hover:text-primary transition-colors relative z-10">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 relative z-10">
                  {project.description}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="relative z-10">
                {/* Tech Badges (Staggered hover animation) */}
                <motion.div 
                  variants={badgeContainer}
                  className="flex flex-wrap gap-1.5 mb-6"
                >
                  {project.technologies.slice(0, 4).map((tech, tIdx) => (
                    <motion.span 
                      key={tIdx} 
                      variants={badgeItem}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/5 text-gray-400 font-sans"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[11px] px-1.5 py-0.5 text-gray-500 font-sans">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </motion.div>

                {/* Action trigger links */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300 flex items-center gap-1 font-sans">
                    Learn Details <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  
                  {/* Sliding container for Action buttons (Slide Upward) */}
                  <div className="flex items-center space-x-3" onClick={(e) => e.stopPropagation()}>
                    <motion.div
                      variants={{
                        initial: { y: 20, opacity: 0 },
                        hover: { y: 0, opacity: 1 }
                      }}
                      initial="initial"
                      className="flex space-x-2"
                    >
                      <Magnetic range={0.3}>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          aria-label="GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </Magnetic>
                      
                      {project.demo && (
                        <Magnetic range={0.3}>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            aria-label="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Magnetic>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30, filter: "blur(5px)" }}
              animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ scale: 0.95, y: 30, filter: "blur(5px)" }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto glass p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="inline-block text-xs font-semibold text-primary uppercase tracking-wider font-sans mb-2">
                    {selectedProject.category}
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold font-display text-white">
                    {selectedProject.title}
                  </h4>
                </div>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                <div className="space-y-3">
                  <h5 className="font-display font-semibold text-white text-base">Key Features</h5>
                  <ul className="grid grid-cols-1 gap-2 text-sm text-gray-400 font-sans">
                    {selectedProject.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h5 className="font-display font-semibold text-white text-base">Full Tech Stack</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gray-300 font-sans">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-4 items-center justify-end mt-8 pt-6 border-t border-white/5">
                <Magnetic range={0.2}>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 text-gray-200 hover:text-white font-semibold transition-all flex items-center gap-2 text-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </a>
                </Magnetic>
                
                {selectedProject.demo && (
                  <Magnetic range={0.2}>
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold transition-all flex items-center gap-2 text-sm shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  </Magnetic>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
