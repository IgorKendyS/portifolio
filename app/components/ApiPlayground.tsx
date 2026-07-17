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
    <div style={{
      width: "100%",
      background: "#111111",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px",
      overflow: "hidden",
    }}>
      {/* HEADER */}
      <div style={{
        background: "#1A1A1A",
        padding: "16px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <Code size={18} style={{ color: "#E8FF47" }} />
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", letterSpacing: "-0.02em" }}>Postman / Swagger Sim</h3>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#555" }}>Rest API Playground</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }} className="api-layout">
        {/* REQUEST PANEL */}
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px", background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", width: "100%" }}>Fast Select</span>
            {predefinedEndpoints.map((ep, i) => (
              <button
                key={i}
                onClick={() => { setMethod(ep.method); setPath(ep.path); }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#8A8A8A",
                  cursor: "pointer",
                  transition: "background 150ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#222")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1A1A")}
              >
                <span style={{ color: ep.method === 'GET' ? '#4ADE80' : ep.method === 'POST' ? '#7B9FFF' : '#FF4747' }}>{ep.method}</span> {ep.path}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", height: "40px" }}>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as 'GET' | 'POST' | 'DELETE')}
              style={{
                height: "100%",
                padding: "0 12px",
                borderRadius: "6px 0 0 6px",
                background: "#1A1A1A",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRight: "none",
                color: method === 'GET' ? '#4ADE80' : method === 'POST' ? '#7B9FFF' : '#FF4747',
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              style={{
                flex: 1,
                height: "100%",
                background: "#0A0A0A",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRight: "none",
                color: "#F2F2F2",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                padding: "0 12px",
                outline: "none",
              }}
              placeholder="/api/v1/..."
              spellCheck={false}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              style={{
                padding: "0 20px",
                background: isLoading ? "#333" : "#E8FF47",
                color: isLoading ? "#555" : "#000",
                border: "none",
                borderRadius: "0 6px 6px 0",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "13px",
                cursor: isLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 150ms ease",
                flexShrink: 0,
              }}
            >
              {isLoading ? "Wait..." : "Send"}
              {!isLoading && <Send size={13} />}
            </button>
          </div>

          {/* BODY */}
          <div style={{ display: "flex", flexDirection: "column", minHeight: "120px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
              JSON BODY {(method === "GET" || method === "DELETE") && "(Ignorado)"}
            </span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={method === "GET" || method === "DELETE"}
              style={{
                flex: 1,
                width: "100%",
                background: "#0A0A0A",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "6px",
                padding: "12px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "#7B9FFF",
                resize: "vertical",
                outline: "none",
                minHeight: "100px",
                opacity: (method === "GET" || method === "DELETE") ? 0.4 : 1,
              }}
              spellCheck={false}
            />
          </div>
        </div>

        {/* RESPONSE PANEL */}
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", background: "#080808", minHeight: "220px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" }}>Response</span>
            {status && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
                <span style={{ fontWeight: 700, color: status >= 200 && status < 300 ? '#4ADE80' : status >= 400 && status < 500 ? '#E8FF47' : '#FF4747', display: "flex", alignItems: "center", gap: "4px" }}>
                  {status >= 200 && status < 300 ? <CheckCircle size={13} /> : <XCircle size={13} />}
                  {status} {status === 200 ? "OK" : status === 404 ? "Not Found" : status === 403 ? "Forbidden" : "Bad Request"}
                </span>
                <span style={{ color: "#555", display: "flex", alignItems: "center", gap: "4px" }}><Clock size={12} /> {latency}ms</span>
              </div>
            )}
          </div>

          <div style={{ flex: 1, borderRadius: "6px", border: "1px solid rgba(255,255,255,0.06)", background: "#060606", overflow: "auto", position: "relative", minHeight: "140px" }}>
            {isLoading ? (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid #E8FF47", borderTopColor: "transparent", animation: "spin 0.7s linear infinite" }} />
              </div>
            ) : response ? (
              <pre style={{ padding: "16px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "#4ADE80", lineHeight: 1.6 }}>
                {JSON.stringify(response, null, 2)}
              </pre>
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#333", fontFamily: "var(--font-mono)", fontSize: "13px", textAlign: "center", padding: "16px" }}>
                Clique em 'Send' para disparar uma requisição mockada
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (min-width: 1024px) {
          .api-layout { flex-direction: row !important; }
          .api-layout > div { flex: 1; border-bottom: none !important; border-right: 1px solid rgba(255,255,255,0.06) !important; }
          .api-layout > div:last-child { border-right: none !important; }
        }
      `}</style>
    </div>
  );
}

