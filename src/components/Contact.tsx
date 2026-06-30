"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";
import Magnetic from "./Magnetic";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("Please fill out all fields.");
      return;
    }

    setStatus("sending");

    // Simulating message submission
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 px-6 relative z-10 max-w-6xl mx-auto border-t border-white/5">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-xs font-semibold tracking-widest text-primary uppercase font-sans mb-3">
          CONTACT
        </h2>
        <AnimatedHeading
          text="Get In Touch"
          tag="h3"
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white"
        />
        <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm sm:text-base">
          Let's discuss opportunities, project collaborations, or backend architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <h4 className="font-display font-semibold text-xl text-white">
            Connection Hub
          </h4>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Feel free to reach out via email or connect with me on professional platforms. I typically respond within 24 hours.
          </p>

          <div className="space-y-4">
            {/* Email Contact Box */}
            <a
              href="mailto:vijay.chelumalla21@gmail.com"
              className="glass p-5 rounded-2xl border border-white/5 flex items-center space-x-4 hover:border-blue-500/25 hover:bg-white/5 transition-all duration-350 group block"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider font-sans">
                  Direct Email
                </div>
                <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                  vijay.chelumalla21@gmail.com
                </div>
              </div>
            </a>

            {/* GitHub Contact Box */}
            <a
              href="https://github.com/vijaychelumalla"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-5 rounded-2xl border border-white/5 flex items-center space-x-4 hover:border-blue-500/25 hover:bg-white/5 transition-all duration-350 group block"
            >
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 group-hover:scale-105 transition-transform">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider font-sans">
                  GitHub Profile
                </div>
                <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                  github.com/vijaychelumalla
                </div>
              </div>
            </a>

            {/* LinkedIn Contact Box */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-5 rounded-2xl border border-white/5 flex items-center space-x-4 hover:border-blue-500/25 hover:bg-white/5 transition-all duration-350 group block"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider font-sans">
                  LinkedIn Network
                </div>
                <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                  Vijay Chelumalla
                </div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 glass p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Input Name */}
            <div className="relative pt-4">
              <input
                id="form-name"
                type="text"
                value={name}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-5 py-4 rounded-xl bg-black/40 border text-sm text-white placeholder-transparent focus:outline-none focus:bg-black/60 transition-all font-sans ${
                  nameFocused ? "border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.15)]" : "border-white/5"
                }`}
                required
              />
              <motion.label
                htmlFor="form-name"
                animate={{
                  y: (nameFocused || name) ? -28 : 0,
                  x: (nameFocused || name) ? -4 : 0,
                  scale: (nameFocused || name) ? 0.8 : 1,
                  color: nameFocused ? "#2563EB" : "#6B7280"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute left-5 top-[22px] text-sm text-gray-500 font-sans pointer-events-none origin-left"
              >
                Full Name
              </motion.label>
            </div>

            {/* Input Email */}
            <div className="relative pt-4">
              <input
                id="form-email"
                type="email"
                value={email}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-5 py-4 rounded-xl bg-black/40 border text-sm text-white placeholder-transparent focus:outline-none focus:bg-black/60 transition-all font-sans ${
                  emailFocused ? "border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.15)]" : "border-white/5"
                }`}
                required
              />
              <motion.label
                htmlFor="form-email"
                animate={{
                  y: (emailFocused || email) ? -28 : 0,
                  x: (emailFocused || email) ? -4 : 0,
                  scale: (emailFocused || email) ? 0.8 : 1,
                  color: emailFocused ? "#2563EB" : "#6B7280"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute left-5 top-[22px] text-sm text-gray-500 font-sans pointer-events-none origin-left"
              >
                Email Address
              </motion.label>
            </div>

            {/* Message Area */}
            <div className="relative pt-4">
              <textarea
                id="form-message"
                value={message}
                onFocus={() => setMessageFocused(true)}
                onBlur={() => setMessageFocused(false)}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className={`w-full px-5 py-4 rounded-xl bg-black/40 border text-sm text-white placeholder-transparent focus:outline-none focus:bg-black/60 transition-all resize-none font-sans ${
                  messageFocused ? "border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.15)]" : "border-white/5"
                }`}
                required
              />
              <motion.label
                htmlFor="form-message"
                animate={{
                  y: (messageFocused || message) ? -28 : 0,
                  x: (messageFocused || message) ? -4 : 0,
                  scale: (messageFocused || message) ? 0.8 : 1,
                  color: messageFocused ? "#2563EB" : "#6B7280"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute left-5 top-[22px] text-sm text-gray-500 font-sans pointer-events-none origin-left"
              >
                Your Message
              </motion.label>
            </div>

            {/* Submit CTA */}
            <Magnetic range={0.15}>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover disabled:bg-blue-600/50 text-white font-semibold text-sm transition-all shadow-md hover:shadow-blue-500/10 flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              >
                {status === "sending" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </Magnetic>
          </form>

          {/* Form feedback prompts */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4"
              >
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>
                <h5 className="font-display text-xl font-bold text-white">Message Transmitted!</h5>
                <p className="text-xs sm:text-sm text-gray-500 max-w-xs">
                  Thank you for reaching out. Your message has been simulated successfully. I will get back to you shortly!
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-5 py-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 text-xs text-gray-300 transition-all hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-400 bg-red-950/20 border border-red-500/15 p-4 rounded-xl mt-4"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="text-xs font-sans font-medium">{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
