const fs = require('fs');

var fetchOutput = () => {
  try{
    var outputString = fs.readFileSync('./src/__tests__/output.json');
    return JSON.parse(outputString);
  }catch (e) {
    console.log(e);
    return [];
  }
};

var getAll = () => {
  return fetchOutput();
};

module.exports = {
  getAll
};
