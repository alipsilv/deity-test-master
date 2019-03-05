const fs = require('fs');

var fetchShapes = () => {
  try{
    var shapesString = fs.readFileSync('./src/__tests__/shapes.json');
    return JSON.parse(shapesString);
  }catch (e) {
    console.log(e);
    return [];
  }
};

var getAll = () => {
  return fetchShapes();
};

module.exports = {
  getAll
};
