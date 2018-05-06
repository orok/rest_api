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
var queryStringObject =parsedUrl.query;

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

//Choose handler request should go to
var chosenHandler = typeof(router[trimmedPath]) !== undefined ? routers[trimmedPath] : handlers.notFound; 

// Construct th data object to send to handler
var data = {
    'trimmedPath':trimmedPath,
    'queryStringObject': queryStringObject,
    'method': method,
    'headers': headers,
    'payload': buffer
};

// Route request to handler specified in router
chosenHandler(data, function(statusCode,payload){
    statusCode = typeof(statusCode) == 'number'? statusCode: 200;

    payload = typeof(payload) == 'object'? payload : {};

    // Convert the payload to a string
    var payloadString = JSON.stringify(payload);

    // Return the response
    res.writeHead(statusCode);
    res.end(payloadString);

    console.log('Returning the Response: ', statusCode, payloadString);


});


//Send The Response 
//Log the Request Path
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
callback(404);
};

// Define a request Router
var router = {
    'sample': handlers.sample,
};