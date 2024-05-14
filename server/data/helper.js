
// Function to validate if a given string is a valid URL
function isValidURL(link){
    try{
        // Attempt to create a new URL object with the given link
        // If the link is a valid URL, this will succeed and the function will return true
        new URL(link);
        return true;
    }catch(e){
        // If the link is not a valid URL, creating a new URL object will throw an error
        // In this case, the function will catch the error and return false
        return false;
    }
}

// Export the isValidURL function so it can be used in other parts of the application
module.exports = {
    isValidURL
}