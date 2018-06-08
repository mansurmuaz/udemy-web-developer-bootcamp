var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp");

//Schema Setup

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name:"Erciyes", image:"https://www.outdoorhaber.com/wp-content/uploads/2012/02/erciyes_sutdonduran_kamp-1-990x556.jpg",
//         description:"Naberr Toooppraaamm :DD"
//     }, function (err, savedCampground) {
//         if (err) {
//             console.log("Error while creating campground : " + err);
//         } else {
//             console.log("Successfully created new campground: " + savedCampground);
//         }
//     });

// var campgrounds = [
//     {name:"Yosemite", image:"https://jameskaiser.com/wp-content/uploads/2015/03/yosemite-camping.jpg"},
//     {name:"Grand Canyon", image:"https://img-aws.ehowcdn.com/877x500p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/7d467d41aa0241e79e38a37286b1219d"},
//     {name:"Erciyes", image:"https://www.outdoorhaber.com/wp-content/uploads/2012/02/erciyes_sutdonduran_kamp-1-990x556.jpg"},
//     {name:"Yosemite", image:"https://jameskaiser.com/wp-content/uploads/2015/03/yosemite-camping.jpg"},
//     {name:"Grand Canyon", image:"https://img-aws.ehowcdn.com/877x500p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/7d467d41aa0241e79e38a37286b1219d"},
//     {name:"Erciyes", image:"https://www.outdoorhaber.com/wp-content/uploads/2012/02/erciyes_sutdonduran_kamp-1-990x556.jpg"},
//     {name:"Antalya", image:"https://www.kolayyolculuk.com/blog/wp-content/uploads/2016/02/08-yazili-kanyon-kolay-yolculuk.jpg"},
//     {name:"Erciyes", image:"https://www.outdoorhaber.com/wp-content/uploads/2012/02/erciyes_sutdonduran_kamp-1-990x556.jpg"},
//     {name:"Antalya", image:"https://www.kolayyolculuk.com/blog/wp-content/uploads/2016/02/08-yazili-kanyon-kolay-yolculuk.jpg"},
//     {name:"Yosemite", image:"https://jameskaiser.com/wp-content/uploads/2015/03/yosemite-camping.jpg"},
//     {name:"Grand Canyon", image:"https://img-aws.ehowcdn.com/877x500p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/7d467d41aa0241e79e38a37286b1219d"},
//     {name:"Antalya", image:"https://www.kolayyolculuk.com/blog/wp-content/uploads/2016/02/08-yazili-kanyon-kolay-yolculuk.jpg"}]



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
    Campground.findById(req.params.id, function (err, foundCampground) {
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