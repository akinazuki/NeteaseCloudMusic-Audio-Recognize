# NeteaseCloudMusic-Audio-Recognize

## Usage

```shell
$ npm install ncm-audio-recognize
$ node test.js samples/Komplexe.mp3
Module loading: /Users/natsuki/workspace/ncm-audio-recognize/afp.wasm
Module loaded: [object WebAssembly.Instance]
Encoded Data:  W5/Hd3yYCY2E....
[1] Komplexe - 雄之助 Album: 「maimai でらっくす ベストアルバムちほー」 CID: [1914659931]
```

## Example Code
```javascript
import ncmutils from 'ncm-audio-recognize'
import fs from 'fs'

const buffer = fs.readFileSync("./takenohana.mp3")
const encoded = await ncmutils.encode(buffer)
const result = await ncmutils.recognize(encoded)
console.log(`Matched result count: ${result.length}`)
result.forEach((item, index) => {
    console.log(`[${index + 1}] ${item.song.name} - ${item.song.artists.map(artist => artist.name).join('/')} Album: 「${item.song.album.name}」 CID: [${item.song.id}]`)
})
```


## Documentation

### ```encode(fileBuffer)```

Params| Type |Description|
|-------|-------|-------|
```fileBuffer``` | `Buffer` | The audio file data.

Returns: `string` The encoded data.

---

### ```recognize(encodedData)```

Params| Type |Description|
|-------|-------|-------|
```encodedData``` | `string` | The encoded data.

Returns: `Array` The matched result.

---

### ```rawEncode(audiodata, from, len, channel)```

Params| Type |Description|
|-------|-------|-------|
```audioContextData``` | `AudioBuffer` | The audio data. 
```from``` | `number` | The time when the audio data started
```len``` | `number` | The secs of the audio data.
```channel``` | `number` | The channel of the audio data.

Returns: `string` The encoded data.

## Credits

[MicroCBer/BeatSaverSongData](https://github.com/MicroCBer/BeatSaverSongData)