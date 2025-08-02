import { useState } from "react";
import { GeoGebraPanel } from "./components/GeoGebraPanel";
import { ChatGPTPanel } from "./components/ChatGPTPanel";

export default function App() {
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem("openai-api-key"));

  const handleApiKey = () => {
    const key = prompt("Enter your OpenAI API Key:");
    if (key) {
      localStorage.setItem("openai-api-key", key);
      setApiKey(key);
    }
  };

  if (!apiKey) handleApiKey();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <GeoGebraPanel />
      <ChatGPTPanel apiKey={apiKey!} />
    </div>
  );
}
