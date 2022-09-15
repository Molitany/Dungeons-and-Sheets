// Require express and body-parser
const express = require("express")
const bodyParser = require("body-parser")
const { exec } = require("child_process")

// Initialize express and define a port
const app = express()
const PORT = 3000

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())

app.post("/payload", (req, res) => {
    if ((req.body.pusher && req.body.ref.split("/").pop() == "master") || (req.body.action == "closed" && req.body.pull_request.base.ref == "master")) {
        let child = exec("git fetch", ExecCallback)
        child.on('exit', () => {
            let child = exec("git pull", ExecCallback)
            child.on('exit', () => {
                let child = exec("dotnet publish -c Release -o ./Build", ExecCallback)
                child.on('exit', () => {
                    let child = exec("pkill Dungeons", ExecCallback)
                    child.on('exit', () => {
                        exec("./Dungeons\\ and\\ Sheets & disown", {
                            cwd: './Build'
                        }, ExecCallback)    
                    })
                })
            })
        })
    }
    res.status(200).end() // Responding is important
})

app.get("/payload", (req, res) => {
    res.status(200).send("success").end() // Responding is important
})

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

function ExecCallback(error, stdout, stderr){
    if (error) {
        console.warn(error);
    } else if (stdout) {
        console.log(stdout); 
    } else {
        console.log(stderr);
    }

}