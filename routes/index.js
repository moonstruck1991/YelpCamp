var express = require("express")
var router = express.Router()
var passport = require("passport")
var User = require("../models/user")



// Register routes
router.get("/register",function(req, res){
	res.render("register")
})

router.post("/register",function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, 							function(err, user){
							if(err){
								console.log(err)
								req.flash("error", err.message)
								res.redirect("/register")
							}
						passport.authenticate("local")(req, res, function(){
							req.flash("success", "Welcome to Yelp Camp " + user.username)	
							res.redirect("/campgrounds")
							})
						})
})

// login routes

router.get("/login",function(req, res){
	res.render("login")
})

router.post("/login",passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login",
	failureFlash:  true
								}),function(req, res){
})

// logout route

router.get("/logout",function(req, res){
	req.logout()
	req.flash("success", "Logged you out")
	res.redirect("/campgrounds")
})



module.exports = router;
