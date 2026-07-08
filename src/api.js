export async function runAI(tool, input){


const response = await fetch(
`/api/${tool}`,
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

message:input,

topic:input,

business:input,

niche:input,

goal:input,

audience:input,

product:input,

skills:input

})

}

);



const data =
await response.json();



return (

data.content ||

data.answer ||

data.brand ||

data.trends ||

data.campaign ||

data.revenue ||

JSON.stringify(data)

);


}