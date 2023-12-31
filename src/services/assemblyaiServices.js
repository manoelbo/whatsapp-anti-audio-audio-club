const axios = require('axios');
const fs = require('fs-extra');


async function UploadAudioToAssemblyAI(data, number){
    console.log("UploadAudioToAssemblyAI chamado");
    console.log(data);
    const whatsappServices = require("./whatsappServices");
    whatsappServices.SendMessageWhatsApp("enviado para IA", number);
    const base_url = 'https://api.assemblyai.com/v2'

    const headers = {
      authorization: process.env.ASSEMBLY_TOKEN
    }
    const response = await axios.post(`${base_url}/upload`, data, { headers })
    
    const upload_url = response.data.upload_url
    console.log(upload_url);
    TranscribeAudioAssemblyAI(upload_url, number);
}


async function TranscribeAudioAssemblyAI(upload_url, number){
    console.log("TranscribeAudioAssemblyAI chamado");
    
    const base_url = 'https://api.assemblyai.com/v2';
    const whatsappServices = require("./whatsappServices");
    whatsappServices.SendMessageWhatsApp("transcrevendo audio", number);

    const headers = {
        authorization: process.env.ASSEMBLY_TOKEN
    }

    const data = {
        audio_url: upload_url,// You can also use a URL to an audio or video file on the web
        language_code: "pt"
    }

    const url = base_url + '/transcript'
    const response = await axios.post(url, data, { headers: headers })

    const transcriptId = response.data.id
    const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`

    while (true) {
    const pollingResponse = await axios.get(pollingEndpoint, {
        headers: headers
    })
    const transcriptionResult = pollingResponse.data

    if (transcriptionResult.status === 'completed') {
        var transcript = "*Transcrição:*\n\n"+transcriptionResult.text;
        whatsappServices.SendMessageWhatsApp(transcript, number);

        break
    } else if (transcriptionResult.status === 'error') {
        throw new Error(`Transcription failed: ${transcriptionResult.error}`)
    } else {
        whatsappServices.SendMessageWhatsApp(".", number);
        await new Promise((resolve) => setTimeout(resolve, 10000))
    }
    }
   
}

module.exports = {
    UploadAudioToAssemblyAI,
    TranscribeAudioAssemblyAI
}