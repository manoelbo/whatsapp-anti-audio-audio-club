const VerfiToken = (req, res) => {
    try {
        var accessToken = "EAAKZCbO5x9WcBANsC2Wc7M5wgX54o0wo3vMRYyybWZC83HRZBKGZCC88TMoXH7PErsKtSvAo2dd7J5dBXbHWGP0Azk76WIfWe5A1VMqePuPgvKGjkW8JHexdHnybbCdHj0oDIISZA6VJBHGsQoJDxMDz4pOsNB0qPsIwzEm70TWR2mkulbXbf";
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