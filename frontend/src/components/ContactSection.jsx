import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { personalInfo } from "../data/mock";
import { toast } from "../hooks/use-toast";
import translations, { t } from "../data/translations";
import { useLang } from "../context/LanguageContext";

const ContactSection = () => {
  const [visible, setVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: t(translations.contact.toastMissing, lang),
        description: t(translations.contact.toastMissingDesc, lang),
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    // Mock: save to localStorage
    setTimeout(() => {
      const messages = JSON.parse(localStorage.getItem("contact_messages") || "[]");
      messages.push({ ...form, timestamp: new Date().toISOString() });
      localStorage.setItem("contact_messages", JSON.stringify(messages));
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast({
        title: t(translations.contact.toastSuccess, lang),
        description: t(translations.contact.toastSuccessDesc, lang),
      });
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t(translations.contact.labels.email, lang),
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "#00d4aa",
    },
    {
      icon: MapPin,
      label: t(translations.contact.labels.location, lang),
      value: personalInfo.location,
      href: null,
      color: "#00d4aa",
    },
    {
      icon: Github,
      label: t(translations.contact.labels.github, lang),
      value: personalInfo.githubHandle,
      href: personalInfo.github,
      color: "#00d4aa",
    },
    {
      icon: Linkedin,
      label: t(translations.contact.labels.linkedin, lang),
      value: personalInfo.linkedinHandle,
      href: personalInfo.linkedin,
      color: "#00d4aa",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-28 relative">
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
            <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#3b82f6]" />
            </div>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#3b82f6] uppercase">
              {t(translations.contact.label, lang)}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-figtree mb-3">
            {t(translations.contact.heading, lang)}
          </h2>
          <p className="text-[#8a8a9a] text-base max-w-lg mb-10">
            {t(translations.contact.description, lang)}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form - 3 cols */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.2s",
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#8a8a9a] mb-1.5 block">
                  {t(translations.contact.name, lang)} <span className="text-[#ef4444]">*</span>
                </label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t(translations.contact.namePlaceholder, lang)}
                  className="bg-[#12121a] border-[#1e1e2e] text-white placeholder:text-[#3a3a4a] focus:border-[#00d4aa] focus:ring-[#00d4aa]/20 h-11"
                />
              </div>
              <div>
                <label className="text-sm text-[#8a8a9a] mb-1.5 block">
                  {t(translations.contact.email, lang)} <span className="text-[#ef4444]">*</span>
                </label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t(translations.contact.emailPlaceholder, lang)}
                  className="bg-[#12121a] border-[#1e1e2e] text-white placeholder:text-[#3a3a4a] focus:border-[#00d4aa] focus:ring-[#00d4aa]/20 h-11"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-[#8a8a9a] mb-1.5 block">{t(translations.contact.subject, lang)}</label>
              <Input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder={t(translations.contact.subjectPlaceholder, lang)}
                className="bg-[#12121a] border-[#1e1e2e] text-white placeholder:text-[#3a3a4a] focus:border-[#00d4aa] focus:ring-[#00d4aa]/20 h-11"
              />
            </div>
            <div>
              <label className="text-sm text-[#8a8a9a] mb-1.5 block">
                {t(translations.contact.message, lang)} <span className="text-[#ef4444]">*</span>
              </label>
              <Textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t(translations.contact.messagePlaceholder, lang)}
                rows={6}
                className="bg-[#12121a] border-[#1e1e2e] text-white placeholder:text-[#3a3a4a] focus:border-[#00d4aa] focus:ring-[#00d4aa]/20 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="flex items-center gap-2 bg-[#00d4aa] hover:bg-[#00e4ba] text-[#0a0a0f] font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-[0_0_25px_rgba(0,212,170,0.3)] disabled:opacity-70"
            >
              {sending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : sent ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {sending ? t(translations.contact.sending, lang) : sent ? t(translations.contact.sent, lang) : t(translations.contact.send, lang)}
            </button>
          </form>

          {/* Contact info - 2 cols */}
          <div
            className="lg:col-span-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(20px)",
              transition: "all 0.6s ease 0.4s",
            }}
          >
            <div className="bg-[#12121a]/40 backdrop-blur-sm border border-[#1e1e2e] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-5">{t(translations.contact.getInTouch, lang)}</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${info.color}10`,
                          border: `1px solid ${info.color}20`,
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: info.color }} />
                      </div>
                      <div>
                        <p className="text-xs text-[#6b7280]">{info.label}</p>
                        <p className="text-sm font-medium text-white">{info.value}</p>
                      </div>
                    </div>
                  );
                  return info.href ? (
                    <a
                      key={info.label}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:bg-[#1e1e2e]/50 rounded-xl p-2 -m-2 transition-colors"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={info.label} className="p-2 -m-2">
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 bg-[#12121a]/40 backdrop-blur-sm border border-[#1e1e2e] rounded-xl p-4">
              <p className="text-xs text-[#6b7280] leading-relaxed">
                {t(translations.contact.responseNote, lang)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
