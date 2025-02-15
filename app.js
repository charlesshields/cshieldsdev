const http = require("http");

http.createServer(function (req, res) {
	res.write("On the way to being a full stack engineer!");

	res.write("I love you Mona! I made this website from the ground up!")


	res.end();
}).listen(3000);
	wss.clients.forEach(function each(client) {
		client.close();
	});
	server.close(() => {
		shutdownDB();
	})
})
/** Begin websockets */
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({server: server});

wss.on('connection', function connection(ws) {
	const numClients = wss.clients.size;
	console.log(`Clients connected: ${numClients}`);

	wss.broadcast(`Current visitors, ${numClients}`);

	if (ws.readyState === ws.OPEN) {
		ws.send('Welcome to my server');
	}

	db.run(`INSERT INTO visitors (count, time)
			VALUES (${numClients}, datetime('now'))
		`);

	ws.on('close', function close() {
		wss.broadcast(`Current visitors: ${numClients}`);
		console.log(`A client has disconnected`);
	});
});

wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(client) {
		client.send(data);
	
	})
}

/**End Websockets  */
/**Begin Database  */

const sqlite = require('sqlite3');
const db = new sqlite.Database(':memory:');

db.serialize( () => {
	db.run(`
		CREATE TABLE visitors (
		   count INTEGER,
		   time TEXT 
		)
	`)
});

function getCounts() {
	db.each("SELECT * FROM visitors", (err, row) => {
		console.log(row);
	})
}

function shutdownDB() {
	getCounts();
	console.log('Shutting down db');
	db.close();
}


// const http = require("http");

// http.createServer(function (req, res) {
// 	res.write("On the way to being a full stack engineer!");

// 	res.write("I love you Mona! I made this website from the ground up!")


// 	res.end();
// }).listen(3000);

// console.log("Server started on port 3000");