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

console.log("checkProcess", forever.checkProcess("githook"))
console.log("checkProcess", forever.checkProcess(hook))
console.log("checkProcess", forever.checkProcess(hook.uid))
hook.start()

require('ngrok').connect(
    3040, (err, url) => {
        console.log("ngrok", url)
    }
);
