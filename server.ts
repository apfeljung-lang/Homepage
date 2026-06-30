import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // API endpoint for chatbot
  app.post("/api/chat", async (req: express.Request, res: express.Response) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY environment variable is not configured. Please add your API key in Settings > Secrets."
        });
      }

      // Initialize the Gemini SDK
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Format standard chat messages to Gemini's expected format
      // `{ role: 'user' | 'model', parts: [{ text: '...' }] }`
      const formattedContents = messages.map((msg: { role: string; content: string }) => {
        const geminiRole = msg.role === "assistant" ? "model" : "user";
        return {
          role: geminiRole,
          parts: [{ text: msg.content }]
        };
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: "You are '투혼이', the friendly and highly intelligent AI financial assistant for Lucid Trust Securities (투혼투자증권). Your primary goal is to help users with: \n" +
            "1. Trading platforms guides: WTS (Web Trading System - browser-based, no install), HTS (Home Trading System - desktop-based, deep analysis), MTS (Mobile Trading System - mobile app, smart asset management).\n" +
            "2. Market insights, investment strategies, stock market terms, and financial questions.\n" +
            "3. Events: Special interest rate discount event (5.5% preferential rate), PowerMap Launch event.\n" +
            "Be extremely polite, warm, and helpful. Format your answers elegantly using markdown, bullet points, and clean spacing. Translate complex financial jargon into clear and accessible Korean. Always respond in Korean."
        }
      });

      const text = response.text || "죄송합니다. 답변을 생성하지 못했습니다.";
      return res.json({ text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({
        error: error.message || "An unexpected error occurred while communicating with the AI model."
      });
    }
  });

  // Vite integration middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
