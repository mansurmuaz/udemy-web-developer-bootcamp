var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");


var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    color: String
});

var Cat = mongoose.model("Cat", catSchema);

//adding new cat into the database

// var george = new Cat({
//     name: "Pamuk",
//     age: 12,
//     color: "Yellow"
// });

// george.save(function(err, cat){
//     if (err) {
//         console.log("Something went wrong");
//         console.log(err);
//     }else{
//         console.log("Cat added to the db: ");
//         console.log(cat);
//     }
// })

Cat.create({
    name: "Lili",
    age: 2,
    color: "blue"
}, function (err, cat) {
    if(err){
        console.log("Something went wrong while adding new cat:");
        console.log(err);
    }else{
        console.log("New cat added successfully: ");
        console.log(cat);
    }
})


//retrieve all cats in the databse

Cat.find({}, function(err, cats){
    if(err){
        console.log("Something went wrong while retrieving data");
        console.log(err);
    }else{
        console.log(cats);
    }
});