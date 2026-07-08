export default async function handler(req, res) {

if(req.method !== "POST"){

return res.status(405).json({
error:"Method not allowed"
});

}


const {content} = req.body;


if(!content){

return res.status(400).json({
error:"Content required"
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
"You are a professional social media analyst. Score content for virality."

},

{

role:"user",

content:

`Analyse this social media content:

${content}

Return:

Viral Score out of 100

Hook Score out of 10

Share Score out of 10

Engagement Score out of 10

Improvements`

}

]

})

}

);



const data =
await response.json();


res.status(200).json({

score:
data.choices?.[0]?.message?.content

});


}

catch(error){


res.status(500).json({

error:"Scoring failed"

});


}


}