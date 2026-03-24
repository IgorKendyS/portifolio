"use client";

import React, { useState } from "react";
import { Send, CheckCircle, XCircle, Code, Clock } from "lucide-react";

interface Endpoint {
  method: "GET" | "POST" | "DELETE";
  path: string;
}

const predefinedEndpoints: Endpoint[] = [
  { method: "GET", path: "/api/v1/status" },
  { method: "POST", path: "/api/v1/auth/login" },
  { method: "GET", path: "/api/v1/users" },
  { method: "DELETE", path: "/api/v1/users/admin" }
];

export function ApiPlayground() {
  const [method, setMethod] = useState<"GET"| "POST" | "DELETE">("GET");
  const [path, setPath] = useState("/api/v1/status");
  const [body, setBody] = useState('{\n  "email": "visitor@test.com",\n  "password": "123"\n}');
  
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [latency, setLatency] = useState(0);

  const handleSend = () => {
    setIsLoading(true);
    setResponse(null);
    setStatus(null);
    setLatency(0);

    const matchEndpoint = predefinedEndpoints.find(e => e.method === method && e.path === path);
    // Simulate latency
    const simulatedLatency = Math.floor(Math.random() * 200) + 50; 

    setTimeout(() => {
      setLatency(simulatedLatency);
      setIsLoading(false);

      if (!matchEndpoint) {
        setStatus(404);
        setResponse({ error: "Endpoint not found", message: "Verifique a rota e tente novamente." });
        return;
      }

      if (method === "GET" && path === "/api/v1/status") {
        setStatus(200);
        setResponse({ 
          status: "healthy", 
          uptime: "14d 6h 32m", 
          version: "v2.0.4",
          database: "connected",
          active_connections: Math.floor(Math.random() * 1000)
        });
      }
      else if (method === "GET" && path === "/api/v1/users") {
        setStatus(200);
        setResponse([
          { id: "usr_1001", name: "Igor Kendy", role: "admin", status: "active" },
          { id: "usr_1002", name: "Jane Doe", role: "developer", status: "active" }
        ]);
      }
      else if (method === "POST" && path === "/api/v1/auth/login") {
        try {
          const parsed = JSON.parse(body);
          if (parsed.email && parsed.password) {
            setStatus(200);
            setResponse({
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              user: { email: parsed.email },
              expires_in: 3600
            });
          } else {
            setStatus(400);
            setResponse({ error: "Bad Request", message: "Credenciais inválidas. Informe email e password." });
          }
        } catch (err) {
          setStatus(400);
          setResponse({ error: "Bad Request", message: "JSON mal formatado." });
        }
      }
      else if (method === "DELETE" && path === "/api/v1/users/admin") {
        setStatus(403);
        setResponse({ error: "Forbidden", message: "Você não tem permissão para deletar este usuário." });
      }
    }, simulatedLatency);
  };

  const getMethodColor = (m: string) => {
    if (m === "GET") return "text-emerald-400 bg-emerald-400/10 border-emerald-500/30";
    if (m === "POST") return "text-blue-400 bg-blue-400/10 border-blue-500/30";
    if (m === "DELETE") return "text-rose-400 bg-rose-400/10 border-rose-500/30";
    return "text-slate-400 bg-slate-800";
  };

  const getStatusColor = (code: number) => {
    if (code >= 200 && code < 300) return "text-emerald-400";
    if (code >= 400 && code < 500) return "text-yellow-400";
    if (code >= 500) return "text-rose-400";
    return "text-slate-400";
  };

  return (
    <div className="w-full glass rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl flex flex-col group">
      {/* HEADER */}
      <div className="bg-slate-900/80 px-4 md:px-6 py-4 border-b border-white/5 flex items-center gap-3">
        <Code className="text-cyan-400" size={24} />
        <div>
           <h3 className="text-lg font-bold text-white leading-tight">Postman / Swagger Sim</h3>
           <span className="text-xs text-slate-500 font-mono">Rest API Playground</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white/5 h-auto lg:h-[450px]">
        {/* REQUEST PANEL */}
        <div className="w-full lg:w-1/2 p-4 md:p-6 flex flex-col gap-4 bg-slate-900/40">
           <div className="flex flex-wrap gap-2 mb-2">
             <span className="text-xs text-slate-500 font-bold uppercase tracking-wider w-full">Fast Select</span>
             {predefinedEndpoints.map((ep, i) => (
               <button 
                 key={i} 
                 onClick={() => { setMethod(ep.method); setPath(ep.path); }}
                 className="text-[10px] sm:text-xs font-mono px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
               >
                 <span className={ep.method === 'GET' ? 'text-emerald-400' : ep.method === 'POST' ? 'text-blue-400' : 'text-rose-400'}>{ep.method}</span> {ep.path}
               </button>
             ))}
           </div>

           <div className="flex h-10 shadow-lg">
             <select 
               value={method} 
               onChange={(e) => setMethod(e.target.value as any)}
               className={`h-full px-2 sm:px-3 rounded-l-lg outline-none font-bold text-xs sm:text-sm tracking-wide border-y border-l cursor-pointer appearance-none ${getMethodColor(method)}`}
             >
               <option value="GET">GET</option>
               <option value="POST">POST</option>
               <option value="DELETE">DELETE</option>
             </select>
             <input 
               type="text" 
               value={path}
               onChange={(e) => setPath(e.target.value)}
               className="h-full flex-1 w-[50px] bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px] sm:text-sm px-2 sm:px-4 outline-none focus:border-cyan-500 transition-colors"
               placeholder="https://api..."
               spellCheck="false"
             />
             <button 
               onClick={handleSend}
               disabled={isLoading}
               className="h-full px-3 sm:px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-r-lg border-y border-r border-cyan-600 flex items-center gap-1 sm:gap-2 transition-all disabled:opacity-50 text-xs sm:text-sm shadow-[0_0_15px_rgba(8,145,178,0.5)]"
             >
               {isLoading ? "Wait..." : "Send"}
               {!isLoading && <Send size={14} />}
             </button>
           </div>

           {/* BODY TEXTAREA */}
           <div className="flex-1 flex flex-col mt-2 min-h-[150px] lg:min-h-0">
             <span className="text-xs text-slate-500 font-bold mb-2">JSON BODY {method === "GET" && "(Ignorado)"}</span>
             <textarea 
               value={body}
               onChange={(e) => setBody(e.target.value)}
               disabled={method === "GET" || method === "DELETE"}
               className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-indigo-300 resize-none outline-none focus:border-slate-600 disabled:opacity-50 transition-colors custom-scrollbar"
               spellCheck="false"
             />
           </div>
        </div>

        {/* RESPONSE PANEL */}
        <div className="w-full lg:w-1/2 p-4 md:p-6 flex flex-col bg-slate-950 min-h-[250px] lg:min-h-0">
           <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
             <span className="text-xs text-slate-500 font-bold">RESPONSE</span>
             {status && (
               <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono">
                 <span className={`font-bold flex items-center gap-1 ${getStatusColor(status)}`}>
                   {status >= 200 && status < 300 ? <CheckCircle size={14} /> : <XCircle size={14} />}
                   {status} {status === 200 ? "OK" : status === 404 ? "Not Found" : status === 403 ? "Forbidden" : "Bad Request"}
                 </span>
                 <span className="text-slate-400 flex items-center gap-1"><Clock size={12} /> {latency}ms</span>
               </div>
             )}
           </div>

           <div className="flex-1 rounded-lg border border-slate-800 bg-[#0c1015] overflow-auto custom-scrollbar relative">
             {isLoading ? (
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
               </div>
             ) : response ? (
               <pre className="p-4 text-[11px] sm:text-xs font-mono text-emerald-300">
                 {JSON.stringify(response, null, 2)}
               </pre>
             ) : (
               <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-[10px] sm:text-sm italic font-mono px-4 text-center">
                 Clique em 'Send' para disparar uma requisição mockada
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
