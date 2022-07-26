import schedule from "node-schedule";
import dlFile from "./downloader";
import unzipFile from "./unzipper";

// Run task every 4 hours
const rule = "* */4 * * *";

const viirsSrcFile =
  "https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/shapes/zips/SUOMI_VIIRS_C2_Global_24h.zip";
const viirsTmpFile = "/tmp/SUOMI_VIIRS_C2_Global_24h.zip";
const viirsDstFile = "/Data/Datasources/SUOMI_VIIRS_C2_Global_24h.zip";
const viirsUnzipPath = "/Data/Datasources/SUOMI_VIIRS_C2_Global_24h";

const modisSrcFile =
  "https://firms.modaps.eosdis.nasa.gov/data/active_fire/modis-c6.1/shapes/zips/MODIS_C6_1_Global_24h.zip";
const modisTmpFile = "/tmp/MODIS_C6_1_Global_24h.zip";
const modisDstFile = "/Data/Datasources/MODIS_C6_1_Global_24h.zip";
const modisUnzipPath = "/Data/Datasources/MODIS_C6_1_Global_24h";

const syncDsTask = async () => {
  //Download zip files from NASA site to a temporary folder
  //After the download completed, Copy the temporary file to /data/Datasources folder
  dlFile(viirsSrcFile, viirsTmpFile, viirsDstFile)
    .then(async () => unzipFile(viirsDstFile, viirsUnzipPath))
    .catch((error) => console.error(error));

  dlFile(modisSrcFile, modisTmpFile, modisDstFile)
    .then(async () => unzipFile(modisDstFile, modisUnzipPath))
    .catch((error) => console.error(error));
};

const job = schedule.scheduleJob(rule, syncDsTask);
console.warn("Download job scheduled for every 4 hours!");
