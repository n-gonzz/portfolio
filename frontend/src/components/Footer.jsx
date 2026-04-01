import React from "react";
import { Github, Linkedin, Mail, ArrowUp, Terminal } from "lucide-react";
import { personalInfo } from "../data/mock";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: Github,
      href: personalInfo.github,
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: personalInfo.linkedin,
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.email}`,
      label: "Email",
    },
  ];

  return (
    <footer className="border-t border-[#1e1e2e] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-[#0a0a0f]" />
              </div>
              <span className="text-base font-bold font-figtree">
                <span className="text-white">dev</span>
                <span className="text-[#00d4aa]">Quest</span>
              </span>
            </div>
            <p className="text-xs text-[#6b7280]">
              Building the future, one commit at a time.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-[#1e1e2e] flex items-center justify-center text-[#6b7280] hover:text-[#00d4aa] hover:border-[#00d4aa]/30 transition-all duration-200"
                  aria-label={link.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Back to top + copyright */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg border border-[#1e1e2e] flex items-center justify-center text-[#6b7280] hover:text-[#00d4aa] hover:border-[#00d4aa]/30 transition-all duration-200"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <p className="text-xs text-[#3a3a4a] font-mono">
              &copy; 2026 {personalInfo.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
