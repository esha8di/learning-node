import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct, writeproduct } from "../service/product.service";
import type { IProduct } from "../types/product";
import { parse } from "node:path";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export async function products(req: IncomingMessage, res: ServerResponse) {
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/");

  const id = urlParts && urlParts[1] === "product" ? Number(urlParts[2]) : null;

  if (url === "/product" && method === "GET") {
    
    try{
      const productList = readProduct();
      return sendResponse(res, true, 200, "data retrieve successfully", productList);

    }
    catch(err){
      return sendResponse(res, false, 400, "something went wrong", err);
    }
    
  } 
  else if (method === "GET" && id !== null) {
    const productList = readProduct();
    const productWithId = productList.filter(
      (product: IProduct) => product.id === id,
    );
    if (productWithId.length > 0) {
     sendResponse(res,true,200,"this is product 1",productWithId)
    } else {
      sendResponse(res,false,404,"product is not found")
    }
  } else if (url === "/product" && method === "POST") {
    const body = await parseBody(req);
    const productList = readProduct();
    const productData = {
      id: Date.now(),
      ...body,
    };
    productList.push(productData);
    writeproduct(productList);
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "data receive successfully",
        data: productData,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    console.log(body);
    const productList = readProduct();
    const matchWithId = productList.findIndex(
      (product: IProduct) => product.id == id,
    );
    if (matchWithId > -1) {
      const updateProduct = {
        id: id,
        ...body,
      };
      productList[matchWithId] = updateProduct;
      writeproduct(productList);
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(JSON.stringify({ message: "data receive successfully" }));
    } else {
      res.writeHead(404, {
        "content-type": "application/json",
      });
      res.end(
        JSON.stringify({ message: "data against this ID is not available" }),
      );
    }
  } else if (method === "DELETE" && id != null) {
    const productList = readProduct();
    const matchWithId = productList.findIndex(
      (product: IProduct) => product.id == id,
    );
    if (matchWithId > -1) {
      const updateProduct = productList.splice(matchWithId, 1);
      writeproduct(productList);
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(
        JSON.stringify({
          message: "data deleted successfully",
          data: updateProduct,
        }),
      );
    } else {
      res.writeHead(404, {
        "content-type": "application/json",
      });
      res.end(
        JSON.stringify({ message: "data against this ID is not available" }),
      );
    }
  }
}
