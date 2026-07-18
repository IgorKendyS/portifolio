"use client";

import React, { useState } from "react";
import { Mail, Phone, Linkedin, Github, MapPin, Globe, Download, Moon, Sun, Languages } from "lucide-react";

const translations = {
  pt: {
    role: "Desenvolvedor Full-Stack & Cloud (Pleno)",
    country: "Birigui, SP, Brasil",
    remote: "Remoto Global (Worldwide)",
    summaryTitle: "Resumo Profissional",
    summaryText: "Desenvolvedor Full-Stack focado em resultados de alto impacto, especializado na criação de APIs escaláveis, automações inteligentes e infraestruturas resilientes na nuvem. Proficiente em Node.js, Python, Docker e Kubernetes. Orientado a gerar valor de negócio através de arquiteturas Serverless, pipelines CI/CD eficientes e otimização de performance.",
    experienceTitle: "Experiência",
    devRole: "Desenvolvedor",
    present: "Atual",
    exp1Items: [
      "Configuração e manutenção de servidores Kubernetes em produção.",
      "Desenvolvimento e implantação de arquiteturas baseadas em Serverless Functions.",
      "Responsável por estratégias de escala do produto e governança em infraestruturas Google Cloud (GCP)."
    ],
    exp2Items: [
      "Criação de sistemas otimizados para suporte à gestão de tráfego pago.",
      "Manutenção e customização avançada de sites em PHP e WordPress.",
      "Desenvolvimento de bots e automações em Python para simplificar tarefas diárias e rotinas operacionais."
    ],
    educationTitle: "Educação",
    degree: "Engenharia de Computação",
    university: "IFSP — Campus Birigui (10º semestre)",
    eduText: "Forte base em algoritmos, estrutura de dados, sistemas operacionais e matemática aplicada.",
    skillsTitle: "Habilidades Técnicas",
    dbAutomation: "Banco de Dados & Automação:",
    certTitle: "Certificações",
    savePdf: "Salvar como PDF",
    switchTheme: "Mudar Tema",
    switchLang: "English Version"
  },
  en: {
    role: "Full-Stack & Cloud Developer (Mid-Level)",
    country: "Birigui, SP, Brazil",
    remote: "Worldwide Remote",
    summaryTitle: "Professional Summary",
    summaryText: "Full-Stack Developer focused on high-impact results, specialized in building scalable APIs, intelligent automations, and resilient cloud infrastructures. Proficient in Node.js, Python, Docker, and Kubernetes. Driven to create business value through Serverless architectures, efficient CI/CD pipelines, and performance optimization.",
    experienceTitle: "Experience",
    devRole: "Software Developer",
    present: "Present",
    exp1Items: [
      "Configuration and maintenance of Kubernetes clusters in production.",
      "Development and deployment of Serverless-based architectures.",
      "Responsible for product scaling strategies and infrastructure governance on Google Cloud (GCP)."
    ],
    exp2Items: [
      "Created optimized systems to support paid traffic management operations.",
      "Maintained and performed advanced customizations on PHP and WordPress websites.",
      "Developed Python bots and automations to streamline daily tasks and operational workflows."
    ],
    educationTitle: "Education",
    degree: "Computer Engineering",
    university: "IFSP — Campus Birigui (10th semester)",
    eduText: "Strong foundation in algorithms, data structures, operating systems, and applied mathematics.",
    skillsTitle: "Technical Skills",
    dbAutomation: "Databases & Automation:",
    certTitle: "Certifications",
    savePdf: "Save as PDF",
    switchTheme: "Toggle Theme",
    switchLang: "Versão em Português"
  }
};

export function ResumeContent() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const t = translations[lang];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark
      ? "bg-[#080808] text-[#F2F2F2] selection:bg-[#E8FF47] selection:text-black"
      : "bg-gray-100 text-gray-900 selection:bg-gray-300 selection:text-black"
      } print:bg-white print:text-black`}>

      {/* Controles Flutuantes */}
      <div className="fixed top-6 right-6 flex items-center gap-3 print:hidden z-50">

        {/* Language Toggle */}
        <button
          onClick={() => setLang(lang === "pt" ? "en" : "pt")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-colors font-medium text-sm ${isDark ? "bg-[#1A1A1A] text-white hover:bg-[#222]" : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
          title={t.switchLang}
        >
          <Languages size={16} />
          {lang === "pt" ? "EN" : "PT"}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-colors ${isDark ? "bg-[#1A1A1A] text-white hover:bg-[#222]" : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
          title={t.switchTheme}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* PDF Download */}
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-gray-800 transition-colors font-medium text-sm"
        >
          <Download size={16} />
          {t.savePdf}
        </button>
      </div>

      <div className={`max-w-[800px] mx-auto p-8 sm:p-12 md:p-16 mt-8 mb-8 rounded-xl shadow-2xl transition-colors duration-300 ${isDark
        ? "bg-[#111111] border border-white/5"
        : "bg-white border border-gray-200"
        } print:bg-transparent print:border-none print:shadow-none print:p-0 print:mt-0 print:mb-0 print:rounded-none`}>

        {/* HEADER */}
        <header className={`border-b-2 pb-6 mb-8 transition-colors duration-300 ${isDark ? "border-[#E8FF47]" : "border-gray-900"} print:border-black`}>
          <h1 className={`text-4xl font-bold tracking-tight mb-2 ${isDark ? "!text-white" : "!text-gray-900"} print:!text-black`}>
            Igor Kendy Sakaguchi
          </h1>
          <p className={`text-xl font-medium mb-6 ${isDark ? "text-[#E8FF47]" : "text-gray-600"} print:text-gray-800`}>
            {t.role}
          </p>

          <div className={`flex flex-wrap gap-y-2 gap-x-6 text-sm ${isDark ? "text-gray-400" : "text-gray-600"} print:text-gray-700`}>
            <a href="mailto:igkendy.s@gmail.com" className={`flex items-center gap-1.5 ${isDark ? "hover:text-white" : "hover:text-black"} print:hover:text-black`}>
              <Mail size={14} className="print:hidden" />
              <span>igkendy.s@gmail.com</span>
            </a>
            <a href="https://wa.me/5518997907790" target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 ${isDark ? "hover:text-white" : "hover:text-black"} print:hover:text-black`}>
              <Phone size={14} className="print:hidden" />
              <span>+55 (18) 99790-7790</span>
            </a>
            <a href="https://www.linkedin.com/in/igorsakaguchi/" target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 ${isDark ? "hover:text-white" : "hover:text-black"} print:hover:text-black`}>
              <Linkedin size={14} className="print:hidden" />
              <span>linkedin.com/in/igorsakaguchi</span>
            </a>
            <a href="https://github.com/IgorKendyS" target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 ${isDark ? "hover:text-white" : "hover:text-black"} print:hover:text-black`}>
              <Github size={14} className="print:hidden" />
              <span>github.com/IgorKendyS</span>
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="print:hidden" />
              <span>{t.country}</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium text-gray-900 print:text-black dark:text-white">
              <Globe size={14} className="print:hidden" />
              <span>{t.remote}</span>
            </span>
          </div>
        </header>

        {/* RESUMO */}
        <section className="mb-8">
          <h2 className={`text-lg font-bold uppercase tracking-wider mb-3 ${isDark ? "!text-white" : "!text-gray-900"} print:!text-black`}>
            {t.summaryTitle}
          </h2>
          <p className={`leading-relaxed text-sm text-justify ${isDark ? "text-gray-300" : "text-gray-700"} print:text-gray-800`}>
            {t.summaryText}
          </p>
        </section>

        {/* EXPERIÊNCIA */}
        <section className="mb-8">
          <h2 className={`text-lg font-bold uppercase tracking-wider mb-4 border-b pb-2 transition-colors duration-300 ${isDark ? "!text-white border-white/10" : "!text-gray-900 border-gray-200"} print:!text-black print:border-gray-300`}>
            {t.experienceTitle}
          </h2>

          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className={`font-bold text-base ${isDark ? "!text-white" : "!text-gray-900"} print:!text-black`}>{t.devRole}</h3>
              <span className={`text-sm font-medium ${isDark ? "text-[#E8FF47]" : "text-gray-500"} print:text-gray-600`}>Nov 2024 — {t.present}</span>
            </div>
            <div className={`text-sm mb-2 font-medium ${isDark ? "text-gray-400" : "text-gray-600"} print:text-gray-800`}>AI CORE STACK</div>
            <ul className={`list-disc list-outside ml-4 text-sm space-y-1.5 ${isDark ? "text-gray-300" : "text-gray-700"} print:text-gray-800`}>
              {t.exp1Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className={`font-bold text-base ${isDark ? "!text-white" : "!text-gray-900"} print:!text-black`}>{t.devRole}</h3>
              <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} print:text-gray-600`}>Jan 2023 — Nov 2024</span>
            </div>
            <div className={`text-sm mb-2 font-medium ${isDark ? "text-gray-400" : "text-gray-600"} print:text-gray-800`}>JEM Digital</div>
            <ul className={`list-disc list-outside ml-4 text-sm space-y-1.5 ${isDark ? "text-gray-300" : "text-gray-700"} print:text-gray-800`}>
              {t.exp2Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </section>

        {/* FORMAÇÃO */}
        <section className="mb-8">
          <h2 className={`text-lg font-bold uppercase tracking-wider mb-4 border-b pb-2 transition-colors duration-300 ${isDark ? "!text-white border-white/10" : "!text-gray-900 border-gray-200"} print:!text-black print:border-gray-300`}>
            {t.educationTitle}
          </h2>
          <div className="flex justify-between items-baseline mb-1">
            <h3 className={`font-bold text-base ${isDark ? "!text-white" : "!text-gray-900"} print:!text-black`}>{t.degree}</h3>
            <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} print:text-gray-600`}>2018 — 2026</span>
          </div>
          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-700"} print:text-gray-800`}>{t.university}</div>
          <p className={`text-sm mt-1 ${isDark ? "text-gray-300" : "text-gray-600"} print:text-gray-800`}>
            {t.eduText}
          </p>
        </section>

        {/* SKILLS */}
        <section className="mb-8">
          <h2 className={`text-lg font-bold uppercase tracking-wider mb-4 border-b pb-2 transition-colors duration-300 ${isDark ? "!text-white border-white/10" : "!text-gray-900 border-gray-200"} print:!text-black print:border-gray-300`}>
            {t.skillsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className={`font-bold block mb-1 ${isDark ? "!text-[#E8FF47]" : "!text-gray-900"} print:!text-black`}>Backend & APIs:</span>
              <span className={`${isDark ? "text-gray-300" : "text-gray-700"} print:text-gray-800`}>Node.js, Python, PHP, C, RESTful APIs</span>
            </div>
            <div>
              <span className={`font-bold block mb-1 ${isDark ? "!text-[#E8FF47]" : "!text-gray-900"} print:!text-black`}>Cloud & DevOps:</span>
              <span className={`${isDark ? "text-gray-300" : "text-gray-700"} print:text-gray-800`}>Kubernetes, Docker, AWS, Google Cloud (GCP), CI/CD</span>
            </div>
            <div>
              <span className={`font-bold block mb-1 ${isDark ? "!text-[#E8FF47]" : "!text-gray-900"} print:!text-black`}>Frontend:</span>
              <span className={`${isDark ? "text-gray-300" : "text-gray-700"} print:text-gray-800`}>React, Next.js, Vue.js, Tailwind CSS</span>
            </div>
            <div>
              <span className={`font-bold block mb-1 ${isDark ? "!text-[#E8FF47]" : "!text-gray-900"} print:!text-black`}>{t.dbAutomation}</span>
              <span className={`${isDark ? "text-gray-300" : "text-gray-700"} print:text-gray-800`}>PostgreSQL, MySQL, Firebase, n8n, Python Bots</span>
            </div>
          </div>
        </section>

        {/* CERTIFICAÇÕES */}
        <section>
          <h2 className={`text-lg font-bold uppercase tracking-wider mb-4 border-b pb-2 transition-colors duration-300 ${isDark ? "!text-white border-white/10" : "!text-gray-900 border-gray-200"} print:!text-black print:border-gray-300`}>
            {t.certTitle}
          </h2>
          <ul className={`list-disc list-outside ml-4 text-sm space-y-1.5 ${isDark ? "text-gray-300" : "text-gray-700"} print:text-gray-800`}>
            <li><span className={`font-medium ${isDark ? "!text-white" : "!text-gray-900"} print:!text-black`}>AWS (Amazon Web Services)</span> — SENAI</li>
            <li><span className={`font-medium ${isDark ? "!text-white" : "!text-gray-900"} print:!text-black`}>Microsoft AI-900</span> — SENAI</li>
            <li><span className={`font-medium ${isDark ? "!text-white" : "!text-gray-900"} print:!text-black`}>Google Cloud Platform</span> — SENAI</li>
          </ul>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          body {
            background-color: white !important;
            -webkit-print-color-adjust: exact;
          }
          @page {
            margin: 1.5cm;
          }
        }
      `}} />
    </div>
  );
}
