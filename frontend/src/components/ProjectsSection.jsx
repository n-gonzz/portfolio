import React, { useState, useEffect, useRef } from "react";
import {
  Coins,
  ChevronDown,
  ChevronUp,
  Github,
  ExternalLink,
  Flame,
  Target,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  projects,
  totalProjectXP,
  difficultyConfig,
} from "../data/mock";
import translations, { t } from "../data/translations";
import { useLang } from "../context/LanguageContext";

const diffIcons = { Flame, Target, Shield };

const ProjectCard = ({ project, index, visible, lang, projectIndex }) => {
  const [expanded, setExpanded] = useState(false);
  const diff = difficultyConfig[project.difficulty];
  const DiffIcon = diffIcons[diff.icon];
  const tp = translations.projects.items[projectIndex];
  const diffLabel = project.difficulty === "Hard" ? t(translations.projects.hard, lang) :
    project.difficulty === "Medium" ? t(translations.projects.medium, lang) :
    t(translations.projects.easy, lang);

  return (
    <div
      className="bg-[#12121a]/60 backdrop-blur-sm border border-[#1e1e2e] rounded-2xl p-5 hover:border-[#2a2a3e] transition-all duration-300 flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s ease ${150 * index}ms`,
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-full"
            style={{
              color: diff.color,
              backgroundColor: `${diff.color}15`,
              border: `1px solid ${diff.color}30`,
            }}
          >
            <DiffIcon className="w-3 h-3" />
            {diffLabel}
          </span>
          <span className="text-[10px] font-mono text-[#6b7280]">
            {diff.multiplier} XP
          </span>
        </div>
        <div className="flex items-center gap-1">
          {project.status === "in-progress" && (
            <span className="text-[10px] font-mono font-bold text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/30 px-2 py-0.5 rounded-full mr-2">
              {t(translations.projects.inProgress, lang)}
            </span>
          )}
          <Coins className="w-3.5 h-3.5 text-[#ffd700]" />
          <span className="text-sm font-mono font-bold text-[#ffd700]">
            {project.xp}
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-bold text-white mb-2">{t(tp.name, lang)}</h3>
      <p className="text-sm text-[#8a8a9a] mb-4 leading-relaxed flex-1">
        {t(tp.description, lang)}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#1e1e2e] border border-[#2a2a3e] text-[#8a8a9a]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Expandable challenge/solution */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-sm font-medium text-[#00d4aa] hover:text-[#00e4ba] transition-colors mb-3"
      >
        {expanded ? t(translations.projects.hideChallenge, lang) : t(translations.projects.showChallenge, lang)}
        {expanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {expanded && (
        <div className="space-y-3 mb-4 animate-fadeIn">
          <div className="bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-[#ef4444]" />
              <span className="text-xs font-bold text-[#ef4444]">{t(translations.projects.challenge, lang)}</span>
            </div>
            <p className="text-xs text-[#8a8a9a] leading-relaxed">
              {t(tp.challenge, lang)}
            </p>
          </div>
          <div className="bg-[#00d4aa]/5 border border-[#00d4aa]/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-[#00d4aa]" />
              <span className="text-xs font-bold text-[#00d4aa]">{t(translations.projects.solution, lang)}</span>
            </div>
            <p className="text-xs text-[#8a8a9a] leading-relaxed">
              {t(tp.solution, lang)}
            </p>
          </div>
        </div>
      )}

      {/* Links */}
      <div className="flex items-center gap-4 pt-2 border-t border-[#1e1e2e]">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#00d4aa] transition-colors"
          >
            <Github className="w-4 h-4" />
            {t(translations.projects.code, lang)}
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#00d4aa] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            {t(translations.projects.liveDemo, lang)}
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);
  const { lang } = useLang();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hardCount = projects.filter((p) => p.difficulty === "Hard").length;
  const mediumCount = projects.filter((p) => p.difficulty === "Medium").length;
  const easyCount = projects.filter((p) => p.difficulty === "Easy").length;

  const filters = [
    { key: "all", label: t(translations.projects.allQuests, lang), count: null },
    { key: "Hard", label: t(translations.projects.hard, lang), count: hardCount },
    { key: "Medium", label: t(translations.projects.medium, lang), count: mediumCount },
    { key: "Easy", label: t(translations.projects.easy, lang), count: easyCount },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.difficulty === filter);

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#ffd700]/10 border border-[#ffd700]/20 flex items-center justify-center">
              <Coins className="w-5 h-5 text-[#ffd700]" />
            </div>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#ffd700] uppercase">
              {t(translations.projects.label, lang)}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-figtree mb-3">
            {t(translations.projects.heading, lang)}
          </h2>
          <p className="text-[#8a8a9a] text-base mb-8">
            {t(translations.projects.xpEarned, lang)}{" "}
            <span className="font-mono font-bold text-[#ffd700]">
              {totalProjectXP.toLocaleString()}
            </span>
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          style={{
            opacity: visible ? 1 : 0,
            transition: "all 0.6s ease 0.2s",
          }}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === f.key
                  ? "bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/30"
                  : "bg-[#12121a]/60 text-[#6b7280] border border-[#1e1e2e] hover:border-[#2a2a3e] hover:text-[#8a8a9a]"
              }`}
            >
              {f.label}
              {f.count !== null && (
                <span className="ml-1.5 text-xs opacity-70">({f.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              visible={visible}
              lang={lang}
              projectIndex={projects.indexOf(project)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
