const apiKey = process.env.GOOGLE_MAP_API_KEY;
import { v4 as uuidV4 } from "uuid";
import { MapConfig, MapQGISParamsType } from "../utils/constants";

interface AddressComponent {
  long_name: String;
  short_name: String;
  types: Array<String>;
}
interface LatLng {
  lat: Number;
  lng: Number;
}
interface Bounds {
  northeast: LatLng;
  southwest: LatLng;
}
interface Geometry {
  bounds: Bounds;
  location: LatLng;
  location_type: String;
  viewport: Bounds;
}
interface Geolocation {
  address_components: Array<AddressComponent>;
  formatted_address: String;
  geometry: Geometry;
  place_id: String;
  types: Array<String>;
}

interface GeocodeResponse {
  results: Array<Geolocation>;
  status: String;
}

export const geocodeAddress = async (address): Promise<GeocodeResponse> => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
  const res = await fetch(url);
  const data: GeocodeResponse = await res.json();
  return data;
};

export const getExtentEPSG4326 = (geoResponse: GeocodeResponse) => {
  if (!geoResponse.results.length) {
    throw new Error("No geo data");
  }
  const val1 = geoResponse.results[0].geometry.viewport.northeast.lng;
  const val2 = geoResponse.results[0].geometry.viewport.southwest.lng;
  const val3 = geoResponse.results[0].geometry.viewport.northeast.lat;
  const val4 = geoResponse.results[0].geometry.viewport.southwest.lat;
  return `${val1},${val2},${val3},${val4} [EPSG:4326]`;
};

/**
 *
 * @param viewPortBounds
 * @param layout
 */

interface MapGenerationParamType {
  payload: MapQGISParamsType;
  uniqueId: String;
}
export const buildParameters = (
  geoResponse: GeocodeResponse,
  layout: string
): MapGenerationParamType => {
  try {
    const outputName = uuidV4();
    const config: MapQGISParamsType = {
      ...MapConfig[layout],
    };
    const extent = getExtentEPSG4326(geoResponse);
    config.output_filename = config.output_filename.replace(
      "{NAME}",
      outputName
    );
    config.extent = extent;

    return {
      uniqueId: outputName,
      payload: config,
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
