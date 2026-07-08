export default async function handler(req, res) {

if(req.method !== "POST"){

return res.status(405).json({
error:"Method not allowed"
});

}


const {business, niche} = req.body;


if(!business || !niche){

return res.status(400).json({
error:"Business and niche required"
});

}


try{


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
"You are a world-class brand strategist and marketing expert."

},

{

role:"user",

content:

`Create a complete brand strategy.

Business:
${business}

Niche:
${niche}


Include:

1. Brand name ideas
2. Tagline ideas
3. Ideal customer
4. Brand personality
5. Content pillars
6. Social media strategy
7. Growth plan`

}

]

})

}

);


const data =
await response.json();


res.status(200).json({

brand:
data.choices?.[0]?.message?.content

});


}

catch(error){

res.status(500).json({

error:"Brand creation failed"

});

}

}