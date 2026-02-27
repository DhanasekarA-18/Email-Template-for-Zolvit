"use client";

const InputComponent = ({
  placeholder,
  type = "text",
  label = "",
  value = "",
  onChange,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#818cf8",
            letterSpacing: "0.6px",
            textTransform: "uppercase",
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          width: "100%",
          padding: "9px 12px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(99,102,241,0.25)",
          borderRadius: "8px",
          color: "#e2e8f0",
          fontSize: "13px",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "rgba(99,102,241,0.7)";
          e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
          e.target.style.background = "rgba(99,102,241,0.07)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(99,102,241,0.25)";
          e.target.style.boxShadow = "none";
          e.target.style.background = "rgba(255,255,255,0.05)";
        }}
      />
    </div>
  );
};

export default InputComponent;
