export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({
error:"Method not allowed"
});
}

const {idea}=req.body;


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
"You are GrowthMachineAI, an expert social media growth strategist."
},

{
role:"user",
content:
`Create a viral growth plan for:

${idea}

Include:
- Hook
- Post idea
- Audience strategy
- Monetisation idea`
}

]

})

});


const data =
await response.json();


res.status(200).json({

result:
data.choices[0].message.content

});


}