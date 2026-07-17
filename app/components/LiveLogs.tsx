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
      case "INFO": return "#7B9FFF";
      case "WARN": return "#E8FF47";
      case "ERROR": return "#FF4747";
      case "SUCCESS": return "#4ADE80";
      default: return "#8A8A8A";
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "flex-end", pointerEvents: "none" }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            style={{
              width: "320px",
              height: "260px",
              marginBottom: "12px",
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              pointerEvents: "auto",
              boxShadow: "0 24px 48px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{
              background: "#1A1A1A",
              padding: "10px 14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Activity size={12} style={{ color: "#E8FF47" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#8A8A8A", letterSpacing: "0.1em" }}>LIVE SERVER LOGS</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ color: "#555", background: "none", border: "none", cursor: "pointer", display: "flex" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F2F2F2")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >
                <Minimize2 size={13} />
              </button>
            </div>

            <div style={{ flex: 1, padding: "12px", background: "#080808", overflowY: "auto", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
              {logs.map(log => (
                <div key={log.id} style={{ marginBottom: "8px", lineHeight: 1.5 }}>
                  <span style={{ color: "#555" }}>[{log.time}]</span>{" "}
                  <span style={{ color: getColor(log.level) }}>[{log.level}]</span>{" "}
                  <span style={{ color: "#8A8A8A" }}>{log.message}</span>
                </div>
              ))}
              <div ref={bottomRef} style={{ height: "4px" }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          pointerEvents: "auto",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isOpen ? "#1A1A1A" : "#E8FF47",
          color: isOpen ? "#8A8A8A" : "#000",
          border: isOpen ? "1px solid rgba(255,255,255,0.1)" : "none",
          cursor: "pointer",
          boxShadow: isOpen ? "none" : "0 0 20px rgba(232,255,71,0.3)",
        }}
      >
        {isOpen ? <X size={18} /> : <TerminalSquare size={18} />}
      </motion.button>
    </div>
  );
}
