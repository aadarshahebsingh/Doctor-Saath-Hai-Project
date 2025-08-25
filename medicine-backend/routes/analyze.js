const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Initialize Gemini client
const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to fetch medicine price
async function fetchMedicinePrice(medicineName) {
  try {
    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(
      `You are a medical expert. Provide the current market price of the medicine "${medicineName}" in Indian Rupees, formatted as "₹.<amount>" (e.g., "RS.35"). If unknown, return RS.0.`
    );

    const content = result.response.text().trim();
    if (!content.match(/^RS\.\d+$/)) return "RS.10"; // fallback
    return content;
  } catch (err) {
    console.error(`Error fetching price for ${medicineName}:`, err.message);
    return "₹.10";
  }
}

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");

    const prompt = `
You are a medical expert. You are given a photo of a medicine (its packaging, label, or strip). 
Extract the medicine name and provide the price in rupees in format RS.34, 
and return 3 to 5 generic alternatives with their price smaller than the given medicine in the same format. 
Strictly return a valid JSON object like this:

{
  "original_medicine_name": "Paracetamol 500mg",
  "original_price": ₹ 35",
  "generic_medicine": [
    {
      "medicine_name": "Crocin 500",
      "medicine_price": "₹ 15"
    }
  ]
}
No extra text, no markdown, just raw JSON.
`;

    const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
    ]);

    fs.unlinkSync(imagePath); // delete uploaded file

    const content = result.response.text();
    console.log("Raw model content:\n", content);

    if (!content) return res.status(500).json({ error: "Invalid model response." });

    let parsed;
    try {
      const jsonMatch = content.match(/{[\s\S]*}/);
      if (!jsonMatch) throw new Error("No JSON found.");

      parsed = JSON.parse(jsonMatch[0]);

      if (!parsed.original_price) {
        parsed.original_price = await fetchMedicinePrice(parsed.original_medicine_name);
      }

      for (let med of parsed.generic_medicine || []) {
        if (!med.medicine_price) {
          med.medicine_price = await fetchMedicinePrice(med.medicine_name);
        }
      }

      // Ensure at least 3 generics
      if ((parsed.generic_medicine || []).length < 3) {
        const extraGenerics = [
          { medicine_name: "Generic 1", medicine_price: await fetchMedicinePrice("Generic 1") },
          { medicine_name: "Generic 2", medicine_price: await fetchMedicinePrice("Generic 2") },
        ];
        parsed.generic_medicine = [...(parsed.generic_medicine || []), ...extraGenerics].slice(0, 3);
      }
    } catch (err) {
      console.error("Processing Error:", err.message);
      return res.status(500).json({ error: "Failed to process model response." });
    }

    return res.json(parsed);
  } catch (err) {
    console.error("Full Error:", err);
    res.status(500).json({ error: err.message || "Something went wrong." });
  }
});

module.exports = router;
