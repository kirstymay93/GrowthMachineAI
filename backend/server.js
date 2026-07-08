const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GrowthMachineAI API is running 🚀");
});

app.post("/generate", (req, res) => {
  const { topic } = req.body;

  res.json({
    ideas: [
      `🔥 5 things nobody knows about ${topic}`,
      `💡 The ultimate ${topic} guide`,
      `🚀 How ${topic} is changing the future`
    ],
    captions: [
      `You won't believe this about ${topic}!`,
      `Most people get ${topic} wrong...`
    ],
    hashtags: [
      "#Growth",
      "#AI",
      "#Marketing",
      "#ContentCreator"
    ]
  });
});

app.listen(3000, () => {
  console.log("GrowthMachineAI running on port 3000");
});