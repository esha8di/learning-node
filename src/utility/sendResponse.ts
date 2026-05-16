import { ServerResponse } from "node:http";
export function sendResponse(res:ServerResponse,status:boolean,statusCode:number,message:string,data?:any){
    const response={
        status,
        message,
        data
    }
    
     res.writeHead(statusCode, {
      "content-type": "application/json",
    });

    res.end(JSON.stringify(response));
   

}