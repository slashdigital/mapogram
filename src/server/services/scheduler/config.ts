import absPath from './path';

const Configs = {
  rule: process.env.SCHEDULER_RULE || '0 */4 * * *',
  viirsSrcFile:
    process.env.SCHEDULER_VIIRS_SRC_FILE ||
    'https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/shapes/zips/SUOMI_VIIRS_C2_Global_24h.zip',
  viirsTmpFile: process.env.SCHEDULER_VIIRS_TMP_FILE || '/Data/tmp/SUOMI_VIIRS_C2_Global_24h.zip',
  viirsDstFile:
    process.env.SCHEDULER_VIIRS_DST_FILE || '/Data/Datasources/SUOMI_VIIRS_C2_Global_24h.zip',
  viirsUnzipPath:
    process.env.SCHEDULER_VIIRS_UNZIP_PATH || '/Data/Datasources/SUOMI_VIIRS_C2_Global_24h',
  modisSrcFile:
    process.env.SCHEDULER_MODIS_SRC_FILE ||
    'https://firms.modaps.eosdis.nasa.gov/data/active_fire/modis-c6.1/shapes/zips/MODIS_C6_1_Global_24h.zip',
  modisTmpFile: process.env.SCHEDULER_MODIS_TMP_FILE || '/Data/tmp/MODIS_C6_1_Global_24h.zip',
  modisDstFile:
    process.env.SCHEDULER_MODIS_DST_FILE || '/Data/Datasources/MODIS_C6_1_Global_24h.zip',
  modisUnzipPath:
    process.env.SCHEDULER_MODIS_UNZIP_PATH || '/Data/Datasources/MODIS_C6_1_Global_24h'
};

export const rule = Configs.rule;

export const viirsFiles = {
  srcUrl: Configs.viirsSrcFile,
  tmp: absPath(Configs.viirsTmpFile),
  dst: absPath(Configs.viirsDstFile),
  unzipPath: absPath(Configs.viirsUnzipPath)
};

export const modisFiles = {
  srcUrl: Configs.modisSrcFile,
  tmp: absPath(Configs.modisTmpFile),
  dst: absPath(Configs.modisDstFile),
  unzipPath: absPath(Configs.modisUnzipPath)
};

export const MAX_FILES = 10;
export const MAX_SIZE = 1_000_000_000; // 1 GB

export const dlFileTypeList = ['cpg', 'dbf', 'prj', 'shp', 'shx'];
