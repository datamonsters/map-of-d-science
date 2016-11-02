const forever = require('forever-monitor')

const hook = new (forever.Monitor)(
    'hook.js', {
        uid: "githook",
        max: 5,
        //killTree: true,
        //sourceDir: 'root',
        watch: false,
        'logFile': './logs/hook-log-txt',
        'outFile': './logs/hook-log-out.txt',
        'errFile': './logs/hook-log-err.txt'
    }
)

hook.start()



//const server = new (forever.Monitor)(
//    'deploy.js', {
//        uid: "server",
//        max: 2,
//        killTree: true,
//        sourceDir: './',
//        watch: true,
//        'logFile': './logs/deploy-txt',
//        'outFile': './logs/deploy-out.txt',
//        'errFile': './logs/deploy-err.txt'
//    }
//)
//server.start()
require('ngrok').connect(
    3040, (err, url) => {
        console.log("ngrok", url)
    }
);
