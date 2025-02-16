const http = require("http");

http.createServer(function (req, res) {
	res.write("On the way to being a full stack engineer!");

	res.write("I love you Mona! I made this website from the ground up!")


	res.end();
}).listen(3000);

console.log("Server started on port 3000");