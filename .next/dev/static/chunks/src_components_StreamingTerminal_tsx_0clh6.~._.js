(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/StreamingTerminal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StreamingTerminal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
// ── Module-level line ID counter (persists across re-renders without state) ───
let internalLineId = 0;
function nowStr() {
    return new Date().toISOString().replace("T", " ").substring(0, 23);
}
function mkLine(agent, agentClass, msg, msgClass = "info") {
    return {
        id: internalLineId++,
        ts: nowStr(),
        agent,
        agentClass,
        msg,
        msgClass
    };
}
const IDLE_POOL = [
    ()=>mkLine("[SYS]", "system", "Heartbeat OK — all agents responsive", "info"),
    ()=>mkLine("[AnomalyDetect]", "anomaly", "Stream partition lag: 12ms — within threshold", "info"),
    ()=>mkLine("[SchemaAgent]", "schema", "Schema registry sync complete — 0 drift detected", "info"),
    ()=>mkLine("[GitAgent]", "git", "Manifest snapshot v4.2.1 committed to internal repo", "info"),
    ()=>mkLine("[RefactorAgent]", "refactor", "Code quality scan passed — 0 lint violations", "info"),
    ()=>mkLine("[SYS]", "system", "Iceberg metadata refresh: 14 tables updated", "info"),
    ()=>mkLine("[AnomalyDetect]", "anomaly", "Throughput 4,218 events/sec — nominal", "info"),
    ()=>mkLine("[SchemaAgent]", "schema", "Validated JSON structure on topic: user_events_v3", "info"),
    ()=>mkLine("[GitAgent]", "git", "Rollback checkpoint saved — partition_offset=82941", "info"),
    ()=>mkLine("[RefactorAgent]", "refactor", "Hot-reload complete — 0 downtime observed", "info"),
    ()=>mkLine("[SYS]", "system", "Lakehouse compaction scheduled — 06:00 UTC window", "info")
];
function StreamingTerminal({ isHealing, injectLines }) {
    _s();
    const [lines, setLines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const healingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const idleTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const prevInjectLen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const push = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StreamingTerminal.useCallback[push]": (line)=>{
            setLines({
                "StreamingTerminal.useCallback[push]": (prev)=>[
                        ...prev.slice(-200),
                        line
                    ]
            }["StreamingTerminal.useCallback[push]"]);
        }
    }["StreamingTerminal.useCallback[push]"], []);
    // Populate initial idle lines on mount (client-only — no SSR timestamp mismatch)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StreamingTerminal.useEffect": ()=>{
            setLines(Array.from({
                length: 12
            }, {
                "StreamingTerminal.useEffect": (_, i)=>{
                    const fn = IDLE_POOL[i % IDLE_POOL.length];
                    return fn();
                }
            }["StreamingTerminal.useEffect"]));
        }
    }["StreamingTerminal.useEffect"], []);
    // Idle ticker — pauses during healing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StreamingTerminal.useEffect": ()=>{
            idleTimerRef.current = setInterval({
                "StreamingTerminal.useEffect": ()=>{
                    if (!healingRef.current) {
                        const fn = IDLE_POOL[Math.floor(Math.random() * IDLE_POOL.length)];
                        push(fn());
                    }
                }
            }["StreamingTerminal.useEffect"], 2500);
            return ({
                "StreamingTerminal.useEffect": ()=>{
                    if (idleTimerRef.current) clearInterval(idleTimerRef.current);
                }
            })["StreamingTerminal.useEffect"];
        }
    }["StreamingTerminal.useEffect"], [
        push
    ]);
    // Sync healing ref so idle ticker pauses correctly
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StreamingTerminal.useEffect": ()=>{
            healingRef.current = isHealing;
        }
    }["StreamingTerminal.useEffect"], [
        isHealing
    ]);
    // Consume new lines injected from parent (append only new ones)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StreamingTerminal.useEffect": ()=>{
            if (injectLines.length > prevInjectLen.current) {
                const newOnes = injectLines.slice(prevInjectLen.current);
                prevInjectLen.current = injectLines.length;
                newOnes.forEach({
                    "StreamingTerminal.useEffect": (l)=>push(l)
                }["StreamingTerminal.useEffect"]);
            }
        }
    }["StreamingTerminal.useEffect"], [
        injectLines,
        push
    ]);
    // Auto-scroll to bottom
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StreamingTerminal.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["StreamingTerminal.useEffect"], [
        lines
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "panel-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "panel-label",
                        children: "Autonomous Streaming Terminal"
                    }, void 0, false, {
                        fileName: "[project]/src/components/StreamingTerminal.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: 9,
                            color: isHealing ? "var(--amber)" : "var(--emerald)",
                            letterSpacing: "0.06em",
                            transition: "color 0.3s"
                        },
                        children: isHealing ? "⚡ HEALING" : "● LIVE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/StreamingTerminal.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/StreamingTerminal.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "terminal-body",
                suppressHydrationWarning: true,
                children: [
                    lines.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "terminal-line",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "t-ts",
                                    children: l.ts
                                }, void 0, false, {
                                    fileName: "[project]/src/components/StreamingTerminal.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `t-agent ${l.agentClass}`,
                                    children: l.agent
                                }, void 0, false, {
                                    fileName: "[project]/src/components/StreamingTerminal.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `t-msg ${l.msgClass}`,
                                    children: l.msg
                                }, void 0, false, {
                                    fileName: "[project]/src/components/StreamingTerminal.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, l.id, true, {
                            fileName: "[project]/src/components/StreamingTerminal.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: bottomRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/StreamingTerminal.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "terminal-cursor"
                    }, void 0, false, {
                        fileName: "[project]/src/components/StreamingTerminal.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/StreamingTerminal.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/StreamingTerminal.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_s(StreamingTerminal, "87srlPEHp8QSS8x7ZvyA9wHhlmw=");
_c = StreamingTerminal;
var _c;
__turbopack_context__.k.register(_c, "StreamingTerminal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/StreamingTerminal.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/StreamingTerminal.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_StreamingTerminal_tsx_0clh6.~._.js.map