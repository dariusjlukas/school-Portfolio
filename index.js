var http = require('http');
var fs = require('fs');
var url = require('url');

// var server = http.createServer(function(request, response) {
//     fs.readFile('demofile1.html', function(err, data){
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write(data);
//     response.end();
//     });
// });

var server = http.createServer(function (req, res) {

    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    if (q.pathname === '/') {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        });
    }
    else if (q.pathname === '') {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        });
    }
    else {
        fs.readFile(filename, function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found");
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
