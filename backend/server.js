import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const systemMessage = `
      You are FitBuddy, a fitness & diet assistant.
      Provide safe, simple workout tips and meal plans.
      Never give medical advice. 
    `;

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: message }
      ]
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.log(error);
    res.json({ reply: "Server error. Try again later." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend running"));
