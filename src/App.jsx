import React,{useState} from "react";
import {runAI} from "./api";


export default function App(){


const [active,setActive]=useState("Dashboard");

const [input,setInput]=useState("");

const [result,setResult]=useState("");


const tools=[

["Dashboard","dashboard"],

["Content AI","generate"],

["Trend Radar","trends"],

["Viral Score","score"],

["Brand Builder","brand"],

["Campaigns","campaign"],

["Revenue","revenue"],

["AI Coach","coach"]

];



async function execute(){


setResult("🤖 Working...");


const output =
await runAI(
active==="Content AI"?
"generate":
active.toLowerCase().replace(" ",""),
input
);


setResult(output);


}



return (

<div style={{
display:"flex",
minHeight:"100vh",
fontFamily:"Arial"
}}>


<nav style={{
width:"220px",
background:"#111827",
color:"white",
padding:"20px"
}}>


<h2>
🚀 GrowthAI
</h2>


{tools.map(t=>(

<button

key={t[0]}

onClick={()=>setActive(t[0])}

style={{
width:"100%",
padding:"12px",
margin:"5px 0"
}}

>

{t[0]}

</button>

))}


</nav>



<main style={{
flex:1,
padding:"30px",
background:"#f4f6f8"
}}>


<h1>
{active}
</h1>


<textarea

placeholder="Enter your idea..."

value={input}

onChange={
e=>setInput(e.target.value)
}

style={{
width:"100%",
height:"120px"
}}

/>


<button

onClick={execute}

style={{
marginTop:"15px",
padding:"15px"
}}

>

Run AI

</button>



<div style={{
background:"white",
marginTop:"20px",
padding:"20px",
borderRadius:"15px",
whiteSpace:"pre-wrap"
}}>

{result}

</div>


</main>


</div>

);

}