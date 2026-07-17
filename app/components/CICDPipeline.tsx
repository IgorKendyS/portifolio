"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2, Play, GitBranch, Terminal, Server, Box, Github } from "lucide-react";

type StepStatus = "idle" | "running" | "success" | "error";

interface PipelineStep {
  id: string;
  name: string;
  icon: React.ReactNode;
  duration: number;
}

const pipelineSteps: PipelineStep[] = [
  { id: "checkout", name: "Checkout Code", icon: <Github size={18} />, duration: 1500 },
  { id: "lint", name: "Lint & Tests", icon: <Terminal size={18} />, duration: 2500 },
  { id: "build", name: "Build Docker Image", icon: <Box size={18} />, duration: 3000 },
  { id: "deploy", name: "Deploy to Kubernetes", icon: <Server size={18} />, duration: 2000 },
];

export function CICDPipeline() {
  const [statuses, setStatuses] = useState<Record<string, StepStatus>>({
    checkout: "idle",
    lint: "idle",
    build: "idle",
    deploy: "idle"
  });
  
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const runPipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);
    
    // Reset all statuses
    const resetSpecs: Record<string, StepStatus> = {};
    pipelineSteps.forEach(s => resetSpecs[s.id] = "idle");
    setStatuses(resetSpecs);

    for (let i = 0; i < pipelineSteps.length; i++) {
      const step = pipelineSteps[i];
      // Target no centro do flex item (ex: 12.5%, 37.5% ...)
      const targetProgress = ((i + 0.5) / pipelineSteps.length) * 100;

      // Anima a linha até o centro do passo atual e espera ela chegar lá
      setProgress(targetProgress);
      await new Promise(resolve => setTimeout(resolve, 600)); 

      // Chegou no step, começa a carregar
      setStatuses(prev => ({ ...prev, [step.id]: "running" }));
      
      // Simula o tempo de execução do passo atual
      await new Promise(resolve => setTimeout(resolve, step.duration));
      
      // Passo finalizado com sucesso
      setStatuses(prev => ({ ...prev, [step.id]: "success" }));
    }

    // Leva a barra até o final (100%) após a conclusão de todas as etapas
    setProgress(100);
    setIsRunning(false);
  };

  const getStatusIcon = (status: StepStatus) => {
    switch (status) {
      case "idle":    return <Circle size={20} style={{ color: "#333" }} />;
      case "running": return <Loader2 size={20} style={{ color: "#E8FF47", animation: "spin 1s linear infinite" }} />;
      case "success": return <CheckCircle2 size={20} style={{ color: "#4ADE80" }} />;
      case "error":   return <Circle size={20} style={{ color: "#FF4747" }} />;
    }
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
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "32px", gap: "16px" }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: "8px" }}>
            <GitBranch size={18} style={{ color: "#E8FF47" }} />
            GitHub Actions Simulator
          </h3>
          <p style={{ color: "#8A8A8A", fontSize: "13px", marginTop: "4px" }}>
            Simulação de CI/CD completa em ambiente Cloud.
          </p>
        </div>

        <button
          onClick={runPipeline}
          disabled={isRunning}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: isRunning ? "#1A1A1A" : "#E8FF47",
            color: isRunning ? "#555" : "#000",
            border: isRunning ? "1px solid rgba(255,255,255,0.08)" : "none",
            borderRadius: "8px",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "13px",
            cursor: isRunning ? "not-allowed" : "pointer",
            opacity: isRunning ? 0.6 : 1,
            flexShrink: 0,
            transition: "all 150ms ease",
          }}
        >
          {isRunning ? "Executando..." : "Triggar Deploy"}
          {!isRunning && <Play size={14} />}
        </button>
      </div>

      {/* Pipeline Steps */}
      <div style={{ position: "relative" }}>
        {/* Progress line background */}
        <div style={{
          position: "absolute",
          left: "20px",
          top: 0,
          bottom: 0,
          width: "1px",
          background: "#222",
          zIndex: 0,
        }}>
          <motion.div
            style={{ width: "100%", background: "#E8FF47", transformOrigin: "top" }}
            initial={{ height: "0%" }}
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0", paddingLeft: "56px", position: "relative", zIndex: 1 }}>
          {pipelineSteps.map((step) => {
            const status = statuses[step.id];
            const stepRunning = status === "running";
            const stepSuccess = status === "success";

            return (
              <div key={step.id} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                {/* Icon bubble */}
                <div style={{
                  position: "absolute",
                  left: "10px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: stepSuccess ? "#080808" : "#080808",
                  border: `2px solid ${stepSuccess ? "#4ADE80" : stepRunning ? "#E8FF47" : "#333"}`,
                  boxShadow: stepSuccess ? "0 0 8px rgba(74,222,128,0.3)" : stepRunning ? "0 0 8px rgba(232,255,71,0.4)" : "none",
                  zIndex: 1,
                }}>
                  {getStatusIcon(status)}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                  <span style={{ color: stepSuccess ? "#4ADE80" : stepRunning ? "#E8FF47" : "#555" }}>
                    {step.icon}
                  </span>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "15px",
                      color: stepSuccess ? "#4ADE80" : stepRunning ? "#F2F2F2" : "#555",
                      transition: "color 300ms ease",
                    }}>
                      {step.name}
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: stepSuccess ? "#4ADE80" : stepRunning ? "#8A8A8A" : "#333", marginTop: "2px" }}>
                      {status === "idle" && "Waiting"}
                      {status === "running" && "In progress..."}
                      {status === "success" && "Completed \u2713"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

