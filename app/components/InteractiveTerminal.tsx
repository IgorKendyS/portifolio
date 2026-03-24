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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
              LinkedIn: <a href="https://linkedin.com/in/IgorKendyS" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">/IgorKendyS</a>
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
    <div className="w-full rounded-xl overflow-hidden glass border-slate-700/50 shadow-2xl flex flex-col font-mono text-sm group transition-all duration-500 hover:shadow-cyan-500/10 hover:border-cyan-500/20">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-sans">
          <TerminalIcon size={14} />
          <span>guest@ikendy-portfolio:~</span>
        </div>
        <div className="flex gap-2 text-slate-500 hidden sm:flex">
          <Minus size={14} className="hover:text-white cursor-pointer transition-colors" />
          <Maximize2 size={14} className="hover:text-white cursor-pointer transition-colors" />
          <X size={14} className="hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        className="p-4 sm:p-6 bg-slate-900/90 h-[350px] sm:h-[400px] overflow-y-auto"
        onClick={() => document.getElementById("terminal-input")?.focus()}
      >
        <div className="text-cyan-400 mb-6 font-semibold">
          Ikendy OS (v2.0.4) - Sistema Arquitetural de Apresentação.<br />
          Digite <span className="text-white bg-white/10 px-1 rounded">help</span> para acessar os recursos da infraestrutura.
        </div>
        
        {history.map((item, i) => (
          <div key={i} className="mb-4">
            <div className="flex gap-2 text-slate-300">
              <span className="text-emerald-400 shrink-0 select-none">guest@{item.cwdState} $</span>
              <span className="text-white">{item.cmd}</span>
            </div>
            {item.output && <div className="mt-1 ml-0 sm:ml-4">{item.output}</div>}
          </div>
        ))}

        <div className="flex gap-2 text-slate-300 items-center mt-2">
          <span className="text-emerald-400 shrink-0 select-none">guest@{cwd} $</span>
          <input 
            id="terminal-input"
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent outline-none border-none text-white w-full shadow-none focus:ring-0"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}
