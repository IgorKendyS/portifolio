"use client";

import React, { useState, useEffect } from "react";
import { Activity, Server, Cpu, Database, Box } from "lucide-react";

// Helper for SVG path
const generatePath = (data: number[], max: number, width: number, height: number) => {
  if (data.length === 0) return "";
  const step = width / (data.length - 1 || 1);
  return data.map((val, i) => {
    const x = i * step;
    const y = height - (val / max) * height;
    // adding a slight padding top/bottom so stroke doesnt get cut
    const adjustedY = Math.max(2, Math.min(y, height - 2));
    return `${i === 0 ? 'M' : 'L'} ${x} ${adjustedY}`;
  }).join(" ");
};

const AreaChart = ({ data, color, max }: { data: number[], color: "cyan" | "emerald" | "purple" | "rose" | "yellow", max: number }) => {
  const width = 400;
  const height = 100;
  const path = generatePath(data, max, width, height);
  const areaPath = `${path} L ${width} ${height} L 0 ${height} Z`;

  const theme = {
    cyan: { stroke: "#22d3ee", gradFrom: "rgba(34, 211, 238, 0.4)" },
    emerald: { stroke: "#34d399", gradFrom: "rgba(52, 211, 153, 0.4)" },
    purple: { stroke: "#c084fc", gradFrom: "rgba(192, 132, 252, 0.4)" },
    rose: { stroke: "#fb7185", gradFrom: "rgba(251, 113, 133, 0.4)" },
    yellow: { stroke: "#facc15", gradFrom: "rgba(250, 204, 21, 0.4)" }
  }[color];

  return (
    <div className="w-full flex-1 min-h-[80px] mt-4 relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full absolute inset-0 preserve-3d" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.stroke} stopOpacity="0.4" />
            <stop offset="100%" stopColor={theme.stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#grad-${color})`} className="transition-all duration-300 ease-linear" />
        <path d={path} fill="none" stroke={theme.stroke} strokeWidth="2" strokeLinejoin="round" className="transition-all duration-300 ease-linear" />
      </svg>
    </div>
  );
};

export function MetricsDashboard() {
  const [cpuData, setCpuData] = useState<number[]>(Array(20).fill(30));
  const [memData, setMemData] = useState<number[]>(Array(20).fill(40));
  const [reqData, setReqData] = useState<number[]>(Array(20).fill(100));
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    if (!isSimulating) return;
    
    const interval = setInterval(() => {
      setCpuData(prev => {
        const next = [...prev.slice(1)];
        // Random walk
        let val = next[next.length - 1] + (Math.random() * 20 - 10);
        // Occasionally spike
        if (Math.random() > 0.9) val += 30;
        return [...next, Math.max(5, Math.min(95, val))];
      });

      setMemData(prev => {
        const next = [...prev.slice(1)];
        // Slow walk 
        let val = next[next.length - 1] + (Math.random() * 4 - 2);
        return [...next, Math.max(30, Math.min(85, val))];
      });

      setReqData(prev => {
        const next = [...prev.slice(1)];
        // Base traffic + waves
        const time = Date.now() / 1000;
        let base = 150 + Math.sin(time) * 50;
        let val = base + (Math.random() * 40 - 20);
        if (Math.random() > 0.95) val += 150; // Traffic spike
        return [...next, Math.max(10, val)];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const currentCpu = Math.round(cpuData[cpuData.length - 1]);
  const currentMem = Math.round(memData[memData.length - 1]);
  const currentReq = Math.round(reqData[reqData.length - 1]);

  // Dynamic colors based on values
  const getCpuColor = () => {
    if (currentCpu > 80) return "rose";
    if (currentCpu > 60) return "yellow";
    return "cyan";
  };

  return (
    <div className="w-full glass rounded-xl p-6 md:p-8 border border-slate-700/50 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 opacity-50"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-white/5 mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="text-cyan-400" size={24} /> 
            Monitoramento de Cluster (Real-Time)
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Simulação de telemetria baseada em Prometheus / Grafana para 3 instâncias Kubernetes ativas.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-medium px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
             <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`}></span>
             {isSimulating ? "LIVE" : "PAUSED"}
          </div>
          <button 
             onClick={() => setIsSimulating(!isSimulating)}
             className="text-xs font-semibold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded border border-cyan-500/30 text-cyan-400 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.1)]"
          >
             {isSimulating ? "Pause" : "Resume"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CPU Panel */}
        <div className="bg-slate-900/50 border border-white/5 rounded-lg p-4 flex flex-col h-48 transition-colors hover:border-cyan-500/30">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-slate-300 font-medium whitespace-nowrap">
              <Cpu size={16} className="text-cyan-400" /> CPU Usage (Avg)
            </div>
            <span className={`font-mono font-bold ${currentCpu > 80 ? 'text-rose-400' : currentCpu > 60 ? 'text-yellow-400' : 'text-cyan-400'}`}>
              {currentCpu}%
            </span>
          </div>
          <AreaChart data={cpuData} color={getCpuColor()} max={100} />
        </div>

        {/* Memory Panel */}
        <div className="bg-slate-900/50 border border-white/5 rounded-lg p-4 flex flex-col h-48 transition-colors hover:border-purple-500/30">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-slate-300 font-medium whitespace-nowrap">
              <Database size={16} className="text-purple-400" /> Mem Allocation
            </div>
            <span className="font-mono font-bold text-purple-400">
              {currentMem}%
            </span>
          </div>
          <AreaChart data={memData} color="purple" max={100} />
        </div>

        {/* Network Panel */}
        <div className="bg-slate-900/50 border border-white/5 rounded-lg p-4 flex flex-col h-48 transition-colors hover:border-emerald-500/30">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-slate-300 font-medium whitespace-nowrap">
              <Server size={16} className="text-emerald-400" /> Requests / Sec
            </div>
            <span className="font-mono font-bold text-emerald-400">
              {currentReq}
            </span>
          </div>
          <AreaChart data={reqData} color="emerald" max={400} />
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-slate-500 border-t border-white/5 pt-4">
        <span className="flex items-center gap-1 text-slate-400"><Box size={14}/> Nodes: 3/3 Online</span>
        <span className="flex items-center gap-1 text-slate-400"><Activity size={14}/> Uptime: 99.98%</span>
        <span className="text-emerald-500 font-semibold flex items-center gap-1">
          ✓ Health Check: Ok (18ms)
        </span>
      </div>
    </div>
  );
}
