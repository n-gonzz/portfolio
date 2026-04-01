import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Github,
  Linkedin,
  Sparkles,
  Download,
  ChevronDown,
  Trophy,
  LayoutGrid,
  GitFork,
  Code,
  Users,
} from "lucide-react";
import { personalInfo, stats, achievements } from "../data/mock";
import translations, { t } from "../data/translations";
import { useLang } from "../context/LanguageContext";

const iconMap = {
  LayoutGrid,
  GitFork,
  Code,
  Users,
};

const useCountUp = (end, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (typeof end === "string") {
      setCount(end);
      return;
    }
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);
  return count;
};

const StatCard = ({ stat, index, visible, lang }) => {
  const IconComp = iconMap[stat.icon];
  const count = useCountUp(stat.value, 2000, visible);
  const labelMap = {
    "Projects Built": translations.hero.projectsBuilt,
    "GitHub Repos": translations.hero.githubRepos,
    "Lines of Code": translations.hero.linesOfCode,
    "Clients Served": translations.hero.clientsServed,
  };
  return (
    <div
      className="group bg-[#12121a]/60 backdrop-blur-sm border border-[#1e1e2e] rounded-xl p-4 text-center hover:border-[#2a2a3e] transition-all duration-300 hover:bg-[#12121a]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s ease ${index * 100}ms`,
      }}
    >
      <div className="flex justify-center mb-2">
        <IconComp className="w-5 h-5 text-[#00d4aa]" />
      </div>
      <div className="text-2xl md:text-3xl font-bold text-white font-figtree">
        {typeof stat.value === "string" ? stat.value : count}
      </div>
      <div className="text-xs text-[#6b7280] mt-1">{t(labelMap[stat.label], lang)}</div>
    </div>
  );
};

const AchievementCard = ({ achievement, index, lang }) => (
  <div
    className="bg-[#12121a]/60 backdrop-blur-sm border rounded-lg p-3 hover:scale-[1.03] transition-transform duration-200 cursor-default"
    style={{ borderColor: `${achievement.color}30` }}
  >
    <span
      className="text-[10px] font-mono font-bold tracking-widest"
      style={{ color: achievement.color }}
    >
      {achievement.rarity}
    </span>
    <h4 className="text-sm font-bold text-white mt-1">{t(translations.achievements.items[index].name, lang)}</h4>
    <p className="text-[11px] text-[#6b7280] mt-0.5 leading-tight">
      {t(translations.achievements.items[index].description, lang)}
    </p>
  </div>
);

const HeroSection = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const { lang } = useLang();

  const typewriterTexts = translations.typewriter.texts[lang];

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    setDisplayText("");
    setIsDeleting(false);
    setTextIndex(0);
  }, [lang]);

  useEffect(() => {
    const currentText = typewriterTexts[textIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
          if (displayText === currentText) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setDisplayText(currentText.substring(0, displayText.length - 1));
          if (displayText === "") {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen pt-24 pb-16 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00d4aa 1px, transparent 1px), linear-gradient(90deg, #00d4aa 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-[#00d4aa]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-20 right-10 w-[300px] h-[300px] bg-[#ffd700]/3 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left content - 3 cols */}
          <div className="lg:col-span-3">
            {/* Badges */}
            <div
              className="flex flex-wrap gap-3 mb-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.1s",
              }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00d4aa]/10 border border-[#00d4aa]/30 rounded-full text-xs font-mono text-[#00d4aa]">
                <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
                {t(translations.hero.availableForHire, lang)}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-full text-xs font-mono text-[#ffd700]">
                <Trophy className="w-3 h-3" />
                {t(translations.hero.level, lang)} {personalInfo.level}
              </span>
            </div>

            {/* Name */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-figtree mb-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.2s",
              }}
            >
              {t(translations.hero.greeting, lang)} {personalInfo.name}
            </h1>

            {/* Typewriter */}
            <div
              className="mb-4"
              style={{
                opacity: visible ? 1 : 0,
                transition: "all 0.6s ease 0.3s",
              }}
            >
              <span className="font-mono text-lg md:text-xl text-[#8a8a9a]">
                {displayText}
                <span className="inline-block w-0.5 h-5 bg-[#00d4aa] ml-1 animate-pulse" />
              </span>
            </div>

            {/* Tagline */}
            <p
              className="text-[#8a8a9a] text-base md:text-lg max-w-xl mb-6 leading-relaxed"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.4s",
              }}
            >
              {t(translations.hero.tagline, lang)}
            </p>

            {/* Links */}
            <div
              className="flex flex-wrap items-center gap-4 mb-8 text-sm text-[#6b7280]"
              style={{
                opacity: visible ? 1 : 0,
                transition: "all 0.6s ease 0.5s",
              }}
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {personalInfo.location}
              </span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#00d4aa] transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#00d4aa] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-3 mb-10"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.6s",
              }}
            >
              <button
                onClick={() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 bg-[#00d4aa] hover:bg-[#00e4ba] text-[#0a0a0f] font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-[0_0_25px_rgba(0,212,170,0.3)]"
              >
                <Sparkles className="w-4 h-4" />
                {t(translations.hero.viewProjects, lang)}
              </button>
              <button className="flex items-center gap-2 border border-[#2a2a3e] hover:border-[#00d4aa]/50 text-[#e8e8ed] px-6 py-3 rounded-lg transition-all duration-200 hover:bg-[#12121a]">
                <Download className="w-4 h-4" />
                {t(translations.hero.resume, lang)}
              </button>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} visible={visible} lang={lang} />
              ))}
            </div>
          </div>

          {/* Right side - Achievements - 2 cols */}
          <div
            className="lg:col-span-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.7s ease 0.5s",
            }}
          >
            <div className="bg-[#12121a]/40 backdrop-blur-sm border border-[#1e1e2e] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-[#ffd700]" />
                <h3 className="text-base font-bold text-white">{t(translations.hero.achievementsUnlocked, lang)}</h3>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {achievements.map((a, i) => (
                  <AchievementCard key={a.name} achievement={a} index={i} lang={lang} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down arrow */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() =>
              document
                .getElementById("skills")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-[#3a3a4a] hover:text-[#00d4aa] transition-colors animate-bounce"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
