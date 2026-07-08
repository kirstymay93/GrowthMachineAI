export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({
      error: "Topic required"
    });
  }

  // AI connection will be added next

  res.json({
    ideas: [
      `🔥 Viral idea about ${topic}`,
      `🚀 Future trends in ${topic}`,
      `💡 Things people don't know about ${topic}`
    ],
    caption:
      `Discover the truth about ${topic}!`,
    hashtags:
      "#AI #Growth #Marketing #Viral"
  });

}