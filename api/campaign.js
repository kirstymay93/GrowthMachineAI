export default async function handler(req, res) {

if(req.method !== "POST"){

return res.status(405).json({
error:"Method not allowed"
});

}


const {goal, audience, product} = req.body;


if(!goal || !audience || !product){

return res.status(400).json({
error:"Goal, audience and product required"
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
"You are a world-class marketing campaign strategist."

},

{

role:"user",

content:

`Create a complete 30-day marketing campaign.

Goal:
${goal}

Target audience:
${audience}

Product or service:
${product}


Include:

1. Campaign name
2. Main message
3. Weekly objectives
4. 30 content ideas
5. Reel/video ideas
6. Engagement tactics
7. Call-to-action strategy
8. Growth recommendations`

}

]

})

}

);


const data =
await response.json();


res.status(200).json({

campaign:
data.choices?.[0]?.message?.content

});


}


catch(error){

res.status(500).json({

error:"Campaign creation failed"

});

}

}