import { v4 as uuidV4 } from 'uuid';
import {
  MapConfig,
  MapQGISParamsType,
  GIS_DEFAULT_PARAMS,
  GIS_SERVER_URL
} from '../utils/constants';

const { PA_QGIS_OUTPUT_EXT } = process.env;
const apiKey = process.env.GOOGLE_MAP_API_KEY;

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: Array<string>;
};
type LatLng = {
  lat: number;
  lng: number;
};
type Bounds = {
  northeast: LatLng;
  southwest: LatLng;
};
type Geometry = {
  bounds: Bounds;
  location: LatLng;
  location_type: string;
  viewport: Bounds;
};
type Geolocation = {
  address_components: Array<AddressComponent>;
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: Array<string>;
};

type GeocodeResponse = {
  results: Array<Geolocation>;
  status: string;
};

export const geocodeAddress = async (address): Promise<GeocodeResponse> => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
  const res = await fetch(url);
  const data: GeocodeResponse = await res.json();
  return data;
};

const getNortheastSouthwestLatLng = (geoResponse: GeocodeResponse) => {
  if (!geoResponse.results.length) {
    throw new Error('No geo data');
  }

  const viewport = geoResponse.results[0].geometry.viewport;
  return {
    northeast: viewport.northeast,
    southwest: viewport.southwest
  };
};

export const getExtentEPSG4326 = (geoResponse: GeocodeResponse) => {
  const { northeast, southwest } = getNortheastSouthwestLatLng(geoResponse);
  const val1 = northeast.lng;
  const val2 = southwest.lng;
  const val3 = northeast.lat;
  const val4 = southwest.lat;

  return `${val1},${val2},${val3},${val4} [EPSG:4326]`;
};

export const getExtentEPSG4326GISServerFormat = (geoResponse: GeocodeResponse) => {
  const { northeast, southwest } = getNortheastSouthwestLatLng(geoResponse);

  return `${southwest.lat},${southwest.lng},${northeast.lat},${northeast.lng}`;
};

export const buildGISServerParams = (geoResponse: GeocodeResponse, layout: string) => {
  const uniqueId = uuidV4();
  const mapQGISParams = {
    ...GIS_DEFAULT_PARAMS[layout],
    'map0:EXTENT': getExtentEPSG4326GISServerFormat(geoResponse)
  };

  return {
    uniqueId,
    serverUrl: GIS_SERVER_URL[layout],
    outputPath: `/${uniqueId}.${PA_QGIS_OUTPUT_EXT}`,
    payload: mapQGISParams
  };
};

/**
 *
 * @param viewPortBounds
 * @param layout
 */

type MapGenerationParamType = {
  payload: MapQGISParamsType;
  uniqueId: string;
};
export const buildParameters = (
  geoResponse: GeocodeResponse,
  layout: string
): MapGenerationParamType => {
  try {
    const outputName = uuidV4();
    const config: MapQGISParamsType = {
      ...MapConfig[layout]
    };
    const extent = getExtentEPSG4326(geoResponse);
    config.output_filename = config.output_filename.replace('{NAME}', outputName);
    config.extent = extent;

    return {
      uniqueId: outputName,
      payload: config
    };
  } catch (e) {
    console.log(e);
  }
};
/*
{
    "results": [
        {
            "address_components": [
                {
                    "long_name": "Los Angeles",
                    "short_name": "Los Angeles",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "Los Angeles County",
                    "short_name": "Los Angeles County",
                    "types": [
                        "administrative_area_level_2",
                        "political"
                    ]
                },
                {
                    "long_name": "California",
                    "short_name": "CA",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "Los Angeles, CA, USA",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": 34.3373061,
                        "lng": -118.1552891
                    },
                    "southwest": {
                        "lat": 33.7036519,
                        "lng": -118.6681759
                    }
                },
                "location": {
                    "lat": 34.0522342,
                    "lng": -118.2436849
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 34.3373061,
                        "lng": -118.1552891
                    },
                    "southwest": {
                        "lat": 33.7036519,
                        "lng": -118.6681759
                    }
                }
            },
            "place_id": "ChIJE9on3F3HwoAR9AhGJW_fL-I",
            "types": [
                "locality",
                "political"
            ]
        }
    ],
    "status": "OK"
}
*/
