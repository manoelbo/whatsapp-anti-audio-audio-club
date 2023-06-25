const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));

const VerfiToken = (req, res) => {
    try {
        var accessToken = process.env.META_TOKEN;
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        if(challenge != null && token != null && token == accessToken) {
            res.send(challenge);
        } else {
            res. status(400).send();
        }
    }catch(e){
        myConsole.log(e);
        res. status(400).send();
    }
}

const ReceivedMessage = (req, res) => {
    try{
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = (changes["value"]);
        var messageObject = value["messages"];

        myConsole.log(messageObject);


        res.send("EVENT_RECEIVED")
    }catch(e){
        res.send("EVENT_RECEIVED")
    }
}

module.exports = {
    VerfiToken,
    ReceivedMessage
}