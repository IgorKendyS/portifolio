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
    <div className="w-full max-w-2xl mx-auto glass rounded-2xl p-6 relative overflow-hidden group border border-slate-700/50">
      {/* Glow background based on state */}
      <div className={`absolute top-0 right-0 p-32 rounded-full blur-3xl -mr-20 -mt-20 transition-all duration-700 ${result.type === 'HIT' ? 'bg-emerald-500/10' : result.type === 'MISS' ? 'bg-orange-500/10' : 'bg-cyan-500/5'}`}></div>
      
      <div className="relative z-10 flex flex-col pt-2">
        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
          <Server className="text-cyan-400" size={24} />
          <h3 className="text-xl font-bold text-white">Demonstração: Redis Caching</h3>
        </div>

        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Simule uma requisição pesada ao servidor. A primeira requisição baterá no Banco de Dados Relacional. As requisições subsequentes serão retornadas instantaneamente via memória RAM (Cache).
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button 
            onClick={fetchData}
            disabled={loading}
            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            {loading ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
            {loading ? "Buscando..." : "Realizar Requisição GET"}
          </button>
          
          <button 
            onClick={purgeCache}
            disabled={loading || (!cached && result.type === null)}
            className="px-6 py-3 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-all font-medium disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Purgar Cache
          </button>
        </div>

        {/* Results Box */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 min-h-[120px] shadow-inner flex flex-col justify-center">
          {!result.type && !loading && (
             <div className="text-slate-500 flex items-center justify-center gap-2">
               <Database size={16} /> Aguardando requisição do usuário...
             </div>
          )}
          
          {loading && (
             <div className="text-cyan-400 flex items-center justify-center gap-2 animate-pulse">
               Estabelecendo conexão TCP...
             </div>
          )}

          {result.type && !loading && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg">
                <span className="text-sm font-medium text-slate-300">Status Response:</span>
                <span className={`font-mono font-bold px-2 py-1 rounded ${result.type === 'HIT' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                  Cache {result.type}
                </span>
              </div>
              
              <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg">
                <span className="text-sm font-medium text-slate-300">Latência do Servidor:</span>
                <span className={`font-mono text-lg font-bold ${result.type === 'HIT' ? 'text-emerald-400' : 'text-orange-400'}`}>
                  {result.latency} ms
                </span>
              </div>

              <div className="text-xs text-slate-500 bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono">
                Payload:<br/><span className="text-slate-400">{result.data}</span>
              </div>

              {result.type === 'MISS' && (
                <div className="text-xs text-cyan-400 flex items-center gap-1 mt-2">
                   <AlertCircle size={12} /> A requisição foi salva em cache. Faça novamente!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
