const shapes = require('./jsondb/shapes');
const operations = require('./jsondb/operations');
const output = require('./jsondb/output');

var getOutput = () => {
  return output.getAll();
};

var getShapes = () => {
  return shapes.getAll();
};

var getOperations = () => {
  return operations.getAll();
};

module.exports = {
  getOutput,
  getShapes,
  getOperations
};
