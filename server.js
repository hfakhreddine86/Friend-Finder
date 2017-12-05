// Dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Create initial port
var PORT = process.env.PORT || 8080;

// Create app url encoded parser
app.use(bodyParser.urlencoded({
    extended: true
}));

// JSON parses
app.use(bodyParser.json({
    type: "application/*+json"
}));

app.use(bodyParser.raw({
    type: "application/vnd.custom-type"
}));

app.use(bodyParser.text({
    type: "text/html"
}));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


// Listener
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});