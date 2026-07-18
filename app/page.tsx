"use client";

import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Server,
  Cloud,
  Code2,
  Briefcase,
  GraduationCap,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

import { InteractiveTerminal } from "./components/InteractiveTerminal";
import { CacheTester } from "./components/CacheTester";
import { LiveLogs } from "./components/LiveLogs";
import { CICDPipeline } from "./components/CICDPipeline";
import { MetricsDashboard } from "./components/MetricsDashboard";
import { ArchitectureDiagram } from "./components/ArchitectureDiagram";
import { ApiPlayground } from "./components/ApiPlayground";
import { LiveChat } from "./components/LiveChat";

/* ─── animation variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

/* ─── tech stack data ────────────────────────────────────── */
const techStack = [
  { label: "Node.js", cat: "backend" },
  { label: "Python", cat: "backend" },
  { label: "React / Next.js", cat: "frontend" },
  { label: "Vue.js", cat: "frontend" },
  { label: "Docker", cat: "devops" },
  { label: "Kubernetes", cat: "devops" },
  { label: "AWS", cat: "cloud" },
  { label: "Google Cloud", cat: "cloud" },
  { label: "PostgreSQL", cat: "data" },
  { label: "MySQL", cat: "data" },
  { label: "Firebase", cat: "data" },
  { label: "n8n / Automações", cat: "tools" },
  { label: "CI/CD", cat: "devops" },
  { label: "APIs RESTful", cat: "backend" },
  { label: "Linux Shell", cat: "tools" },
];

export default function Home() {
  return (
    <div style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}>
      <LiveLogs />

      {/* ── NAVBAR ──────────────────────────────────────────── */}
      <nav className="navbar" aria-label="Navegação principal">
        <div
          className="page-container"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}
        >
          {/* Logo */}
          <a
            href="#hero"
            style={{
              fontFamily: "var(--font-display, Space Grotesk, sans-serif)",
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: "-0.03em",
              color: "var(--fg-primary)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ color: "var(--accent)" }}>ik</span>
            <span style={{ color: "var(--fg-muted)" }}>/</span>
          </a>

          {/* Links */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: "32px" }}
            className="hidden md:flex"
          >
            {[
              ["#sobre", "sobre"],
              ["#stack", "stack"],
              ["#experiencia", "experiência"],
              ["#contato", "contato"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--fg-secondary)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "color 150ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-secondary)")}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="/IgorKendySakaguchi12-2025.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ fontSize: "13px", padding: "8px 18px" }}
          >
            Currículo <ExternalLink size={13} />
          </a>
        </div>
      </nav>

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      <main style={{ paddingTop: "60px" }}>

        {/* ═══════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════ */}
        <section
          id="hero"
          className="page-container"
          style={{ paddingTop: "100px", paddingBottom: "80px" }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            style={{ maxWidth: "820px" }}
          >
            {/* Status badge */}
            <motion.div variants={fadeUp} style={{ marginBottom: "32px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "100px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--fg-secondary)",
                  letterSpacing: "0.06em",
                }}
              >
                <span className="status-dot" />
                DISPONÍVEL PARA NOVOS PROJETOS
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-display, Space Grotesk, sans-serif)",
                fontSize: "clamp(52px, 8vw, 96px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                color: "var(--fg-primary)",
                marginBottom: "8px",
              }}
            >
              Igor Kendy
            </motion.h1>

            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-display, Space Grotesk, sans-serif)",
                fontSize: "clamp(52px, 8vw, 96px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                color: "var(--accent)",
                marginBottom: "40px",
              }}
            >
              Sakaguchi.
            </motion.h1>

            {/* Role line */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              <hr style={{ flex: 1, border: "none", borderTop: "1px solid var(--border)" }} />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--fg-muted)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                Full-Stack & DevOps Engineer
              </span>
              <hr style={{ flex: 1, border: "none", borderTop: "1px solid var(--border)" }} />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: "18px",
                color: "var(--fg-secondary)",
                lineHeight: 1.7,
                maxWidth: "560px",
                marginBottom: "48px",
              }}
            >
              Construo infraestruturas resilientes e aplicações de alto volume.
              Foco em{" "}
              <span style={{ color: "var(--fg-primary)", fontWeight: 500 }}>
                Backend, Cloud e DevOps
              </span>{" "}
              — do servidor ao navegador.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
            >
              <a href="#contato" className="btn-primary">
                Fale Comigo <ArrowUpRight size={16} />
              </a>
              <a
                href="https://github.com/IgorKendyS"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/igorsakaguchi/"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Divisor ──────────────────────────────────────── */}
        <hr className="section-rule" />

        {/* ═══════════════════════════════════════════════════
            SOBRE
        ════════════════════════════════════════════════════ */}
        <motion.section
          id="sobre"
          className="page-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ paddingBlock: "96px", scrollMarginTop: "80px" }}
        >
          <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: "24px" }}>
            // 01. perfil
          </motion.p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px" }} className="grid-about">
            <motion.div variants={fadeUp}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "36px",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  marginBottom: "24px",
                  lineHeight: 1.15,
                }}
              >
                Desenvolvedor focado em resultados de{" "}
                <span style={{ color: "var(--accent)" }}>alto impacto.</span>
              </h2>

              <p style={{ color: "var(--fg-secondary)", lineHeight: 1.75, marginBottom: "20px" }}>
                Sou um desenvolvedor Full-Stack com forte foco em backend, especializado na criação de
                APIs escaláveis, automações inteligentes e integrações complexas. Proficiente em{" "}
                <span style={{ color: "var(--fg-primary)" }}>Node.js, Python, Docker e Kubernetes</span>.
              </p>

              <p style={{ color: "var(--fg-secondary)", lineHeight: 1.75 }}>
                Motivado pela curiosidade técnica e orientado a gerar valor de negócio através da tecnologia.
                Apto para trabalhos remotos ou híbridos em ambientes inovadores.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { icon: <Server size={18} />, title: "Backend & APIs", desc: "Arquiteturas escaláveis, RESTful e Serverless" },
                { icon: <Cloud size={18} />, title: "Cloud & DevOps", desc: "Kubernetes, AWS, GCP e pipelines CI/CD" },
                { icon: <Code2 size={18} />, title: "Frontend", desc: "React, Next.js e Vue.js com foco em performance" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "20px",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    transition: "border-color 200ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <div
                    style={{
                      color: "var(--accent)",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "14px",
                        marginBottom: "4px",
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--fg-secondary)" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <hr className="section-rule" />

        {/* ═══════════════════════════════════════════════════
            TECH STACK
        ════════════════════════════════════════════════════ */}
        <motion.section
          id="stack"
          className="page-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ paddingBlock: "96px", scrollMarginTop: "80px" }}
        >
          <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: "24px" }}>
            // 02. tech stack
          </motion.p>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "48px",
            }}
          >
            Tecnologias que uso no dia a dia.
          </motion.h2>

          <motion.div
            variants={stagger}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {techStack.map((tech) => (
              <motion.span key={tech.label} variants={fadeIn} className="badge">
                {tech.label}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

        <hr className="section-rule" />

        {/* ═══════════════════════════════════════════════════
            TERMINAL INTERATIVO
        ════════════════════════════════════════════════════ */}
        <motion.section
          id="terminal"
          className="page-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ paddingBlock: "96px", scrollMarginTop: "80px" }}
        >
          <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: "24px" }}>
            // 03. ambiente interativo
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            Terminal Linux no Navegador.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{ color: "var(--fg-secondary)", marginBottom: "40px", maxWidth: "520px" }}
          >
            Digite{" "}
            <code
              style={{
                fontFamily: "var(--font-mono)",
                background: "var(--bg-elevated)",
                color: "var(--accent)",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "13px",
              }}
            >
              help
            </code>{" "}
            para explorar minha stack. Tente{" "}
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--fg-secondary)", fontSize: "13px" }}>
              ls
            </code>
            ,{" "}
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--fg-secondary)", fontSize: "13px" }}>
              cd projects
            </code>{" "}
            e{" "}
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--fg-secondary)", fontSize: "13px" }}>
              cat k8s-cluster.yml
            </code>
            .
          </motion.p>
          <motion.div variants={fadeUp}>
            <InteractiveTerminal />
          </motion.div>
        </motion.section>

        <hr className="section-rule" />

        {/* ═══════════════════════════════════════════════════
            CACHE TESTER
        ════════════════════════════════════════════════════ */}
        <motion.section
          id="benchmarks"
          className="page-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ paddingBlock: "96px", scrollMarginTop: "80px" }}
        >
          <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: "24px" }}>
            // 04. performance & caching
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            Cache & Otimização de Consultas.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{ color: "var(--fg-secondary)", marginBottom: "40px", maxWidth: "520px" }}
          >
            A otimização de consultas e escalabilidade determinam a vida útil de uma aplicação de alto volume.
          </motion.p>
          <motion.div variants={fadeUp}>
            <CacheTester />
          </motion.div>
        </motion.section>

        <hr className="section-rule" />

        {/* ═══════════════════════════════════════════════════
            ARCHITECTURE
        ════════════════════════════════════════════════════ */}
        <motion.section
          id="arquitetura"
          className="page-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ paddingBlock: "96px", scrollMarginTop: "80px" }}
        >
          <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: "24px" }}>
            // 05. arquitetura de sistemas
          </motion.p>
          <motion.div variants={fadeUp}>
            <ArchitectureDiagram />
          </motion.div>
        </motion.section>

        <hr className="section-rule" />

        {/* ═══════════════════════════════════════════════════
            CI/CD PIPELINE
        ════════════════════════════════════════════════════ */}
        <motion.section
          id="cicd"
          className="page-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ paddingBlock: "96px", scrollMarginTop: "80px" }}
        >
          <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: "24px" }}>
            // 06. pipeline ci/cd
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            Automação de Deploy GitHub → Kubernetes.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{ color: "var(--fg-secondary)", marginBottom: "40px", maxWidth: "520px" }}
          >
            Simulador interativo de uma pipeline GitHub Actions implantando numa infra Kubernetes real.
          </motion.p>
          <motion.div variants={fadeUp}>
            <CICDPipeline />
          </motion.div>
        </motion.section>

        <hr className="section-rule" />

        {/* ═══════════════════════════════════════════════════
            METRICS / GRAFANA
        ════════════════════════════════════════════════════ */}
        <motion.section
          id="grafana"
          className="page-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ paddingBlock: "96px", scrollMarginTop: "80px" }}
        >
          <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: "24px" }}>
            // 07. telemetria & observabilidade
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            Dashboard de Monitoramento em Tempo Real.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{ color: "var(--fg-secondary)", marginBottom: "40px", maxWidth: "520px" }}
          >
            Formato Grafana simulando métricas reais de pods Kubernetes em produção.
          </motion.p>
          <motion.div variants={fadeUp}>
            <MetricsDashboard />
          </motion.div>
        </motion.section>

        <hr className="section-rule" />

        {/* ═══════════════════════════════════════════════════
            API PLAYGROUND
        ════════════════════════════════════════════════════ */}
        <motion.section
          id="api-sandbox"
          className="page-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ paddingBlock: "96px", scrollMarginTop: "80px" }}
        >
          <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: "24px" }}>
            // 08. api sandbox
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            Playground de APIs — Estilo Postman.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{ color: "var(--fg-secondary)", marginBottom: "40px", maxWidth: "520px" }}
          >
            Teste endpoints mockados com autenticação, status codes e latência de rede em tempo real.
          </motion.p>
          <motion.div variants={fadeUp}>
            <ApiPlayground />
          </motion.div>
        </motion.section>

        <hr className="section-rule" />

        {/* ═══════════════════════════════════════════════════
            EXPERIÊNCIA
        ════════════════════════════════════════════════════ */}
        <motion.section
          id="experiencia"
          className="page-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ paddingBlock: "96px", scrollMarginTop: "80px" }}
        >
          <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: "24px" }}>
            // 09. experiência profissional
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "64px",
            }}
          >
            Onde trabalhei.
          </motion.h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              {
                period: "Nov 2024 — Atual",
                role: "Desenvolvedor",
                company: "Responza",
                description:
                  "Configuração e manutenção de servidores Kubernetes e arquiteturas baseadas em Serverless Functions. Scale do produto e governança na nuvem.",
                tags: ["Kubernetes", "Serverless", "Google Cloud"],
                current: true,
              },
              {
                period: "Jan 2023 — Nov 2024",
                role: "Desenvolvedor",
                company: "JEM Digital",
                description:
                  "Criação de sistemas para gestão de tráfego pago, manutenção de sites PHP/WordPress. Desenvolvimento de bots em Python para automação de tarefas diárias.",
                tags: ["Python", "PHP", "WordPress", "Automação"],
                current: false,
              },
            ].map((xp, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  gap: "32px",
                  padding: "40px 0",
                  borderTop: i === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                }}
                className="xp-row"
              >
                {/* Left: period */}
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: xp.current ? "var(--accent)" : "var(--fg-muted)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {xp.period}
                  </span>
                  {xp.current && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "8px",
                        padding: "3px 8px",
                        background: "rgba(232, 255, 71, 0.1)",
                        border: "1px solid rgba(232, 255, 71, 0.25)",
                        borderRadius: "100px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        color: "var(--accent)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "var(--accent)",
                        }}
                      />
                      ATUAL
                    </div>
                  )}
                </div>

                {/* Right: content */}
                <div>
                  <div style={{ marginBottom: "8px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "20px",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {xp.role}
                    </span>
                    <span style={{ color: "var(--fg-muted)", margin: "0 8px" }}>@</span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "20px",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        color: "var(--fg-secondary)",
                      }}
                    >
                      {xp.company}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "var(--fg-secondary)",
                      lineHeight: 1.7,
                      marginBottom: "20px",
                      maxWidth: "520px",
                    }}
                  >
                    {xp.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {xp.tags.map((tag) => (
                      <span key={tag} className="badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <hr className="section-rule" />

        {/* ═══════════════════════════════════════════════════
            FORMAÇÃO & CERTIFICAÇÕES
        ════════════════════════════════════════════════════ */}
        <motion.section
          id="formacao"
          className="page-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ paddingBlock: "96px", scrollMarginTop: "80px" }}
        >
          <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: "24px" }}>
            // 10. formação & certificações
          </motion.p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="grid-edu">
            {/* Formação */}
            <motion.div
              variants={fadeUp}
              className="card card-accent"
              style={{ padding: "32px" }}
            >
              <div
                style={{
                  display: "inline-flex",
                  padding: "10px",
                  background: "var(--bg-elevated)",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "20px",
                  color: "var(--accent)",
                }}
              >
                <GraduationCap size={20} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "18px",
                  letterSpacing: "-0.02em",
                  marginBottom: "6px",
                }}
              >
                Engenharia de Computação
              </h3>
              <p style={{ color: "var(--fg-muted)", fontSize: "13px", marginBottom: "16px" }}>
                IFSP — Campus Birigui · 2018 – 2026 (10º semestre)
              </p>
              <p style={{ color: "var(--fg-secondary)", fontSize: "14px", lineHeight: 1.7 }}>
                Base sólida em computação, algoritmos, estrutura de dados e matemática aplicada.
              </p>
            </motion.div>

            {/* Certificações */}
            <motion.div variants={fadeUp} className="card" style={{ padding: "32px" }}>
              <div
                style={{
                  display: "inline-flex",
                  padding: "10px",
                  background: "var(--bg-elevated)",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "20px",
                  color: "var(--fg-secondary)",
                }}
              >
                <Briefcase size={20} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "18px",
                  letterSpacing: "-0.02em",
                  marginBottom: "24px",
                }}
              >
                Certificações
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { name: "AWS — Amazon Web Services", org: "SENAI", color: "var(--accent)" },
                  { name: "Microsoft AI-900", org: "SENAI", color: "#7B9FFF" },
                  { name: "Google Cloud", org: "SENAI", color: "#5CB85C" },
                ].map((cert) => (
                  <div key={cert.name} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: cert.color,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: "14px", color: "var(--fg-primary)" }}>{cert.name}</span>
                    <span style={{ fontSize: "12px", color: "var(--fg-muted)", marginLeft: "auto" }}>
                      {cert.org}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <hr className="section-rule" />

        {/* ═══════════════════════════════════════════════════
            CONTATO
        ════════════════════════════════════════════════════ */}
        <motion.section
          id="contato"
          className="page-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{
            paddingBlock: "120px",
            scrollMarginTop: "80px",
            textAlign: "center",
          }}
        >
          <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: "32px" }}>
            // contato
          </motion.p>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: "24px",
            }}
          >
            Pronto para{" "}
            <span style={{ color: "var(--accent)" }}>construir</span>
            <br />
            algo juntos?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              color: "var(--fg-secondary)",
              marginBottom: "48px",
              maxWidth: "420px",
              marginInline: "auto",
              lineHeight: 1.7,
            }}
          >
            Minha caixa de entrada está sempre aberta — para oportunidades, projetos ou apenas uma
            troca técnica.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}
          >
            <a href="mailto:igkendy.s@gmail.com" className="btn-primary" style={{ fontSize: "15px", padding: "14px 28px" }}>
              <Mail size={18} />
              igkendy.s@gmail.com
            </a>
            <a
              href="https://wa.me/5518997907790"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ fontSize: "15px", padding: "14px 28px" }}
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <a
              href="https://www.linkedin.com/in/igorsakaguchi/"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ fontSize: "15px", padding: "14px 28px" }}
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </motion.div>
        </motion.section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "32px 0",
        }}
      >
        <div
          className="page-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--fg-muted)",
            }}
          >
            © {new Date().getFullYear()} Igor Kendy Sakaguchi
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--fg-muted)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Terminal size={12} />
            Next.js · Framer Motion · Space Grotesk
          </span>
        </div>
      </footer>

      {/* ── RESPONSIVE HELPERS ──────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .grid-about {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .grid-edu {
            grid-template-columns: 1fr !important;
          }
          .xp-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* ── LIVE CHAT COMPONENT ─────────────────────────────── */}
      <LiveChat />
    </div>
  );
}
