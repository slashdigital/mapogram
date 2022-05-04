
// This file for service to backend

import getConfig from 'next/config'


import MapTypeModel from '../models/MapType';

const { publicRuntimeConfig } = getConfig();


const apiUrl = process.env.API_URL;

interface RequestGenerateMapParams {
  token: String,
  layout: String,
  address: String
  zoom: String
}

export interface MapModel {
  id: Number,
  createdAt: Date,
  updatedAt: Date,
  title: String,
  outputPath: String,
  zoomLevel: String,
  command: String,
  layout: String,
  lat: String,
  lng: String,
  sessionId: String,
  submitted: boolean,
  status: String,
}
class MapModelResponse {
  data?: MapModel;
  message?: String;
  error: boolean;
}
class MapTypeResponse {
  data?: MapTypeModel;
  message?: String;
  error: boolean;
}

// TODO: update api call
class MapService {
  public generateMap = async (baseUrl: String  = apiUrl, params: RequestGenerateMapParams ):Promise<MapModelResponse> => {
    console.log(apiUrl, process.env, publicRuntimeConfig);
    const res = await fetch(`${baseUrl}api/maps/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    console.log(res);
    const data = await res.json();
    return data;
  };
  public getMapById = async (id: String, baseUrl: String  = apiUrl):Promise<MapModel> => {
    const res = await fetch(`${baseUrl}api/maps/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await res.json();
    return data.data;
  };
  public getMapGallery = async (limit: Number):Promise<[MapModel]> => {
    console.log(`${apiUrl}api/maps`);
    const res = await fetch(`${apiUrl}api/maps/list?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await res.json();
    return data.data;
  };
  public getMapTypes = async ():Promise<Array<MapTypeModel>> => {
    try {

      console.log('app config', apiUrl, process.env, publicRuntimeConfig);
      const res = await fetch(`${apiUrl}api/map-types`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await res.json();
      return data.data;
    } catch (e) {
      return [];
    }
  };
}

export default new MapService();