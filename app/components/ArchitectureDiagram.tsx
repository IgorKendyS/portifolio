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
    const strokeColor = isHovered ? "rgba(34, 211, 238, 0.8)" : "rgba(255, 255, 255, 0.1)";
    const strokeWidth = isHovered ? "3" : "2";

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
    <div className="w-full glass rounded-xl p-6 md:p-8 border border-slate-700/50 shadow-2xl overflow-hidden group">
      {/* Background glow animated */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-white/5 mb-6 gap-4 relative z-20">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="text-cyan-400 font-mono text-xl">05.</span> 
            <span className="flex items-center gap-2">
               <Component className="text-cyan-400" size={24} /> 
               Topologia de Microsserviços
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Arquitetura interativa escalável baseada em containers. Clique nos nós para detalhar.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* DIAGRAM AREA */}
        <div className="relative w-full lg:w-2/3 bg-slate-900/40 rounded-xl border border-white/5 overflow-x-auto overflow-y-hidden custom-scrollbar">
          {/* We define a box that behaves well responsibly, 1000x500 ratio */}
          <div className="min-w-[600px] w-full aspect-[2/1] relative">
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full pointer-events-none">
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
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 w-[110px] sm:w-[130px] h-20 rounded-lg flex flex-col items-center justify-center gap-1 border-2 shadow-lg hover:scale-105 z-10 
                    ${isActive ? node.color + " bg-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.2)] ring-2 ring-cyan-400/30" : "bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-300"}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div className={isActive ? "" : "opacity-70"}>{node.icon}</div>
                  <span className="text-[10px] sm:text-xs font-bold text-center px-1 leading-tight">{node.label}</span>
                  {isActive && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* DETAILS PANEL */}
        <div className="w-full lg:w-1/3 bg-slate-900/60 rounded-xl border border-white/5 p-6 flex flex-col relative overflow-hidden h-[300px] lg:h-auto z-20">
           <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col"
              >
                 <div className="flex items-center gap-4 mb-4">
                   <div className={`p-4 rounded-xl ${activeNode.iconBg}`}>
                     {activeNode.icon}
                   </div>
                   <div>
                     <h4 className="text-xl font-bold text-white leading-tight">{activeNode.label}</h4>
                     <span className="text-xs text-slate-500 font-mono">ID: {activeNode.id}</span>
                   </div>
                 </div>
                 
                 <p className="text-slate-300 text-sm leading-relaxed mb-6">
                   {activeNode.desc}
                 </p>

                 <div className="mt-auto">
                   <h5 className="text-xs uppercase text-slate-500 font-bold mb-3 tracking-widest flex items-center gap-2">
                     <span className="w-4 h-px bg-slate-600"></span> Stack Oficial
                   </h5>
                   <div className="flex flex-wrap gap-2">
                     {activeNode.tech.map((t, idx) => (
                       <span key={idx} className="bg-slate-800 text-cyan-300 border border-slate-700/50 px-3 py-1 text-[11px] rounded-md font-mono shadow-sm">
                         {t}
                       </span>
                     ))}
                   </div>
                 </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
                Selecione um nó ao lado.
              </div>
            )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
