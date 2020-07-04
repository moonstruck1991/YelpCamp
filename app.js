// installing libraries

var express       = require("express")
    app 	      = express()
	bodyParser    = require("body-parser")
	mongoose      = require("mongoose")
    Campground    = require("./models/campground")
	User		  = require("./models/user")
	seedDB	      = require("./seeds")
	Comment	      = require("./models/comment")
	passport  	  = require("passport")
	localStrategy = require("passport-local")
	methodOverride= require("method-override")
	flash		  = require("connect-flash")

// requiring routes

var commentRoutes = require("./routes/comments")
var campgroundRoutes = require("./routes/campgrounds")
var indexRoutes = require("./routes/index")


// mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true})
mongoose.connect("mongodb+srv://Prateek:Sinha@yelpcamp.ajzow.mongodb.net/yelp_camp?retryWrites=true&w=majority", {useNewUrlParser: true})

// mongodb+srv://Prateek:Sinha@yelpcamp.ajzow.mongodb.net/yelp_camp?retryWrites=true&w=majority
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash())
// seedDB()




// Passport configuration

app.use(require("express-session")({
	secret: "YelpCamp",
	resave: false,
	saveUninitialized: false
}));


app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next) {

	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success")
next()

});

// ROUTES

// Landing Page
app.get("/",function(req, res){
	res.render("campgrounds/landing")
})


app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);




// Server starting
app.listen(process.env.PORT , process.env.IP , function(){
	console.log("YelpCamp server has started")
});