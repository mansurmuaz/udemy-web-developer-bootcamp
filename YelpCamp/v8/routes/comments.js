var express = require("express"),
    router  = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");
    
//====================================
//         COMMENTS ROUTES
//====================================

//---------NEW----------
router.get("/new", isLoggedIn, function(req, res){
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
router.post("/", isLoggedIn, function(req, res){
 
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
                    
                    //add username and id to comment
                    createdComment.author.id = req.user._id;
                    createdComment.author.username = req.user.username;
                    //save comment
                    createdComment.save();
                    
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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
