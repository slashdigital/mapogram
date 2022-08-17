//Download zip files from NASA site to a temporary folder
//After the download completed, Copy the temporary file to /data/Datasources folder

import schedule from 'node-schedule';
import dlFile from '../../utils/downloader';
import unzipFile from './unzipper';
import { rule, viirsFiles, modisFiles } from './config';

const syncDsTask = async () => {
  dlFile(viirsFiles.srcUrl, viirsFiles.tmp, viirsFiles.dst, () =>
    unzipFile(viirsFiles.dst, viirsFiles.unzipPath)
  ).catch(error => console.error(error));

  dlFile(modisFiles.srcUrl, modisFiles.tmp, modisFiles.dst, () =>
    unzipFile(modisFiles.dst, modisFiles.unzipPath)
  ).catch(error => console.error(error));
};

schedule.scheduleJob(rule, syncDsTask);
console.warn('[Cron] Datasources sync job is scheduled for every 4 hours');

//Test download
// const testSyncDsTask = async () => {
//   dlFile(viirsFiles.srcUrl, viirsFiles.tmp, viirsFiles.dst, () =>
//     unzipFile(viirsFiles.dst, viirsFiles.unzipPath)
//   ).catch(error => console.error(error));

//   dlFile(modisFiles.srcUrl, modisFiles.tmp, modisFiles.dst, () =>
//     unzipFile(modisFiles.dst, modisFiles.unzipPath)
//   ).catch(error => console.error(error));

//   // unzipFile(viirsFiles.dst, viirsFiles.unzipPath);
//   // unzipFile(modisFiles.dst, modisFiles.unzipPath);
// };

// testSyncDsTask();
