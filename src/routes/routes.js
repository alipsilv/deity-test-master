//Remove for production
const data = require('../datajson')
const operations = require('../operations')

var appRouter = (app) => {

  app.get("/", (req, res) => {
      res.send("Hello deity.io");
  });

  //I am the main method - The mechanism that makes it possible to apply a set of filters and transformations
  app.get("/put", (req, res) => {
      if(req.query.shapes) {
        try {
            var shapesJson = JSON.parse(req.query.shapes);
            if(req.query.operations) {
              try {
                  var operationsJson = JSON.parse(req.query.operations);
                  return res.send(operations.modify(shapesJson, operationsJson));
              } catch (e) {
                  return res.send({"status": "error", "message": "transformation and filters to apply must be a valid json"});;
              }
            }
        } catch (e) {
            return res.send({"status": "error", "message": "shapes must be a valid json"});;
        }
      }
  });
}

module.exports = appRouter;
