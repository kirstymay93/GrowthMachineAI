export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({
      error: "Topic is required"
    });
  }


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
              "You are an expert Facebook growth strategist. Create viral social media content."
            },
            {
              role: "user",
              content:
`Create a Facebook growth package for this topic:

${topic}

Return:

1. Five viral post ideas
2. Three engaging captions
3. One Reel script
4. Ten hashtags
5. One question that encourages comments`
            }
          ]

        })
      }
    );


    const data = await response.json();


    res.status(200).json({

      content:
      data.choices?.[0]?.message?.content ||
      "No content generated"

    });


  } catch(error) {

    res.status(500).json({
      error:"AI generation failed"
    });

  }

}