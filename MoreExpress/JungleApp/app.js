var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");




var animalArray = [ {animal: "Dog", name: "Rusty"},
                {animal: "Cat", name: "Charlie"},
                {animal: "Cow", name: "Yelly"},
                {animal: "Bird", name: "Jonny"},
                {animal: "Dog", name: "Comolokko"}];


//---------ROUTES -----------


app.get("/", function(req,res){
    res.render("home");
});


app.get("/animals", function(req, res){
    
    res.render("animals", {animals: animalArray});
});


app.get("/animals/:animal", function(req, res){
    
    var animalParam = req.params.animal.toLowerCase();
    
    //{animal: animalParam, name: "There is no such an animal in the jungle!"}
    
    var reqAnimals = [];
    
    animalArray.forEach(function(animal){
        if(animalParam == animal.animal.toLowerCase()){
            reqAnimals.push(animal);
        }
    });
    
    res.render("animal", {animals: reqAnimals, animal: animalParam});
    
});

app.get("*", function(req, res) {
    res.send("<h>404 page not found!</h>");
})


// ------ Listening the PORT

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is started!")
});