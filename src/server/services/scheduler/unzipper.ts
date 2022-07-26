import fs from 'fs'
import jszip from 'jszip'

const unzipFile = async (zipFileName: fs.PathLike, unzipPath: fs.PathLike) => {
  const fileContent = fs.readFileSync(zipFileName)
  const result = await jszip.loadAsync(fileContent)
  const keys = Object.keys(result.files)

  for (const key of keys) {
    const item = result.files[key]
    if (item.dir) {
      if (item.name) {
        fs.mkdirSync(unzipPath + '/' + item.name)
      } else {
        fs.mkdirSync(unzipPath)
      }
    } else {
      fs.writeFileSync(
        unzipPath + '/' + item.name,
        Buffer.from(await item.async('arraybuffer'))
      )
    }
  }
}

export default unzipFile
