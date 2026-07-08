export default async function handler(req, res) {

if(req.method !== "POST"){

return res.status(405).json({
error:"Method not allowed"
});

}


const {audience, skills, goal} = req.body;


if(!audience || !skills || !goal){

return res.status(400).json({
error:"Audience, skills and goal required"
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
"You are an expert online business strategist and monetisation consultant."

},

{

role:"user",

content:

`Create a monetisation plan.

Audience:
${audience}

Skills/resources:
${skills}

Goal:
${goal}


Include:

1. Business opportunities
2. Digital product ideas
3. Service ideas
4. Pricing suggestions
5. Sales funnel
6. Marketing strategy
7. First 30 day action plan`

}

]

})

}

);


const data =
await response.json();


res.status(200).json({

revenue:
data.choices?.[0]?.message?.content

});


}


catch(error){

res.status(500).json({

error:"Revenue engine failed"

});

}

}