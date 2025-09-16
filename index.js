const http = require('http')
const fs = require('fs');
const {readFile,readFileSync}  = require("fs")
const server = http.createServer((req, res)=>{
    const notes = []
    notes.push(JSON.parse(fs.readFileSync('notes.json', 'utf-8', (err,data)=>{
        if (err) {
    console.error('read error', err);
    return;
  }
    })))
    console.log("notes :",notes)
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
    return;
    }

    if(method == 'GET' && pathname === '/notes'){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(notes))
    }
})
server.listen(3000)