var express = require("express"),
    router  = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
    
//====================================
//         COMMENTS ROUTES
//====================================

//---------NEW----------
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
 
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


// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

module.exports = router;
