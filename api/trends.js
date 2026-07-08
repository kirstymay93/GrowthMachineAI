export default async function handler(req, res) {

if(req.method !== "POST"){

return res.status(405).json({
error:"Method not allowed"
});

}


const {topic} = req.body;


if(!topic){

return res.status(400).json({
error:"Topic required"
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
"You are a social media trend researcher. Find content opportunities."

},

{

role:"user",

content:

`Analyse this topic:

${topic}

Create:

1. Current trend angles
2. Viral content opportunities
3. Questions people are asking
4. Reel ideas
5. Post hooks`

}

]

})

}

);


const data =
await response.json();


res.status(200).json({

trends:
data.choices?.[0]?.message?.content

});


}

catch(error){

res.status(500).json({

error:"Trend analysis failed"

});

}

}