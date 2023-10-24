import NeteaseUtils from './sandbox.bundle.cjs'
import { AudioContext } from 'web-audio-api-cjs'

export async function encode(songdata) {
  const audioCtx = new AudioContext();
  let data = await audioCtx.decodeAudioData(songdata)
  // console.log(`Audio Channel Count: ${data.numberOfChannels}`)
  let encoded = await NeteaseUtils.Encode(data, 4, 6, 0)
  // console.log(`Encoded Data: `, encoded)
  return encoded
}
export async function rawEncode(audioContextData, from, len, channel) {
  return NeteaseUtils.Encode(audioContextData, from, len, channel)
}
export async function recognize(encoded) {
  const querydata = new URLSearchParams({
    'sessionId': '441df692-afea-4a54-8aff-f5f20fd34f12',
    'algorithmCode': 'shazam_v2',
    'duration': '6',
    'rawdata': encoded,
    'times': '2',
    'decrypt': '1'
  }).toString();

  const res = await fetch('https://interface.music.163.com/api/music/audio/match', {
    method: 'post',
    headers: {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'origin': 'chrome-extension://pgphbbekcgpfaekhcbjamjjkegcclhhd',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
    },
    body: querydata
  }).then(res => res.json()).then(function (response) {
    return response.data?.result
  })
  return res
}

export default {
  encode,
  recognize
}