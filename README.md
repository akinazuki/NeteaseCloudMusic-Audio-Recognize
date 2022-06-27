# NeteaseCloudMusic-Audio-Recognize

## Usage

```
$ npm i
$ npm run test-ts samples/Komplexe.mp3

> ncm-audio-recognize@1.0.0 test
> tsx test.ts "samples/Komplexe.mp3"

Module loading: /Users/natsuki/workspace/ncm-audio-recognize/afp.wasm
Module loaded: [object WebAssembly.Instance]
Encoded Data:  W5/Hd3yYCY2E....
[1] Komplexe - 雄之助 Album: 「maimai でらっくす ベストアルバムちほー」 CID: [1914659931]
```

## Usage (with CommonJS)

> We refactor the `web-audio-api` project to use CommonJS
> The CommonJS module name is `web-audio-api-cjs`

Try it with command:

```
npm run test-js samples/Komplexe.mp3
```

## Documentation

```NeteaseUtils.Encode(audiodata, from, len, channel)```

Params| Type |Description|
|-------|-------|-------|
```audiodata``` | `AudioBuffer` | The audio data. 
```from``` | `number` | The time when the audio data started
```len``` | `number` | The secs of the audio data.
```channel``` | `number` | The channel of the audio data.


## Credits

[MicroCBer/BeatSaverSongData](https://github.com/MicroCBer/BeatSaverSongData)