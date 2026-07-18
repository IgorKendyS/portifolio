"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Maximize2, Minus, X } from "lucide-react";

interface CommandHistory {
  cmd: string;
  output: React.ReactNode;
  cwdState: string;
}

export function InteractiveTerminal() {
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmdString = input.trim();
      const parts = cmdString.split(" ");
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      
      let output: React.ReactNode = "";
      let newCwd = cwd;

      if (cmdString === "") {
        setHistory((prev) => [...prev, { cmd: "", output: "", cwdState: cwd }]);
        setInput("");
        return;
      }

      switch (cmd) {
        case "help":
          output = (
            <div className="text-slate-300 leading-relaxed">
              Comandos disponíveis:<br />
              <span className="text-cyan-400 font-bold">ls</span> - Lista o diretório atual<br />
              <span className="text-cyan-400 font-bold">cd &lt;dir&gt;</span> - Muda de diretório<br />
              <span className="text-cyan-400 font-bold">cat &lt;file&gt;</span> - Exibe o conteúdo de um arquivo<br />
              <span className="text-cyan-400 font-bold">whoami</span> - Imprime informações da sessão atual<br />
              <span className="text-cyan-400 font-bold">kubectl get pods</span> - Lista o status da infraestrutura simulada<br />
              <span className="text-cyan-400 font-bold">clear</span> - Limpa o output do terminal<br />
              <span className="text-cyan-400 font-bold">contact</span> - Exibe as informações de contato
            </div>
          );
          break;
        case "ls":
          if (cwd === "~") {
            output = (
              <div className="flex gap-4 mt-2">
                <span className="text-blue-400 font-bold">projects/</span>
                <span className="text-blue-400 font-bold">.ssh/</span>
                <span className="text-white">about.txt</span>
                <span className="text-white">skills.json</span>
              </div>
            );
          } else if (cwd === "~/projects") {
             output = (
               <div className="flex gap-4 mt-2 flex-wrap">
                 <span className="text-white">k8s-cluster.yml</span>
                 <span className="text-white">api-gateway.ts</span>
                 <span className="text-white">python-bot.py</span>
               </div>
             );
          }
          break;
        case "cd":
          const target = args[0] || "~";
          if (target === "~" || target === "") {
            newCwd = "~";
          } else if (target === "..") {
            newCwd = "~";
          } else if (target === "projects" && cwd === "~" || target === "~/projects") {
            newCwd = "~/projects";
          } else if (target === ".ssh" && cwd === "~") {
            output = <span className="text-red-400">bash: cd: .ssh: Permission denied</span>;
          } else {
             output = <span className="text-red-400">bash: cd: {target}: No such file or directory</span>;
          }
          break;
        case "cat":
          const file = args[0];
          if (!file) {
            output = <span className="text-slate-300">Usage: cat &lt;file&gt;</span>;
          } else if (cwd === "~" && file === "about.txt") {
            output = <span className="text-slate-300">Desenvolvedor Full-Stack focado em tecnologias Cloud, Automação (Node.js/Python) e arquiteturas escaláveis.</span>;
          } else if (cwd === "~" && file === "skills.json") {
             output = (
               <pre className="text-indigo-300 text-sm mt-2 overflow-x-auto">
{`{
  "frontend": ["React", "Next.js", "Vue.js", "Tailwind"],
  "backend": ["Node.js", "Python", "PHP", "C"],
  "cloud_devops": ["AWS", "GCP", "Kubernetes", "Docker", "CI/CD"],
  "databases": ["PostgreSQL", "MySQL", "Firebase"],
  "automation": ["n8n", "Python Bots"]
}`}
               </pre>
             );
          } else if (cwd === "~/projects" && file === "k8s-cluster.yml") {
            output = (
              <pre className="text-slate-300 text-sm mt-2 overflow-x-auto">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ikendy-portfolio
spec:
  replicas: 3
  selector:
    matchLabels:
      app: portfolio
  template:
    metadata:
      labels:
        app: portfolio
    spec:
      containers:
      - name: nextjs
        image: ikendy/portfolio:2.0
        ports:
        - containerPort: 3000`}
              </pre>
            );
          } else if (cwd === "~/projects" && file === "api-gateway.ts") {
            output = (
              <pre className="text-cyan-300 text-sm mt-2 overflow-x-auto">
{`import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use('/auth', createProxyMiddleware({ target: 'http://auth-service', changeOrigin: true }));
app.use('/api', createProxyMiddleware({ target: 'http://core-api', changeOrigin: true }));

app.listen(8080, () => console.log('API Gateway running on port 8080'));`}
              </pre>
            );
          } else if (cwd === "~/projects" && file === "python-bot.py") {
             output = (
               <pre className="text-emerald-300 text-sm mt-2 overflow-x-auto">
{`import schedule
import time

def auto_scale_task():
    print("Checking CPU usage... Scaling nodes if required.")

schedule.every(5).minutes.do(auto_scale_task)

while True:
    schedule.run_pending()
    time.sleep(1)`}
               </pre>
             );
          } else {
            output = <span className="text-red-400">cat: {file}: No such file or directory</span>;
          }
          break;
        case "whoami":
          output = (
            <span className="text-slate-300">
              visitor_{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)} - Acesso Autorizado
            </span>
          );
          break;
        case "kubectl":
          if (args[0] === "get" && args[1] === "pods") {
             output = (
              <div className="text-slate-300 text-xs sm:text-sm font-mono whitespace-pre mt-2 overflow-x-auto">
                NAME                                READY   STATUS    RESTARTS   AGE<br />
                ikendy-portfolio-front-7b89f        1/1     Running   0          12d<br />
                ikendy-api-gateway-c43df2           2/2     Running   0          5d<br />
                ikendy-redis-cache-0                1/1     Running   0          18d<br />
                ikendy-auth-service-5m92p           1/1     Running   2          30d
              </div>
            );
          } else {
            output = <span className="text-red-400">bash: kubectl: invalid command or arguments. Try 'kubectl get pods'</span>;
          }
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "contact":
          output = (
            <div className="text-slate-300 mt-2">
              E-mail: <a href="mailto:igkendy.s@gmail.com" className="text-cyan-400 hover:underline">igkendy.s@gmail.com</a><br/>
              LinkedIn: <a href="https://www.linkedin.com/in/igorsakaguchi/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">/in/igorsakaguchi</a>
            </div>
          );
          break;
        default:
          output = <span className="text-red-400">bash: {cmd}: command not found. Type 'help'.</span>;
      }

      setHistory((prev) => [...prev, { cmd: input, output, cwdState: cwd }]);
      setCwd(newCwd);
      setInput("");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-mono)",
        fontSize: "13px",
        background: "#111111",
        transition: "border-color 200ms ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
    >
      {/* Terminal Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        background: "#1A1A1A",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28CA41" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#555" }}>
          <TerminalIcon size={12} />
          <span style={{ fontSize: "11px", letterSpacing: "0.04em" }}>guest@ikendy-portfolio:~</span>
        </div>
        <div style={{ display: "flex", gap: "10px", color: "#444" }}>
          <Minus size={13} style={{ cursor: "pointer" }} />
          <Maximize2 size={13} style={{ cursor: "pointer" }} />
          <X size={13} style={{ cursor: "pointer" }} />
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={containerRef}
        style={{
          padding: "20px 24px",
          background: "#080808",
          height: "380px",
          overflowY: "auto",
          cursor: "text",
        }}
        onClick={() => document.getElementById("terminal-input")?.focus()}
      >
        <div style={{ color: "#4ADE80", marginBottom: "20px", lineHeight: 1.7 }}>
          Ikendy OS (v2.0.4) — Sistema Arquitetural de Apresentação.<br />
          Digite{" "}
          <span style={{ color: "#E8FF47", background: "rgba(232,255,71,0.08)", padding: "1px 6px", borderRadius: "3px" }}>help</span>
          {" "}para acessar os recursos da infraestrutura.
        </div>

        {history.map((item, i) => (
          <div key={i} style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", gap: "8px", color: "#F2F2F2" }}>
              <span style={{ color: "#E8FF47", flexShrink: 0, userSelect: "none" }}>guest@{item.cwdState} $</span>
              <span style={{ color: "#F2F2F2" }}>{item.cmd}</span>
            </div>
            {item.output && (
              <div style={{ marginTop: "6px", marginLeft: "4px" }}>{item.output}</div>
            )}
          </div>
        ))}

        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "8px" }}>
          <span style={{ color: "#E8FF47", flexShrink: 0, userSelect: "none" }}>guest@{cwd} $</span>
          <input
            id="terminal-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#F2F2F2",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              caretColor: "#E8FF47",
            }}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}

