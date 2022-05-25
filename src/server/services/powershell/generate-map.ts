import { spawn } from 'child_process';
import path from 'path';
import { MapConfig } from '../../utils/constants';

const projPath = 'C:/Mapogram/';
const publicFolder = path.join(__dirname, '../../public');

const generateMapPowerShell = (extent: string, output: string, project: string) => {
  const commandLine = `${__dirname}/generate-map.ps1 -Extent "${extent}" -Output "${output}" -Project "${project}"`;
  console.log('Command generate', commandLine);
  const child = spawn('powershell.exe', [commandLine]);
  child.stdout.on("data", function (data) {
    console.log("Powershell Data: " + data);
  });
  child.stderr.on("data", function (data) {
    console.log("Powershell Errors: " + data);
  });
  child.on("exit", function () {
    console.log("Powershell Script finished");
  });
  child.stdin.end();
};


const firmsData = MapConfig['fire-disaster.layout'];
generateMapPowerShell(firmsData.extent.toString(), path.join(publicFolder, 'tset.jpg'), path.join(projPath, firmsData.project_name.toString()));

export {
  generateMapPowerShell
};