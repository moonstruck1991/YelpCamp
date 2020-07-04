var mongoose   = require("mongoose")
	Campground = require("./models/campground.js")
	Comment    = require("./models/comment")

var data = [
	{name: "Mount Rinjani",
	image: "https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80",
	description: "Spicy jalapeno bacon ipsum dolor amet fatback drumstick burgdoggen bacon boudin shankle. Shankle boudin corned beef ham hock chicken salami ham hamburger pork. Ham hock beef ribs hamburger porchetta capicola, filet mignon chicken bacon. Bresaola corned beef ball tip, ham ribeye capicola chicken.Capicola pork belly ribeye, doner meatball cow tri-tip salami sirloin. "},
	{
		name: "Spring Creek",
		image: "https://images.unsplash.com/photo-1571687949921-1306bfb24b72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
		description: "Spicy jalapeno bacon ipsum dolor amet fatback drumstick burgdoggen bacon boudin shankle. Shankle boudin corned beef ham hock chicken salami ham hamburger pork. Ham hock beef ribs hamburger porchetta capicola, filet mignon chicken bacon. Bresaola corned beef ball tip, ham ribeye capicola chicken.Capicola pork belly ribeye, doner meatball cow tri-tip salami sirloin"
	},
	{
		name: "Dharamshala",
		image: "https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
		description: "Spicy jalapeno bacon ipsum dolor amet fatback drumstick burgdoggen bacon boudin shankle. Shankle boudin corned beef ham hock chicken salami ham hamburger pork. Ham hock beef ribs hamburger porchetta capicola, filet mignon chicken bacon. Bresaola corned beef ball tip, ham ribeye capicola chicken.Capicola pork belly ribeye, doner meatball cow tri-tip salami sirloin"
	}
]

function seedDB(){
	// 	removed Campgrounds	
	Campground.remove({},function(err){
		console.log("removed campgrounds")})}
	// 	data.forEach(function(campground){
	// 		Campground.create(campground, function(err, campground){
	// 			if(err){
	// 				console.log(err)
	// 			}else{
	// 				console.log("added a campground")
	// 			// adding comments
	// 				Comment.create({
	// 					text: "the place is great but has no internet",
	// 					author: "Homer"
	// 				},function(err, comment){
	// 					if(err){
	// 						console.log(err)
	// 					}else{
	// 						campground.comments.push(comment)
	// 						campground.save();
	// 						console.log("added a comment")
	// 					}
						
	// 				})
	// 			}
	// 		})
	// 	})
	// })
module.exports = seedDB;
					  
					  
					  
					  
