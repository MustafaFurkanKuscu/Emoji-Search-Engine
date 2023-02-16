import './App.css';
import React, { useEffect, useState } from 'react';

export const App = () =>{
  return <Emojis />;
}

const Emojis =()=>{
  const emojis=GetData("http://localhost:3004/names");
  const [text, setText] = useState("");

  const handleChangeText=(e)=>{
    const text=e.target.value;
    setText(text);
    
  }
  
  return (
    <>
    <h1>🐨 Emoji Arama Motoru 🐼</h1>
    <input className='search-input' type="text" value={text} onChange={(e)=>handleChangeText(e)}/>
    <ul>
      {emojis
      .filter((emo) => emo.title.includes(text))
      .map((emoji)=>(
        
        <li onMouseLeave={(e)=>handleLeave(emoji.id)} onMouseOver={(e)=>handleHover(emoji.id)} onClick={(e)=>handleClick(emoji.symbol,emoji.id)} key={emoji.id}>
          <span>{emoji.symbol+ " "+emoji.title} </span> <span id={emoji.id} className="emoji-status"></span> 
        </li>
        
      ))}
    </ul>
    </>
  );
}


const handleClick =(symbol,id)=>{
  navigator.clipboard.writeText(symbol);
  document.getElementById(id).innerText="Kopyalandı";

}
const handleHover =(id)=>{
  document.getElementById(id).innerText="Emojiyi Kopyala";
}
const handleLeave =(id)=>{
  document.getElementById(id).innerText="";
}

const GetData = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
    .then((res)=>res.json())
    .then((json)=>setData(json))
  }, [url]);
  return data;
};



export default App;
