import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct, writeproduct } from "../service/product.service";
import type { IProduct } from "../types/product";
import { parse } from "node:path";
import { parseBody } from "../utility/parseBody";

export async function products(req: IncomingMessage, res: ServerResponse) {
  const url = req.url;
  const method = req.method;


  const urlParts = url?.split("/");

  const id = urlParts && urlParts[1] === "product" ? Number(urlParts[2]) : null;

  if (url === "/product" && method === "GET") {
    const productList = readProduct();
    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(JSON.stringify({ message: "this is root", data: productList }));
  } else if (method === "GET" && id !== null) {
    const productList = readProduct();
    const productWithId=productList.filter((product:IProduct) => product.id === id);
    if(productWithId.length>0){
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(JSON.stringify({ message: "data retrieve successfully", data: productWithId }));
    
  }
  else{
  res.writeHead(404, {
    "content-type": "application/json",
  });
  res.end(JSON.stringify({ message: "this data is not available" }));
}
}
else if (url === "/product" && method === "POST") {
  const body=await parseBody(req);
  const productList = readProduct();
  const productData={
    id:Date.now(),
    ...body
  }
  productList.push(productData);
  writeproduct(productList)
  res.writeHead(200, {
    "content-type": "application/json",
  });
  res.end(JSON.stringify({ message: "data receive successfully", data: productData }));
  
  
}

}
