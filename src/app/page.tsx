"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import type { LogLine, StreamPayload } from "@/types/terminal";

// ── Dynamic imports with SSR disabled ─────────────────────────────────────────
// All four panels use runtime data (timestamps, Math.random, EventSource).
// Disabling SSR eliminates hydration mismatches entirely.
const ExecutiveScorecard = dynamic(
  () => import("@/components/ExecutiveScorecard"),
  { ssr: false }
);
const CognitiveChatCopilot = dynamic(
  () => import("@/components/CognitiveChatCopilot"),
  { ssr: false }
);
const StreamingTerminal = dynamic(
  () => import("@/components/StreamingTerminal"),
  { ssr: false }
);
const TopologyMap = dynamic(() => import("@/components/TopologyMap"), {
  ssr: false,
});

// ── Constants ─────────────────────────────────────────────────────────────────
const API = "http://127.0.0.1:8000";
const SSE_URL = `${API}/api/stream`;
const SSE_RETRY_MS = 5000;

// ── Module-level log-line ID (stable across renders) ─────────────────────────
let logId = 9000;

function mkLog(
  agent: string,
  agentClass: string,
  msg: string,
  msgClass = "info"
): LogLine {
  return {
    id: logId++,
    ts: new Date().toISOString().replace("T", " ").substring(0, 23),
    agent,
    agentClass,
    msg,
    msgClass,
  };
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  // ── Hydration guard ────────────────────────────────────────────────────────
  const [isMounted, setIsMounted] = useState(false);

  // ── Global health state ────────────────────────────────────────────────────
  const [isHealing, setIsHealing] = useState(false);
  const isHealingRef = useRef(false); // sync ref for closures

  // ── Header ─────────────────────────────────────────────────────────────────
  const [clock, setClock] = useState("");

  // ── Live metrics (owned here, passed down as props) ────────────────────────
  const [fixes, setFixes] = useState(47);
  const [hoursSaved, setHoursSaved] = useState(18.5);
  const [latencyMs, setLatencyMs] = useState(183);
  const [slaFill, setSlaFill] = useState(78);

  // ── Terminal injection queue ───────────────────────────────────────────────
  const [injectLines, setInjectLines] = useState<LogLine[]>([]);

  // ── Backend connectivity indicator ────────────────────────────────────────
  const [backendOnline, setBackendOnline] = useState(false);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const pushLog = useCallback((...lines: LogLine[]) => {
    setInjectLines((prev) => [...prev, ...lines]);
  }, []);

  const startHealing = useCallback(() => {
    isHealingRef.current = true;
    setIsHealing(true);
  }, []);

  const stopHealing = useCallback(() => {
    isHealingRef.current = false;
    setIsHealing(false);
  }, []);

  // ── Mount guard ────────────────────────────────────────────────────────────
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ── Live clock ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(d.toISOString().replace("T", "  ").substring(0, 22) + " UTC");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Recovery sequence (shared by SSE corruption + chaos button) ────────────
  const runRecoverySequence = useCallback(
    (source: "sse" | "manual") => {
      const prefix =
        source === "manual"
          ? "Manual chaos injection triggered via dashboard"
          : "Intercepted corrupted payload schema on stream segment";

      pushLog(
        mkLog("[CRITICAL]", "alert", prefix, "error"),
        mkLog(
          "[AnomalyDetect]",
          "anomaly",
          "⚠  Schema drift detected on topic: order_events_raw",
          "warn"
        ),
        mkLog(
          "[AnomalyDetect]",
          "anomaly",
          "Expected field 'item_price' (float) — received 'price_usd' (string)",
          "error"
        ),
        mkLog(
          "[AnomalyDetect]",
          "anomaly",
          "Stream partition kafka-p04 suspended — poisoned record intercepted",
          "error"
        ),
        mkLog(
          "[SchemaAgent]",
          "schema",
          "Initiating schema diff analysis against registry v3.8.0…",
          "warn"
        ),
        mkLog(
          "[SchemaAgent]",
          "schema",
          "Diff resolved: 2 renamed fields, 1 type coercion required",
          "warn"
        ),
        mkLog(
          "[RefactorAgent]",
          "refactor",
          "Generating corrective patch — sandboxed execution env spawned",
          "warn"
        ),
        mkLog(
          "[RefactorAgent]",
          "refactor",
          "Patch candidate: cast(price_usd as DECIMAL(12,2)) AS item_price",
          "warn"
        ),
        mkLog(
          "[RefactorAgent]",
          "refactor",
          "Running synthetic unit test on 10,000 sampled records…",
          "warn"
        )
      );

      // 3-second agent processing delay, then resolution
      setTimeout(() => {
        pushLog(
          mkLog(
            "[RefactorAgent]",
            "refactor",
            "✓ Unit test pass rate: 100.0% — zero null coercions",
            "success"
          ),
          mkLog(
            "[SchemaAgent]",
            "schema",
            "Updating Iceberg table metadata — open table schema v3.9.0",
            "info"
          ),
          mkLog(
            "[GitAgent]",
            "git",
            "Patch committed: aef7c3d — 'auto: fix order_events_raw schema drift'",
            "info"
          ),
          mkLog(
            "[GitAgent]",
            "git",
            "Rollback ref tagged: refs/tags/pre-drift-backup-2",
            "info"
          ),
          mkLog(
            "[RefactorAgent]",
            "refactor",
            "Hot-swapping Kafka consumer logic — zero-downtime deployment…",
            "warn"
          ),
          mkLog(
            "[RefactorAgent]",
            "refactor",
            "✓ Consumer hot-swapped — partition kafka-p04 resumed",
            "success"
          ),
          mkLog(
            "[AnomalyDetect]",
            "anomaly",
            "✓ Stream throughput restored — 4,201 events/sec",
            "success"
          ),
          mkLog(
            "[SYS]",
            "system",
            "✓  SELF-HEALING COMPLETE — all partitions healthy",
            "success"
          )
        );

        // POST to heal-pipeline to clear backend chaos flag
        fetch(`${API}/api/heal-pipeline`, { method: "POST" }).catch(() => {});

        // Restore UI after a brief "recovered" flash
        setTimeout(() => {
          stopHealing();
          setFixes((v) => v + 1);
          setHoursSaved((v) => parseFloat((v + 0.5).toFixed(1)));
        }, 1500);
      }, 3000);
    },
    [pushLog, stopHealing]
  );

  // ── SSE connection (live backend data) ─────────────────────────────────────
  useEffect(() => {
    if (!isMounted) return;

    let es: EventSource | null = null;
    let retryTimer: ReturnType<typeof setTimeout>;

    const connect = () => {
      try {
        es = new EventSource(SSE_URL);

        es.onopen = () => {
          setBackendOnline(true);
        };

        es.onmessage = (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data as string) as StreamPayload;

            // ── Calculate pipeline latency ───────────────────────────────
            const serverTime = new Date(data.timestamp).getTime();
            const lag = Math.max(10, Date.now() - serverTime);
            setLatencyMs(lag);
            // Map lag to SLA fill (0–500ms → 95–10%)
            setSlaFill(Math.max(10, Math.min(95, 95 - (lag / 500) * 85)));

            if (data.status === "NORMAL") {
              // ── Update live metrics from stream ──────────────────────
              setFixes(data.fixes_today);
              setHoursSaved(data.hours_saved);
            } else if (data.status === "CORRUPTED") {
              // ── Intercept corrupted payload ──────────────────────────
              if (!isHealingRef.current) {
                startHealing();
                runRecoverySequence("sse");
              }
            }
          } catch {
            /* malformed JSON payload — ignore */
          }
        };

        es.onerror = () => {
          setBackendOnline(false);
          es?.close();
          es = null;
          retryTimer = setTimeout(connect, SSE_RETRY_MS);
        };
      } catch {
        retryTimer = setTimeout(connect, SSE_RETRY_MS);
      }
    };

    connect();

    return () => {
      es?.close();
      clearTimeout(retryTimer);
    };
  }, [isMounted, startHealing, runRecoverySequence]);

  // ── Simulate Pipeline Crash → POST /api/inject-chaos ──────────────────────
  const triggerCrash = async () => {
    if (isHealingRef.current) return;
    startHealing();

    try {
      const res = await fetch(`${API}/api/inject-chaos`, { method: "POST" });
      if (res.ok) {
        // Backend will deliver CORRUPTED on next SSE tick.
        // Fire the recovery sequence immediately for instant UI feedback.
        runRecoverySequence("manual");
      } else {
        // Backend responded but with error — run locally
        runRecoverySequence("manual");
      }
    } catch {
      // Backend offline → run full local simulation
      pushLog(
        mkLog("[SYS]", "alert", "Backend offline — running local simulation mode", "warn")
      );
      runRecoverySequence("manual");
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="dashboard-shell">
      {/* ─── Header ─── */}
      <header className="header">
        <div className="header-left">
          <div className="header-logo">
            <div className="logo-mark">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="#10b981" />
                <rect
                  x="8"
                  y="1"
                  width="5"
                  height="5"
                  rx="1"
                  fill="#10b981"
                  opacity="0.5"
                />
                <rect
                  x="1"
                  y="8"
                  width="5"
                  height="5"
                  rx="1"
                  fill="#10b981"
                  opacity="0.5"
                />
                <rect x="8" y="8" width="5" height="5" rx="1" fill="#10b981" />
              </svg>
            </div>
            <span className="header-title">Aethel Data Ops</span>
          </div>

          <div className="header-divider" />
          <span className="header-subtitle">Autonomous Self-Healing Platform</span>

          {/* Backend connectivity pill */}
          {isMounted && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 8px",
                borderRadius: 4,
                border: `1px solid ${backendOnline ? "var(--emerald-dim)" : "var(--border)"}`,
                background: backendOnline
                  ? "var(--emerald-glow)"
                  : "transparent",
                fontSize: 9,
                fontFamily: "var(--font-mono)",
                color: backendOnline ? "var(--emerald)" : "var(--text-muted)",
                letterSpacing: "0.06em",
                transition: "all 0.4s ease",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: backendOnline
                    ? "var(--emerald)"
                    : "var(--text-muted)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {backendOnline ? "API CONNECTED" : "API OFFLINE"}
            </div>
          )}
        </div>

        <div className="header-right">
          <span className="header-timestamp" suppressHydrationWarning>
            {clock}
          </span>
          <div className="header-divider" />

          {/* Global Health Badge */}
          <div
            className={`health-badge ${isHealing ? "healing" : "healthy"}`}
            id="global-health-badge"
          >
            <span className="badge-dot" />
            {isHealing ? "AI Healing Active" : "Healthy"}
          </div>

          {/* Simulate Crash Button */}
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
              <path
                d="M5.5 5V7"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="5.5" cy="8.5" r="0.6" fill="currentColor" />
            </svg>
            Simulate Pipeline Crash
          </button>
        </div>
      </header>

      {/* ─── 2×2 Panel Grid ─── */}
      <main className="dashboard-grid">
        {/* Top Left — Executive Scorecard */}
        <div>
          <ExecutiveScorecard
            isHealing={isHealing}
            fixes={fixes}
            hoursSaved={hoursSaved}
            latencyMs={latencyMs}
            slaFill={slaFill}
            backendOnline={backendOnline}
          />
        </div>

        {/* Top Right — Streaming Terminal */}
        <div>
          <StreamingTerminal isHealing={isHealing} injectLines={injectLines} />
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
