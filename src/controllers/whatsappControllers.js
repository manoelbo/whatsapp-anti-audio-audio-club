const VerfiToken = (req, res) => {
    try {
        var accessToken = process.env.META_TOKEN;
        var token = req.query("hub.verify_token");
        var challenge = req.body["hub.challenge"];

        if(challenge != null && token != null && token == accessToken) {
            res.send(challenge);
        } else {
            res. status(400).send();
        }
    }catch(e){
        res. status(400).send();
    }
}

const ReceivedMessage = (req, res) => {
    res.send("hello Received");
}

module.exports = {
    VerfiToken,
    ReceivedMessage
}