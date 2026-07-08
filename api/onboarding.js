export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({
      error: "Method not allowed"
    });

  }


  const {
    name,
    niche,
    goal,
    audience,
    experience
  } = req.body;


  if (!name || !niche || !goal) {

    return res.status(400).json({
      error: "Missing onboarding details"
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
          "You are an expert growth coach creating personalised business growth plans."

          },


          {

          role:"user",

          content:

`Create a personalised GrowthMachineAI starter plan.

Name:
${name}

Niche:
${niche}

Goal:
${goal}

Audience:
${audience}

Experience:
${experience}


Include:

1. Recommended content strategy
2. Weekly actions
3. Growth opportunities
4. Monetisation ideas
5. First 30 day roadmap`

          }

          ]

        })

      }

    );


    const data =
    await response.json();


    res.status(200).json({

      plan:
      data.choices?.[0]?.message?.content

    });


  }


  catch(error){

    res.status(500).json({

      error:
      "Onboarding failed"

    });

  }

}