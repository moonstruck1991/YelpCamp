var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")
var middleware = require("../middleware")



// INDEX ROUTE
router.get("/",function(req, res){
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err)
		}else{
			res.render("campgrounds/index",{campgrounds: allCampgrounds, currentUser: req.user})
			
		}
	})
	
})

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.name
	var image = req.body.imageURL
	var desc = req.body.description
	var price = req.body.price
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: desc, author: 								author, price: price}
	
	// create new campground and save

		Campground.create(newCampground,function(err, campground){
			if(err){
				req.flash("error", "Something went wrong")
				console.log(err)
			}else{
				req.flash("success", "Added a campground")
				res.redirect("/campgrounds")

			}
		})

})

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new")
})

// SHOW ROUTE
router.get("/:id",function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Sorry, that campground doesnt exist")
			console.log(err)
		}else{
				
				res.render("campgrounds/show",{campground: foundCampground})

		}
	});
})

// EDIT ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Sorry, that campground doesnt exist")
			console.log(err)
		}else{
		res.render("campgrounds/edit",{campground: foundCampground})
		}
	})
})

// UPDATE ROUTE

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err || !updatedCampground){
			req.flash("error", "Sorry, that campground doesnt exist")
			res.redirect("/campground")
		}else{
			req.flash("success", "Successfully updated campground")
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})


// DESTROY ROUTE

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			req.flash("error", "Something went wrong")
			res.redirect("/campgrounds")
		}else{
			req.flash("success", "Deleted the Campground")
			res.redirect("/campgrounds")
		}
	})
})




module.exports = router;
