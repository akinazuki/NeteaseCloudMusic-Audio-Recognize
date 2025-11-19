export interface Lyrics {
  sgc: boolean
  sfy: boolean
  qfy: boolean
  transUser: TransUser
  lyricUser: LyricUser
  lrc: Lrc
  klyric: Klyric
  tlyric: Tlyric
  romalrc: Romalrc
  code: number
}

export interface TransUser {
  id: number
  status: number
  demand: number
  userid: number
  nickname: string
  uptime: number
}

export interface LyricUser {
  id: number
  status: number
  demand: number
  userid: number
  nickname: string
  uptime: number
}

export interface Lrc {
  version: number
  lyric: string
}

export interface Klyric {
  version: number
  lyric: string
}

export interface Tlyric {
  version: number
  lyric: string
}

export interface Romalrc {
  version: number
  lyric: string
}


declare module 'ncm-audio-recognize' {
  function encode(audio: Buffer): Promise<string>
  function recognize(encodedString: string): Promise<any>
  function rawEncode(audioContextData: ArrayBuffer, from: number, len: number, channel: number): Promise<string>
  function lyrics(cid: number): Promise<Lyrics>
  export {
    encode,
    recognize,
    rawEncode,
    lyrics
  }
}