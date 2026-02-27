"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import s from "./CodeEditor.module.css";

/* Load CodeMirror only on the client (no SSR) */
const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
    ssr: false,
    loading: () => (
        <div style={{ padding: "14px 16px", color: "#444c56", fontSize: 12 }}>
            Loading editor…
        </div>
    ),
});

/* ── tiny HTML tokeniser for CRT highlight ── */
function tokeniseHtml(raw) {
    if (!raw) return null;

    const parts = [];
    let i = 0;

    while (i < raw.length) {
        /* HTML comment */
        if (raw.startsWith("<!--", i)) {
            const end = raw.indexOf("-->", i + 4);
            const slice = end === -1 ? raw.slice(i) : raw.slice(i, end + 3);
            parts.push(<span key={i} className={s.crtCmt}>{slice}</span>);
            i += slice.length;
            continue;
        }

        /* opening / closing / self-closing tag */
        if (raw[i] === "<") {
            const end = raw.indexOf(">", i);
            if (end === -1) { parts.push(raw.slice(i)); break; }
            const tagStr = raw.slice(i + 1, end); // inside < >
            const closeSlash = tagStr.startsWith("/");
            const selfClose = tagStr.endsWith("/");
            const inner = tagStr.replace(/^\//, "").replace(/\/$/, "").trim();

            /* split tag name from attributes */
            const spaceIdx = inner.search(/\s/);
            const tagName = spaceIdx === -1 ? inner : inner.slice(0, spaceIdx);
            const attrStr = spaceIdx === -1 ? "" : inner.slice(spaceIdx);

            /* tokenise attributes */
            const attrParts = [];
            const attrReg = /(\s+)([\w-]+)(=["']([^"']*)["'])?/g;
            let m;
            let last = 0;
            while ((m = attrReg.exec(attrStr)) !== null) {
                if (m.index > last) attrParts.push(attrStr.slice(last, m.index));
                attrParts.push(
                    <span key={`a${attrParts.length}`}>
                        {m[1]}
                        <span className={s.crtAttr}>{m[2]}</span>
                        {m[3] ? (
                            <>
                                {"="}
                                <span className={s.crtVal}>{`"${m[4]}"`}</span>
                            </>
                        ) : null}
                    </span>
                );
                last = m.index + m[0].length;
            }
            if (last < attrStr.length) attrParts.push(attrStr.slice(last));

            parts.push(
                <span key={i}>
                    {"<"}
                    {closeSlash && "/"}
                    <span className={s.crtTag}>{tagName}</span>
                    {attrParts}
                    {selfClose && "/"}
                    {">"}
                </span>
            );

            i = end + 1;
            continue;
        }

        /* plain text until next tag */
        const next = raw.indexOf("<", i);
        const text = next === -1 ? raw.slice(i) : raw.slice(i, next);
        parts.push(<span key={i}>{text}</span>);
        i += text.length;
    }

    return parts;
}

/* ── detect unclosed tags ── */
function getUnclosedTags(code) {
    const voidTags = new Set([
        "area", "base", "br", "col", "embed", "hr", "img",
        "input", "link", "meta", "param", "source", "track", "wbr",
    ]);
    const stack = [];
    const tagReg = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
    let m;
    while ((m = tagReg.exec(code)) !== null) {
        const full = m[0];
        const name = m[1].toLowerCase();
        if (voidTags.has(name)) continue;
        if (full.startsWith("</")) {
            const idx = stack.lastIndexOf(name);
            if (idx !== -1) stack.splice(idx, 1);
        } else if (!full.endsWith("/>")) {
            stack.push(name);
        }
    }
    return stack;
}

/* ─────────────── main component ─────────────── */
const CodeEditor = ({ value = "", onChange, label = "HTML" }) => {
    const [view, setView] = useState("code"); // "code" | "crt"
    const [editorHeight, setEditorHeight] = useState(240); // px
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startH = useRef(0);

    const unclosed = useMemo(() => getUnclosedTags(value), [value]);
    const crtTokens = useMemo(() => tokeniseHtml(value), [value]);
    const lineCount = (value.match(/\n/g) || []).length + 1;
    const charCount = value.length;

    /* ── Resize drag handlers ── */
    const onMouseDown = useCallback((e) => {
        isDragging.current = true;
        startY.current = e.clientY;
        startH.current = editorHeight;
        document.body.style.cursor = "ns-resize";
        document.body.style.userSelect = "none";

        const onMove = (ev) => {
            if (!isDragging.current) return;
            const delta = ev.clientY - startY.current;
            const next = Math.max(120, startH.current + delta);
            setEditorHeight(next);
        };
        const onUp = () => {
            isDragging.current = false;
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    }, [editorHeight]);

    return (
        <div className={s.wrap}>

            {/* ── Tab / title bar ── */}
            <div className={s.tabBar}>
                <div className={s.tabLeft}>
                    <span className={s.trafficDot} />
                    <span className={s.trafficDot} />
                    <span className={s.trafficDot} />
                    <span className={s.tabLabel}>{label}</span>
                </div>
                <div className={s.tabRight}>
                    <button
                        className={`${s.viewBtn} ${view === "code" ? s.active : ""}`}
                        onClick={() => setView("code")}
                    >
                        &lt;/&gt; Code
                    </button>
                    <button
                        className={`${s.viewBtn} ${view === "crt" ? s.active : ""}`}
                        onClick={() => setView("crt")}
                    >
                        📺 CRT View
                    </button>
                </div>
            </div>

            {/* ── Editor or CRT ── */}
            {view === "code" ? (
                <div className={s.editorWrap}>
                    <CodeMirror
                        value={value}
                        extensions={[html()]}
                        theme={oneDark}
                        height={`${editorHeight}px`}
                        onChange={(val) => onChange?.({ target: { value: val } })}
                        basicSetup={{
                            lineNumbers: true,
                            foldGutter: true,
                            highlightActiveLine: true,
                            highlightSelectionMatches: true,
                            autocompletion: true,
                            bracketMatching: true,
                            closeBrackets: true,
                            indentOnInput: true,
                        }}
                    />
                </div>
            ) : (
                <div className={s.crtWrap} style={{ height: editorHeight }}>
                    <pre className={s.crtScreen}>
                        {crtTokens && crtTokens.length > 0 ? crtTokens : (
                            <span style={{ color: "#3d5a4d", fontStyle: "italic" }}>
                                {"// nothing to display yet…"}
                            </span>
                        )}
                    </pre>
                </div>
            )}

            {/* ── Resize handle ── */}
            <div
                className={s.resizeHandle}
                onMouseDown={onMouseDown}
                title="Drag to resize editor"
            >
                <span className={s.resizeDots} />
            </div>

            {/* ── Status bar ── */}
            <div className={s.statusBar}>
                <div className={s.statusLeft}>
                    {/* Tag validation status */}
                    {unclosed.length === 0 ? (
                        <span className={`${s.statusTag} ${s.tagOk}`}>
                            ✓ All tags closed
                        </span>
                    ) : (
                        <span className={s.tagWarnBadge}>
                            ⚠ Unclosed: {unclosed.join(", ")}
                        </span>
                    )}
                    <span style={{ color: "#444c56" }}>│</span>
                    <span>{lineCount} lines</span>
                    <span style={{ color: "#444c56" }}>│</span>
                    <span>{charCount} chars</span>
                </div>
                <span className={s.statusRight}>HTML · UTF-8</span>
            </div>

        </div>
    );
};

export default CodeEditor;
