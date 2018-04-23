var express = require("express");
var app = express();


console.log("Express app!!!")



// ROUTES ----------------



app.get("/", function(req, res){
    res.send("Hello World from route of express!");
});


app.get("/by", function(req, res){
    res.send("By Byyyy!");
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});