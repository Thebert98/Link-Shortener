
// Importing required modules
const express = require("express");
// Creating a new router object
const Router = express.Router();
// Importing the xss module to prevent cross-site scripting attacks
const xss = require("xss")
// Importing the links data module
const linksData = require("../data/links")

// Defining the POST route for the router
Router.post("/", async function(req,res){
    try{
        // Sanitizing the link from the request body to prevent XSS attacks
        let link =  xss(req.body.link);
        // Checking if a link was provided
        if(link){
            // Shortening the link using the links data module
            let data = await linksData.shortenLink(link);
            // Sending a response with the shortened link
            res.status(200).json({link:"https://theb-li4a.onrender.com/" + data[0].id })
        }
        else{
            // Sending a response with an error if no link was provided
            res.status(400).json({error:"No link provided"})
        }
    }catch(e){
        // Logging any errors
        console.log(e)
        // Sending a response with an error if an exception was caught
        res.status(500).json({error:e})
    }
})

// Defining the GET route for the router
Router.get("/:id",async function(req,res){
    try{
        // Getting the id from the request parameters
        let id = req.params.id;
        // Checking if an id was provided
        if(id){
            // Getting the link using the links data module
            link =  await linksData.getLink(id);
            // Checking if a link was found
            if(link){
                // Redirecting to the found link
                res.status(302).redirect(link[0].link)
            }
            else{
                // Sending a response with an error if no link was found
                res.status(404).json({error:"Link not found"})
            }
        }
    }catch(e){
        // Logging any errors
        console.log(e)
        // Sending a response with an error if an exception was caught
        res.status(500).json({error:e})
    }
})

// Exporting the router to be used in other parts of the application
module.exports = Router