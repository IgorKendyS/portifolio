import React from "react";
import { Mail, Phone, Linkedin, Github, MapPin, Globe, Download } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Currículo | Igor Kendy Sakaguchi",
  description: "Currículo de Igor Kendy Sakaguchi - Full-Stack & DevOps Engineer",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200">
      {/* 
        Botão Flutuante para Download/Impressão 
        Oculto na hora da impressão (@media print no globals.css ou via Tailwind print:hidden) 
      */}
      <div className="fixed top-6 right-6 print:hidden z-50">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-gray-800 transition-colors font-medium text-sm"
        >
          <Download size={16} />
          Salvar como PDF
        </button>
      </div>

      <div className="max-w-[800px] mx-auto p-8 sm:p-12 md:p-16 bg-white shadow-sm print:shadow-none print:p-0">
        {/* HEADER */}
        <header className="border-b-2 border-gray-900 pb-6 mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
            Igor Kendy Sakaguchi
          </h1>
          <p className="text-xl text-gray-600 font-medium mb-6">
            Full-Stack & DevOps Engineer
          </p>

          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-600">
            <a href="mailto:igkendy.s@gmail.com" className="flex items-center gap-1.5 hover:text-black">
              <Mail size={14} /> igkendy.s@gmail.com
            </a>
            <a href="https://wa.me/5518997907790" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-black">
              <Phone size={14} /> +55 (18) 99790-7790
            </a>
            <a href="https://www.linkedin.com/in/igorsakaguchi/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-black">
              <Linkedin size={14} /> /in/igorsakaguchi
            </a>
            <a href="https://github.com/IgorKendyS" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-black">
              <Github size={14} /> /IgorKendyS
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> Brasil (Remoto)
            </span>
          </div>
        </header>

        {/* RESUMO */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            Resumo Profissional
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm text-justify">
            Desenvolvedor Full-Stack focado em resultados de alto impacto, especializado na criação de APIs escaláveis, automações inteligentes e infraestruturas resilientes na nuvem. Proficiente em Node.js, Python, Docker e Kubernetes. Orientado a gerar valor de negócio através de arquiteturas Serverless, pipelines CI/CD eficientes e otimização de performance.
          </p>
        </section>

        {/* EXPERIÊNCIA */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
            Experiência Profissional
          </h2>

          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-gray-900">Desenvolvedor</h3>
              <span className="text-sm font-medium text-gray-500">Nov 2024 — Atual</span>
            </div>
            <div className="text-sm text-gray-600 mb-2 font-medium">Responza</div>
            <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1.5">
              <li>Configuração e manutenção de servidores Kubernetes em produção.</li>
              <li>Desenvolvimento e implantação de arquiteturas baseadas em Serverless Functions.</li>
              <li>Responsável por estratégias de escala do produto e governança em infraestruturas Google Cloud (GCP).</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-gray-900">Desenvolvedor</h3>
              <span className="text-sm font-medium text-gray-500">Jan 2023 — Nov 2024</span>
            </div>
            <div className="text-sm text-gray-600 mb-2 font-medium">JEM Digital</div>
            <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1.5">
              <li>Criação de sistemas otimizados para suporte à gestão de tráfego pago.</li>
              <li>Manutenção e customização avançada de sites em PHP e WordPress.</li>
              <li>Desenvolvimento de bots e automações em Python para simplificar tarefas diárias e rotinas operacionais.</li>
            </ul>
          </div>
        </section>

        {/* FORMAÇÃO */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
            Formação Acadêmica
          </h2>
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-gray-900">Engenharia de Computação</h3>
            <span className="text-sm font-medium text-gray-500">2018 — 2026</span>
          </div>
          <div className="text-sm text-gray-700">IFSP — Campus Birigui (10º semestre)</div>
          <p className="text-sm text-gray-600 mt-1">
            Forte base em algoritmos, estrutura de dados, sistemas operacionais e matemática aplicada.
          </p>
        </section>

        {/* SKILLS */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
            Habilidades Técnicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-bold text-gray-900 block mb-1">Backend & APIs:</span>
              <span className="text-gray-700">Node.js, Python, PHP, C, RESTful APIs</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 block mb-1">Cloud & DevOps:</span>
              <span className="text-gray-700">Kubernetes, Docker, AWS, Google Cloud (GCP), CI/CD</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 block mb-1">Frontend:</span>
              <span className="text-gray-700">React, Next.js, Vue.js, Tailwind CSS</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 block mb-1">Banco de Dados & Automação:</span>
              <span className="text-gray-700">PostgreSQL, MySQL, Firebase, n8n, Python Bots</span>
            </div>
          </div>
        </section>

        {/* CERTIFICAÇÕES */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
            Certificações
          </h2>
          <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1.5">
            <li><span className="font-medium text-gray-900">AWS (Amazon Web Services)</span> — SENAI</li>
            <li><span className="font-medium text-gray-900">Microsoft AI-900</span> — SENAI</li>
            <li><span className="font-medium text-gray-900">Google Cloud Platform</span> — SENAI</li>
          </ul>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background-color: white !important;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          @page {
            margin: 1.5cm;
          }
        }
      `}} />
    </div>
  );
}
