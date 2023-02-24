import './App.css';
import React, { useEffect, useState } from 'react';

export const App = () =>{
  return <Emojis />;
}

const Emojis =()=>{
  const emojis=GetData("https://emoji-api.com/emojis?access_key=5282cc0b5c6002c93326f7198c62dfcd7aff29bd");
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
      .filter((emo) => emo.unicodeName.includes(text))
      .map((emoji)=>(
        
        <li onMouseLeave={(e)=>handleLeave(emoji.slug)} onMouseOver={(e)=>handleHover(emoji.slug)} onClick={(e)=>handleClick(emoji.character,emoji.slug)} key={emoji.slug}>
          <span>{emoji.character+ " "+emoji.unicodeName} </span> <span id={emoji.slug} className="emoji-status"></span> 
        </li>
        
      ))}
    </ul>
    </>
  );
}


const handleClick =(character,id)=>{
  navigator.clipboard.writeText(character);
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