import path from 'path';
const {
  QGIS_MAPOGRAM_FIRE_SERVER_URL,
  QGIS_MAPOGRAM_FIRE_LAYERS,
  PA_QGIS_OUTPUT_EXT,
} = process.env;

export const PUBLIC_FOLDER = path.join(__dirname, '../public');

export const GIS_DEFAULT_PARAMS = {
  'fire-disaster.layout': {
    SERVICE: 'WMS',
    REQUEST: 'GetPrint',
    CRS: 'EPSG:4326',
    FORMAT: 'jpg',
    TEMPLATE: 'MapogramView',
    'map0:LAYERS': QGIS_MAPOGRAM_FIRE_LAYERS,
    'map0:EXTENT': '11.3466,104.2199,12.15,105.1276' // TODO: to get from geo response
  }
};

export const GIS_SERVER_URL = {
  'fire-disaster.layout': QGIS_MAPOGRAM_FIRE_SERVER_URL
};

export type MapQGISParamsType = {
  output_filename: string;
  az_blob_url: string;
  az_blob_sas_token: string;
  layout: string;
  extent: string;
  project_name: string;
};

export const MapStatus = {
  Failed: 0,
  Draft: 1,
  Generating: 2,
  Success: 3
};

const fireLayout: MapQGISParamsType = {
  output_filename: `{NAME}.${PA_QGIS_OUTPUT_EXT}`,
  az_blob_url: '',
  az_blob_sas_token: '',
  layout: 'MapogramView',
  extent: '100.115987583,107.564525181,13.88109101,22.4647531194 [EPSG:4326]',
  project_name: 'Mapogram-FIRMS.qgz'
};

export const MapConfig = {
  'fire-disaster.layout': fireLayout
};

