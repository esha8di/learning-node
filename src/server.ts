import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";

const server:Server=createServer((req:IncomingMessage,res:ServerResponse)=>{
    const url=req.url;
    const method=req.method;
     console.log(url)
    if(url==="/"&&method==="GET"){
        res.writeHead(200,{
            "content-type":"application/json"
        })
        res.end(JSON.stringify({message:"this is root"}))
    }
    else if(url?.startsWith("/product")){
        res.writeHead(200,{
            "content-type":"application/json"
        })
        res.end(JSON.stringify({message:"this is product root"}))

    }
})

server.listen(5000,()=>{
    console.log("Server is running on 5000")
})