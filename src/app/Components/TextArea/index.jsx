import React from "react";

const TextArea = ({
  value,
  onChange,
  placeholder = "Enter text here...",
  rows = 5,
  cols = 40,
  className = "",
  ...props
}) => {
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        className={`p-2 border rounded-lg ${className}`}
        {...props}
      />
    </div>
  );
};

export default TextArea;
