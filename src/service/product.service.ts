
import path from "node:path"
import fs from "node:fs"

const filepath=path.join(process.cwd(),"./src/database/db.json")
export function readProduct(){
    
    const products=fs.readFileSync(filepath,"utf-8")
    return JSON.parse(products)
}

export function writeproduct(payLoad:any){
    fs.writeFileSync(filepath,JSON.stringify(payLoad))
}