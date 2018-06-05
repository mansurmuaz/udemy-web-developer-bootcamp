var bodyParser  = require("body-parser"),
mongoose        = require("mongoose"),
express         = require("express"),
app             = express();

//App Config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose/Model Config 
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title: "Hello World!",
    image: "https://yannbraga.com/wp-content/uploads/2017/03/hello-world-1.png",
    body: "Hello my new blog! Hello my new blog! Hello my new blog! Hello my new blog! Hello my new blog! Hello my new blog! "
});


//RESTFUL ROUTES
app.get("/", function(req, res) {
    res.redirect("blogs");
});


app.get("/blogs", function(req, res){
    Blog.find({}, function (err, returnedBlogs) {
        if (err) {
            console.log("Error while retrieving data from DB: " + err);
        } else {
            res.render("index", {blogs: returnedBlogs});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Running!");
});