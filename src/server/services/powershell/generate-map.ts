import { spawn } from 'child_process'
import path from 'path'
// import { MapConfig } from '../../utils/constants';

const { QGIS_MACHINE_PROJECT_PATH } = process.env

const publicFolder = path.join(__dirname, '../../public')

const generateMapPowerShell = (
  extent: string,
  fileName: string,
  projectName: string
) => {
  return new Promise((resolve, reject) => {
    const stdData = []
    const stdDataError = []

    const project = path.join(QGIS_MACHINE_PROJECT_PATH, projectName.toString())
    const output = path.join(publicFolder, fileName)
    const commandLine = `${__dirname}\\generate-map.ps1 -Extent "${extent}" -Output "${output}" -Project "${project}"`
    console.log('Command generate', commandLine)
    const child = spawn('powershell.exe', [commandLine])
    child.stdout.on('data', function (data) {
      console.log('Powershell Data: ' + data)
      stdData.push('Stdout:')
      stdData.push(stdData)
    })
    child.stderr.on('data', function (data: string) {
      console.log('Powershell Errors: ' + data)
      // Bypassing error
      if (
        !(
          data.includes('Image is a null image') ||
          data.includes(
            'driver does not support update access to existing datasets.'
          )
        )
      ) {
        stdDataError.push(`Error: ${data}`)
      }
    })
    child.on('exit', function () {
      if (stdDataError.length) {
        reject(stdData.concat(stdDataError).join('\n'))
      } else {
        resolve(stdData.join('\n'))
      }

      console.log('Powershell Script finished')
    })
    child.stdin.end()
  })
}

// const firmsData = MapConfig['fire-disaster.layout'];
// generateMapPowerShell(firmsData.extent.toString(), path.join(publicFolder, 'tset.jpg'), path.join(projPath, firmsData.project_name.toString()));

export { generateMapPowerShell }
