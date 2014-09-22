var express = require('express'),
	favicon = require('serve-favicon');

var server = express();

server.use(favicon(__dirname + '/public/images/favicon.ico'));
server.use(express.static(__dirname + '/public'));

server.get("/", function (req, res) {

	res.sendfile("index.html");
});

server.listen(process.env.PORT || 5500);
console.log('Servidor corriendo en http://localhost:5500');