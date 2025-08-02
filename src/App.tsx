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
/*
📦 Instruções para testar localmente:

1. Garante que tens o Node.js instalado: https://nodejs.org
2. Cria uma pasta e extrai os ficheiros .zip do projeto nela
3. Abre essa pasta no terminal e executa:

   npm install
   npm run dev

4. O navegador abrirá automaticamente em http://localhost:5173
5. Será pedida a tua OpenAI API Key — insere-a uma vez e ficará guardada localmente
6. Começa a escrever na janela do ChatGPT pedidos como:
   ➤ "Desenha um triângulo com vértices A(0,0), B(4,0), C(2,3)"
   ➤ "Traça a mediana a partir do vértice C"
*/