import type {IncomingMessage, ServerResponse} from "node:http";
import {products} from "../controller/controller.products";
// import { products } from "../controller/controller.products";

export function handleRoute(req:IncomingMessage,res:ServerResponse){
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
        products(req,res)

    }
    else{
        res.writeHead(400,{
            "content-type":"application/json"
        })
        res.end(JSON.stringify({message:"route not found"}))

    }

}