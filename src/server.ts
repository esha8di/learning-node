import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import {handleRoute} from "./routes/routes";

const server:Server=createServer((req:IncomingMessage,res:ServerResponse)=>{
    handleRoute(req,res);
})

server.listen(5000,()=>{
    console.log("Server is running on 5000")
})