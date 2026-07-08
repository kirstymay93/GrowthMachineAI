export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const {
    profile = {},
    recentContent = []
  } = req.body;

  try {

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: [
            {
              role: "system",
              content:
                "You are GrowthMachineAI. Create personalised, practical recommendations for social media growth based on the user's profile and recent activity."
            },
            {
              role: "user",
              content: `
Profile:
${JSON.stringify(profile, null, 2)}

Recent Content:
${JSON.stringify(recentContent, null, 2)}

Return:

1. Top 3 priorities
2. Best content idea for today
3. One Reel idea
4. One audience engagement idea
5. One thing to improve this week
`
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      recommendations:
        data.choices?.[0]?.message?.content || "No recommendations generated."
    });

  } catch (error) {

    res.status(500).json({
      error: "Recommendation engine failed"
    });

  }

}