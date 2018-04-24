var express = require("express");
var app = express();

app.set("view engine", "ejs");


app.get("/", function(req, res){
   res.render("landing"); 
});



app.get("/campgrounds", function(req, res){
   
   
   var campgrounds = [
                        {name:"Yosemite", image:"https://jameskaiser.com/wp-content/uploads/2015/03/yosemite-camping.jpg"},
                        {name:"Grand Canyon", image:"https://img-aws.ehowcdn.com/877x500p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/7d467d41aa0241e79e38a37286b1219d"},
                        {name:"Erciyes", image:"https://www.outdoorhaber.com/wp-content/uploads/2012/02/erciyes_sutdonduran_kamp-1-990x556.jpg"},
                        {name:"Antalya", image:"https://www.kolayyolculuk.com/blog/wp-content/uploads/2016/02/08-yazili-kanyon-kolay-yolculuk.jpg"}
                    ]
                    
    res.render("campgrounds", {campgrounds: campgrounds});
   
   
   
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app server is started!");
});