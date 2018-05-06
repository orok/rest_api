import { S_IRWXG } from 'constants';

/**
 * Primary File for API
 * 
 */

// Dependencies 
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// Server should respond to all request with a string
var server = http.createServer(function(req,res){

//Get The URL and Parse It
var parsedUrl = url.parse(req.url, true);

//Get The Path
var path = parsedUrl.pathname;
var trimmedPath = path.replace(/^\/+|\/+$/g,'');

//Get Query string as object
var querySTringObject =parsedUrl.query;

//GEt The HTTP Method
var method = req.method.toLowerCase();

//Get Headers as an object 
var headers = req.headers;

//GEt Payload if there is any

var decoder = new StringDecoder('utf-8');
var buffer = '';
req.on('data',function(data){
    buffer += decoder.write(data);
});
req.on('end',function(){
    buffer += decoder.end();

//Send The Response 
res.end('Hello World!!!\n');

//Log the Request Path
console.log('Request was recieved with these payload', buffer);
    });
});

//Start server and have it listen on port 3000

server.listen(3000, function(){
    console.log('The server is listening on port 3000');
});

// Define the handlers
var handlers = {};

//Sample Handler 
handlers.sample = function(data, callback){
/// Callback HTTP Status code and payload object
callback(406, {'name':'sample-handler'});
};

//Not Found Handler
handlers.notFound = function(data,callback){

};

// Define a request Router
var router = {
    'sample': handlers.sample,
};