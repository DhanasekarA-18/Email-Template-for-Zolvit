"use client";
import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import React Quill styles
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // This ensures the component is not SSR'd
});
const CustomReactQuill = ({ editorData, setEditorData }) => {
  return (
    <div className="bg-[#fff]">
      <ReactQuill
        value={editorData}
        onChange={(value) => {
          setEditorData(value);
          console.log(value);
        }}
      />
    </div>
  );
};

export default CustomReactQuill;
