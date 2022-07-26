import https from 'https'
import fs from 'fs'

//Download file from URL function
//Download zip files from NASA site to a temporary folder
//After the download completed, Copy the temporary file to /data/Datasources folder

const dlFile = async (
  url: string,
  tmpFileName: fs.PathLike,
  dstFileName: fs.PathLike
) => {
  fs.mkdirSync(tmpFileName) //Make sure the directory exist / created
  fs.mkdirSync(dstFileName) //Make sure the directory exist / created

  const req = https.request(url, res => {
    console.log(`statusCode: ${res.statusCode}`)
    if (res.statusCode !== 200) {
      throw new Error('Download error: ' + res.statusCode)
    }
  })

  req.pipe(fs.createWriteStream(tmpFileName))

  req.on('error', error => {
    throw error
  })

  req.on('close', () => {
    //Wait for the download to complete before copying temp file to datasource folder
    fs.copyFile(tmpFileName, dstFileName, error => {
      if (error) {
        throw error
      } else {
        console.log(tmpFileName + ' was copied to ' + dstFileName)
      }
    })
  })

  req.end()
}

export default dlFile
