"use client";

import CodeEditor from "../CodeEditor";

const Footer = ({ value, onChange }) => {
  return (
    <CodeEditor
      value={value}
      onChange={onChange}
      label="Footer · HTML"
    />
  );
};

export default Footer;
