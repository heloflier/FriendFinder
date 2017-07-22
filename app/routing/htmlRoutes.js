// ============================================================
// 						DEPENDENCIES
// ============================================================
var path = require("path");

//*************************************************************
//						HTML routes
//*************************************************************

module.exports = function(app) {

	//	HTML GET and USE requests
	app.get("/survey", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/survey.html"));
	});

	app.use("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/home.html"));
	});
}

