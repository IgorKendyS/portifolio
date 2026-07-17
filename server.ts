import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { WebSocketServer, WebSocket } from "ws";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// In-memory message history (last 200)
const messageHistory: ChatMessage[] = [];

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userColor: string;
  text: string;
  timestamp: number;
  type: "message" | "join" | "leave";
}

interface ClientMeta {
  userId: string;
  userName: string;
  userColor: string;
}

const clients = new Map<WebSocket, ClientMeta>();

function broadcastAll(data: object) {
  const payload = JSON.stringify(data);
  for (const [ws] of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(payload);
    }
  }
}

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);

    // REST endpoint for chat history
    if (parsedUrl.pathname === "/api/ws-history" && req.method === "GET") {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify({ messages: messageHistory.slice(-50) }));
      return;
    }

    handle(req, res, parsedUrl);
  });

  const wss = new WebSocketServer({ server, path: "/ws/chat" });

  wss.on("connection", (ws, req) => {
    console.log("[WS] New connection:", req.socket.remoteAddress);

    ws.on("message", (raw) => {
      try {
        const msg = JSON.parse(raw.toString());

        if (msg.type === "identify") {
          clients.set(ws, {
            userId: msg.userId,
            userName: msg.userName,
            userColor: msg.userColor,
          });

          // Send history
          ws.send(JSON.stringify({
            type: "history",
            messages: messageHistory.slice(-50),
            onlineCount: clients.size,
          }));

          // Broadcast join
          const joinMsg: ChatMessage = {
            id: crypto.randomUUID(),
            userId: msg.userId,
            userName: msg.userName,
            userColor: msg.userColor,
            text: `${msg.userName} entrou no chat`,
            timestamp: Date.now(),
            type: "join",
          };
          messageHistory.push(joinMsg);
          if (messageHistory.length > 200) messageHistory.shift();
          broadcastAll({ type: "message", message: joinMsg, onlineCount: clients.size });
          return;
        }

        if (msg.type === "message") {
          const meta = clients.get(ws);
          if (!meta) return;
          const chatMsg: ChatMessage = {
            id: crypto.randomUUID(),
            userId: meta.userId,
            userName: meta.userName,
            userColor: meta.userColor,
            text: String(msg.text).slice(0, 300),
            timestamp: Date.now(),
            type: "message",
          };
          messageHistory.push(chatMsg);
          if (messageHistory.length > 200) messageHistory.shift();
          broadcastAll({ type: "message", message: chatMsg, onlineCount: clients.size });
        }

        if (msg.type === "ping") {
          ws.send(JSON.stringify({ type: "pong", timestamp: msg.timestamp }));
        }
      } catch {
        // ignore malformed JSON
      }
    });

    ws.on("close", () => {
      const meta = clients.get(ws);
      clients.delete(ws);
      if (meta) {
        const leaveMsg: ChatMessage = {
          id: crypto.randomUUID(),
          userId: meta.userId,
          userName: meta.userName,
          userColor: meta.userColor,
          text: `${meta.userName} saiu do chat`,
          timestamp: Date.now(),
          type: "leave",
        };
        messageHistory.push(leaveMsg);
        broadcastAll({ type: "message", message: leaveMsg, onlineCount: clients.size });
      }
    });

    ws.on("error", (err) => console.error("[WS] Error:", err.message));
  });

  const PORT = parseInt(process.env.PORT || "3000", 10);
  server.listen(PORT, () => {
    console.log(`\n🚀 Next.js ready at http://localhost:${PORT}`);
    console.log(`🔌 WebSocket ready at ws://localhost:${PORT}/ws/chat`);
  });
});
