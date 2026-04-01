import React, { useState, useEffect } from "react";
import { Terminal, Menu, X, ChevronRight, Trophy, Globe } from "lucide-react";
import { personalInfo } from "../data/mock";
import translations, { t } from "../data/translations";
import { useLang } from "../context/LanguageContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const { lang, toggleLang } = useLang();

  const navLinks = [
    { label: t(translations.nav.home, lang), href: "#home" },
    { label: t(translations.nav.skills, lang), href: "#skills" },
    { label: t(translations.nav.projects, lang), href: "#projects" },
    { label: t(translations.nav.education, lang), href: "#education" },
    { label: t(translations.nav.contact, lang), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(`#${sections[i]}`);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const xpPercent = (personalInfo.currentXP / personalInfo.maxXP) * 100;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#1e1e2e]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-[#0a0a0f]" />
            </div>
            <span className="text-lg font-bold font-figtree">
              <span className="text-white">dev</span>
              <span className="text-[#00d4aa]">Quest</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href
                    ? "text-[#00d4aa]"
                    : "text-[#8a8a9a] hover:text-[#e8e8ed]"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00d4aa]" />
                )}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 bg-[#12121a] border border-[#1e1e2e] hover:border-[#2a2a3e] rounded-full px-3 py-1.5 text-xs font-mono font-bold text-[#8a8a9a] hover:text-[#00d4aa] transition-all duration-200"
              title={lang === "en" ? "Cambiar a Español" : "Switch to English"}
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === "en" ? "ES" : "EN"}
            </button>

            {/* Level badge */}
            <div className="hidden sm:flex items-center gap-2 bg-[#12121a] border border-[#1e1e2e] rounded-full px-3 py-1.5">
              <span className="text-xs font-mono font-bold text-[#ffd700]">
                LVL {personalInfo.level}
              </span>
              <div className="w-16 h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ffd700] rounded-full transition-all duration-1000"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-[#8a8a9a]">
                {personalInfo.currentXP.toLocaleString()} XP
              </span>
            </div>

            {/* Hire Me */}
            <button
              onClick={() => scrollTo("#contact")}
              className="hidden sm:flex items-center gap-1 bg-[#00d4aa] hover:bg-[#00e4ba] text-[#0a0a0f] font-bold text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,170,0.3)]"
            >
              {t(translations.header.hireMe, lang)}
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[#8a8a9a] hover:text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-[#1e1e2e]">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.href
                    ? "text-[#00d4aa] bg-[#00d4aa]/10"
                    : "text-[#8a8a9a] hover:text-white hover:bg-[#12121a]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-2 px-4 py-2">
              <Trophy className="w-4 h-4 text-[#ffd700]" />
              <span className="text-xs font-mono text-[#ffd700]">
                LVL {personalInfo.level}
              </span>
              <div className="w-20 h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ffd700] rounded-full"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => scrollTo("#contact")}
              className="w-full mt-2 flex items-center justify-center gap-1 bg-[#00d4aa] text-[#0a0a0f] font-bold text-sm px-4 py-2.5 rounded-lg"
            >
              {t(translations.header.hireMe, lang)}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
