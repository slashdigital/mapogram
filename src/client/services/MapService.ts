// This file for service to backend
import MapTypeModel from '../models/MapType';

const apiUrl = process.env.API_URL;

type RequestGenerateMapParams = {
  token: string;
  layout: string;
  address: string;
  zoom: string;
};

export type MapModel = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  outputPath: string;
  zoomLevel: string;
  command: string;
  layout: string;
  lat: string;
  lng: string;
  sessionId: string;
  submitted: boolean;
  status: string;
};
class MapModelResponse {
  data?: MapModel;
  message?: string;
  error: boolean;
}

// TODO: update api call
class MapService {
  public generateMap = async (
    baseUrl: string = apiUrl,
    params: RequestGenerateMapParams
  ): Promise<MapModelResponse> => {
    const res = await fetch(`${baseUrl}api/maps/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    return data;
  };
  public getMapById = async (
    id: string,
    baseUrl: string = apiUrl
  ): Promise<MapModel> => {
    const res = await fetch(`${baseUrl}api/maps/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data.data;
  };
  public getMapGallery = async (limit: number): Promise<[MapModel]> => {
    const res = await fetch(`${apiUrl}api/maps/list?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data.data;
  };
  public getMapTypes = async (): Promise<Array<MapTypeModel>> => {
    try {
      const res = await fetch(`${apiUrl}api/map-types`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
