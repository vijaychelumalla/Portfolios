"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Code, CheckCircle, GraduationCap } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

interface TimelineEvent {
  date: string;
  title: string;
  subtitle: string;
  type: "internship" | "project" | "education";
  description: string;
  points: string[];
}

export default function Timeline() {
  const events: TimelineEvent[] = [
    {
      date: "June 2026",
      title: "Node.js Backend Developer Intern",
      subtitle: "Internship Milestone",
      type: "internship",
      description: "Developed and verified modular API services showcasing production-grade backend design patterns.",
      points: [
        "Implemented secure JWT user authentication with Nodemailer OTP email validation.",
        "Built Cloudinary file attachment handlers utilizing Multer memory buffers.",
        "Designed Role-Based Access Control (RBAC) middleware protecting secure directories.",
        "Created user CRUD management and real-time chat data storage structures."
      ]
    },
    {
      date: "June 2026",
      title: "Helpdesk / Ticketing System API",
      subtitle: "Major Backend Project",
      type: "project",
      description: "Designed a comprehensive customer relations ticket API with detailed role-scoping features.",
      points: [
        "Designed Mongoose models tracking ticket status lifecycles (Open, In-Progress, Resolved).",
        "Enforced customer-specific ticket views and admin-only delete operations.",
        "Configured comments and chronological activity log audits per support ticket.",
        "Added interactive API documentation utilizing Swagger specifications."
      ]
    },
    {
      date: "March 2026",
      title: "AI Interview App (Full-Stack)",
      subtitle: "AI Integration Project",
      type: "project",
      description: "Integrated an AI evaluation engine to grade candidate responses in mock interviews.",
      points: [
        "Connected the Groq Cloud SDK executing Llama-3.3-70b-versatile models.",
        "Engineered strict JSON-parsing prompt systems generating structured ratings out of 5.",
        "Managed front-end dashboard interfaces rendering user score progress logs.",
        "Configured React Router v7 routes secure validation guards."
      ]
    },
    {
      date: "January 2026",
      title: "Foodies App (Zomato Clone)",
      subtitle: "Full-Stack Project",
      type: "project",
      description: "Built a food ordering clone simulating checkout operations, menus, and carts.",
      points: [
        "Styled custom client views using Vite, Tailwind CSS, and responsiveness.",
        "Maintained instant cart changes with high-performance React Context APIs.",
        "Configured deployment setups on Vercel with customized rewrite rules."
      ]
    },
    {
      date: "2023 - 2027",
      title: "B.Tech in Information Technology",
      subtitle: "University Education",
      type: "education",
      description: "Focusing on data structures, databases, network security, and software development methodologies.",
      points: [
        "Gained hands-on experience in C++, algorithms, and database design.",
        "Developed full-stack web projects inside the academic curriculum."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 relative z-10 max-w-6xl mx-auto border-t border-white/5">
      {/* Title */}
      <div className="text-center mb-20">
        <h2 className="text-xs font-semibold tracking-widest text-primary uppercase font-sans mb-3">
          TIMELINE
        </h2>
        <AnimatedHeading
          text="Experience & Milestones"
          tag="h3"
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white"
        />
        <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm sm:text-base">
          A chronological history of my professional internship, academic background, and key project launches.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Center line */}
        <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-px bg-white/10 -translate-x-1/2 z-0" />

        {/* Timeline Items */}
        <div className="space-y-16">
          {events.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={idx} className="relative z-10 flex flex-col sm:flex-row items-stretch gap-6 sm:gap-0">
                {/* Timeline Dot/Icon */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0B0B0B] border-2 border-white/10 flex items-center justify-center text-gray-400 z-10">
                  {event.type === "internship" ? (
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  ) : event.type === "education" ? (
                    <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                  ) : (
                    <Code className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>

                {/* Left Spacer / Card Side */}
                <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 sm:pr-8 ${isLeft ? "sm:text-right" : "sm:order-2 sm:pl-8 sm:pr-0"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 16 }}
                    className="glass p-6 rounded-3xl border border-white/5 hover:border-blue-500/25 transition-all duration-300 relative group"
                  >
                    {/* Date Tag */}
                    <div className={`flex items-center gap-2 mb-2 text-xs font-semibold text-gray-500 font-sans ${isLeft ? "sm:justify-end" : "justify-start"}`}>
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>

                    {/* Title & Sub */}
                    <h4 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-xs text-primary font-sans font-semibold mb-4 uppercase tracking-wider">
                      {event.subtitle}
                    </p>
                    
                    {/* Desc */}
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      {event.description}
                    </p>

                    {/* Bullets */}
                    <ul className={`space-y-2 text-xs text-gray-500 font-sans ${isLeft ? "sm:text-right" : "text-left"}`}>
                      {event.points.map((pt, pIdx) => (
                        <li key={pIdx} className={`flex items-start gap-2 ${isLeft ? "sm:flex-row-reverse" : "flex-row"}`}>
                          <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Right Spacer for Layout Symmetry */}
                <div className="hidden sm:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
