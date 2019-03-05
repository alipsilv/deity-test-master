const fs = require('fs');

var fetchOperations = () => {
    try{
      var operationsString = fs.readFileSync('./src/__tests__/operations.json');
      return JSON.parse(operationsString);
    }catch (e) {
      console.log(e);
      return [];
    }
};

var getAll = () => {
  return fetchOperations();
};


module.exports = {
    getAll
};
