const https = require("https");
function SendMessageWhatsApp(textResponse, number){
    

    const Authorization = "Bearer " + process.env.META_TOKEN;

    const options = {
        host: "graph.facebook.com",
        path: "/v17.0/114179078380795/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization
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

function getMediaURLWhatsApp(id){
    console.log("getMediaURLWhatsApp chamada");
    const Authorization = "Bearer " + process.env.META_TOKEN;
    const path = "/v17.0/"+id;
    console.log(path);

    const options = {
        host: "graph.facebook.com",
        path,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization
        }
    };

    const req = https.request(options, res => {
        res.on("data" , d=> {
            console.log("foi data");
            console.log(d);
            process.stdout.write(d);
        });
    });

    req.on("error", error => {
        console.error(error);
        console.log(error);
    });
    console.log(data);
    req.write(data);
    req.end();

}

module.exports = {
    SendMessageWhatsApp,
    getMediaURLWhatsApp
}