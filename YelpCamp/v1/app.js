var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



var campgrounds = [
    {name:"Yosemite", image:"https://jameskaiser.com/wp-content/uploads/2015/03/yosemite-camping.jpg"},
    {name:"Grand Canyon", image:"https://img-aws.ehowcdn.com/877x500p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/7d467d41aa0241e79e38a37286b1219d"},
    {name:"Erciyes", image:"https://www.outdoorhaber.com/wp-content/uploads/2012/02/erciyes_sutdonduran_kamp-1-990x556.jpg"},
    {name:"Yosemite", image:"https://jameskaiser.com/wp-content/uploads/2015/03/yosemite-camping.jpg"},
    {name:"Grand Canyon", image:"https://img-aws.ehowcdn.com/877x500p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/7d467d41aa0241e79e38a37286b1219d"},
    {name:"Erciyes", image:"https://www.outdoorhaber.com/wp-content/uploads/2012/02/erciyes_sutdonduran_kamp-1-990x556.jpg"},
    {name:"Antalya", image:"https://www.kolayyolculuk.com/blog/wp-content/uploads/2016/02/08-yazili-kanyon-kolay-yolculuk.jpg"},
    {name:"Erciyes", image:"https://www.outdoorhaber.com/wp-content/uploads/2012/02/erciyes_sutdonduran_kamp-1-990x556.jpg"},
    {name:"Antalya", image:"https://www.kolayyolculuk.com/blog/wp-content/uploads/2016/02/08-yazili-kanyon-kolay-yolculuk.jpg"},
    {name:"Yosemite", image:"https://jameskaiser.com/wp-content/uploads/2015/03/yosemite-camping.jpg"},
    {name:"Grand Canyon", image:"https://img-aws.ehowcdn.com/877x500p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/7d467d41aa0241e79e38a37286b1219d"},
    {name:"Antalya", image:"https://www.kolayyolculuk.com/blog/wp-content/uploads/2016/02/08-yazili-kanyon-kolay-yolculuk.jpg"}]



//====================================
//              ROUTES
//====================================

app.get("/", function(req, res){
   res.render("landing"); 
});



app.get("/campgrounds", function(req, res){
   
    res.render("campgrounds", {campgrounds: campgrounds});
   
});


app.post("/campgrounds", function(req, res){
   // get data from the form and add it to the campground array
   var name = req.body.name;
   var image = req.body.image;
   
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   
   // redirect to the campground page
   res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function(req, res) {
   res.render("new");
});





//====================================
//            Listen the PORT
//====================================

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app server is started!");
});