declare module 'ncm-audio-recognize' {
  function encode(audio: Buffer): Promise<string>
  function recognize(encodedString: string): Promise<any>
  export {
    encode,
    recognize
  }
}