import path from 'path';
const {
  QGIS_MAPOGRAM_FIRE_SERVER_URL,
  PA_QGIS_OUTPUT_EXT,
  PA_AZ_BLOB_URL,
  PA_AZ_BLOB_TOKEN,
} = process.env;

export const PUBLIC_FOLDER = path.join(__dirname, '../public');

export const GIS_DEFAULT_PARAMS = {
  'fire-disaster.layout': {
    SERVICE: 'WMS',
    VERSION: '1.3.0',
    REQUEST: 'GetPrint',
    CRS: 'EPSG:3857',
    FORMAT: 'jpg',
    TEMPLATE: 'MapogramView',
    'map0:LAYERS':
      'Google Satellite Hybrid,MODIS 24h Confidence (80-95),MODIS 24h Confidence (>= 95)',
    'map0:ROTATION': '0',
    'map0:GRID_INTERVAL_X': '0',
    'map0:GRID_INTERVAL_Y': '0',
    'map0:EXTENT': '8571182,-3773207,17443267,2519429', // TODO: to get from geo response
  },
};

export const GIS_SERVER_URL = {
  'fire-disaster.layout': QGIS_MAPOGRAM_FIRE_SERVER_URL,
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
  Success: 3,
};

const fireLayout: MapQGISParamsType = {
  output_filename: `{NAME}.${PA_QGIS_OUTPUT_EXT}`,
  az_blob_url: PA_AZ_BLOB_URL,
  az_blob_sas_token: PA_AZ_BLOB_TOKEN,
  layout: 'MapogramView',
  extent: '100.115987583,107.564525181,13.88109101,22.4647531194 [EPSG:4326]',
  project_name: 'Mapogram-FIRMS.qgz',
};

export const MapConfig = {
  'fire-disaster.layout': fireLayout,
};

export const PowerautomateUrls = {
  MapGeneration: {
    unattended:
      'https://prod-08.southeastasia.logic.azure.com:443/workflows/58dfc8eef5d34abeba27b560de497a45/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3z9dMbl4_o5s7qz73Y2tkNEOZQoOApOPm3O93P2ahRk',
    attended:
      'https://prod-04.southeastasia.logic.azure.com:443/workflows/586b01d7b1f4428792ece392d713c43f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ongq5JWFvumdL0a_NtomPJPd8QabEf_EQ9iBRH3Yl0Q',
  },
};
