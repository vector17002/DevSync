"use client"
import { useState } from "react";

export default function Invite( { url } : { url : string}) {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-lg font-bold mb-3">Invite Your Friends</h1>
      <div className="w-full max-w-md p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex flex-col gap-3">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Share this invite link with your friends:
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 p-2 border text-sm rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-900 focus:outline-none"
          />
          <button
            onClick={handleCopyToClipboard}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}