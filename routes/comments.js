var express = require("express")
var router = express.Router({mergeParams: true})
var Campground = require("../models/campground")
var Comment = require("../models/comment")
var middleware = require("../middleware")




// NEW ROUTE
router.get("/new", middleware.isLoggedIn ,function(req, res){
	Campground.findById(req.params.id,function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Sorry, that campground doesnt exist")
			console.log(err)
		}else{
			
			res.render("comments/new", {campground: foundCampground})

		}
	})
})

// CREATE ROUTE

router.post("/", middleware.isLoggedIn , function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			res.redirect("/campgrounds")
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Sorry, that campground doesnt exist")
					console.log(err)
				}else{
					//add username and id to the commment
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					//save the comment 
					comment.save()
					foundCampground.comments.push(comment)
					foundCampground.save()
					req.flash("success", "Added a comment")
					res.redirect("/campgrounds/" + foundCampground._id)
					
				}
			})
		}
	})
})

// EDIT ROUTE
router.get("/:comments_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comments_id,function(err, foundComment){
		if(err || !foundComment){
			req.flash("error", "Something went wrong")
			res.redirect("/campgrounds")
		}else{
			res.render("comments/edit",{comment: foundComment, campground_id: req.params.id})
		}
	})
	
})

// UPDATE ROUTE
router.put("/:comments_id",middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, function(err, updatedComment){
		if(err || !updatedComment){
			req.flash("error", "Something went wrong")
			res.redirect("back")
		}else{
			req.flash("success", "Updated the comment")
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})

// DESTROY ROUTE

router.delete("/:comments_id",middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comments_id,function(err){
		if(err){
			req.flash("error", "Something went wrong")
			res.redirect("back")
		}else{
			req.flash("success", "Deleted the comment")
			res.redirect("/campgrounds/"+req.params.id)
		}
	})
})




module.exports = router;
