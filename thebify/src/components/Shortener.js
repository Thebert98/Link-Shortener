import React, {useEffect, useState} from 'react';
import axios from "axios";
import {CopyToClipboard} from 'react-copy-to-clipboard';

function Shortener(){
   
    const [link,setLink] =useState("");
    const [shortLink,setShortLink] = useState("")
    useEffect(()=>{
        
    },[])
    async function shortenLink(link){
        if(link == ''){
            alert("Please enter a value")
            return
        }
        
        try{
            let response = await axios.post("http://localhost:3100/",{link: link})
            
            setShortLink(response.data.link)
        }catch(e){
            alert(e)
        }
    }
   
    async function handleSubmit(event){
        event.preventDefault();
        await shortenLink(link)
    }

    return (
        <div className='shortener'>
            <form onSubmit={handleSubmit} className='form'>
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Enter the link you would like to shorten..."
                />
                <button type="submit">Shorten</button>
            </form>
            {shortLink !== "" && (
            <div className='newLink'>
                <p>{shortLink}</p>
                <CopyToClipboard text={shortLink} onCopy={() => console.log("Copied!")}>
                    <button>Copy to Clipboard</button>
                </CopyToClipboard>
            </div>
            )}
        </div>
    );

}

export default Shortener;