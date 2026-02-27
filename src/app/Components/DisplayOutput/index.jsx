"use client";

import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import beautify from "js-beautify";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import s from "./DisplayOutput.module.css";

/* ── Icon helpers ── */
const IconWeb = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
);
const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
);
const IconMoon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
);
const IconSun = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
);
const IconCopy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
const IconDownload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IconSend = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Main component ── */
const DisplayOutput = ({ result }) => {
  const [outputType, setOutputType] = useState("web"); // web | phone | html
  const [theme, setTheme] = useState("light"); // light | dark
  const [email, setEmail] = useState("selvamani@vakilsearch.com");
  const [emailLoader, setEmailLoader] = useState(false);
  const [copied, setCopied] = useState(false);

  const formattedResult = beautify.html(result, {
    indent_size: 2,
    space_in_empty_paren: true,
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formattedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([formattedResult], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-template.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSendEmail = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    setEmailLoader(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, htmlContent: formattedResult, codeContent: formattedResult }),
      });
      toast.success("Email sent successfully! 🎉");
    } catch {
      toast.error("Error sending email.");
    } finally {
      setEmailLoader(false);
    }
  };

  return (
    <div>
      {/* Tab Pills */}
      <div className={s.tabsHeader}>
        <div className={s.tabs}>
          <button
            className={`${s.tab} ${outputType === "web" ? s.active : ""}`}
            onClick={() => setOutputType("web")}
          >
            <IconWeb /> Web
          </button>
          <button
            className={`${s.tab} ${outputType === "phone" ? s.active : ""}`}
            onClick={() => setOutputType("phone")}
          >
            <IconPhone /> Phone
          </button>
          <button
            className={`${s.tab} ${outputType === "html" ? s.active : ""}`}
            onClick={() => setOutputType("html")}
          >
            {"</>"} Code
          </button>
        </div>

        {/* {outputType !== "html" && (
          <button
            className={s.themeBtn}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            title="Toggle light/dark mode"
          >
            {theme === "light" ? <IconMoon /> : <IconSun />}
          </button>
        )} */}
      </div>

      {/* Action Toolbar */}
      <div className={s.toolbar}>
        <button
          className={`${s.btn} ${s.btnCopy} ${copied ? s.copied : ""}`}
          onClick={handleCopy}
        >
          {copied ? <IconCheck /> : <IconCopy />}
          {copied ? "Copied!" : "Copy Code"}
        </button>
        <button className={`${s.btn} ${s.btnDownload}`} onClick={handleDownload}>
          <IconDownload />
          Download .html
        </button>
      </div>

      {/* Send Email Row */}
      <div className={s.sendRow}>
        <span className={s.sendRowLabel}>📨 Send test email</span>
        <input
          className={s.emailInput}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter recipient email"
          disabled={emailLoader}
        />
        <button
          className={`${s.btn} ${s.btnSend}`}
          onClick={handleSendEmail}
          disabled={emailLoader}
          title="Send a test email"
        >
          {emailLoader ? (
            <><Spinner /> Sending…</>
          ) : (
            <><IconSend /> Send</>
          )}
        </button>
      </div>

      {/* Output Area */}
      {outputType === "html" ? (
        <div className={s.codeBox}>
          <pre><code>{formattedResult}</code></pre>
        </div>
      ) : (
        <div className={`${s.previewContainer} ${outputType === "phone" ? s.isPhone : s.isWeb}`}>
          <div className={`${s.previewBox} ${theme === "dark" ? s.darkTheme : s.lightTheme}`}>
            {outputType === "phone" && <div className={s.notch}></div>}
            <div
              className={s.previewBoxInner}
              dangerouslySetInnerHTML={{
                __html: typeof window !== 'undefined' ? DOMPurify.sanitize(formattedResult) : formattedResult
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOutput;
