"use client";

import { useEffect, useState } from "react";

interface Props {
  isHealing: boolean;
  fixes: number;
  hoursSaved: number;
  latencyMs: number;
  slaFill: number;
  backendOnline: boolean;
}

export default function ExecutiveScorecard({
  isHealing,
  fixes,
  hoursSaved,
  latencyMs,
  slaFill,
  backendOnline,
}: Props) {
  const [uptime] = useState("100.00");

  const slaColor =
    latencyMs < 250
      ? "var(--emerald)"
      : latencyMs < 450
      ? "var(--amber)"
      : "var(--red)";

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-label">Executive Scorecard</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {backendOnline ? (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--emerald)",
                letterSpacing: "0.06em",
              }}
            >
              ● LIVE
            </span>
          ) : (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
              }}
            >
              ○ LOCAL
            </span>
          )}
        </div>
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
              {backendOnline && (
                <span
                  style={{
                    fontSize: 9,
                    color: "var(--emerald)",
                    fontFamily: "var(--font-mono)",
                    marginLeft: 4,
                  }}
                >
                  ↑ live
                </span>
              )}
            </div>
            <div className="metric-sub">since 00:00 UTC today</div>
          </div>
        </div>

        {/* Row 3: Data Freshness SLA */}
        <div
          className="metric-card"
          style={{
            borderColor: isHealing ? "var(--amber-dim)" : "var(--border)",
            transition: "border-color 0.4s",
          }}
        >
          <div className="metric-label">Data Freshness SLA</div>
          <div className="sla-row">
            <div>
              <div className="sla-label-row">
                {backendOnline
                  ? "Pipeline end-to-end latency (live)"
                  : "Pipeline end-to-end latency"}
              </div>
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
