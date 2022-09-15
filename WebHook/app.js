// Require express and body-parser
const express = require("express")
const bodyParser = require("body-parser")
const { exec } = require("child_process")

// Initialize express and define a port
const app = express()
const PORT = 5000

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())

app.post("/payload", (req, res) => {
    if ((req.body.pusher && req.body.ref.split("/").pop() == "master") || (req.body.action == "closed" && req.body.pull_request.base.ref == "master")) {
        exec("git fetch", ExecCallback)
        exec("git pull", ExecCallback)
        exec("dotnet publish -c Release -o ./Build", {
            cwd: '../'
        }, ExecCallback)
        exec("./Dungeons\ and\ Sheets & disown", {
            cwd: '../Build'
        }, ExecCallback)
    }
    res.status(200).end() // Responding is important
})

app.get("/payload", (req, res) => {
    res.status(200).send("success").end() // Responding is important
})

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

function ExecCallback(error, stdout, stderr){
    
}