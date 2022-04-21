
// This file for service to backend

import getConfig from 'next/config'
import MapModel from "../../shared/models/map.model";
import MapTypeModel from '../models/MapType';

const { publicRuntimeConfig } = getConfig();


const apiUrl = process.env.API_URL;


// TODO: update api call
class MapService {
  public generateMap = async (baseUrl: String  = apiUrl ):Promise<MapModel> => {
    console.log(apiUrl, process.env, publicRuntimeConfig);
    const res = await fetch(`${baseUrl}api/maps/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    console.log(res);
    const data = await res.json();
    return data;
  };
  public getMapById = async (id: String):Promise<MapModel> => {
    const res = await fetch(`${apiUrl}api/maps/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await res.json();
    return data;
  };
  public getMapGallery = async ():Promise<[MapModel]> => {
    console.log(process.env);
    console.log(`${apiUrl}api/maps`);
    const res = await fetch(`${apiUrl}api/maps/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await res.json();
    return data;
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
      return data;
    } catch (e) {
      return [];
    }
  };
}

export default new MapService();