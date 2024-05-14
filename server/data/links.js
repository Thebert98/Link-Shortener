
// Importing required modules
const { createClient } = require('@supabase/supabase-js');
const { isValidURL } = require('./helper');

// Setting up Supabase client
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to shorten a given link
async function shortenLink(link){
   try{
        // Check if the link is valid
        if(isValidURL(link)){
            // Check if the link already exists in the database
            const {data : existingLink, error: existingError} = await supabase.from("Links").select(`id,link`).eq("link", link);
            
            // If the link does not exist, create a new entry
            if(!existingLink || existingLink.length == 0){
                const {data, error} = await supabase.from("Links").insert([{link: link}]).select() 
                if  (error) throw new Error("Error creating new Link")
                return data
            }
            // If the link exists, return the existing entry
            else{
                return existingLink
            }
        }
        // If the link is not valid, throw an error
        else{
            throw Error("An invalid link has been provided")
        }
    }catch(e){
        throw e
    }
}

// Function to get a link by its ID
async function getLink(id){
    try{
        // Fetch the link from the database
        const {data, error} = await supabase.from("Links").select("link").eq("id",id);
        if  (error) throw new Error("Error fetching link")
        return data
    }catch(e){
        throw e
    }
}

// Exporting the functions
module.exports = {
    shortenLink,
    getLink
}