const axios = require('axios');
const fs = require('fs-extra');


async function UploadAudioToAssemblyAI(data, number){
    console.log("UploadAudioToAssemblyAI chamado");
    console.log(data);
    const base_url = 'https://api.assemblyai.com/v2'

    const headers = {
      authorization: 'd2f2e4aa21404f8db46f35a8638f87ec' 
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

    const headers = {
      authorization: 'd2f2e4aa21404f8db46f35a8638f87ec' 
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
        var text = transcriptionResult.text;
        whatsappServices.SendMessageWhatsApp(text, number);
        break
    } else if (transcriptionResult.status === 'error') {
        throw new Error(`Transcription failed: ${transcriptionResult.error}`)
    } else {
        await new Promise((resolve) => setTimeout(resolve, 3000))
    }
    }
   
}

module.exports = {
    UploadAudioToAssemblyAI,
    TranscribeAudioAssemblyAI
}