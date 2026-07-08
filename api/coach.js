export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({
      error: "Method not allowed"
    });

  }


  const { message, userGoal } = req.body;


  if (!message) {

    return res.status(400).json({
      error: "Message required"
    });

  }


  try {


    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {

        method:"POST",

        headers:{

          "Content-Type":"application/json",

          "Authorization":
          `Bearer ${process.env.OPENAI_API_KEY}`

        },

        body:JSON.stringify({

          model:"gpt-4.1-mini",

          messages:[

          {

            role:"system",

            content:
            "You are GrowthMachineAI Coach, an expert social media strategist, marketing advisor, and business growth assistant."

          },

          {

            role:"user",

            content:

`User goal:
${userGoal || "Grow online"}

Question:
${message}


Give practical, clear actions.`

          }

          ]

        })

      }

    );


    const data =
    await response.json();


    res.status(200).json({

      answer:
      data.choices?.[0]?.message?.content

    });


  }


  catch(error){

    res.status(500).json({

      error:
      "AI coach failed"

    });

  }

}