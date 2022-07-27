/* eslint-disable @typescript-eslint/ban-types */
//Download file from URL function
//Download zip files from NASA site to a temporary folder
//After the download completed, Copy the temporary file to /data/Datasources folder

import { request } from 'https';
import fs from 'fs';
import { dirname } from 'path';

const dlFile = async (
  url: string,
  tmpFileName: string,
  dstFileName: string,
  callback: Function
) => {
  //Make sure the directory exist / created relative to the project's root
  fs.mkdirSync(dirname(tmpFileName), { recursive: true });
  fs.mkdirSync(dirname(dstFileName), { recursive: true });

  console.log(url);

  const req = request(url, res => {
    console.log(`statusCode: ${res.statusCode}`);

    if (res.statusCode !== 200) {
      throw new Error('Download error: ' + res.statusCode);
    }

    res.pipe(fs.createWriteStream(tmpFileName)).on('close', () => {
      //Wait for the download to complete before copying temp file to datasource folder
      fs.copyFile(tmpFileName, dstFileName, error => {
        if (error) {
          console.error('fs.copyFile Error: ' + error);
          throw error;
        }

        console.log(tmpFileName + ' was copied to ' + dstFileName);

        callback();
      });
    });
  });

  req.on('error', error => {
    console.error('reg.onError: ' + error);
    throw error;
  });

  req.end();
};

export default dlFile;
