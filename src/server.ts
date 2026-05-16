import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import {handleRoute} from "./routes/routes";
import config from "./config";

const server:Server=createServer((req:IncomingMessage,res:ServerResponse)=>{
    handleRoute(req,res);
})

server.listen(config.port,()=>{
    console.log(`server is running on port ${config.port}`)
})