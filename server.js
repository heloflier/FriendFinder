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
		photo: "",
		prefs: [1,1,1,1,1,1,1,1,1,1] 
	},
	{
		name: "Froomey",
		photo: "",
		prefs: [2,2,2,2,2,2,2,2,2,2] 
	},
	{
		name: "Fabio Aru",
		photo: "",
		prefs: [5,5,5,5,5,5,5,5,5,5] 
	}
]

//*************************************************
//				HTML routes
//*************************************************

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.get("/api/friends", function(req, res) {
	res.json(friends);
});

//=================================================
// 				Listen Function
//=================================================

app.listen(port, function(){
	console.log("app listening on port "+ port);
});