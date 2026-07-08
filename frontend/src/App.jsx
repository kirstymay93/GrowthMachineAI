import { useState } from "react";
import axios from "axios";

function App() {

  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);

  async function generate() {

    const response = await axios.post(
      "http://localhost:3000/generate",
      {
        topic
      }
    );

    setResult(response.data);
  }


  return (
    <div style={{padding:"40px", fontFamily:"Arial"}}>

      <h1>🚀 GrowthMachineAI</h1>

      <p>
      AI powered social media growth assistant
      </p>

      <input
        placeholder="Enter your topic..."
        value={topic}
        onChange={(e)=>setTopic(e.target.value)}
      />

      <button onClick={generate}>
        Generate Content
      </button>


      {result && (

        <div>

          <h2>Ideas</h2>
          {result.ideas.map((x,i)=>
            <p key={i}>{x}</p>
          )}


          <h2>Captions</h2>
          {result.captions.map((x,i)=>
            <p key={i}>{x}</p>
          )}


          <h2>Hashtags</h2>
          {result.hashtags.map((x,i)=>
            <p key={i}>{x}</p>
          )}

        </div>

      )}

    </div>
  );
}

export default App;