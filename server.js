//*************************************************
//				Main Server Logic
//*************************************************

//=================================================
//				Dependencies
//=================================================

const express 	 = require ('express');
const bodyParser = require ('body-parser');
const path 		 = require ('path');

//=================================================
// 			Express Module Setup
//=================================================

//	Express Path Setup
var app  = express();
var port = process.env.PORT || 3000;

//	Express App setup (to handle data parsing)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//=================================================
//		Ride Mates
//=================================================

var friends = [{
		name: "Peto_Sagan",
		photo: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiu1KHQ_JPVAhWJhVQKHVQzARgQjRwIBw&url=http%3A%2F%2Fwww.telegraph.co.uk%2Fcycling%2F2016%2F10%2F18%2Fworld-road-champion-peter-sagan-reminds-us-all-that-life-is-mean%2F&psig=AFQjCNGuTZ27oRvQX1yrEMD73xub8M02CQ&ust=1500506534734693",
		prefs: [1,1,1,1,1,1,1,1,1,1] 
	},
	{
		name: "Froomey",
		photo: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiY-ZOW_ZPVAhWKxFQKHakEBJQQjRwIBw&url=http%3A%2F%2Fpha-media.com%2Fblog%2Fbbc-spoty-2015-who-do-you-fancy%2F&psig=AFQjCNGgQ7JLyGpkyTu88rBnyvLHXKkn8g&ust=1500506689524597",
		prefs: [2,2,2,2,2,2,2,2,2,2] 
	},
	{
		name: "Fabio_Aru",
		photo: "http://images.performgroup.com/di/library/omnisport/48/5e/fabioaru-cropped_1hpmcwaevx6fv1kjwzkw4un1mo.jpg?t=1012297405&w=960&quality=70",
		prefs: [5,5,5,5,5,5,5,5,5,5] 
	}
]

//*************************************************
//				API routes
//*************************************************

app.get("/api/:f?", function(req, res) {
	    let chosen = req.params.f;

  		if (chosen) {
    		console.log(chosen);

    		for (var i = 0; i < friends.length; i++) {
      			if (chosen === friends[i].name) {
        			return res.json(friends[i]);
      			}
    		}
    		return res.json(false);
  		}		
  		return res.json(friends);
});

app.post("/api/friends", function(req, res) {

	    var newEntry = req.body;

	    //	turning the preferences array values 
	    //	of the new entry into integers
	    let tempArr = [];
	    for (var i = 0; i < newEntry.preferences.length; i++) {
	    	tempArr.push(parseInt(newEntry.preferences[i]));
	    }
	    newEntry.preferences = tempArr;
	   	
	    let match = compareFriends(newEntry);
	    console.log(match.name);
	    displayMatch('match = ', match);

	    //	adding the new entry into our array of friends
	    friends.push(newEntry);
	    res.send(match);
	    console.log(newEntry);

    	// // set the modal's body to what the post request is returning
    	// $('#my_modal .modal-body').html('hello');
    	// // show it
    	// $('#my_modal').modal('show');
});

//*************************************************
//				HTML routes
//*************************************************

app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.use("/", function(req, res) {
	res.sendFile(path.join(__dirname, "app/public/home.html"));
});


//=================================================
//				Compare Friends
//=================================================

function compareFriends(newEntry) {
	//	initialize a variable to hold the name and
	//	total of its array. We will keep it to be
	//	compared to the next ones.

	let storedFriend = 	{
							name		: "",
							imgurl		: "", 
							matchDiff	: 100
				 	   	}
	let newEntryArray = newEntry.preferences;

	//	take the values array for the new entry
	//	calculate the absolute total
	let newEntryTotal = newEntryArray.reduce(getSum);
	// console.log(newEntry.preferences)

	function getSum(total, num) {
    	return total + (num);
	}
	// console.log(newEntryTotal)
	//	take the values array for each of the 
	//	existing objects and do the same
	// console.log('friends = ', friends)
	// console.log('friends.length = ', friends.length)
	for (var i = 0; i < friends.length; i++) {
		// console.log('i = ', i)
		//	reduce the existing friends array
		let diff = friends[i].prefs.reduce(getSum);
		//	compare to our new entry and 
		//	take the absolute difference
		diff = Math.abs(diff - newEntryTotal);
		console.log('diff = ', diff);
		//	if difference is less than the one
		//	stored, replace it with the current one
		if (diff < storedFriend.matchDiff) {
			storedFriend.name = friends[i].name;
			storedFriend.imgurl = friends[i].photo;
			storedFriend.matchDiff = diff;
			console.log(storedFriend.name + '\n' + 
						storedFriend.matchDiff)
		}	
	}
	return storedFriend;
	//	calculate the absolute total
}

//=================================================
// 				Display Match
//=================================================

function displayMatch(match) {

}

//=================================================
// 				Listen Function
//=================================================

app.listen(port, function(){
	console.log("app listening on port "+ port);
});