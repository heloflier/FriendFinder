//*************************************************
//				HTML routes
//*************************************************

app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.use("/", function(req, res) {
	res.sendFile(path.join(__dirname, "app/public/home.html"));
});