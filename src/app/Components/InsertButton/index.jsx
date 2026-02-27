"use client";

const InsertButton = ({ name, checked, onChange, label = "", icon = "✦" }) => {
  return (
    <label
      htmlFor={name}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        borderRadius: "10px",
        background: checked
          ? "rgba(99,102,241,0.08)"
          : "rgba(255,255,255,0.03)",
        border: checked
          ? "1px solid rgba(99,102,241,0.25)"
          : "1px solid rgba(255,255,255,0.06)",
        marginBottom: "8px",
        cursor: "pointer",
        transition: "background 0.2s, border-color 0.2s",
        userSelect: "none",
      }}
    >
      {/* Label */}
      <span
        style={{
          fontSize: "13px",
          color: checked ? "#c7d2fe" : "#94a3b8",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "color 0.2s",
        }}
      >
        <span style={{ fontSize: "15px" }}>{icon}</span>
        {label}
      </span>

      {/* Toggle Switch */}
      <span style={{ position: "relative", width: "36px", height: "20px", flexShrink: 0 }}>
        <input
          type="checkbox"
          id={name}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          style={{ display: "none" }}
        />
        {/* Track */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "20px",
            background: checked
              ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
              : "rgba(255,255,255,0.1)",
            border: checked ? "none" : "1px solid rgba(255,255,255,0.1)",
            transition: "background 0.25s",
          }}
        />
        {/* Thumb */}
        <span
          style={{
            position: "absolute",
            top: "3px",
            left: checked ? "18px" : "3px",
            width: "14px",
            height: "14px",
            background: checked ? "#fff" : "#64748b",
            borderRadius: "50%",
            transition: "left 0.25s, background 0.25s",
            boxShadow: checked ? "0 1px 6px rgba(99,102,241,0.5)" : "none",
          }}
        />
      </span>
    </label>
  );
};

export default InsertButton;
