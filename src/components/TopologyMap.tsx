"use client";

import { useEffect, useState } from "react";

interface Props {
  isHealing: boolean;
}

type PathState = "healthy" | "healing" | "recovering";

export default function TopologyMap({ isHealing }: Props) {
  const [pathState, setPathState] = useState<PathState>("healthy");
  const [animOffset, setAnimOffset] = useState(0);

  // Advance dash offset for flowing animation
  useEffect(() => {
    const id = setInterval(() => {
      setAnimOffset((v) => (v + 2) % 60);
    }, 60);
    return () => clearInterval(id);
  }, []);

  // Respond to healing state
  useEffect(() => {
    if (isHealing) {
      setPathState("healing");
    } else {
      // Allow a brief "recovering" flash before going healthy
      if (pathState === "healing") {
        setPathState("recovering");
        const t = setTimeout(() => setPathState("healthy"), 1500);
        return () => clearTimeout(t);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHealing]);

  const edgeColor =
    pathState === "healthy"
      ? "#10b981"
      : pathState === "healing"
      ? "#f59e0b"
      : "#34d399";

  const glowId = "edge-glow";

  const nodes = [
    {
      id: "kafka",
      x: 60,
      y: 130,
      w: 148,
      h: 56,
      label: "Ingestion",
      sub: "[Kafka Stream]",
      dotColor: pathState === "healthy" ? "#10b981" : pathState === "healing" ? "#f59e0b" : "#34d399",
    },
    {
      id: "engine",
      x: 256,
      y: 130,
      w: 168,
      h: 56,
      label: "Transformation",
      sub: "[Self-Healing Engine]",
      dotColor: pathState === "healing" ? "#f59e0b" : "#10b981",
    },
    {
      id: "iceberg",
      x: 472,
      y: 130,
      w: 148,
      h: 56,
      label: "Target Lakehouse",
      sub: "[Apache Iceberg]",
      dotColor: "#10b981",
    },
  ];

  // Edge midpoints
  const edge1 = { x1: 208, y1: 158, x2: 256, y2: 158 };
  const edge2 = { x1: 424, y1: 158, x2: 472, y2: 158 };

  const statusLabel =
    pathState === "healing"
      ? "Transformation anomaly — AI intervention active"
      : pathState === "recovering"
      ? "Recovering routing paths…"
      : "All pipeline paths nominal";

  const statusColor =
    pathState === "healing"
      ? "var(--amber)"
      : pathState === "recovering"
      ? "#34d399"
      : "var(--emerald)";

  return (
    <div className="panel topology-panel">
      <div className="panel-header">
        <span className="panel-label">Infrastructure Topology</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: statusColor,
            letterSpacing: "0.06em",
            transition: "color 0.4s",
          }}
        >
          {pathState === "healing" ? "⚡ ANOMALY ACTIVE" : "● LIVE VIEW"}
        </span>
      </div>

      <div className="topology-body">
        <svg viewBox="0 0 680 310" className="topology-svg" aria-label="Pipeline Topology">
          <defs>
            <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Arrow markers */}
            <marker id="arrow-healthy" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#10b981" />
            </marker>
            <marker id="arrow-healing" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b" />
            </marker>
          </defs>

          {/* ── Nodes ─────────────────────────────── */}
          {nodes.map((n) => (
            <g key={n.id}>
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
                rx={6}
                fill="#1a1a1a"
                stroke={
                  n.id === "engine" && pathState === "healing"
                    ? "#78350f"
                    : "#262626"
                }
                strokeWidth={1}
                style={{ transition: "stroke 0.4s ease" }}
              />
              {/* Status dot */}
              <circle
                cx={n.x + 12}
                cy={n.y + 12}
                r={4}
                fill={n.dotColor}
                style={{ transition: "fill 0.4s ease" }}
                filter={`url(#${glowId})`}
              />
              <text
                x={n.x + n.w / 2}
                y={n.y + 22}
                fontFamily="var(--font-mono)"
                fontSize={11}
                fontWeight={600}
                fill="#f5f5f5"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {n.label}
              </text>
              <text
                x={n.x + n.w / 2}
                y={n.y + 38}
                fontFamily="var(--font-mono)"
                fontSize={8.5}
                fill="#525252"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {n.sub}
              </text>
            </g>
          ))}

          {/* ── Edge 1: Kafka → Engine ─────────────── */}
          <line
            x1={edge1.x1}
            y1={edge1.y1}
            x2={edge1.x2}
            y2={edge1.y2}
            stroke={edgeColor}
            strokeWidth={2}
            strokeDasharray="6 4"
            strokeDashoffset={-animOffset}
            markerEnd={`url(#arrow-${pathState === "healing" ? "healing" : "healthy"})`}
            filter={`url(#${glowId})`}
            style={{ transition: "stroke 0.4s ease" }}
          />

          {/* ── Edge 2: Engine → Iceberg ────────────── */}
          <line
            x1={edge2.x1}
            y1={edge2.y1}
            x2={edge2.x2}
            y2={edge2.y2}
            stroke={pathState === "healing" ? "#f59e0b" : edgeColor}
            strokeWidth={2}
            strokeDasharray="6 4"
            strokeDashoffset={-animOffset}
            markerEnd={`url(#arrow-${pathState === "healing" ? "healing" : "healthy"})`}
            filter={`url(#${glowId})`}
            style={{ transition: "stroke 0.4s ease" }}
          />

          {/* ── Legend Labels ────────────────────────── */}
          <text x={232} y={148} fontFamily="var(--font-mono)" fontSize={8} fill={edgeColor} textAnchor="middle" style={{ transition: "fill 0.4s" }}>
            ──▶
          </text>
          <text x={448} y={148} fontFamily="var(--font-mono)" fontSize={8} fill={pathState === "healing" ? "#f59e0b" : edgeColor} textAnchor="middle" style={{ transition: "fill 0.4s" }}>
            ──▶
          </text>

          {/* ── Status bar at bottom ──────────────── */}
          <rect x={60} y={220} width={560} height={28} rx={4} fill="#1a1a1a" stroke="#1f1f1f" strokeWidth={1} />
          <circle cx={78} cy={234} r={4} fill={statusColor} style={{ transition: "fill 0.4s" }} />
          <text x={90} y={234} fontFamily="var(--font-mono)" fontSize={9} fill={statusColor} dominantBaseline="middle" style={{ transition: "fill 0.4s" }}>
            {statusLabel}
          </text>

          {/* ── Metrics below nodes ────────────────── */}
          {[
            { x: 60 + 74, label: "4,218 ev/s" },
            { x: 256 + 84, label: pathState === "healing" ? "PATCHING…" : "99.98% SLA" },
            { x: 472 + 74, label: "14 tables" },
          ].map((m, i) => (
            <text
              key={i}
              x={m.x}
              y={206}
              fontFamily="var(--font-mono)"
              fontSize={8.5}
              fill={i === 1 && pathState === "healing" ? "#f59e0b" : "#525252"}
              textAnchor="middle"
              style={{ transition: "fill 0.4s" }}
            >
              {m.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
