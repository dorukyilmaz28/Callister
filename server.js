const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// AI removed — using static FRC FAQ JSON
// Chat endpoint - now serves static responses
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Load static responses from JSON file
    const fs = require("fs");
    const responsesPath = path.join(__dirname, "public", "data", "frc_responses_full.json");
    
    if (!fs.existsSync(responsesPath)) {
      return res.status(404).json({ 
        reply: "FRC yanıtları yüklenemedi. Lütfen daha sonra tekrar deneyin." 
      });
    }
    
    const responsesData = JSON.parse(fs.readFileSync(responsesPath, "utf8"));
    const responses = responsesData.frc_responses.responses;
    
    // Simple matching logic (will be replaced with Fuse.js in frontend)
    const normalizedMessage = userMessage.trim().toLowerCase();
    
    // Direct match first
    if (responses[normalizedMessage]) {
      return res.json({ reply: responses[normalizedMessage] });
    }
    
    // Keyword fallback
    if (/kayıt|ücret|başvuru/.test(normalizedMessage)) {
      return res.json({ reply: responses["nasıl kayıt olunur"] || "Kayıt bilgisi bulunamadı." });
    }
    
    if (/kickoff|sezon|yeni sezon/.test(normalizedMessage)) {
      return res.json({ reply: responses["kickoff nedir"] || "Kickoff bilgisi bulunamadı." });
    }
    
    if (/frc|robotik|first/.test(normalizedMessage)) {
      return res.json({ reply: responses["frc nedir"] || "FRC bilgisi bulunamadı." });
    }
    
    // Default fallback
    res.json({ 
      reply: responses["bilinmeyen"] || "Bunu şu an cevaplayamıyorum. Lütfen Game Manual veya Team Q&A'ya başvurun." 
    });
    
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      reply: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin." 
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Callister FRC FAQ Server is running! (AI removed — using static FRC FAQ JSON)" 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Callister FRC FAQ Server running on http://localhost:${PORT}`);
  console.log(`📚 Using static JSON responses (AI removed)`);
});
