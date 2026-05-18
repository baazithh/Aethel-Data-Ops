"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface LogLine {
  id: number;
  ts: string;
  agent: string;
  agentClass: string;
  msg: string;
  msgClass: string;
}

function now(): string {
  return new Date().toISOString().replace("T", " ").substring(0, 23);
}

let lineId = 0;
function mkLine(
  agent: string,
  agentClass: string,
  msg: string,
  msgClass = "info"
): LogLine {
  return { id: lineId++, ts: now(), agent, agentClass, msg, msgClass };
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

const CRASH_SEQUENCE: Array<() => LogLine> = [
  () => mkLine("[AnomalyDetect]", "anomaly", "⚠  Schema drift detected on topic: order_events_raw", "warn"),
  () => mkLine("[AnomalyDetect]", "anomaly", "Expected field 'item_price' (float) — received 'price_usd' (string)", "error"),
  () => mkLine("[AnomalyDetect]", "anomaly", "Stream partition kafka-p04 suspended — poisoned record intercepted", "error"),
  () => mkLine("[SchemaAgent]", "schema", "Initiating schema diff analysis against registry v3.8.0…", "warn"),
  () => mkLine("[SchemaAgent]", "schema", "Diff resolved: 2 renamed fields, 1 type coercion required", "warn"),
  () => mkLine("[RefactorAgent]", "refactor", "Generating corrective patch — sandboxed execution env spawned", "warn"),
  () => mkLine("[RefactorAgent]", "refactor", "Patch candidate: cast(price_usd as DECIMAL(12,2)) AS item_price", "warn"),
  () => mkLine("[RefactorAgent]", "refactor", "Running synthetic unit test on 10,000 sampled records…", "warn"),
  () => mkLine("[RefactorAgent]", "refactor", "✓ Unit test pass rate: 100.0% — zero null coercions", "success"),
  () => mkLine("[SchemaAgent]", "schema", "Updating Iceberg table metadata — open table schema v3.9.0", "info"),
  () => mkLine("[GitAgent]", "git", "Patch committed: aef7c3d — 'auto: fix order_events_raw schema drift'", "info"),
  () => mkLine("[GitAgent]", "git", "Rollback ref tagged: refs/tags/pre-drift-backup-2", "info"),
  () => mkLine("[RefactorAgent]", "refactor", "Hot-swapping Kafka consumer logic — zero-downtime deployment…", "warn"),
  () => mkLine("[RefactorAgent]", "refactor", "✓ Consumer hot-swapped — partition kafka-p04 resumed", "success"),
  () => mkLine("[AnomalyDetect]", "anomaly", "✓ Stream throughput restored — 4,201 events/sec", "success"),
  () => mkLine("[SYS]", "system", "✓  SELF-HEALING COMPLETE — all partitions healthy", "success"),
];

interface Props {
  isHealing: boolean;
}

export default function StreamingTerminal({ isHealing }: Props) {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [mounted, setMounted] = useState(false);
  const healingRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const push = useCallback((line: LogLine) => {
    setLines((prev) => [...prev.slice(-200), line]);
  }, []);

  // Populate initial lines only on the client (avoids SSR/client timestamp mismatch)
  useEffect(() => {
    setLines(
      Array.from({ length: 12 }, (_, i) => {
        const fn = IDLE_POOL[i % IDLE_POOL.length];
        return fn();
      })
    );
    setMounted(true);
  }, []);

  // Idle ticker
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

  // Crash sequence
  useEffect(() => {
    if (!isHealing) return;
    healingRef.current = true;

    CRASH_SEQUENCE.forEach((fn, i) => {
      setTimeout(() => {
        push(fn());
        if (i === CRASH_SEQUENCE.length - 1) {
          healingRef.current = false;
        }
      }, i * 420);
    });
  }, [isHealing, push]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className="panel">
      <div className="panel-header" suppressHydrationWarning>
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
