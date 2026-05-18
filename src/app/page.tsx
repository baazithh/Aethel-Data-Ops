"use client";

import { useState, useEffect } from "react";
import ExecutiveScorecard from "@/components/ExecutiveScorecard";
import CognitiveChatCopilot from "@/components/CognitiveChatCopilot";
import StreamingTerminal from "@/components/StreamingTerminal";
import TopologyMap from "@/components/TopologyMap";

export default function Dashboard() {
  const [isHealing, setIsHealing] = useState(false);
  const [clock, setClock] = useState("");

  // Live clock in header
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        d.toISOString().replace("T", "  ").substring(0, 22) + " UTC"
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const triggerCrash = () => {
    if (isHealing) return;
    setIsHealing(true);
    // Auto-heal after 6 seconds (sequence takes ~6.7 s but restore badge faster)
    setTimeout(() => setIsHealing(false), 7500);
  };

  return (
    <div className="dashboard-shell">
      {/* ─── Header ─── */}
      <header className="header">
        <div className="header-left">
          <div className="header-logo">
            <div className="logo-mark">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="#10b981" />
                <rect x="8" y="1" width="5" height="5" rx="1" fill="#10b981" opacity="0.5" />
                <rect x="1" y="8" width="5" height="5" rx="1" fill="#10b981" opacity="0.5" />
                <rect x="8" y="8" width="5" height="5" rx="1" fill="#10b981" />
              </svg>
            </div>
            <span className="header-title">Aethel Data Ops</span>
          </div>

          <div className="header-divider" />
          <span className="header-subtitle">Autonomous Self-Healing Platform</span>
        </div>

        <div className="header-right">
          <span className="header-timestamp" suppressHydrationWarning>{clock}</span>

          <div className="header-divider" />

          {/* Global Health Badge */}
          <div
            className={`health-badge ${isHealing ? "healing" : "healthy"}`}
            id="global-health-badge"
          >
            <span className="badge-dot" />
            {isHealing ? "AI Healing Active" : "Healthy"}
          </div>

          {/* Simulate Button */}
          <button
            id="simulate-crash-btn"
            className="simulate-btn"
            onClick={triggerCrash}
            disabled={isHealing}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 1L10 9.5H1L5.5 1Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path d="M5.5 5V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="5.5" cy="8.5" r="0.6" fill="currentColor" />
            </svg>
            Simulate Pipeline Crash
          </button>
        </div>
      </header>

      {/* ─── 2×2 Grid ─── */}
      <main className="dashboard-grid">
        {/* Top Left — Executive Scorecard */}
        <div>
          <ExecutiveScorecard isHealing={isHealing} />
        </div>

        {/* Top Right — Streaming Terminal */}
        <div>
          <StreamingTerminal isHealing={isHealing} />
        </div>

        {/* Bottom Left — Chat Copilot */}
        <div>
          <CognitiveChatCopilot />
        </div>

        {/* Bottom Right — Topology Map */}
        <div>
          <TopologyMap isHealing={isHealing} />
        </div>
      </main>
    </div>
  );
}
