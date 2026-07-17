"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonitorSmartphone, Router, ShieldCheck, Cpu, Database, Server, Component } from "lucide-react";

interface NodeData {
  id: string;
  label: string;
  icon: React.ReactNode;
  desc: string;
  tech: string[];
  x: number; // 0-100%
  y: number; // 0-100%
  color: string;
  iconBg: string; // Tailwing bg color class for the big icon in details
}

const nodes: NodeData[] = [
  { id: "client", label: "Web Forms", icon: <MonitorSmartphone size={24} />, desc: "Client-side / SSR Rendered application que entrega a interface principal ao usuário final com rotas otimizadas.", tech: ["React", "Next.js", "TailwindCSS"], x: 14, y: 50, color: "text-blue-400 border-blue-500", iconBg: "bg-blue-500/20 text-blue-400" },
  { id: "gateway", label: "API Gateway", icon: <Router size={24} />, desc: "Ponto único de entrada. Lida com Rate Limiting, CORS, e balanceamento de carga para os micros-serviços internos.", tech: ["Node.js", "Express", "Nginx"], x: 38, y: 50, color: "text-purple-400 border-purple-500", iconBg: "bg-purple-500/20 text-purple-400" },
  { id: "auth", label: "Auth Service", icon: <ShieldCheck size={24} />, desc: "Isolado para validar e emitir tokens JWT, checa sessões e mantêm a parte de segurança criptografada.", tech: ["Go", "JWT", "OAuth"], x: 62, y: 28, color: "text-emerald-400 border-emerald-500", iconBg: "bg-emerald-500/20 text-emerald-400" },
  { id: "core", label: "Core Backend", icon: <Cpu size={24} />, desc: "Processa a lógica pesada de negócio, cálculos, machine-learning e disparos de e-mail / automações.", tech: ["Python", "FastAPI", "K8s"], x: 62, y: 72, color: "text-cyan-400 border-cyan-500", iconBg: "bg-cyan-500/20 text-cyan-400" },
  { id: "db", label: "Primary DB", icon: <Database size={24} />, desc: "Persistência ACID para dados sensíveis. Arquitetura relacional escalada horizontalmente (Read Replicas).", tech: ["PostgreSQL", "Prisma"], x: 86, y: 28, color: "text-indigo-400 border-indigo-500", iconBg: "bg-indigo-500/20 text-indigo-400" },
  { id: "cache", label: "Redis Cache", icon: <Server size={24} />, desc: "Cache in-memory para consultas lentas e controle de sessão distribuído entre os containers do painel web.", tech: ["Redis", "Pub/Sub"], x: 86, y: 72, color: "text-rose-400 border-rose-500", iconBg: "bg-rose-500/20 text-rose-400" },
];

const edges = [
  { from: "client", to: "gateway" },
  { from: "gateway", to: "auth" },
  { from: "gateway", to: "core" },
  { from: "auth", to: "db" },
  { from: "core", to: "db" },
  { from: "core", to: "cache" },
];

export function ArchitectureDiagram() {
  const [activeNode, setActiveNode] = useState<NodeData | null>(nodes[0]);

  const drawCurve = (n1: NodeData, n2: NodeData) => {
    // Map percentages to 1000x500 box
    const x1 = (n1.x / 100) * 1000;
    const y1 = (n1.y / 100) * 500;
    const x2 = (n2.x / 100) * 1000;
    const y2 = (n2.y / 100) * 500;

    const isHovered = activeNode?.id === n1.id || activeNode?.id === n2.id;
    const strokeColor = isHovered ? "rgba(232,255,71,0.6)" : "rgba(255,255,255,0.08)";
    const strokeWidth = isHovered ? "2" : "1";

    // Cubic bezier logic for smooth horizontal S-curves
    return (
      <path
        key={`${n1.id}-${n2.id}`}
        d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        className="transition-all duration-500"
      />
    );
  };

  return (
    <div style={{
      width: "100%",
      background: "#111111",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px",
      padding: "32px",
      overflow: "hidden",
    }}>
      <div style={{ paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "32px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <Component size={18} style={{ color: "#E8FF47" }} />
          Topologia de Microsserviços
        </h2>
        <p style={{ color: "#8A8A8A", fontSize: "13px" }}>
          Arquitetura interativa escalável em containers. Clique nos nós para detalhar.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="arch-layout">

        {/* DIAGRAM AREA */}
        <div style={{ position: "relative", width: "100%", background: "#080808", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
          <div style={{ minWidth: "600px", width: "100%", aspectRatio: "2/1", position: "relative" }}>
            <svg viewBox="0 0 1000 500" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              {edges.map(e => {
                const n1 = nodes.find(n => n.id === e.from)!;
                const n2 = nodes.find(n => n.id === e.to)!;
                return drawCurve(n1, n2);
              })}
            </svg>

            {nodes.map(node => {
              const isActive = activeNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    cursor: "pointer",
                    width: "120px",
                    height: "76px",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    background: isActive ? "#1A1A1A" : "#111111",
                    border: isActive ? "1px solid #E8FF47" : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: isActive ? "0 0 16px rgba(232,255,71,0.2)" : "none",
                    transition: "all 200ms ease",
                    zIndex: 10,
                  }}
                  onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; } }}
                  onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; } }}
                >
                  <div style={{ color: isActive ? "#E8FF47" : "#555", transition: "color 200ms ease" }}>
                    {node.icon}
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, textAlign: "center", padding: "0 4px", lineHeight: 1.3, color: isActive ? "#F2F2F2" : "#8A8A8A" }}>
                    {node.label}
                  </span>
                  {isActive && (
                    <span style={{ position: "absolute", top: "-4px", right: "-4px", width: "8px", height: "8px", borderRadius: "50%", background: "#E8FF47", boxShadow: "0 0 6px #E8FF47" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* DETAILS PANEL */}
        <div style={{
          background: "#080808",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "8px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          minHeight: "180px",
        }}>
          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ padding: "12px", background: "#1A1A1A", borderRadius: "8px", color: "#E8FF47", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {activeNode.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.02em" }}>
                      {activeNode.label}
                    </h4>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#555" }}>ID: {activeNode.id}</span>
                  </div>
                </div>

                <p style={{ color: "#8A8A8A", fontSize: "14px", lineHeight: 1.7 }}>{activeNode.desc}</p>

                <div>
                  <h5 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#555", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                    Stack Oficial
                  </h5>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {activeNode.tech.map((t, idx) => (
                      <span key={idx} className="badge">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div style={{ color: "#555", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flex: 1 }}>
                Selecione um nó acima.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .arch-layout { flex-direction: row !important; }
          .arch-layout > div:first-child { flex: 2; }
          .arch-layout > div:last-child { flex: 1; }
        }
      `}</style>
    </div>
  );
}

