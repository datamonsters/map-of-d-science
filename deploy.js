let fs = require('fs')
let path = require('path')
require('shelljs/global')

export const deploy = ()=> exec(
    'npm install', (status, output) => {
        console.log("npm installed")
        npmprod()
    }
)
const npmprod = () => exec(
    'npm run prod', (status, output) => {
        console.log("comilation done")
        copyRecursiveSync("./dist", "../../lab/map-of-data-sciense");
        console.log("deploy ok", new Date().getDate())
    }
)



const rmDir = (dirPath, removeSelf) => {
    let files
    if (removeSelf === undefined)
        removeSelf = true
    try {
        files = fs.readdirSync(dirPath)
    } catch (e) {
        return ""
    }
    if (files)
        if (files.length > 0)
            for (let i = 0; i < files.length; i++) {
                let filePath = dirPath + '/' + files[i]
                if (fs.statSync(filePath).isFile())
                    fs.unlinkSync(filePath)
                else
                    rmDir(filePath)
            }
    if (removeSelf)
        fs.rmdirSync(dirPath)
}

const copyRecursiveSync = (src, dest) => {
    let exists = fs.existsSync(src)
    let stats = exists && fs.statSync(src)
    let isDirectory = exists && stats.isDirectory()
    //console.log(exists, isDirectory, dest)
    if (exists && isDirectory) {
        rmDir(dest, true)
        fs.mkdirSync(dest)
        fs.readdirSync(src).forEach(
            (childItemName) => {
                copyRecursiveSync(
                    path.join(src, childItemName),
                    path.join(dest, childItemName)
                )
            }
        )
    } else {
        fs.linkSync(src, dest)
    }
}