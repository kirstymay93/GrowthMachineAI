import React, {useState} from "react";


export default function App(){


const [active,setActive] = useState("Dashboard");


const tools = [

"Dashboard",
"Content AI",
"Trend Radar",
"Viral Score",
"Brand Builder",
"Campaigns",
"Revenue",
"Analytics",
"AI Coach"

];


return (

<div style={{
display:"flex",
minHeight:"100vh",
fontFamily:"Arial"
}}>


<div style={{

width:"220px",
background:"#111827",
color:"white",
padding:"20px"

}}>


<h2>
🚀 GrowthAI
</h2>


{tools.map(tool=>(

<button

key={tool}

onClick={()=>setActive(tool)}

style={{

display:"block",
width:"100%",
padding:"12px",
margin:"8px 0",
borderRadius:"10px",
border:"0",
cursor:"pointer"

}}

>

{tool}

</button>

))}


</div>



<div style={{

flex:1,
padding:"30px",
background:"#f4f6f8"

}}>


<h1>
{active}
</h1>


<div style={{

background:"white",
padding:"25px",
borderRadius:"20px"

}}>


{active==="Dashboard" && (

<div>

<h2>
Welcome to GrowthMachineAI
</h2>

<p>
Your AI powered growth command centre.
</p>

</div>

)}



{active!=="Dashboard" && (

<div>

<h2>
{active}
</h2>

<p>
This module is ready to connect to your AI engine.
</p>

</div>

)}


</div>


</div>


</div>

);

}