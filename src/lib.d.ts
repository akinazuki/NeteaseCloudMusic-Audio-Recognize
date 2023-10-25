declare module 'ncm-audio-recognize' {
  function encode(audio: Buffer): Promise<string>
  function recognize(encodedString: string): Promise<any>
  function rawEncode(audioContextData: ArrayBuffer, from: number, len: number, channel: number): Promise<string>
  export {
    encode,
    recognize,
    rawEncode
  }
}