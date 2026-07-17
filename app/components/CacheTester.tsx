"use client";

import React, { useState, useEffect } from "react";
import { Database, Zap, RefreshCw, Server, AlertCircle } from "lucide-react";

interface FetchResult {
  latency: number;
  type: "MISS" | "HIT" | null;
  data: string | null;
}

export function CacheTester() {
  const [loading, setLoading] = useState(false);
  const [cached, setCached] = useState(false);
  const [result, setResult] = useState<FetchResult>({ latency: 0, type: null, data: null });

  const fetchData = async () => {
    setLoading(true);
    setResult({ latency: 0, type: null, data: null });
    
    // Simulate API Call
    if (!cached) {
      // Simulate slow DB query (Cache MISS)
      const latency = Math.floor(Math.random() * 300) + 600; // 600ms - 900ms
      await new Promise(r => setTimeout(r, latency));
      
      setResult({
        latency,
        type: "MISS",
        data: "Dados pesados oriundos do PostgreSQL (1.2MB carregado)."
      });
      setCached(true);
    } else {
      // Simulate Redis Cache (Cache HIT)
      const latency = Math.floor(Math.random() * 10) + 5; // 5ms - 15ms
      await new Promise(r => setTimeout(r, latency));
      
      setResult({
        latency,
        type: "HIT",
        data: "Dados estruturados oriundos do Redis Cache (1.2MB entregue)."
      });
    }
    setLoading(false);
  };

  const purgeCache = () => {
    setCached(false);
    setResult({ latency: 0, type: null, data: null });
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: "680px",
      margin: "0 auto",
      background: "#111111",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px",
      padding: "32px",
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px", paddingBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Server size={18} style={{ color: "#E8FF47" }} />
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.02em" }}>Demonstração: Redis Caching</h3>
      </div>

      <p style={{ color: "#8A8A8A", fontSize: "14px", marginBottom: "24px", lineHeight: 1.7, marginTop: "20px" }}>
        Simule uma requisição pesada ao servidor. A primeira baterá no PostgreSQL. As subsequentes retornam via Redis Cache.
      </p>

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
        <button
          onClick={fetchData}
          disabled={loading}
          style={{
            flex: 1,
            minWidth: "180px",
            background: "#E8FF47",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            padding: "12px 20px",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "14px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.5 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "opacity 150ms ease",
          }}
        >
          {loading ? <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Zap size={16} />}
          {loading ? "Buscando..." : "Realizar Requisição GET"}
        </button>

        <button
          onClick={purgeCache}
          disabled={loading || (!cached && result.type === null)}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            border: "1px solid rgba(255,71,71,0.3)",
            color: "#FF4747",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "14px",
            cursor: (loading || (!cached && result.type === null)) ? "not-allowed" : "pointer",
            opacity: (loading || (!cached && result.type === null)) ? 0.3 : 1,
            transition: "background 150ms ease",
          }}
          onMouseEnter={(e) => { if (!loading && (cached || result.type !== null)) e.currentTarget.style.background = "rgba(255,71,71,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          Purgar Cache
        </button>
      </div>

      {/* Results */}
      <div style={{
        background: "#080808",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "8px",
        padding: "20px",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        {!result.type && !loading && (
          <div style={{ color: "#555", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
            <Database size={14} /> Aguardando requisição...
          </div>
        )}

        {loading && (
          <div style={{ color: "#8A8A8A", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
            Estabelecendo conexão TCP...
          </div>
        )}

        {result.type && !loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1A1A1A", padding: "12px 16px", borderRadius: "6px" }}>
              <span style={{ fontSize: "13px", color: "#8A8A8A", fontFamily: "var(--font-mono)" }}>Status:</span>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "12px",
                padding: "4px 10px",
                borderRadius: "4px",
                background: result.type === "HIT" ? "rgba(74,222,128,0.1)" : "rgba(251,146,60,0.1)",
                color: result.type === "HIT" ? "#4ADE80" : "#FB923C",
              }}>
                Cache {result.type}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1A1A1A", padding: "12px 16px", borderRadius: "6px" }}>
              <span style={{ fontSize: "13px", color: "#8A8A8A", fontFamily: "var(--font-mono)" }}>Latência:</span>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "18px",
                color: result.type === "HIT" ? "#4ADE80" : "#FB923C",
              }}>
                {result.latency} ms
              </span>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#555", background: "#0A0A0A", padding: "12px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)" }}>
              Payload: <span style={{ color: "#8A8A8A" }}>{result.data}</span>
            </div>

            {result.type === "MISS" && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "#E8FF47" }}>
                <AlertCircle size={12} /> Salvo em cache. Faça a requisição novamente!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

