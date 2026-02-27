"use client";

import { useEffect, useRef, useState } from "react";
import s from "./Loader.module.css";

/* Loading stages shown in the status line */
const STAGES = [
  { at: 0, label: "Initialising engine…" },
  { at: 20, label: "Loading components…" },
  { at: 45, label: "Building template core…" },
  { at: 65, label: "Applying styles…" },
  { at: 82, label: "Finalising workspace…" },
  { at: 96, label: "Almost there…" },
];

const DURATION_MS = 4400; // matches CSS animation-delay on overlay

const Loader = () => {
  const [percent, setPercent] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  /* Ease-out cubic so it slows near 100 */
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const raw = Math.min(elapsed / DURATION_MS, 1);
      const eased = easeOut(raw);
      setPercent(Math.floor(eased * 100));
      if (raw < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* Pick current stage label */
  const stageLabel = [...STAGES]
    .reverse()
    .find((st) => percent >= st.at)?.label ?? STAGES[0].label;

  return (
    <div className={s.overlay}>
      {/* Ambient orbs */}
      <div className={`${s.orb} ${s.orb1}`} />
      <div className={`${s.orb} ${s.orb2}`} />
      <div className={`${s.orb} ${s.orb3}`} />

      {/* Branded card */}
      <div className={s.card}>

        {/* Logo row */}
        <div className={s.logoRow}>
          <div className={s.logoIcon}>✉️</div>
          <div className={s.logoText}>
            <span className={s.logoBrand}>Zolvit</span>
            <span className={s.logoProduct}>Email Template</span>
          </div>
        </div>

        {/* Stage status */}
        <p className={s.statusText}>
          <span className={s.statusHighlight}>{stageLabel}</span>
        </p>

        {/* Progress bar */}
        <div className={s.progressWrap}>
          <div
            className={s.progressBar}
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Percent + dots */}
        <div className={s.percentRow}>
          <span className={s.percentValue}>{percent}%</span>
          <div className={s.percentDots}>
            <span className={s.dot} />
            <span className={s.dot} />
            <span className={s.dot} />
          </div>
        </div>

        {/* Footer */}
        <div className={s.footer}>
          <div className={s.footerAvatar}>DA</div>
          <span className={s.footerText}>
            Developed by{" "}
            <span className={s.footerName}>Dhanasekar A</span>
          </span>
        </div>

      </div>
    </div>
  );
};

export default Loader;
