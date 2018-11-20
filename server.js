var http = require('http');
var fs = require('fs');
var path = require('path');

const PORT = 8080;

http
	.createServer(function(request, response) {
		var filePath = '.' + request.url;
		if (filePath == './') {
			filePath = './index.html';
		}

		var extname = String(path.extname(filePath)).toLowerCase();
		var mimeTypes = {
			'.html': 'text/html',
			'.js': 'text/javascript',
			'.css': 'text/css',
			'.wasm': 'application/wasm'
		};

		var contentType = mimeTypes[extname] || 'application/octet-stream';

		fs.readFile(filePath, function(error, content) {
			if (error) {
				response.writeHead(404);
				response.end('404 Not Found');
			} else {
				response.writeHead(200, { 'Content-Type': contentType });
				response.end(content, 'utf-8');
			}
		});
	})
	.listen(PORT);
