export default async function handler(req, res) {

if(req.method !== "POST"){

return res.status(405).json({
error:"Method not allowed"
});

}


const {competitor, niche} = req.body;


if(!competitor || !niche){

return res.status(400).json({
error:"Competitor and niche required"
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
"You are an expert digital marketing analyst. Analyse competitors and find growth opportunities."

},

{

role:"user",

content:

`Create a competitor analysis.

Competitor:
${competitor}

Industry:
${niche}


Provide:

1. Likely strengths
2. Possible weaknesses
3. Content opportunities
4. Audience insights
5. Ways to differentiate
6. Growth strategy recommendations`

}

]

})

}

);


const data =
await response.json();


res.status(200).json({

analysis:
data.choices?.[0]?.message?.content

});


}


catch(error){

res.status(500).json({

error:"Competitor analysis failed"

});

}

}