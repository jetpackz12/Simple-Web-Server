const http = require('http');
const path = require('path');
const fs = require('fs');
const { log } = require('console');

const myServer = http.createServer((req, res) => {
    
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    let extName = path.extname(filePath);

    let contentType = 'text/html';
    switch (extName) {
        case '.js':
                contentType = 'text/javascript';
            break;
        case '.css':
                contentType = 'text/css';
            break;
        case '.json':
                contentType = 'application/json';
            break;
        case '.png':
                contentType = 'image/png';
            break;
        case '.jpg':
                contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) 
        {
            switch (err.code) {
                case 'ENOENT':
                        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                            if(err) throw err;

                            res.writeHead(200, { 'Content-Type' : 'text/html' });
                            res.end(content, 'utf8');
                        });
                    break;
            
                default:
                        res.writeHead(500);
                        res.end(`Server error: ${err.code}`);
                    break;
            }
            
        } 
        else 
        {
            res.writeHead(200, { 'Content-Type' : contentType });
            res.end(content, 'utf8');
        }
    });

});

const PORT = process.env.PORT || 5000;

myServer.listen(PORT, () => log(`Server is running on ${PORT}`));