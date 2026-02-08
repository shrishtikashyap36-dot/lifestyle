import express from "express";
import cors from "cors";
import multer from "multer";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const upload = multer();

app.use(cors());

app.post("/depth", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image uploaded");
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/Intel/dpt-large",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
        },
        body: req.file.buffer,
      }
    );

    const buffer = await response.arrayBuffer();
    res.set("Content-Type", "image/png");
    res.send(Buffer.from(buffer));

  } catch (err) {
    console.error("DEPTH ERROR:", err);
    res.status(500).send("Depth generation failed");
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
