//*************************************************
//				Main Server Logic
//*************************************************

//=================================================
//				Dependencies
//=================================================

const express 	 = require ('express');
const bodyParser = require ('body-parser');
const path 		 = require ('path');

var friends 	 = require ('./app/data/friends')

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

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


//=================================================
// 				Listen Function
//=================================================

app.listen(port, function(){
	console.log("app listening on port "+ port);
});