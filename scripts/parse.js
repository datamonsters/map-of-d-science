const R = require('./libs/ramda.min.js')
const async = require('./libs/async.min.js')
const baby = require('./libs/babyparse')
const fs = require('fs');
const path = require('path');
const readline = require('readline');


const dataname = "pages"
const indir = "./scripts/rawdata/"+dataname
const outfile = "../assets/sgraph.json"

fs.exists(indir)

let nextid = 0
const fileList = fs.readdirSync(indir).map(
    i => {
        return {
            uid: i,
            id: nextid++,
            name: i.replace(/_/g, " "),
            path: indir + "/" + i,
            type: "main",
            main: [],
            sub: []
        }
    }
)

const allNodes = R.indexBy(R.prop("uid"), fileList)
const subNodes = {}

const parseNodeFile = (file) => (done) => {
    let i = 0
    let rl = readline.createInterface(
        {
            input: fs.createReadStream(file.path)
        }
    )
    rl.on(
        'line', (line) => {
            let arrayOfConnection = line.replace(/ /g, "_").replace(/(\]|\[|'|)/g, "").split(",_")
            if (i == 0) {
                let nodes = arrayOfConnection.map(
                    n => {
                        let nodeObf = allNodes[n]
                        if (!nodeObf) {
                            nodeObf = subNodes[n]
                            if (!nodeObf) nodeObf = subNodes[n] = {
                                uid: n,
                                id: nextid++,
                                name: n.replace(/_/g, " "),
                                type: "sub"
                            }
                        }
                        return nodeObf
                    }
                )
                let typedNodes = R.groupBy(R.prop("type"), nodes)
                if (typedNodes.sub) file.sub = typedNodes.sub
                if (typedNodes.main) file.main = typedNodes.main
                done()
            }
            i++
        }
    )
}
console.log(R.values(allNodes).length)
let fbase = require("./fbase")
const onlyIdFn = (x) => x.id
async.waterfall(
    fileList.map(parseNodeFile), (err, result) => {
        // console.info(R.values(allNodes).length)
        console.info("subNodes:" + R.values(subNodes).length)
        let graph = []
        R.map(
            i =>
                graph.push(
                    {
                        id: i.id,
                        label: i.name,
                        nodes: i.main.map(onlyIdFn)
                        //nodesB: i.sub.map(onlyIdFn)
                    }
                )
            , allNodes
        )
        let subNames = {}
        R.map(i => subNames[i.id] = i.name, subNodes)//R.values(R.prop("id"), subNodes) //.map(i=>i.name)

        //
        //fbase.newData({
        //    name:dataname,
        //    graph: graph
        //})
        fs.writeFile(
            outfile, JSON.stringify(
                {
                    graph: graph
                }
            )
        )
        console.info("main graph parsed")
    }
)