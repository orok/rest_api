/**
 * Primary File for API
 * 
 */

// Dependencies 
var http = require('http');

// Server should respond to all request with a string
var server = http.createServer(function(req,res){
    res.end('Hello World\n');
});


//Start server and have it listen on port 3000

server.listen(3000, function(){
    console.log('The server is listening on port 3000');
});