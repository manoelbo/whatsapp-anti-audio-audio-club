const https = require("https");
function SendMessageWhatsApp(textResponse, number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "recipient_type": "individual",
        "to": number,
        "type": "text",
        "text": {
            "preview_url": false,
            "body": "Teste"
        }
    });

    const options = {
        host: "graph.facebook.com",
        path: "/v17.0/114179078380795/messages",
        method: "POST",
        body: data,
        header: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.META_TOKEN
        }
    };

    const req = https.request(options, res => {
        res.on("data" , d=> {
            process.stdout.write(d);
        });
    });

    req.on("error", error => {
        console.error(error);
    });

    req.write(data);
    req.end();

}

module.exports = {
    SendMessageWhatsApp
}