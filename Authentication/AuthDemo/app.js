var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user");
     

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret: "I still love you!",
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=======================
//---------ROUTES--------
//=======================
app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", function (req, res) {
    res.render("secret");
});


//--------Auth Routes--------

//Showing SignUp page
app.get("/register", function(req, res) {
  res.render("register");  
});

//handling user sign up
app.post("/register", function(req, res) {
  
  var username = req.body.username;
  var password = req.body.password;
  
  User.register(new User({username: username}), password, function(err, newUser){
      if (err) {
          console.log("Error while registering: " + err);
          return res.render("register");
      }
      
      passport.authenticate("local")(req, res, function(){
          res.redirect("/secret");
      })
  });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log(".....Server is Started....")
});