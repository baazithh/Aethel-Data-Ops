import asyncio
import json
import random
from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

app = FastAPI(title="Aethel Data Ops API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Shared mutable pipeline state ─────────────────────────────────────────────
_state: dict = {
    "chaos_active": False,
    "fixes_today": 47,
    "hours_saved": 18.5,
}


async def _event_generator():
    """Yield Server-Sent Events every 2 seconds."""
    while True:
        chaos = _state["chaos_active"]

        if chaos:
            # Reset chaos flag after a single corrupted event fires
            _state["chaos_active"] = False
            _state["fixes_today"] += 1
            _state["hours_saved"] = round(_state["hours_saved"] + 0.5, 1)

        payload = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "CORRUPTED" if chaos else "NORMAL",
            "fixes_today": _state["fixes_today"],
            "hours_saved": _state["hours_saved"],
            "throughput": random.randint(4_050, 4_420),
            "tables": 14,
            "sla_pct": round(random.uniform(99.85, 99.99), 2),
        }

        yield f"data: {json.dumps(payload)}\n\n"
        await asyncio.sleep(2)


@app.get("/api/stream")
async def stream_events():
    """SSE endpoint — streams live pipeline telemetry."""
    return StreamingResponse(
        _event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )


@app.post("/api/inject-chaos")
async def inject_chaos():
    """Set the chaos flag — the next SSE event will carry CORRUPTED status."""
    _state["chaos_active"] = True
    return {
        "success": True,
        "message": "Chaos injected — next stream event will carry CORRUPTED status.",
    }


@app.post("/api/heal-pipeline")
async def heal_pipeline():
    """Ensure chaos flag is cleared and pipeline is marked recovered."""
    _state["chaos_active"] = False
    return {
        "success": True,
        "message": "Pipeline recovery sequence completed. Chaos flag cleared.",
    }


@app.get("/health")
async def health_check():
    return {"status": "ok", "fixes_today": _state["fixes_today"]}
