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
      case "idle": return <Circle size={20} className="text-slate-600" />;
      case "running": return <Loader2 size={20} className="text-cyan-400 animate-spin" />;
      case "success": return <CheckCircle2 size={20} className="text-emerald-400" />;
      case "error": return <Circle size={20} className="text-red-400" />;
    }
  };

  return (
    <div className="w-full relative glass rounded-xl p-6 md:p-8 border border-slate-700/50 shadow-2xl overflow-hidden group">
      {/* Background glow animated */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-white/5 mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <GitBranch className="text-cyan-400" size={24} /> 
            GitHub Actions Simulator
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Simulação de uma esteira de CI/CD completa em ambiente Cloud.
          </p>
        </div>
        
        <button
          onClick={runPipeline}
          disabled={isRunning}
          className="shrink-0 flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
        >
          {isRunning ? "Pipeline Executando..." : "Triggar Deploy"} 
          {!isRunning && <Play size={16} />}
        </button>
      </div>

      <div className="relative">
        {/* Progress Bar background */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800 md:left-0 md:top-5 md:bottom-auto md:w-full md:h-0.5 rounded-full z-0 overflow-hidden">
          <motion.div 
            className="w-full h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            initial={{ width: "0%", height: "0%" }}
            animate={{ 
              width: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${progress}%` : "100%", 
              height: typeof window !== 'undefined' && window.innerWidth >= 768 ? "100%" : `${progress}%`
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4 relative z-10 w-full pl-10 md:pl-0 pt-2 md:pt-0">
          {pipelineSteps.map((step) => {
             const status = statuses[step.id];
             const isRunning = status === "running";
             const isSuccess = status === "success";

             return (
               <div key={step.id} className="flex flex-col md:items-center gap-3 w-full">
                 <div className={`relative z-10 w-10 h-10 md:mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${isSuccess ? 'bg-slate-900 border-2 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : isRunning ? 'bg-slate-900 border-2 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-slate-900 border-2 border-slate-700'}`}>
                    {getStatusIcon(status)}
                 </div>
                 
                 <div className="md:text-center">
                   <div className={`flex items-center md:justify-center gap-1.5 font-semibold text-sm mb-1 transition-colors ${isSuccess ? 'text-emerald-400' : isRunning ? 'text-cyan-400' : 'text-slate-400'}`}>
                     {step.icon} {step.name}
                   </div>
                   <div className="text-xs text-slate-500 font-mono">
                     {status === "idle" && "Waiting"}
                     {status === "running" && "In progress..."}
                     {status === "success" && "Completed √"}
                   </div>
                 </div>
               </div>
             )
          })}
        </div>
      </div>
    </div>
  );
}
