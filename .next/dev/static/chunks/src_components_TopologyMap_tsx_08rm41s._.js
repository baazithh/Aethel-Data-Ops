(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/TopologyMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TopologyMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function TopologyMap({ isHealing }) {
    _s();
    const [pathState, setPathState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("healthy");
    const [animOffset, setAnimOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Advance dash offset for flowing animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopologyMap.useEffect": ()=>{
            const id = setInterval({
                "TopologyMap.useEffect.id": ()=>{
                    setAnimOffset({
                        "TopologyMap.useEffect.id": (v)=>(v + 2) % 60
                    }["TopologyMap.useEffect.id"]);
                }
            }["TopologyMap.useEffect.id"], 60);
            return ({
                "TopologyMap.useEffect": ()=>clearInterval(id)
            })["TopologyMap.useEffect"];
        }
    }["TopologyMap.useEffect"], []);
    // Respond to healing state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopologyMap.useEffect": ()=>{
            if (isHealing) {
                setPathState("healing");
            } else {
                // Allow a brief "recovering" flash before going healthy
                if (pathState === "healing") {
                    setPathState("recovering");
                    const t = setTimeout({
                        "TopologyMap.useEffect.t": ()=>setPathState("healthy")
                    }["TopologyMap.useEffect.t"], 1500);
                    return ({
                        "TopologyMap.useEffect": ()=>clearTimeout(t)
                    })["TopologyMap.useEffect"];
                }
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["TopologyMap.useEffect"], [
        isHealing
    ]);
    const edgeColor = pathState === "healthy" ? "#10b981" : pathState === "healing" ? "#f59e0b" : "#34d399";
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
            dotColor: pathState === "healthy" ? "#10b981" : pathState === "healing" ? "#f59e0b" : "#34d399"
        },
        {
            id: "engine",
            x: 256,
            y: 130,
            w: 168,
            h: 56,
            label: "Transformation",
            sub: "[Self-Healing Engine]",
            dotColor: pathState === "healing" ? "#f59e0b" : "#10b981"
        },
        {
            id: "iceberg",
            x: 472,
            y: 130,
            w: 148,
            h: 56,
            label: "Target Lakehouse",
            sub: "[Apache Iceberg]",
            dotColor: "#10b981"
        }
    ];
    // Edge midpoints
    const edge1 = {
        x1: 208,
        y1: 158,
        x2: 256,
        y2: 158
    };
    const edge2 = {
        x1: 424,
        y1: 158,
        x2: 472,
        y2: 158
    };
    const statusLabel = pathState === "healing" ? "Transformation anomaly — AI intervention active" : pathState === "recovering" ? "Recovering routing paths…" : "All pipeline paths nominal";
    const statusColor = pathState === "healing" ? "var(--amber)" : pathState === "recovering" ? "#34d399" : "var(--emerald)";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "panel topology-panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "panel-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "panel-label",
                        children: "Infrastructure Topology"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TopologyMap.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: 9,
                            color: statusColor,
                            letterSpacing: "0.06em",
                            transition: "color 0.4s"
                        },
                        children: pathState === "healing" ? "⚡ ANOMALY ACTIVE" : "● LIVE VIEW"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TopologyMap.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TopologyMap.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "topology-body",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    viewBox: "0 0 680 310",
                    className: "topology-svg",
                    "aria-label": "Pipeline Topology",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: glowId,
                                    x: "-40%",
                                    y: "-40%",
                                    width: "180%",
                                    height: "180%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                            stdDeviation: "3",
                                            result: "blur"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/TopologyMap.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "blur"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TopologyMap.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "SourceGraphic"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/TopologyMap.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/TopologyMap.tsx",
                                            lineNumber: 120,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/TopologyMap.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                                    id: "arrow-healthy",
                                    markerWidth: "8",
                                    markerHeight: "8",
                                    refX: "7",
                                    refY: "3",
                                    orient: "auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M0,0 L0,6 L8,3 z",
                                        fill: "#10b981"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TopologyMap.tsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TopologyMap.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                                    id: "arrow-healing",
                                    markerWidth: "8",
                                    markerHeight: "8",
                                    refX: "7",
                                    refY: "3",
                                    orient: "auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M0,0 L0,6 L8,3 z",
                                        fill: "#f59e0b"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TopologyMap.tsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TopologyMap.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/TopologyMap.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        nodes.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: n.x,
                                        y: n.y,
                                        width: n.w,
                                        height: n.h,
                                        rx: 6,
                                        fill: "#1a1a1a",
                                        stroke: n.id === "engine" && pathState === "healing" ? "#78350f" : "#262626",
                                        strokeWidth: 1,
                                        style: {
                                            transition: "stroke 0.4s ease"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TopologyMap.tsx",
                                        lineNumber: 137,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: n.x + 12,
                                        cy: n.y + 12,
                                        r: 4,
                                        fill: n.dotColor,
                                        style: {
                                            transition: "fill 0.4s ease"
                                        },
                                        filter: `url(#${glowId})`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TopologyMap.tsx",
                                        lineNumber: 153,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                        x: n.x + n.w / 2,
                                        y: n.y + 22,
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 11,
                                        fontWeight: 600,
                                        fill: "#f5f5f5",
                                        textAnchor: "middle",
                                        dominantBaseline: "middle",
                                        children: n.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TopologyMap.tsx",
                                        lineNumber: 161,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                        x: n.x + n.w / 2,
                                        y: n.y + 38,
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 8.5,
                                        fill: "#525252",
                                        textAnchor: "middle",
                                        dominantBaseline: "middle",
                                        children: n.sub
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TopologyMap.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, n.id, true, {
                                fileName: "[project]/src/components/TopologyMap.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: edge1.x1,
                            y1: edge1.y1,
                            x2: edge1.x2,
                            y2: edge1.y2,
                            stroke: edgeColor,
                            strokeWidth: 2,
                            strokeDasharray: "6 4",
                            strokeDashoffset: -animOffset,
                            markerEnd: `url(#arrow-${pathState === "healing" ? "healing" : "healthy"})`,
                            filter: `url(#${glowId})`,
                            style: {
                                transition: "stroke 0.4s ease"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/TopologyMap.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: edge2.x1,
                            y1: edge2.y1,
                            x2: edge2.x2,
                            y2: edge2.y2,
                            stroke: pathState === "healing" ? "#f59e0b" : edgeColor,
                            strokeWidth: 2,
                            strokeDasharray: "6 4",
                            strokeDashoffset: -animOffset,
                            markerEnd: `url(#arrow-${pathState === "healing" ? "healing" : "healthy"})`,
                            filter: `url(#${glowId})`,
                            style: {
                                transition: "stroke 0.4s ease"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/TopologyMap.tsx",
                            lineNumber: 203,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: 232,
                            y: 148,
                            fontFamily: "var(--font-mono)",
                            fontSize: 8,
                            fill: edgeColor,
                            textAnchor: "middle",
                            style: {
                                transition: "fill 0.4s"
                            },
                            children: "──▶"
                        }, void 0, false, {
                            fileName: "[project]/src/components/TopologyMap.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: 448,
                            y: 148,
                            fontFamily: "var(--font-mono)",
                            fontSize: 8,
                            fill: pathState === "healing" ? "#f59e0b" : edgeColor,
                            textAnchor: "middle",
                            style: {
                                transition: "fill 0.4s"
                            },
                            children: "──▶"
                        }, void 0, false, {
                            fileName: "[project]/src/components/TopologyMap.tsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            x: 60,
                            y: 220,
                            width: 560,
                            height: 28,
                            rx: 4,
                            fill: "#1a1a1a",
                            stroke: "#1f1f1f",
                            strokeWidth: 1
                        }, void 0, false, {
                            fileName: "[project]/src/components/TopologyMap.tsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: 78,
                            cy: 234,
                            r: 4,
                            fill: statusColor,
                            style: {
                                transition: "fill 0.4s"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/TopologyMap.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: 90,
                            y: 234,
                            fontFamily: "var(--font-mono)",
                            fontSize: 9,
                            fill: statusColor,
                            dominantBaseline: "middle",
                            style: {
                                transition: "fill 0.4s"
                            },
                            children: statusLabel
                        }, void 0, false, {
                            fileName: "[project]/src/components/TopologyMap.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        [
                            {
                                x: 60 + 74,
                                label: "4,218 ev/s"
                            },
                            {
                                x: 256 + 84,
                                label: pathState === "healing" ? "PATCHING…" : "99.98% SLA"
                            },
                            {
                                x: 472 + 74,
                                label: "14 tables"
                            }
                        ].map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: m.x,
                                y: 206,
                                fontFamily: "var(--font-mono)",
                                fontSize: 8.5,
                                fill: i === 1 && pathState === "healing" ? "#f59e0b" : "#525252",
                                textAnchor: "middle",
                                style: {
                                    transition: "fill 0.4s"
                                },
                                children: m.label
                            }, i, false, {
                                fileName: "[project]/src/components/TopologyMap.tsx",
                                lineNumber: 238,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/TopologyMap.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/TopologyMap.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TopologyMap.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s(TopologyMap, "XoF0AiaKb8AAm5cpQD9GhIVQqBQ=");
_c = TopologyMap;
var _c;
__turbopack_context__.k.register(_c, "TopologyMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TopologyMap.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/TopologyMap.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_TopologyMap_tsx_08rm41s._.js.map