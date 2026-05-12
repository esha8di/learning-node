import type { IncomingMessage, ServerResponse } from "node:http"

import product from "../database/db.json"

export function products(req:IncomingMessage,res:ServerResponse) {
     res.writeHead(200,{
            "content-type":"application/json"
        })
        res.end(JSON.stringify({message:"this is root",data:product}))


}