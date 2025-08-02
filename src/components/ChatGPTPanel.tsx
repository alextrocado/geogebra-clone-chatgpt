import { useState } from "react";

interface Props {
  apiKey: string;
}

export function ChatGPTPanel({ apiKey }: Props) {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const sendToGPT = async () => {
    const messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that receives geometry requests and returns JSXGraph-compatible JavaScript commands in a JSON array under the key 'commands'."
      },
      {
        role: "user",
        content: input
      }
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages,
        temperature: 0.3
      })
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return;

    setLog((prev) => [...prev, `> ${input}`, content]);
    setInput("");

    try {
      const parsed = JSON.parse(content);
      parsed.commands.forEach((cmd: string) => {
        eval(`(function() { ${cmd}; })()`);
      });
    } catch (e) {
      console.error("Invalid command or JSON", e);
    }
  };

  return (
    <div style={{ width: "40%", height: "100%", padding: "10px", overflow: "auto" }}>
      <div style={{ height: "90%", overflowY: "auto", border: "1px solid #ccc", padding: "5px" }}>
        {log.map((entry, i) => (
          <pre key={i}>{entry}</pre>
        ))}
      </div>
      <input
        style={{ width: "80%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendToGPT()}
        placeholder="Ex: desenha um círculo com centro em A e raio 3"
      />
      <button onClick={sendToGPT}>Enviar</button>
    </div>
  );
}
