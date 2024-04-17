
const { createClient } = require('@supabase/supabase-js');
const { isValidURL } = require('./helper');

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey);


async function shortenLink(link){
   try{
        
        if(isValidURL(link)){
            const {data : existingLink, error: existingError} = await supabase.from("Links").select(`id,link`).eq("link", link);
            console.log(existingLink.length)
            
            if(!existingLink || existingLink.length == 0){
            const {data, error} = await supabase.from("Links").insert([{link: link}]).select() 
            if  (error) throw new Error("Error creating new Link")
            console.log("data:" + data)
            return data
            }
            else{
                console.log("existingLink:" + existingLink)
                return existingLink
            }

        }
        else{
            throw Error("An invalid link has been provided")
        }
}catch(e){
    console.log(e)
    throw e
}
}

async function getLink(id){
    try{
       
        console.log(typeof(id))
        const {data, error} = await supabase.from("Links").select("link").eq("id",id);
        if  (error) throw new Error("Error fetching link")
        return data
    }catch(e){
        throw e
    }
}

module.exports = {
    shortenLink,
    getLink
}