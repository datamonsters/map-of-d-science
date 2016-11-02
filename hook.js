let fs = require('fs')
require('shelljs/global')
const http = require('http')
const PORT = 3040
let path = require('path')


const rmDir = (dirPath, removeSelf) => {
    let files
    if (removeSelf === undefined)
        removeSelf = true
    try {
        files = fs.readdirSync(dirPath)
    } catch (e) {
        return
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
    console.log(exists, isDirectory, dest)

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

const server = http.createServer(
    (req, response) => {
        let body = ""
        req.on(
            'data', (data) =>
                body += data
        )
        req.on(
            'end', function () {
                let data = JSON.parse(body);
                if (data.ref == "refs/heads/master")
                    deploy()
                console.log("ref", data.ref)
                console.log("repository", data.repository.name)
                if (data.commits)
                    data.commits.forEach(
                        c => {
                            console.info("messgage", c.message)
                            console.log("author", c.author.email)
                        }
                    )
            }
        )
    }
)
server.listen(
    PORT, () => {
        console.log("GitHook Server listening on: http://localhost:%s", PORT);
    }
)
console.info("start hook of forever")

const deploy = () => exec(
    'git pull', (status, output) => {
        console.log(status, output)
        console.info("git pull command done")
        npminstall()
    }
)


const npminstall = () => exec(
    'npm install', (status, output) => {
        console.log("npm installed")
        npmprod()
    }
)
const npmprod = () => exec(
    'npm start prod', (status, output) => {
        console.log("comilation done")
        copyRecursiveSync("./dist", "../../lab/map-of-data-sciense");
    }
)



require('ngrok').connect(
    PORT, (err, url) => {
        console.log("ngrok", url)
    }
);
