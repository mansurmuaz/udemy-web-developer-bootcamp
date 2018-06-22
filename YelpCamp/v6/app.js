var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();


// Passport Configuration
app.use(require("express-session")({
    secret: "I still love you",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});



//====================================
//      CAMPGROUNDS ROUTES
//====================================


//---------LANDING PAGE----------
app.get("/", function(req, res){
   res.render("landing"); 
});


//---------INDEX----------
app.get("/campgrounds", function(req, res){
   
   Campground.find({}, function (err, returnedCampgrounds) {
       if(err){
           console.log("Error while retrieving data from DB : " + err);
       }else{
           res.render("campgrounds/index", {campgrounds: returnedCampgrounds});
       }
   });
});

//---------CREATE----------
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

//---------NEW----------
app.get("/campgrounds/new", function(req, res) {
   res.render("campgrounds/new");
});

//---------SHOW----------
app.get("/campgrounds/:id", function(req, res) {
    
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


//====================================
//         COMMENTS ROUTES
//====================================

//---------NEW----------
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//---------CREATE----------
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
 
   //Lookup campground using ID
   Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log("Error while retrieving campground : " + err);
            res.redirect("/campgrounds");
         } else {
            
            //Create new comment
            var comment = req.body.comment;
            // var text    = req.body.comment.text;
            // var author  = req.body.comment.author;
            
            Comment.create(comment, function(err, createdComment){
                if(err){
                    console.log("Error while creating new comment: " + err);
                }else{
                    
                    //connect comment with campground
                    foundCampground.comments.push(createdComment);
                    foundCampground.save();
                    
                   //redirect to campground show page
                    res.redirect("/campgrounds/"+foundCampground._id);
                }
            });
        }
    });
});


//====================================
//        AUTHENTICATION ROUTES
//====================================


// Show register form
app.get("/register", function(req, res){
   res.render("register"); 
});

//Handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});



// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});

// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});


// logic route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


//====================================
//            Listen the PORT
//====================================

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app server is started!");
});