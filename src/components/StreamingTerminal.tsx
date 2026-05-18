"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { LogLine } from "@/types/terminal";

// ── Module-level line ID counter (persists across re-renders without state) ───
let internalLineId = 0;

function nowStr(): string {
  return new Date().toISOString().replace("T", " ").substring(0, 23);
}

function mkLine(
  agent: string,
  agentClass: string,
  msg: string,
  msgClass = "info"
): LogLine {
  return { id: internalLineId++, ts: nowStr(), agent, agentClass, msg, msgClass };
}

const IDLE_POOL: Array<() => LogLine> = [
  () => mkLine("[SYS]", "system", "Heartbeat OK — all agents responsive", "info"),
  () => mkLine("[AnomalyDetect]", "anomaly", "Stream partition lag: 12ms — within threshold", "info"),
  () => mkLine("[SchemaAgent]", "schema", "Schema registry sync complete — 0 drift detected", "info"),
  () => mkLine("[GitAgent]", "git", "Manifest snapshot v4.2.1 committed to internal repo", "info"),
  () => mkLine("[RefactorAgent]", "refactor", "Code quality scan passed — 0 lint violations", "info"),
  () => mkLine("[SYS]", "system", "Iceberg metadata refresh: 14 tables updated", "info"),
  () => mkLine("[AnomalyDetect]", "anomaly", "Throughput 4,218 events/sec — nominal", "info"),
  () => mkLine("[SchemaAgent]", "schema", "Validated JSON structure on topic: user_events_v3", "info"),
  () => mkLine("[GitAgent]", "git", "Rollback checkpoint saved — partition_offset=82941", "info"),
  () => mkLine("[RefactorAgent]", "refactor", "Hot-reload complete — 0 downtime observed", "info"),
  () => mkLine("[SYS]", "system", "Lakehouse compaction scheduled — 06:00 UTC window", "info"),
];

interface Props {
  isHealing: boolean;
  /** Lines injected from the parent (SSE events / crash simulation) */
  injectLines: LogLine[];
}

export default function StreamingTerminal({ isHealing, injectLines }: Props) {
  const [lines, setLines] = useState<LogLine[]>([]);
  const healingRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevInjectLen = useRef(0);

  const push = useCallback((line: LogLine) => {
    setLines((prev) => [...prev.slice(-200), line]);
  }, []);

  // Populate initial idle lines on mount (client-only — no SSR timestamp mismatch)
  useEffect(() => {
    setLines(
      Array.from({ length: 12 }, (_, i) => {
        const fn = IDLE_POOL[i % IDLE_POOL.length];
        return fn();
      })
    );
  }, []);

  // Idle ticker — pauses during healing
  useEffect(() => {
    idleTimerRef.current = setInterval(() => {
      if (!healingRef.current) {
        const fn = IDLE_POOL[Math.floor(Math.random() * IDLE_POOL.length)];
        push(fn());
      }
    }, 2500);
    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
    };
  }, [push]);

  // Sync healing ref so idle ticker pauses correctly
  useEffect(() => {
    healingRef.current = isHealing;
  }, [isHealing]);

  // Consume new lines injected from parent (append only new ones)
  useEffect(() => {
    if (injectLines.length > prevInjectLen.current) {
      const newOnes = injectLines.slice(prevInjectLen.current);
      prevInjectLen.current = injectLines.length;
      newOnes.forEach((l) => push(l));
    }
  }, [injectLines, push]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-label">Autonomous Streaming Terminal</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: isHealing ? "var(--amber)" : "var(--emerald)",
            letterSpacing: "0.06em",
            transition: "color 0.3s",
          }}
        >
          {isHealing ? "⚡ HEALING" : "● LIVE"}
        </span>
      </div>

      <div className="terminal-body" suppressHydrationWarning>
        {lines.map((l) => (
          <div key={l.id} className="terminal-line">
            <span className="t-ts">{l.ts}</span>
            <span className={`t-agent ${l.agentClass}`}>{l.agent}</span>
            <span className={`t-msg ${l.msgClass}`}>{l.msg}</span>
          </div>
        ))}
        <div ref={bottomRef} />
        <span className="terminal-cursor" />
      </div>
    </div>
  );
}
