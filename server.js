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
		name: "Peto Sagan",
		photo: "https://www.bora-hansgrohe.com/website/var/assets/radsport/fahrerbilder2017/peter_sagan_new.jpg",
		preferences: [1,1,1,1,1,1,1,1,1,1] 
	},
	{
		name: "Froomey",
		photo: "http://cdn.velonews.com/wp-content/uploads/2017/07/Chris-Froome-800x534.jpg",
		preferences: [2,2,2,2,2,2,2,2,2,2] 
	},
	{
		name: "Fabio Aru",
		photo: "http://cdn2.sbnation.com/imported_assets/1402033/8051364913_b12cf35381_n.jpg",
		preferences: [5,5,5,5,5,5,5,5,5,5] 
	}
]

//*************************************************
//				API routes
//*************************************************

app.get("/api/friends", function(req, res) {
	    // let chosen = req.params.f;

  		// if (chosen) {
    // 		console.log(chosen);

    // 		for (var i = 0; i < friends.length; i++) {
    //   			if (chosen === friends[i].name) {
    //     			return res.json(friends[i]);
    //   			}
    // 		}
    // 		return res.json(false);
  		// }		
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
	    console.log('match = ', match.name);

	    //	adding the new entry into our array of friends
	    friends.push(newEntry);
	    res.send(match);
	    console.log(newEntry);
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
	for (var i = 0; i < friends.length; i++) {
		//	reduce the existing friends array
		console.log('-------------------------------')
		console.log('friend ', friends[i])
		let diff = friends[i].preferences.reduce(getSum);
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
// 				Listen Function
//=================================================

app.listen(port, function(){
	console.log("app listening on port "+ port);
});