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
   
  var sound;
   
  var animal = req.params.animal; 
   
   if (animal == "pig") {
        sound = "Oink";
   }else if(animal == "cow"){
       sound = "Mooooo!";
   }else if(animal == "dog"){
       sound = "Woof Woooff!!";
   }else{
       sound = "lOLOLOLOLOLOLOLO!"
   }
   
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