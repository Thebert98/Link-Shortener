
// Importing necessary modules and components
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {CopyToClipboard} from 'react-copy-to-clipboard';

// Defining the Shortener component
function Shortener(){
   
    // Initializing state variables for the link and the shortened link
    const [link,setLink] =useState("");
    const [shortLink,setShortLink] = useState("")

    // Using the useEffect hook to perform side effects
    useEffect(()=>{
        
    },[])

    // Function to shorten the provided link
    async function shortenLink(link){
        // Checking if the link is empty
        if(link == ''){
            // Alerting the user to enter a value
            alert("Please enter a value")
            return
        }
        
        try{
            // Making a POST request to the server to shorten the link
            let response = await axios.post("https://theb-li4a.onrender.com",{link: link})
            
            // Setting the shortened link in the state
            setShortLink(response.data.link)
        }catch(e){
            // Alerting the user in case of an error
            alert(e)
        }
    }
   
    // Function to handle the form submission
    async function handleSubmit(event){
        // Preventing the default form submission behavior
        event.preventDefault();
        // Calling the function to shorten the link
        await shortenLink(link)
    }

    // Rendering the component
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

// Exporting the Shortener component
export default Shortener;