"use client";

import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: number;
  role: "system" | "user" | "assistant";
  text: string;
  status?: string;
}

const MOCK_RESPONSES: Record<string, ChatMessage> = {
  default: {
    id: 0,
    role: "assistant",
    text: "I'm monitoring your pipelines in real time. Everything looks nominal at the moment. Could you be more specific about what you'd like to know?",
    status: "Processing complete",
  },
  health: {
    id: 0,
    role: "assistant",
    text: "Your pipelines are healthy. All 14 data streams are processing normally, and the self-healing engine resolved 2 minor schema inconsistencies in the last hour without any manual intervention.",
    status: "Health check complete",
  },
  pipeline: {
    id: 0,
    role: "assistant",
    text: "All pipelines are operating within normal parameters. The Kafka ingestion layer is processing ~4,200 events/sec, and the Iceberg lakehouse is being updated every 90 seconds. No backlog detected.",
    status: "Pipeline status retrieved",
  },
  crash: {
    id: 0,
    role: "assistant",
    text: "I've detected the anomaly. The self-healing engine has already isolated the affected stream partition and is generating a corrective code patch. Expect full recovery within 15–30 seconds. No data has been lost.",
    status: "Autonomous recovery initiated",
  },
  table: {
    id: 0,
    role: "assistant",
    text: "Understood. I'm provisioning a new analytical table in the Iceberg lakehouse now. The schema will be inferred from your most recent 24 hours of event data. It'll be query-ready in approximately 2 minutes.",
    status: "Table provisioning in progress...",
  },
  update: {
    id: 0,
    role: "assistant",
    text: "The unexpected website update was detected by the ingestion monitor. The source schema differed by 3 fields. The AI automatically adapted the transformation logic and the data continued flowing without interruption.",
    status: "Schema adaptation logged",
  },
};

function matchResponse(input: string): ChatMessage {
  const q = input.toLowerCase();
  if (q.match(/health|status|ok|fine|running/)) return MOCK_RESPONSES.health;
  if (q.match(/pipeline|stream|kafka|flow|lag/)) return MOCK_RESPONSES.pipeline;
  if (q.match(/crash|fail|broken|error|down/)) return MOCK_RESPONSES.crash;
  if (q.match(/table|create|spin.?up|provision|new/)) return MOCK_RESPONSES.table;
  if (q.match(/website|source|upstream|update|change/)) return MOCK_RESPONSES.update;
  return MOCK_RESPONSES.default;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    role: "system",
    text: "Aethel Copilot is your autonomous infrastructure assistant. Ask me anything about pipeline health, data freshness, upstream source changes, or request me to provision new analytical tables — all in plain language.",
  },
];

let msgIdCounter = 100;

export default function CognitiveChatCopilot() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const send = () => {
    if (!input.trim() || thinking) return;
    const userMsg: ChatMessage = { id: msgIdCounter++, role: "user", text: input.trim() };
    const query = input.trim();
    setInput("");
    setMessages((prev) => [...prev, userMsg]);
    setThinking(true);

    setTimeout(() => {
      const reply = matchResponse(query);
      setMessages((prev) => [...prev, { ...reply, id: msgIdCounter++ }]);
      setThinking(false);
    }, 1400);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send();
  };

  return (
    <div className="panel chat-panel">
      <div className="panel-header">
        <span className="panel-label">Cognitive Chat Copilot</span>
        <span
          style={{
            fontSize: 9,
            fontFamily: "var(--font-mono)",
            color: "var(--emerald)",
            letterSpacing: "0.06em",
          }}
        >
          ● ONLINE
        </span>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble ${msg.role}`}>
            <div className="bubble-sender">
              {msg.role === "system"
                ? "System"
                : msg.role === "user"
                ? "You"
                : "Aethel AI"}
            </div>
            {msg.text}
            {msg.status && (
              <div className="chat-status">{msg.status}</div>
            )}
          </div>
        ))}

        {thinking && (
          <div className="chat-bubble assistant">
            <div className="bubble-sender">Aethel AI</div>
            <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 11 }}>
              Analyzing
              <span style={{ animation: "dotBlink 0.8s step-end infinite", display: "inline-block" }}>
                {" "}...
              </span>
            </span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="chat-input-area">
        <input
          className="chat-input"
          placeholder="Ask about pipeline health, schema changes, or request new tables…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={thinking}
          id="chat-input"
        />
        <button
          className="chat-send-btn"
          onClick={send}
          disabled={thinking || !input.trim()}
          id="chat-send-btn"
        >
          Send
        </button>
      </div>
    </div>
  );
}
