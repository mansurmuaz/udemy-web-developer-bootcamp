var express = require("express");
var app = express();









// ------------- Routes ----------------

app.get("/", function(req, res){
   
  res.send("Welcome to the Jungle!");
    
});



app.get("/jungle", function(req, res){
    
   res.send("Be careful! There are some animals over there :D");
    
});


app.get("/jungle/:animal", function(req, res) {
   

   
  var animal = req.params.animal; 
   
   var sounds = {
       pig : "Oink",
       dog : "Woof Wooof!",
       cow : "Mooo",
       cat : "I still love you :)"
   }
   
   
    var sound = sounds[animal];
     
     
   res.send("The " + animal + " says " + sound);
    
});



app.get("/repeat/:word/:number", function(req, res) {


   
   var word = req.params.word; 
   
   var number = parseInt(req.params.number);
   
   var resString = " ";
   
   for (var i = number; i--; ) {
       resString = resString + " " + word;
   }
    
    res.send(resString);
    
});


app.get("*", function(req, res) {
    res.send("404 page not found!");
})

// ------------ Listen PORT -----------

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started from 3000 PORT!");
});