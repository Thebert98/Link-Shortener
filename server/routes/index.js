
// Importing the links routes
const linksRoutes = require('./links');

// Defining the constructor method for the application
const constructorMethod = (app) => {
  // Using the links routes when the base URL is accessed
  app.use('/', linksRoutes);
  
  // Handling all other routes not defined and returning a 404 error
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

// Exporting the constructor method to be used in other parts of the application
module.exports = constructorMethod;