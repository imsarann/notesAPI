// ------------starting 

// const http = require('http')
// // http.createServer() is creating a htpp server new instance 
// const server = http.createServer((req, res)=>{
//     // req - the request object (http.IncomingMessage)
//     // req - the response object (http.ServerResponse)
//     res.writeHead(200,{'Content-Type' : 'text/plain'});
//     res.end("hello world")
// })

// server.listen(3000, "localhost", ()=>{
//     console.log("Server is running at http://localhost:3000")
// })

// ----------- reading request headers 
// const util = require('util')
// const http = require("http")
// const server = http.createServer((req, res)=>{
//     console.log("request header"+ JSON.stringify(req.headers))
//     // console.log(util.inspect(req, {showHidden : false}))
//     console.log(req.headers["application"])
//     console.log(req.headers["application2"])
//     res.writeHead(200, {"content-type" : "text/plain"})
//     res.end(`here is the header that you have ${JSON.stringify(req.headers)}`)
// })

// server.listen(3000)



////////////////////////
// parsing url and methos 
//////////////////////

// const http = require('http')
// const Url = require('url')
// const server = http.createServer((req, res)=>{
//     const {url, method} = req;
//     console.log("url form req.url :",req.url)
//     console.log("type req.url :",typeof req.url)
//     const parsedurl = Url.parse(url, true);
//     console.log("Parsed url :", parsedurl)
//     console.log("Type Parsed url :", typeof parsedurl)
//     // console.log(JSON.stringify(parsedurl))
//     const pathname = parsedurl.pathname;
//     // console.log("parsed url",parsedurl)
//     const query = parsedurl.query
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
    
//     res.end(JSON.stringify({
//         pathname,
//         query,
//         fullurl : req.url
//     }))
//     // const parsedUrl = url.parse(req.url, true) 
// })

// server.listen(3000)


const http = require('http')
const {URL} = require('url')
const querystring = require('querystring');
const server = http.createServer((req, res)=>{
    const baseurl = `http://${req.headers.host}/`
    const parsedurl = new URL(req.url, baseurl)
    const params = Object.fromEntries(parsedurl.searchParams);
    const queryObj = {
    name: 'John Doe',
    age: 30,
    interests: ['programming', 'music']
    };
    const queryStr = querystring.stringify(queryObj);
    res.writeHead(200,  { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
        path : parsedurl.pathname,
        params,
        exampleQueryString: queryStr
    }))
    
    
})
server.listen(3000)