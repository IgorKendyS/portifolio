"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, X, TerminalSquare, Maximize2, Minimize2 } from "lucide-react";

interface LogEntry {
  id: number;
  time: string;
  level: "INFO" | "WARN" | "ERROR" | "SUCCESS";
  message: string;
}

export function LiveLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const dummyMessages = [
    { level: "INFO", message: "Recebendo requisição GET /api/user-session (22ms)" },
    { level: "SUCCESS", message: "Autenticação via JWT completada." },
    { level: "WARN", message: "Latency spike no Node 3. Rebalanceando trafégo..." },
    { level: "INFO", message: "Disparando automação do n8n (webhook-receiver)" },
    { level: "INFO", message: "Verificando node cache no servidor Redis." },
    { level: "SUCCESS", message: "Novo Pod alocado via k8s: ikendy-b2d2" },
    { level: "INFO", message: "Métricas do Prometheus sincronizadas: OK" },
    { level: "SUCCESS", message: "Build CI/CD via GitHub Actions aprovado." },
    { level: "INFO", message: "Coletando lixo do V8 Engine (Garbage Collection)" }
  ] as const;

  useEffect(() => {
    // Start with a generic connection log
    setLogs([{
      id: Date.now(),
      time: new Date().toLocaleTimeString('pt-BR', { hour12: false }),
      level: "SUCCESS",
      message: "Conexão WebSocket WSS:// estabelecida com ikendy.cloud"
    }]);

    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * dummyMessages.length);
      const randomMsg = dummyMessages[idx];
      const newLog: LogEntry = {
        id: Date.now(),
        time: new Date().toLocaleTimeString('pt-BR', { hour12: false }),
        level: randomMsg.level,
        message: randomMsg.message
      };

      setLogs(prev => {
        const updated = [...prev, newLog];
        if (updated.length > 20) updated.shift(); 
        return updated;
      });
    }, Math.floor(Math.random() * 5000) + 5000); // 5 to 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isOpen]);

  const getColor = (level: string) => {
    switch (level) {
      case "INFO": return "text-cyan-400";
      case "WARN": return "text-yellow-400";
      case "ERROR": return "text-red-400";
      case "SUCCESS": return "text-emerald-400";
      default: return "text-slate-400";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-80 h-64 mb-4 glass border border-slate-700/50 shadow-2xl rounded-lg overflow-hidden flex flex-col pointer-events-auto"
          >
            <div className="bg-slate-800/80 px-3 py-2 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-cyan-400 animate-pulse" />
                <span className="text-xs text-slate-300 font-mono font-bold tracking-wider">LIVE SERVER LOGS</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <Minimize2 size={14} />
              </button>
            </div>
            
            <div className="flex-1 p-3 bg-slate-900/90 overflow-y-auto font-mono text-[10px] sm:text-xs">
              {logs.map(log => (
                <div key={log.id} className="mb-2 leading-relaxed">
                  <span className="text-slate-500">[{log.time}]</span>{" "}
                  <span className={getColor(log.level)}>[{log.level}]</span>{" "}
                  <span className="text-slate-300">{log.message}</span>
                </div>
              ))}
              <div ref={bottomRef} className="h-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto p-3 rounded-full flex items-center justify-center shadow-2xl transition-all border ${isOpen ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-cyan-500 text-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] animate-bounce'}`}
      >
        {isOpen ? <X size={20} /> : <TerminalSquare size={20} />}
      </motion.button>
    </div>
  );
}
