import React, { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Calendar,
  Trophy,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { experience, education, certifications } from "../data/mock";
import translations, { t } from "../data/translations";
import { useLang } from "../context/LanguageContext";

const TimelineItem = ({ item, type, index, visible, lang, tData }) => (
  <div
    className="relative pl-8 pb-8 last:pb-0"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-20px)",
      transition: `all 0.5s ease ${index * 150}ms`,
    }}
  >
    {/* Timeline line */}
    <div className="absolute left-[7px] top-3 bottom-0 w-px bg-gradient-to-b from-[#00d4aa] to-[#1e1e2e]" />
    {/* Dot */}
    <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-[#00d4aa] bg-[#0a0a0f] z-10">
      <div className="absolute inset-[3px] rounded-full bg-[#00d4aa]" />
    </div>

    <div className="bg-[#12121a]/60 backdrop-blur-sm border border-[#1e1e2e] rounded-xl p-5 hover:border-[#2a2a3e] transition-all duration-300">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-3.5 h-3.5 text-[#6b7280]" />
        <span className="text-xs font-mono text-[#6b7280]">{tData.period ? t(tData.period, lang) : item.period}</span>
      </div>
      <h3 className="text-lg font-bold text-white">{t(tData.title, lang)}</h3>
      <p className="text-sm font-medium text-[#00d4aa] mb-2">
        {type === "experience" ? (tData.company || item.company) : t(tData.institution || {}, lang) || item.institution}
      </p>
      <p className="text-sm text-[#8a8a9a] leading-relaxed mb-3">
        {t(tData.description, lang)}
      </p>
      {/* Tech tags or Achievement badges */}
      {item.tech && (
        <div className="flex flex-wrap gap-1.5">
          {item.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#1e1e2e] border border-[#2a2a3e] text-[#8a8a9a]"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      {item.badges && (
        <div className="flex flex-wrap gap-1.5">
          {(tData.badges ? (Array.isArray(tData.badges) ? tData.badges : t(tData.badges, lang)) : item.badges).map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#ffd700]/10 border border-[#ffd700]/30 text-[#ffd700]"
            >
              <Trophy className="w-3 h-3" />
              {b}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

const CertCard = ({ cert, index, visible, lang, tData }) => (
  <div
    className="bg-[#12121a]/60 backdrop-blur-sm border border-[#1e1e2e] rounded-xl p-5 hover:border-[#2a2a3e] transition-all duration-300"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(15px)",
      transition: `all 0.5s ease ${index * 150}ms`,
    }}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-xl bg-[#ffd700]/10 border border-[#ffd700]/20 flex items-center justify-center">
        <Award className="w-5 h-5 text-[#ffd700]" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white">{t(tData.name, lang)}</h4>
        <p className="text-xs text-[#6b7280] font-mono">
          {cert.issuer} · {cert.year}
        </p>
      </div>
    </div>
  </div>
);

const EducationSection = () => {
  const [visible, setVisible] = useState(false);
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

  return (
    <section id="education" ref={sectionRef} className="py-20 md:py-28 relative">
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
            <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#a855f7]" />
            </div>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#a855f7] uppercase">
              {t(translations.education.label, lang)}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-figtree mb-3">
            {t(translations.education.heading, lang)}
          </h2>
          <p className="text-[#8a8a9a] text-base max-w-lg mb-8">
            {t(translations.education.description, lang)}
          </p>
        </div>

        <Tabs defaultValue="experience">
          <TabsList className="bg-[#12121a]/60 border border-[#1e1e2e] rounded-xl p-1 mb-8 flex flex-wrap gap-1 h-auto">
            <TabsTrigger
              value="experience"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium data-[state=active]:bg-[#00d4aa]/10 data-[state=active]:text-[#00d4aa] data-[state=active]:border data-[state=active]:border-[#00d4aa]/30 text-[#6b7280] transition-all"
            >
              <Briefcase className="w-4 h-4" />
              {t(translations.education.tabs.experience, lang)}
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium data-[state=active]:bg-[#00d4aa]/10 data-[state=active]:text-[#00d4aa] data-[state=active]:border data-[state=active]:border-[#00d4aa]/30 text-[#6b7280] transition-all"
            >
              <BookOpen className="w-4 h-4" />
              {t(translations.education.tabs.education, lang)}
            </TabsTrigger>
            <TabsTrigger
              value="certifications"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium data-[state=active]:bg-[#00d4aa]/10 data-[state=active]:text-[#00d4aa] data-[state=active]:border data-[state=active]:border-[#00d4aa]/30 text-[#6b7280] transition-all"
            >
              <Award className="w-4 h-4" />
              {t(translations.education.tabs.certifications, lang)}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experience">
            <div className="max-w-2xl">
              {experience.map((item, i) => (
                <TimelineItem
                  key={item.title}
                  item={item}
                  type="experience"
                  index={i}
                  visible={visible}
                  lang={lang}
                  tData={translations.education.experience[i]}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education">
            <div className="max-w-2xl">
              {education.map((item, i) => (
                <TimelineItem
                  key={item.title}
                  item={item}
                  type="education"
                  index={i}
                  visible={visible}
                  lang={lang}
                  tData={translations.education.educationItems[i]}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certifications">
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
              {certifications.map((cert, i) => (
                <CertCard key={cert.name} cert={cert} index={i} visible={visible} lang={lang} tData={translations.education.certifications[i]} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default EducationSection;
