var app = require("./app");

//I start a node server, the API routes are defined in the files required above
var server = app.listen(3001, () => {
    console.log("\n#\nAPI listening on port %s\nMethods:\n 1 - '/'\n 2 - '/put' i.e.:'/put?shapes=[{json}]&operations=[{json}]]'\n\t- Expected 2 parameters: shapes and operations, both must be a valid JSON\n#", server.address().port);
});
