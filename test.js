import ncmutils from './src/lib'
import fs from 'fs'

const buffer = fs.readFileSync("./1_8000000.mp3")

const encoded = await ncmutils.encode(buffer)
const result = await ncmutils.recognize(encoded)
result.forEach((item, index) => {
  console.log(`[${index + 1}] ${item.song.name} - ${item.song.artists.map(artist => artist.name).join('/')} Album: 「${item.song.album.name}」 CID: [${item.song.id}]`)
  // console.log(item)
})

const lyrics = await ncmutils.lyrics(result[0].song.id)
console.log(lyrics.lrc.lyric)