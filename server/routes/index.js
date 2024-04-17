const linksRoutes = require('./links');

const constructorMethod = (app) => {
  app.use('/', linksRoutes);
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;