import React,{useState} from "react";
import {signIn,signUp} from "./auth";


export default function Login({setUser}){


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");



async function login(){

const result =
await signIn(
email,
password
);

setUser(result.user);

}



async function register(){

const result =
await signUp(
email,
password
);

setUser(result.user);

}



return (

<div>

<h1>
🚀 GrowthMachineAI
</h1>


<input

placeholder="Email"

onChange={
e=>setEmail(e.target.value)
}

/>


<input

placeholder="Password"

type="password"

onChange={
e=>setPassword(e.target.value)
}

/>


<button onClick={login}>
Login
</button>


<button onClick={register}>
Create Account
</button>


</div>

);

}