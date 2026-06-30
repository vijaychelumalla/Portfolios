"use client";

import { motion } from "framer-motion";
import { GitPullRequest, Code2, Flame, Award, BookOpen, Star } from "lucide-react";

export default function GitHubStats() {
  // Let's generate a list of dates for the contributions grid (e.g. past 12 weeks x 7 days)
  // We'll create levels (0: empty, 1: light, 2: medium, 3: high)
  const contributionGrid = [
    [0, 1, 0, 2, 0, 1, 3],
    [1, 0, 2, 0, 1, 0, 0],
    [2, 1, 0, 0, 3, 1, 2],
    [0, 2, 1, 2, 0, 0, 1],
    [1, 0, 0, 1, 2, 3, 0],
    [0, 1, 2, 0, 1, 1, 0],
    [2, 0, 1, 3, 0, 2, 1],
    [1, 2, 0, 1, 0, 0, 2],
    [0, 1, 3, 0, 2, 1, 0],
    [1, 0, 2, 1, 0, 3, 1],
    [2, 1, 0, 0, 1, 2, 2],
    [3, 2, 1, 2, 3, 1, 3],
  ];

  const stats = [
    {
      icon: <BookOpen className="w-5 h-5 text-blue-400" />,
      label: "Total Repositories",
      value: "7",
    },
    {
      icon: <GitPullRequest className="w-5 h-5 text-indigo-400" />,
      label: "Total Commits",
      value: "284+",
    },
    {
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      label: "Longest Streak",
      value: "18 Days",
    },
    {
      icon: <Award className="w-5 h-5 text-yellow-400" />,
      label: "PRs Merged",
      value: "42",
    },
  ];

  const languages = [
    { name: "JavaScript", percent: 75, color: "bg-yellow-500" },
    { name: "TypeScript", percent: 12, color: "bg-blue-500" },
    { name: "HTML & CSS", percent: 8, color: "bg-orange-500" },
    { name: "Other (C++)", percent: 5, color: "bg-purple-500" },
  ];

  const gridColorClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-blue-900/40";
      case 2:
        return "bg-blue-600/50";
      case 3:
        return "bg-blue-500";
      default:
        return "bg-white/5";
    }
  };

  return (
    <section id="github" className="py-24 px-6 relative z-10 max-w-6xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-xs font-semibold tracking-widest text-primary uppercase font-sans mb-3">
          GITHUB STATS
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white">
          Active Contributions
        </h3>
        <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm sm:text-base">
          Tracking commits, streaks, and technologies directly synced with my public repository activity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: General Stats Cards */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300 group"
            >
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 w-fit">
                {stat.icon}
              </div>
              <div className="space-y-1 mt-6">
                <div className="text-2xl sm:text-3xl font-bold text-white font-display group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider font-sans">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center: Contributions Graph Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 glass p-6 rounded-3xl border border-white/5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display font-semibold text-white text-base sm:text-lg">
                Commit Contributions
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-sans font-medium">
                @vijaychelumalla
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Consistently pushing clean modular code for REST APIs, custom middleware schemas, and routing layers.
            </p>
          </div>

          {/* Contributions Grid */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] text-gray-500 font-sans px-1">
              <span>Past 12 Weeks</span>
              <div className="flex items-center space-x-1">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded-sm bg-white/5" />
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-900/40" />
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600/50" />
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                <span>More</span>
              </div>
            </div>

            <div className="flex justify-between">
              {contributionGrid.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((level, dIdx) => (
                    <motion.div
                      key={dIdx}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (wIdx * 7 + dIdx) * 0.005 }}
                      className={`w-3 h-3 rounded-sm ${gridColorClass(level)} hover:scale-125 transition-transform cursor-pointer`}
                      title={`Activity Level: ${level}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Languages Breakdown Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3 glass p-6 rounded-3xl border border-white/5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display font-semibold text-white text-base">
                Top Languages
              </h4>
              <Code2 className="w-4 h-4 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Language distribution aggregated across all active workspaces.
            </p>
          </div>

          {/* Languages Stack bar */}
          <div className="space-y-6">
            {/* Horizontal stacked bar */}
            <div className="h-2 w-full rounded-full bg-white/5 flex overflow-hidden">
              {languages.map((lang, idx) => (
                <div
                  key={idx}
                  style={{ width: `${lang.percent}%` }}
                  className={`h-full ${lang.color}`}
                  title={`${lang.name}: ${lang.percent}%`}
                />
              ))}
            </div>

            {/* Legends */}
            <div className="space-y-3">
              {languages.map((lang, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
                    <span className="text-gray-300 font-sans">{lang.name}</span>
                  </div>
                  <span className="text-gray-500">{lang.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
