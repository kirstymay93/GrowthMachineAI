import { supabase } from "./supabase";


export async function saveContent(topic, content){

const {
data:{user}
} = await supabase.auth.getUser();


if(!user){

throw new Error("Please login first");

}


const {error} =
await supabase
.from("content_library")
.insert({

user_id:user.id,

topic:topic,

content:content

});


if(error){

throw error;

}


return true;

}



export async function getContent(){

const {
data:{user}
} = await supabase.auth.getUser();


if(!user){

return [];

}


const {data,error} =
await supabase
.from("content_library")
.select("*")
.eq(
"user_id",
user.id
)
.order(
"created_at",
{
ascending:false
}
);


if(error){

throw error;

}


return data;

}



export async function deleteContent(id){

const {error} =
await supabase
.from("content_library")
.delete()
.eq(
"id",
id
);


if(error){

throw error;

}


return true;

}