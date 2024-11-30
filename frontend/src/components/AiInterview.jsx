import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';

const AiInterview = () => {
  const [iframeSrc, setIframeSrc] = useState("http://localhost:3000/dashboard");

  useEffect(() => {
    const handleIframeNavigation = (event) => {
      // Only listen to messages from App 1
      if (event.origin !== "http://localhost:3000") return;

      const { action, url } = event.data;
      if (action === "navigate") {
        setIframeSrc(url); // Update the iframe's src to the new URL
      }
    };

    window.addEventListener("message", handleIframeNavigation);
    return () => {
      window.removeEventListener("message", handleIframeNavigation);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-9xl mx-20 mt-5" style={{ overflow: "hidden" }}>
        <iframe
          src={iframeSrc}
          width="100%"
          height="100%"
          style={{
            height: "80vh",
            overflow: "hidden",
          }}
          allow="camera; microphone; autoplay; encrypted-media"
        />
      </div>
    </div>
  );
};

export default AiInterview;
