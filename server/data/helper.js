function isValidURL(link){
    try{
        new URL(link);
        return true;
    }catch(e){
        return false;
    }
}

module.exports = {
    isValidURL
}