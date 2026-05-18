"use client";

import { useEffect, useState } from "react";

interface Props {
  isHealing: boolean;
}

export default function ExecutiveScorecard({ isHealing }: Props) {
  const [fixes, setFixes] = useState(47);
  const [hoursSaved, setHoursSaved] = useState(18.5);
  const [latencyMs, setLatencyMs] = useState(183);
  const [slaFill, setSlaFill] = useState(78);
  const [uptime, setUptime] = useState("100.00");

  // Live-jitter the latency counter
  useEffect(() => {
    const id = setInterval(() => {
      setLatencyMs((v) => {
        const jitter = Math.random() * 30 - 15;
        return Math.max(60, Math.min(480, Math.round(v + jitter)));
      });
      setSlaFill((v) => {
        const jitter = Math.random() * 6 - 3;
        return Math.max(55, Math.min(97, v + jitter));
      });
    }, 1200);
    return () => clearInterval(id);
  }, []);

  // When healing fires, increment counters afterwards
  useEffect(() => {
    if (!isHealing) return;
    const t = setTimeout(() => {
      setFixes((v) => v + 1);
      setHoursSaved((v) => parseFloat((v + 0.5).toFixed(1)));
    }, 5500);
    return () => clearTimeout(t);
  }, [isHealing]);

  const slaColor = latencyMs < 250 ? "var(--emerald)" : "var(--amber)";

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-label">Executive Scorecard</span>
        <span className="metric-pill green">Live</span>
      </div>

      <div className="panel-body">
        {/* Row 1: Uptime + Fixes */}
        <div className="scorecard-grid">
          <div className="metric-card">
            <div className="metric-label">System Uptime</div>
            <div className="metric-value emerald">{uptime}%</div>
            <div className="metric-sub" style={{ marginTop: 6 }}>
              <span className="metric-pill green">Stable</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Autonomous Fixes Today</div>
            <div
              className="fixes-counter"
              style={{
                color: isHealing ? "var(--amber)" : "var(--emerald)",
                transition: "color 0.4s ease",
              }}
            >
              {fixes}
            </div>
            <div className="metric-sub" style={{ marginTop: 4 }}>
              auto-remediated events
            </div>
          </div>
        </div>

        {/* Row 2: Hours Saved */}
        <div className="scorecard-grid">
          <div className="metric-card full-width">
            <div className="metric-label">Estimated Engineering Hours Saved</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <div className="metric-value">{hoursSaved}</div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}
              >
                hrs
              </span>
            </div>
            <div className="metric-sub">since 00:00 UTC today</div>
          </div>
        </div>

        {/* Row 3: Data Freshness SLA */}
        <div
          className="metric-card"
          style={{ marginTop: 0, borderColor: isHealing ? "var(--amber-dim)" : "var(--border)", transition: "border-color 0.4s" }}
        >
          <div className="metric-label">Data Freshness SLA</div>
          <div className="sla-row">
            <div>
              <div className="sla-label-row">Pipeline end-to-end latency</div>
            </div>
            <div
              className="sla-ms"
              style={{ color: slaColor, transition: "color 0.4s ease" }}
            >
              {latencyMs}ms
            </div>
          </div>
          <div className="sla-track">
            <div
              className="sla-fill"
              style={{
                width: `${slaFill}%`,
                background: slaColor,
                transition: "width 0.8s ease, background 0.4s ease",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
              fontSize: 9,
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span>0ms</span>
            <span>SLA threshold: 500ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
