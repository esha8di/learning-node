import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/product.service";

export function products(req: IncomingMessage, res: ServerResponse) {
  const url = req.url;
  const method = req.method;
  console.log(url?.split);
  if (url === "/product" && method === "GET") {
    const productList = readProduct();
    res.writeHead(200, {
      "content-type": "application/json",
    });
    
    res.end(JSON.stringify({ message: "this is root", data: productList }));
  }
  
  
}
