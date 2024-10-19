import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { TextServiceClient } from "@google-cloud/ai";
import path from "path";

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../AI_Bot")); // Adjust the path as per your folder structure

// Google AI TextServiceClient setup
const apiKey = process.env.GOOGLE_API_KEY || "AIzaSyD2OKM5TwzEukyn72JLbEQuom6ZlnnbP60";
const client = new TextServiceClient({
  apiKey: apiKey,
});

// Basic GET route
app.get("/get", (req, res) => {
  res.status(200).send({
    message: "Hi Shhaurya, welcome",
  });
});

// Route to render the EJS file
app.get("/AI_Bot", (req, res) => {
  res.render("index");
});

// POST route for chat with Google AI
app.post("/chat", async (req, res) => {
  console.log("Received request:", req.body);
  try {
    const prompt = req.body.prompt;

    const [response] = await client.generateText({
      model: "gemini-pro",
      prompt: {
        text: prompt,
      },
      temperature: 1.0,
      maxOutputTokens: 150,
      topP: 1,
      frequencyPenalty: 0.5,
    });

    res.status(200).send({
      bot: response.candidates[0].output,
    });
  } catch (error) {
    console.log("Error in /chat:", error);
    res.status(500).send(error.message || "Something went wrong");
  }
});

// Start the server
app.listen(4000, () =>
  console.log("AI server started on http://localhost:4000")
);
