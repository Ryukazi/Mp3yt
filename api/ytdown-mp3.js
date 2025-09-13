import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "❌ Missing YouTube URL" });
    }

    // Call Kaizenji API
    const response = await axios.get(
      `https://kaiz-apis.gleeze.com/api/ytdown-mp3?url=${encodeURIComponent(
        url
      )}&apikey=ed9ad8f5-3f66-4178-aec2-d3ab4f43ad0d`
    );

    // Modify response
    const data = response.data;
    data.author = "Denish Tharu";

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "⚠️ Failed to fetch YouTube MP3",
      details: error.message,
    });
  }
}
