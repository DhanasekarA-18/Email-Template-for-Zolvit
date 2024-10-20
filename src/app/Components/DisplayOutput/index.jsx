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
    <div className="h-[100dvh] overflow-y-auto">
      <div>
        <label>
          <input
            type="radio"
            value="html"
            checked={outputType === "html"}
            onChange={() => setOutputType("html")}
          />
          HTML
        </label>
        <label>
          <input
            type="radio"
            value="parsed"
            checked={outputType === "parsed"}
            onChange={() => setOutputType("parsed")}
          />
          Parsed
        </label>
      </div>
      <button className="bg-blue-900 p-3 rounded mb-2" onClick={handleCopy}>
        Copy Code
      </button>
      <button
        className="bg-green-600 p-3 rounded mb-2"
        onClick={handleDownload}
      >
        Download Code
      </button>

      {/* Email input and button */}
      <div className="my-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="border p-2 mb-2 w-[250px]"
          disabled={emailLoader}
        />
        <button
          className="bg-purple-700 p-3 rounded mb-2 w-[200px]"
          onClick={handleSendEmail}
          disabled={emailLoader}
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
