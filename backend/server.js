import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/*
  Groq Client (OpenAI-compatible SDK)
*/
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

/*
  AI Mentor Endpoint
*/
app.post("/api/mentor", async (req, res) => {
  const { input } = req.body;

  if (!input || !input.trim()) {
    return res.status(400).json({
      advice: "The forest cannot respond to silence.",
      sentiment: "neutral",
      tree_reaction: "#4CAF50",
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:`
You are an AI Tree Mentor.

Respond ONLY in VALID JSON format:
{
  "advice": "Nature-themed advice",
  "sentiment": "positive | neutral | negative",
  "tree_reaction": "valid hex color"
}

Sentiment Classification Rules:

- NEGATIVE: sadness, failure, fear, anxiety, hopelessness, burnout, wanting to quit, emotional distress.
- POSITIVE: achievement, happiness, pride, excitement, confidence.
- NEUTRAL: general questions, decision-making, curiosity, advice without emotional distress.

If the user expresses failure, sadness, or wanting to give up, ALWAYS classify as NEGATIVE.

Color Rules:
- Positive → #2E7D32
- Neutral → #1B5E20
- Negative → #0B1F2A

Return ONLY JSON. No extra text.
`
        },
        {
          role: "user",
          content: input
        }
      ],
    });

    let parsed;

    try {
      parsed = JSON.parse(completion.choices[0].message.content);
    } catch {
      parsed = {
        advice: "The winds are unclear. Try again.",
        sentiment: "neutral",
        tree_reaction: "#4CAF50",
      };
    }

    /*
      Validation Section
    */

    // Validate sentiment
    const validSentiments = ["positive", "neutral", "negative"];
    if (!validSentiments.includes(parsed.sentiment)) {
      parsed.sentiment = "neutral";
    }

    // Validate hex color
    const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
    if (!hexRegex.test(parsed.tree_reaction)) {
      parsed.tree_reaction = "#4CAF50";
    }

    // Validate advice
    if (!parsed.advice || typeof parsed.advice !== "string") {
      parsed.advice = "The forest speaks in silence.";
    }

    res.json(parsed);

  } catch (error) {
    console.error("API Error:", error.message);

    res.status(500).json({
      advice: "Even strong trees bend in storms. Try again later.",
      sentiment: "neutral",
      tree_reaction: "#4CAF50",
    });
  }
});

/*
  Start Server
*/
app.listen(5000, () => {
  console.log("🌳 AI Mentor running on port 5000");
});