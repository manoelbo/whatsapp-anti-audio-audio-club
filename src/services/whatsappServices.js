const https = require("https");
// const url = require('url');
const axios = require('axios');
const assemblyaiServices = require("./assemblyaiServices");



function SendMessageWhatsApp(textResponse, number){
    const Authorization = "Bearer " + process.env.META_TOKEN;
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "recipient_type": "individual",
        "to": number,
        "text": {
            "body": textResponse
        },
        "type": "text"
    });

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

function getMediaURLWhatsApp(id, number){
    const path = "/v17.0/"+id;
    const Authorization = "Bearer " + process.env.META_TOKEN;
    const options = {
        host: "graph.facebook.com",
        path,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: Authorization
        }
    };

    const req = https.request(options, (res) => {
        let data = '';

        // A "data" event is emitted when a chunk of data is received
        res.on('data', (chunk) => {
            data += chunk;
        });


        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                var url = json["url"];
                console.log(url);
                downloadMediaFromWhatsApp(url, number);

            } catch (error) {
                console.error('An error occurred:', error);
            }
        });
    });

    req.on('error', (error) => {
        console.error('An error occurred:', error);
    });

    req.end();
    
}

async function downloadMediaFromWhatsApp(urlStr, number) {
    try {
        console.log("downloadMediaFromWhatsApp foi chamada");
        const Authorization = "Bearer " + process.env.META_TOKEN;

        const response = await axios({
            method: 'get',
            url: urlStr,
            headers: { Authorization },
            responseType: 'stream' // Isso é importante para lidar com arquivos de áudio
        });

        let data = [];
        response.data.on('data', chunk => {
            data.push(chunk);
        });

        response.data.on('end', () => {
            let audioData = Buffer.concat(data); // Convertendo os chunks recebidos em um único Buffer
            // Aqui você pode fazer o processamento adicional do áudio, se necessário
            // e enviar para outra API usando a variável 'audioData'

            console.log("Áudio baixado com sucesso:", audioData);
            assemblyaiServices.UploadAudioToAssemblyAI(audioData, number);
            // Chame a função para enviar para outra API aqui
        });

    } catch (error) {
        console.error("Ocorreu um erro:", error);
        // Faça o log de erros ou tome a ação apropriada
    }
}

// async function downloadMediaFromWhatsApp(urlStr) {
//     try {
//         console.log("downloadMediaFromWhatsApp foi chamada");
//         const Authorization = "Bearer " + process.env.META_TOKEN;

//         const parsedUrl = new URL(urlStr);
//         const options = {
//             host: parsedUrl.hostname,
//             path: parsedUrl.pathname + parsedUrl.search,
//             method: "GET",
//             headers: {
//                 Authorization
//             }
//         };

//         const response = await new Promise((resolve, reject) => {
//             const req = https.request(options, resolve);
//             req.on("error", reject);
//             req.end();
//         });

//         let data = '';
//         response.on('data', chunk => {
//             data += chunk;
//         });

//         response.on('end', () => {
//             // Aqui você pode fazer o processamento adicional do áudio, se necessário
//             // e enviar para outra API usando a variável 'data'

//             console.log("Áudio baixado com sucesso:", data);
//             // Chame a função para enviar para outra API aqui
//         });
//     } catch (error) {
//         console.error("Ocorreu um erro:", error);
//         // Faça o log de erros ou tome a ação apropriada
//     }
// }

module.exports = {
    SendMessageWhatsApp,
    getMediaURLWhatsApp
}