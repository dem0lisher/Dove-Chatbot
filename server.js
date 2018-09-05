var express = require('express');
var app = express();
app.use("/", express.static(__dirname));
app.listen(process.env.PORT || 8081);
console.log("Server listening on port 8081");
