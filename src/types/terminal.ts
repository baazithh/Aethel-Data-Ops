export interface LogLine {
  id: number;
  ts: string;
  agent: string;
  agentClass: string;
  msg: string;
  msgClass: string;
}

export interface StreamPayload {
  timestamp: string;
  status: "NORMAL" | "CORRUPTED";
  fixes_today: number;
  hours_saved: number;
  throughput: number;
  tables: number;
  sla_pct: number;
}
