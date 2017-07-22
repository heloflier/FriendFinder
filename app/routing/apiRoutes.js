
// ============================================================
// 						DEPENDENCIES
// ============================================================
var friends = require ('../data/friends')
//*************************************************************
//						API routes
//*************************************************************

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		
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
		    //	adding the new entry into our array of friends
		    friends.push(newEntry);
		    res.send(match);
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
					 	   	};

		let newEntryArray = newEntry.preferences;
		//	take the values array for the new entry
		//	calculate the absolute total
		let newEntryTotal = newEntryArray.reduce(getSum);

		function getSum(total, num) {
	    	return total + (num);
		}
		// console.log(newEntryTotal)
		//	take the values array for each of the 
		//	existing objects and do the same
		for (var i = 0; i < friends.length; i++) {
			//	reduce the existing friends array
			let diff = friends[i].preferences.reduce(getSum);
			//	compare to our new entry and 
			//	take the absolute difference
			diff = Math.abs(diff - newEntryTotal);
			//	if difference is less than the one
			//	stored, replace it with the current one
			if (diff < storedFriend.matchDiff) {
				storedFriend.name = friends[i].name;
				storedFriend.imgurl = friends[i].photo;
				storedFriend.matchDiff = diff;
			}	
		}
		return storedFriend;
	}
}