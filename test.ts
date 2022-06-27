import NeteaseUtils from './sandbox.bundle';
import { AudioContext } from 'web-audio-api'
import fs from 'fs';
import * as process from 'process';
import axios from 'axios';
(async () => {
    let songdata = fs.readFileSync(process.argv[2])
    const audioCtx = new AudioContext();
    let data = await audioCtx.decodeAudioData(songdata)
    console.log(`Audio Channel Count: ${data.numberOfChannels}`)
    let encoded = await NeteaseUtils.Encode(data, 4, 6, 0)
    console.log(`Encoded Data: `, encoded)

    const querydata = new URLSearchParams({
        'sessionId': '441df692-afea-4a54-8aff-f5f20fd34f12',
        'algorithmCode': 'shazam_v2',
        'duration': '6',
        'rawdata': encoded,
        'times': '2',
        'decrypt': '1'
    }).toString();
    axios({
        method: 'post',
        url: 'https://interface.music.163.com/api/music/audio/match',
        headers: {
            'authority': 'interface.music.163.com',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'origin': 'chrome-extension://pgphbbekcgpfaekhcbjamjjkegcclhhd',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'none',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
        },
        data: querydata
    }).then(function (response) {
        if (!response.data.data?.result) {
            console.log(`No result, please try again`)
            return;
        }
        console.log(`Matched result count: ${response.data.data.result.length}`)
        response.data.data?.result.forEach((item, index) => {
            console.log(`[${index + 1}] ${item.song.name} - ${item.song.artists.map(artist => artist.name).join('/')} Album: 「${item.song.album.name}」 CID: [${item.song.id}]`)
        })
    }).catch(function (error) {
        console.log(error);
    });
})()