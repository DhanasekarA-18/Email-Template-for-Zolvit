import React, { useState } from "react";
import Spinner from "../Spinner";

const DisplayOutput = ({ result }) => {
  const [outputType, setOutputType] = useState("parsed"); // Default to Parsed
  const [email, setEmail] = useState("selvamani@vakilsearch.com"); // State for email input
  const [emailLoader, setEmailLoader] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    alert("Code copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSendEmail = async () => {
    if (!email) {
      alert("Please enter an email address");
      return;
    }

    setEmailLoader(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          htmlContent: result,
          codeContent: result,
        }),
      });

      if (response.ok) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email");
    } finally {
      setEmailLoader(false);
    }
  };

  return (
    <div className="h-[100dvh] overflow-y-auto max-w-[600px]">
      <div className="flex gap-2">
        <label className="cursor-pointer">
          <input
            type="radio"
            value="html"
            checked={outputType === "html"}
            onChange={() => setOutputType("html")}
            className="cursor-pointer"
          />
          HTML
        </label>
        <label className="cursor-pointer">
          <input
            type="radio"
            value="parsed"
            checked={outputType === "parsed"}
            onChange={() => setOutputType("parsed")}
            className="cursor-pointer"
          />
          Parsed
        </label>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-blue-900 p-3 rounded mb-2 text-[#fff] font-semibold"
          onClick={handleCopy}
        >
          Copy Code
        </button>
        <button
          className="bg-green-600 p-3 rounded mb-2  text-[#fff] font-semibold "
          onClick={handleDownload}
        >
          Download Code
        </button>
      </div>
      {/* Email input and button */}
      <div className="my-2 flex items-center gap-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className={`border p-2 mb-2 w-[250px] rounded ${
            emailLoader ? "cursor-not-allowed" : ""
          }`}
          disabled={emailLoader}
        />
        <button
          className="bg-purple-700 rounded mb-2 w-[200px] h-[41px] text-center text-[#fff] font-semibold"
          onClick={handleSendEmail}
          disabled={emailLoader}
          title="Send Email to your email address"
        >
          {emailLoader ? `Sending` : "Send"}
          {emailLoader && <Spinner />}
        </button>
      </div>

      {outputType === "parsed" ? (
        <div dangerouslySetInnerHTML={{ __html: result }} />
      ) : (
        <div>
          <pre>
            <code>{result}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default DisplayOutput;
