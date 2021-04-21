//creating a web server 
const http = require("http");
const fs = require("fs");
// we can read an html or any other apps and render it to the server 

const server = http.createServer((request, response) =>{

    const homePage = fs.createReadStream("index.html");

    //writing a header for the response
    response.writeHead(200, {"Content-type":"text/html"});

    //pipe it out
    homePage.pipe(response);

}).listen(3030);