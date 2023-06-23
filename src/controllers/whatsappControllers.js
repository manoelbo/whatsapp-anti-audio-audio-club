const VerfiToken = (req, res) => {
    res.send("hello"); 
}

const ReceivedMessage = (req, res) => {
    res.send("hello Received");
}

module.exports = {
    VerfiToken,
    ReceivedMessage
}