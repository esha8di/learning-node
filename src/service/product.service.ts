

import path from "node:path"

export function readProduct(){
    const filepath=path.join(process.cwd(),"./src/database/db.json")
    console.log(filepath)
}