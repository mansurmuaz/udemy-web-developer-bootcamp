var express = require("express"),
    router  = express.Router();

var Campground = require("../models/campground");


//====================================
//      CAMPGROUNDS ROUTES
//====================================


//---------INDEX----------
router.get("/", function(req, res){
   
   Campground.find({}, function (err, returnedCampgrounds) {
       if(err){
           console.log("Error while retrieving data from DB : " + err);
       }else{
           res.render("campgrounds/index", {campgrounds: returnedCampgrounds});
       }
   });
});

//---------CREATE----------
router.post("/", function(req, res){
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

//---------NEW----------
router.get("/new", function(req, res) {
   res.render("campgrounds/new");
});

//---------SHOW----------
router.get("/:id", function(req, res) {
    
    //Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec( function (err, foundCampground) {
        if(err){
            console.log("Error while getting foundCampground : " + err );
        } else {
            console.log("Successfully found Campground : " +  foundCampground);
            //Render show template with that campground!
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


module.exports = router;
