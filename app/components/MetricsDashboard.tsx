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
    <div style={{
      width: "100%",
      background: "#111111",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px",
      padding: "32px",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Top accent bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #E8FF47, #4ADE80, #7B9FFF)" }} />

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "32px", gap: "16px" }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: "8px" }}>
            <Activity size={18} style={{ color: "#E8FF47" }} />
            Monitoramento de Cluster (Real-Time)
          </h3>
          <p style={{ color: "#8A8A8A", fontSize: "13px", marginTop: "4px" }}>
            Simulação baseada em Prometheus / Grafana para 3 instâncias Kubernetes.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            background: "#1A1A1A",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "100px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: isSimulating ? "#4ADE80" : "#FF4747",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: isSimulating ? "#4ADE80" : "#FF4747" }} />
            {isSimulating ? "LIVE" : "PAUSED"}
          </div>
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            style={{
              padding: "6px 14px",
              background: "#1A1A1A",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "#F2F2F2",
              cursor: "pointer",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#222")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1A1A")}
          >
            {isSimulating ? "Pause" : "Resume"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }} className="metrics-grid">
        {/* CPU Panel */}
        <div style={{ background: "#080808", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "16px", display: "flex", flexDirection: "column", height: "192px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#8A8A8A", fontSize: "13px" }}>
              <Cpu size={14} style={{ color: "#E8FF47" }} /> CPU Usage
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: currentCpu > 80 ? "#FF4747" : currentCpu > 60 ? "#E8FF47" : "#F2F2F2" }}>
              {currentCpu}%
            </span>
          </div>
          <AreaChart data={cpuData} color={getCpuColor()} max={100} />
        </div>

        {/* Memory Panel */}
        <div style={{ background: "#080808", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "16px", display: "flex", flexDirection: "column", height: "192px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#8A8A8A", fontSize: "13px" }}>
              <Database size={14} style={{ color: "#A78BFA" }} /> Mem Alloc
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "#A78BFA" }}>{currentMem}%</span>
          </div>
          <AreaChart data={memData} color="purple" max={100} />
        </div>

        {/* Network Panel */}
        <div style={{ background: "#080808", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "16px", display: "flex", flexDirection: "column", height: "192px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#8A8A8A", fontSize: "13px" }}>
              <Server size={14} style={{ color: "#4ADE80" }} /> Req / Sec
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "#4ADE80" }}>{currentReq}</span>
          </div>
          <AreaChart data={reqData} color="emerald" max={400} />
        </div>
      </div>

      <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "20px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "#555", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#8A8A8A" }}><Box size={12} /> Nodes: 3/3 Online</span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#8A8A8A" }}><Activity size={12} /> Uptime: 99.98%</span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#4ADE80" }}>&#x2713; Health Check: Ok (18ms)</span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .metrics-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

