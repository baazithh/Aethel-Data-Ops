(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/CognitiveChatCopilot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CognitiveChatCopilot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const MOCK_RESPONSES = {
    default: {
        id: 0,
        role: "assistant",
        text: "I'm monitoring your pipelines in real time. Everything looks nominal at the moment. Could you be more specific about what you'd like to know?",
        status: "Processing complete"
    },
    health: {
        id: 0,
        role: "assistant",
        text: "Your pipelines are healthy. All 14 data streams are processing normally, and the self-healing engine resolved 2 minor schema inconsistencies in the last hour without any manual intervention.",
        status: "Health check complete"
    },
    pipeline: {
        id: 0,
        role: "assistant",
        text: "All pipelines are operating within normal parameters. The Kafka ingestion layer is processing ~4,200 events/sec, and the Iceberg lakehouse is being updated every 90 seconds. No backlog detected.",
        status: "Pipeline status retrieved"
    },
    crash: {
        id: 0,
        role: "assistant",
        text: "I've detected the anomaly. The self-healing engine has already isolated the affected stream partition and is generating a corrective code patch. Expect full recovery within 15–30 seconds. No data has been lost.",
        status: "Autonomous recovery initiated"
    },
    table: {
        id: 0,
        role: "assistant",
        text: "Understood. I'm provisioning a new analytical table in the Iceberg lakehouse now. The schema will be inferred from your most recent 24 hours of event data. It'll be query-ready in approximately 2 minutes.",
        status: "Table provisioning in progress..."
    },
    update: {
        id: 0,
        role: "assistant",
        text: "The unexpected website update was detected by the ingestion monitor. The source schema differed by 3 fields. The AI automatically adapted the transformation logic and the data continued flowing without interruption.",
        status: "Schema adaptation logged"
    }
};
function matchResponse(input) {
    const q = input.toLowerCase();
    if (q.match(/health|status|ok|fine|running/)) return MOCK_RESPONSES.health;
    if (q.match(/pipeline|stream|kafka|flow|lag/)) return MOCK_RESPONSES.pipeline;
    if (q.match(/crash|fail|broken|error|down/)) return MOCK_RESPONSES.crash;
    if (q.match(/table|create|spin.?up|provision|new/)) return MOCK_RESPONSES.table;
    if (q.match(/website|source|upstream|update|change/)) return MOCK_RESPONSES.update;
    return MOCK_RESPONSES.default;
}
const INITIAL_MESSAGES = [
    {
        id: 1,
        role: "system",
        text: "Aethel Copilot is your autonomous infrastructure assistant. Ask me anything about pipeline health, data freshness, upstream source changes, or request me to provision new analytical tables — all in plain language."
    }
];
let msgIdCounter = 100;
function CognitiveChatCopilot() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INITIAL_MESSAGES);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [thinking, setThinking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CognitiveChatCopilot.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["CognitiveChatCopilot.useEffect"], [
        messages,
        thinking
    ]);
    const send = ()=>{
        if (!input.trim() || thinking) return;
        const userMsg = {
            id: msgIdCounter++,
            role: "user",
            text: input.trim()
        };
        const query = input.trim();
        setInput("");
        setMessages((prev)=>[
                ...prev,
                userMsg
            ]);
        setThinking(true);
        setTimeout(()=>{
            const reply = matchResponse(query);
            setMessages((prev)=>[
                    ...prev,
                    {
                        ...reply,
                        id: msgIdCounter++
                    }
                ]);
            setThinking(false);
        }, 1400);
    };
    const handleKey = (e)=>{
        if (e.key === "Enter") send();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "panel chat-panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "panel-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "panel-label",
                        children: "Cognitive Chat Copilot"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 9,
                            fontFamily: "var(--font-mono)",
                            color: "var(--emerald)",
                            letterSpacing: "0.06em"
                        },
                        children: "● ONLINE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chat-messages",
                children: [
                    messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `chat-bubble ${msg.role}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bubble-sender",
                                    children: msg.role === "system" ? "System" : msg.role === "user" ? "You" : "Aethel AI"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this),
                                msg.text,
                                msg.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "chat-status",
                                    children: msg.status
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, msg.id, true, {
                            fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this)),
                    thinking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "chat-bubble assistant",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bubble-sender",
                                children: "Aethel AI"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                                lineNumber: 135,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "var(--text-muted)",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 11
                                },
                                children: [
                                    "Analyzing",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            animation: "dotBlink 0.8s step-end infinite",
                                            display: "inline-block"
                                        },
                                        children: [
                                            " ",
                                            "..."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                                        lineNumber: 138,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: bottomRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chat-input-area",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "chat-input",
                        placeholder: "Ask about pipeline health, schema changes, or request new tables…",
                        value: input,
                        onChange: (e)=>setInput(e.target.value),
                        onKeyDown: handleKey,
                        disabled: thinking,
                        id: "chat-input"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "chat-send-btn",
                        onClick: send,
                        disabled: thinking || !input.trim(),
                        id: "chat-send-btn",
                        children: "Send"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CognitiveChatCopilot.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
_s(CognitiveChatCopilot, "yqRr9T2PGeJWnBwVsFxtUaTt0ds=");
_c = CognitiveChatCopilot;
var _c;
__turbopack_context__.k.register(_c, "CognitiveChatCopilot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CognitiveChatCopilot.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/CognitiveChatCopilot.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_CognitiveChatCopilot_tsx_0h_1crg._.js.map