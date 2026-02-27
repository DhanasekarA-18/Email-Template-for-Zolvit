"use client";

import CodeEditor from "../CodeEditor";

const Header = ({ value, onChange }) => {
  return (
    <CodeEditor
      value={value}
      onChange={onChange}
      label="Header · HTML"
    />
  );
};

export default Header;
