import React, { useState, useEffect, useRef } from "react";
import {
  Zap,
  TrendingUp,
  Monitor,
  Server,
  Database,
  Wrench,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { skillCategories, totalSkillXP, rankColors } from "../data/mock";
import translations, { t } from "../data/translations";
import { useLang } from "../context/LanguageContext";

const tabIcons = {
  Frontend: Monitor,
  Backend: Server,
  Databases: Database,
  "DevOps & Tools": Wrench,
};

const SkillBar = ({ skill, index, visible, lang }) => {
  const [width, setWidth] = useState(0);
  const barColor = rankColors[skill.rank];
  const rankLabel = t(translations.skills.ranks[skill.rank], lang);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setWidth(skill.percent);
      }, 120 * index);
      return () => clearTimeout(timer);
    } else {
      setWidth(0);
    }
  }, [visible, skill.percent, index]);

  return (
    <div
      className="bg-[#12121a]/60 backdrop-blur-sm border border-[#1e1e2e] rounded-xl p-4 hover:border-[#2a2a3e] transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `all 0.4s ease ${120 * index}ms`,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">{skill.name}</span>
          <span
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
            style={{
              color: barColor,
              backgroundColor: `${barColor}15`,
              border: `1px solid ${barColor}30`,
            }}
          >
            {rankLabel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#ffd700]">
            {skill.xp.toLocaleString()} XP
          </span>
          <span className="text-xs font-mono text-[#8a8a9a]">{skill.percent}%</span>
        </div>
      </div>
      <div className="w-full h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{
            width: `${width}%`,
            backgroundColor: barColor,
            boxShadow: `0 0 12px ${barColor}40`,
          }}
        >
          <div
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background: `linear-gradient(90deg, transparent, ${barColor}80, transparent)`,
              animation: "shimmer 2s infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Frontend");
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

  const categories = Object.keys(skillCategories);

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-28 relative">
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
            <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#00d4aa]" />
            </div>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#00d4aa] uppercase">
              {t(translations.skills.label, lang)}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-figtree mb-3">
            {t(translations.skills.heading, lang)}
          </h2>
          <p className="text-[#8a8a9a] text-base max-w-lg mb-4">
            {t(translations.skills.description, lang)}
          </p>
          <div className="flex items-center gap-2 mb-10">
            <TrendingUp className="w-4 h-4 text-[#00d4aa]" />
            <span className="text-sm font-mono text-[#00d4aa]">
              {t(translations.skills.totalXP, lang)}: {totalSkillXP.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="Frontend"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-[#12121a]/60 border border-[#1e1e2e] rounded-xl p-1 mb-8 flex flex-wrap gap-1 h-auto">
            {categories.map((cat) => {
              const Icon = tabIcons[cat];
              return (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium data-[state=active]:bg-[#00d4aa]/10 data-[state=active]:text-[#00d4aa] data-[state=active]:border data-[state=active]:border-[#00d4aa]/30 text-[#6b7280] transition-all"
                >
                  <Icon className="w-4 h-4" />
                  {t(translations.skills.tabs[cat], lang)}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              <div className="grid md:grid-cols-2 gap-3">
                {skillCategories[cat].skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={i}
                    visible={visible && activeTab === cat}
                    lang={lang}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default SkillsSection;
