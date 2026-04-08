import axios from "axios";

export default async function handler(req, res) {
  try {
    const { query, type = "image", limit = "10" } = req.query;

    if (!query) {
      return res.status(400).json({
        status: false,
        message: "Query is required"
      });
    }

    const api = await axios.get(
      `https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(query)}&type=${type}`
    );

    const data = api.data.data;

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No results found"
      });
    }

    const max = Math.min(parseInt(limit), 50);

    const results = data
      .slice(0, max)
      .map(item => {
        const media =
          item.video_url ||
          item.gif_url ||
          item.image_url;

        return {
          id: item.id,
          title: item.grid_title || "No title",
          type: item.type,
          thumbnail: item.image_url,
          download: media
        };
      })
      .filter(x => x.download);

    return res.status(200).json({
      status: true,
      creator: "Denish",
      total: results.length,
      data: results
    });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: false,
      message: "API Error"
    });
  }
}
