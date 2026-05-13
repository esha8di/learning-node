
import path from "node:path"
import fs from "node:fs"

export function readProduct(){
    const filepath=path.join(process.cwd(),"./src/database/db.json")
    const products=fs.readFileSync(filepath,"utf-8")
    return JSON.parse(products)
}