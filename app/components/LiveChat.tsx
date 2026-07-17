"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Wifi,
  WifiOff,
  Users,
  Cookie,
  Zap,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────── */
interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userColor: string;
  text: string;
  timestamp: number;
  type: "message" | "join" | "leave";
}

interface UserInfo {
  id: string;
  name: string;
  color: string;
}

/* ─── Constants ──────────────────────────────────────────────── */
const COOKIE_KEY = "ik_chat_user";
const COOKIE_DAYS = 7;

const USER_COLORS = [
  "#E8FF47", "#4ADE80", "#7B9FFF", "#FB923C",
  "#F472B6", "#34D399", "#A78BFA", "#60A5FA",
];

const RANDOM_ADJECTIVES = [
  "dev", "ninja", "hacker", "coder", "builder",
  "architect", "engineer", "wizard", "geek", "nerd",
];

const RANDOM_NOUNS = [
  "panda", "falcon", "tiger", "wolf", "fox",
  "eagle", "shark", "bear", "lynx", "hawk",
];

/* ─── Helpers ────────────────────────────────────────────────── */
function generateRandomName(): string {
  const adj = RANDOM_ADJECTIVES[Math.floor(Math.random() * RANDOM_ADJECTIVES.length)];
  const noun = RANDOM_NOUNS[Math.floor(Math.random() * RANDOM_NOUNS.length)];
  const num = Math.floor(Math.random() * 99) + 1;
  return `${adj}_${noun}${num}`;
}

function generateUserId(): string {
  return crypto.randomUUID().slice(0, 8);
}

function pickColor(): string {
  return USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function getUserFromCookie(): UserInfo | null {
  const raw = getCookie(COOKIE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserInfo;
  } catch {
    return null;
  }
}

function saveUserToCookie(user: UserInfo) {
  setCookie(COOKIE_KEY, JSON.stringify(user), COOKIE_DAYS);
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ─── Status indicator ───────────────────────────────────────── */
type WsStatus = "connecting" | "open" | "closed" | "error";

const STATUS_MAP: Record<WsStatus, { label: string; color: string; dot: string }> = {
  connecting: { label: "CONNECTING", color: "#E8FF47", dot: "#E8FF47" },
  open:       { label: "OPEN",       color: "#4ADE80", dot: "#4ADE80" },
  closed:     { label: "CLOSED",     color: "#FF4747", dot: "#FF4747" },
  error:      { label: "ERROR",      color: "#FF4747", dot: "#FF4747" },
};

/* ─── Main component ─────────────────────────────────────────── */
export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [pendingName, setPendingName] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [wsStatus, setWsStatus] = useState<WsStatus>("closed");
  const [latency, setLatency] = useState<number | null>(null);
  const [onlineCount, setOnlineCount] = useState(0);
  const [unread, setUnread] = useState(0);
  const [cookieVisible, setCookieVisible] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pingTimestampRef = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── Scroll to bottom ── */
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  /* ── Unread counter ── */
  useEffect(() => {
    if (isOpen) setUnread(0);
  }, [isOpen]);

  /* ── Connect WebSocket ── */
  const connect = useCallback((userInfo: UserInfo) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const wsUrl = `ws://${window.location.host}/ws/chat`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    setWsStatus("connecting");

    ws.onopen = () => {
      setWsStatus("open");
      ws.send(JSON.stringify({
        type: "identify",
        userId: userInfo.id,
        userName: userInfo.name,
        userColor: userInfo.color,
      }));

      // Start ping interval
      pingIntervalRef.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          pingTimestampRef.current = Date.now();
          ws.send(JSON.stringify({ type: "ping", timestamp: pingTimestampRef.current }));
        }
      }, 5000);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "pong") {
          setLatency(Date.now() - data.timestamp);
          return;
        }

        if (data.type === "history") {
          setMessages(data.messages || []);
          setOnlineCount(data.onlineCount || 0);
          return;
        }

        if (data.type === "message") {
          setMessages((prev) => [...prev, data.message]);
          setOnlineCount(data.onlineCount || 0);
          setUnread((prev) => (isOpen ? 0 : prev + 1));
        }
      } catch {
        // ignore
      }
    };

    ws.onclose = () => {
      setWsStatus("closed");
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      // Attempt reconnect after 3s
      setTimeout(() => {
        if (userInfo) connect(userInfo);
      }, 3000);
    };

    ws.onerror = () => {
      setWsStatus("error");
    };
  }, [isOpen]);

  /* ── Disconnect on unmount ── */
  useEffect(() => {
    return () => {
      wsRef.current?.close();
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
    };
  }, []);

  /* ── Handle chat open ── */
  const handleOpen = () => {
    setIsOpen(true);
    setUnread(0);

    // Load or create user
    const existing = getUserFromCookie();
    if (existing) {
      setUser(existing);
      connect(existing);
    } else {
      setPendingName(generateRandomName());
      setShowNameModal(true);
    }
  };

  /* ── Confirm name ── */
  const confirmName = () => {
    const name = pendingName.trim() || generateRandomName();
    const newUser: UserInfo = {
      id: generateUserId(),
      name,
      color: pickColor(),
    };
    saveUserToCookie(newUser);
    setUser(newUser);
    setShowNameModal(false);
    connect(newUser);
  };

  /* ── Send message ── */
  const sendMessage = () => {
    if (!input.trim() || wsRef.current?.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ type: "message", text: input.trim() }));
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ─── Render ──────────────────────────────────────────────── */
  return (
    <div style={{
      position: "fixed",
      bottom: "24px",
      left: "24px",
      zIndex: 50,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      pointerEvents: "none",
    }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            style={{
              width: "340px",
              marginBottom: "12px",
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              pointerEvents: "auto",
              boxShadow: "0 32px 64px rgba(0,0,0,0.7)",
              maxHeight: "520px",
            }}
          >
            {/* ─── Header ─── */}
            <div style={{
              background: "#1A1A1A",
              padding: "14px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <MessageSquare size={14} style={{ color: "#E8FF47" }} />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "14px" }}>
                    Live Chat
                  </span>
                  {unread === 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        color: STATUS_MAP[wsStatus].color,
                        letterSpacing: "0.05em",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}>
                        <span style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: STATUS_MAP[wsStatus].dot,
                          animation: wsStatus === "open" ? "pulse 2s infinite" : "none",
                        }} />
                        WS:{STATUS_MAP[wsStatus].label}
                      </span>
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#555", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Users size={11} /> {onlineCount}
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{ color: "#555", background: "none", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F2F2F2")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Tech info bar */}
              <div style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  padding: "2px 7px",
                  borderRadius: "4px",
                  background: "rgba(232,255,71,0.08)",
                  color: "#E8FF47",
                  border: "1px solid rgba(232,255,71,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}>
                  <Zap size={9} /> WebSocket
                </span>
                <span
                  onClick={() => setCookieVisible(!cookieVisible)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    padding: "2px 7px",
                    borderRadius: "4px",
                    background: "rgba(74,222,128,0.08)",
                    color: "#4ADE80",
                    border: "1px solid rgba(74,222,128,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    cursor: "pointer",
                  }}
                >
                  <Cookie size={9} /> {COOKIE_KEY}
                </span>
                {latency !== null && (
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    padding: "2px 7px",
                    borderRadius: "4px",
                    background: "rgba(123,159,255,0.08)",
                    color: "#7B9FFF",
                    border: "1px solid rgba(123,159,255,0.2)",
                  }}>
                    {latency}ms
                  </span>
                )}
              </div>

              {/* Cookie detail panel */}
              <AnimatePresence>
                {cookieVisible && user && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "#555",
                      background: "#080808",
                      borderRadius: "6px",
                      padding: "8px 10px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      lineHeight: 1.8,
                    }}
                  >
                    <span style={{ color: "#4ADE80" }}>// cookie: {COOKIE_KEY}</span><br />
                    <span style={{ color: "#8A8A8A" }}>id: </span><span style={{ color: "#7B9FFF" }}>&quot;{user.id}&quot;</span><br />
                    <span style={{ color: "#8A8A8A" }}>name: </span><span style={{ color: "#7B9FFF" }}>&quot;{user.name}&quot;</span><br />
                    <span style={{ color: "#8A8A8A" }}>color: </span><span style={{ color: user.color }}>&quot;{user.color}&quot;</span><br />
                    <span style={{ color: "#8A8A8A" }}>expires: </span><span style={{ color: "#555" }}>7 days</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ─── Messages ─── */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px",
              background: "#080808",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              minHeight: "200px",
              maxHeight: "280px",
            }}>
              {messages.length === 0 && wsStatus === "open" && (
                <div style={{ textAlign: "center", color: "#444", fontFamily: "var(--font-mono)", fontSize: "12px", marginTop: "40px" }}>
                  Ninguém ainda — diga olá! 👋
                </div>
              )}
              {wsStatus === "connecting" && (
                <div style={{ textAlign: "center", color: "#555", fontFamily: "var(--font-mono)", fontSize: "12px", marginTop: "40px" }}>
                  Conectando via WebSocket...
                </div>
              )}
              {wsStatus === "error" && (
                <div style={{ textAlign: "center", color: "#FF4747", fontFamily: "var(--font-mono)", fontSize: "12px", marginTop: "40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <AlertCircle size={16} />
                  Não foi possível conectar. Reinicie com <code>npm run dev</code>
                </div>
              )}

              {messages.map((msg) => {
                const isOwn = msg.userId === user?.id;
                const isEvent = msg.type === "join" || msg.type === "leave";

                if (isEvent) {
                  return (
                    <div key={msg.id} style={{
                      textAlign: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "#333",
                      padding: "4px 0",
                    }}>
                      {msg.text}
                    </div>
                  );
                }

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: "flex",
                      flexDirection: isOwn ? "row-reverse" : "row",
                      alignItems: "flex-end",
                      gap: "6px",
                      marginBottom: "6px",
                    }}
                  >
                    {/* Avatar dot */}
                    <div style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: msg.userColor,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "#000",
                      fontFamily: "var(--font-mono)",
                    }}>
                      {msg.userName.slice(0, 2).toUpperCase()}
                    </div>

                    <div style={{ maxWidth: "220px" }}>
                      {!isOwn && (
                        <div style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "9px",
                          color: msg.userColor,
                          marginBottom: "2px",
                          paddingLeft: "2px",
                        }}>
                          {msg.userName}
                        </div>
                      )}
                      <div style={{
                        background: isOwn ? "#E8FF47" : "#1A1A1A",
                        color: isOwn ? "#000" : "#F2F2F2",
                        borderRadius: isOwn ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                        padding: "8px 12px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        lineHeight: 1.5,
                        wordBreak: "break-word",
                      }}>
                        {msg.text}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        color: "#333",
                        marginTop: "2px",
                        textAlign: isOwn ? "right" : "left",
                        paddingLeft: isOwn ? 0 : "2px",
                        paddingRight: isOwn ? "2px" : 0,
                      }}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={bottomRef} style={{ height: "4px" }} />
            </div>

            {/* ─── Input ─── */}
            <div style={{
              padding: "10px 12px",
              background: "#111111",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}>
              {user && (
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: user.color,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#000",
                  fontFamily: "var(--font-mono)",
                }}>
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={wsStatus === "open" ? "Enviar mensagem..." : "Conectando..."}
                disabled={wsStatus !== "open"}
                style={{
                  flex: 1,
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  color: "#F2F2F2",
                  outline: "none",
                  opacity: wsStatus !== "open" ? 0.5 : 1,
                }}
              />
              <button
                onClick={sendMessage}
                disabled={wsStatus !== "open" || !input.trim()}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  background: input.trim() && wsStatus === "open" ? "#E8FF47" : "#1A1A1A",
                  border: "none",
                  color: input.trim() && wsStatus === "open" ? "#000" : "#555",
                  cursor: input.trim() && wsStatus === "open" ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 150ms ease",
                }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Name Modal ─── */}
      <AnimatePresence>
        {showNameModal && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              width: "320px",
              marginBottom: "12px",
              background: "#111111",
              border: "1px solid rgba(232,255,71,0.2)",
              borderRadius: "16px",
              padding: "24px",
              pointerEvents: "auto",
              boxShadow: "0 32px 64px rgba(0,0,0,0.7), 0 0 32px rgba(232,255,71,0.05)",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <Cookie size={16} style={{ color: "#4ADE80" }} />
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px" }}>
                  Entrar no Chat
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#555", lineHeight: 1.7 }}>
                Seu nome será salvo em um <span style={{ color: "#4ADE80" }}>cookie</span> por {COOKIE_DAYS} dias.
                Pode editar abaixo ou usar o nome aleatório.
              </p>
            </div>

            <input
              value={pendingName}
              onChange={(e) => setPendingName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && confirmName()}
              autoFocus
              maxLength={24}
              style={{
                width: "100%",
                background: "#080808",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "10px 14px",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                color: "#E8FF47",
                outline: "none",
                marginBottom: "16px",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(232,255,71,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => {
                  setPendingName(generateRandomName());
                }}
                style={{
                  padding: "9px 14px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "#8A8A8A",
                  cursor: "pointer",
                  transition: "border-color 150ms ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              >
                ↺ Aleatório
              </button>
              <button
                onClick={confirmName}
                style={{
                  flex: 1,
                  padding: "9px 14px",
                  background: "#E8FF47",
                  border: "none",
                  borderRadius: "8px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#000",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                Entrar <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Fab Button ─── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        style={{
          pointerEvents: "auto",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isOpen ? "#1A1A1A" : "#E8FF47",
          color: isOpen ? "#8A8A8A" : "#000",
          border: isOpen ? "1px solid rgba(255,255,255,0.1)" : "none",
          cursor: "pointer",
          boxShadow: isOpen ? "none" : "0 0 24px rgba(232,255,71,0.35)",
          position: "relative",
        }}
      >
        {isOpen
          ? <X size={20} />
          : <MessageSquare size={20} />
        }
        {!isOpen && unread > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#FF4747",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 700,
              color: "#fff",
              border: "2px solid #080808",
            }}
          >
            {unread > 9 ? "9+" : unread}
          </motion.div>
        )}

        {/* WS status dot on FAB */}
        {!isOpen && (
          <div style={{
            position: "absolute",
            bottom: "1px",
            right: "1px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: wsStatus === "open" ? "#4ADE80" : wsStatus === "connecting" ? "#E8FF47" : "#555",
            border: "2px solid #080808",
          }} />
        )}
      </motion.button>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
