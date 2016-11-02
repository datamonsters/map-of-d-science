require('shelljs/global')
const http = require('http')
const fs = require('fs')
const PORT = 3040
var dispatcher = require('httpdispatcher');

const server = http.createServer(
    (req, res) => {
        let body = ""
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(fs.readFileSync("./logs/deploy-out.txt"));
        req.on(
            'data', (data) =>
                body += data
        )
        req.on(
            'end', function () {
                if (body) {
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
    }
)