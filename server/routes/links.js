const express = require("express");
const Router = express.Router();
const xss = require("xss")
const linksData = require("../data/links")
Router.post("/", async function(req,res){
    try{
        let link =  xss(req.body.link);
        if(link){
            let data = await linksData.shortenLink(link);
           
            res.status(200).json({link:"http://localhost:3100/" + data[0].id })
        }
        else{
            res.status(400).json({error:"No link provided"})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({error:e})
}
}
)

Router.get("/:id",async function(req,res){
    try{
    
    let id = req.params.id;

        if(id){
            link =  await linksData.getLink(id);
            if(link){
                res.status(302).redirect(link[0].link)
            }
            else{
                res.status(404).json({error:"Link not found"})
            }
        }
    }catch(e){
        console.log(e)
        res.status(500).json({error:e})
    }
})


module.exports = Router