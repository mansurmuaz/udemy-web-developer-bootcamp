var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();

//====================================
//              ROUTES
//====================================

app.get("/", function(req, res){
   res.render("landing"); 
});



app.get("/campgrounds", function(req, res){
   
   Campground.find({}, function (err, returnedCampgrounds) {
       if(err){
           console.log("Error while retrieving data from DB : " + err);
       }else{
           console.log("Successfully retrieved data " + returnedCampgrounds);
           res.render("index", {campgrounds: returnedCampgrounds});
       }
   });
});


app.post("/campgrounds", function(req, res){
   // get data from the form and add it to the campground array
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
  
   var newCampground = {name: name, image: image, description: description};
   
    Campground.create( newCampground, function (err, savedCampground) {
        if (err) {
            console.log("Error while creating campground : " + err);
        } else {
            console.log("Successfully created new campground: " + savedCampground);
            // redirect to the campground page
            res.redirect("/campgrounds");
        }
    });
});


app.get("/campgrounds/new", function(req, res) {
   res.render("new");
});


app.get("/campgrounds/:id", function(req, res) {
    
    //Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec( function (err, foundCampground) {
        if(err){
            console.log("Error while getting foundCampground : " + err );
        } else {
            console.log("Successfully found Campground : " +  foundCampground);
            //Render show template with that campground!
            res.render("show", {campground: foundCampground});
        }
    });
});


//====================================
//            Listen the PORT
//====================================

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app server is started!");
});