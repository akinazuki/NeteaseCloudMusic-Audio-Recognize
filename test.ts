import NeteaseUtils from './sandbox.bundle';
import { AudioContext } from 'web-audio-api'
import fs from 'fs';

(async () => {
    let songdata = fs.readFileSync('Komplexe.mp3')
    const audioCtx = new AudioContext();
    let data = await audioCtx.decodeAudioData(songdata)
    let encoded = await NeteaseUtils.Encode(data, 4, 6, 0)
    console.log(`Encoded Data: `,encoded)
})()