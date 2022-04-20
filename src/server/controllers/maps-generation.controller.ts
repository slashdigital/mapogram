import { RequestHandler } from 'next/dist/server/next';
import logger from '../utils/log';
import response from '../utils/response';
import { MapStatus } from '../utils/constants';
import MapModel from '../../shared/models/map.model';
import { requestMap, queryOutput, RequestMapParams } from "../services/powerautomate";

class MapGenerationController {
  handler: RequestHandler;
  render: Function;
  constructor(_handler: RequestHandler, _render: Function) {
    this.handler = _handler;
  }

  public doGenerateMap = async (req, res) => {
    logger.info('Pages::home page - render');
    let map = new MapModel();
    map.mapId = '1';
    map.staticMapUrl = 'https://devops.com/wp-content/uploads/2020/04/Software-Testing.jpg';
    map.status = MapStatus.Draft;
    const result = await requestMap({ 
      dataSource: '',
      zoomLevel: '',
      latLng: [0 ,1]
    });
    console.log('request result', result);
    const resultOutput = await queryOutput({ 
      outputPath: '',
      id: ''
    });
    console.log('request result output', resultOutput);
    return response.success(res, map);
  };
  public getGeneratedMap = (req, res) => {
    logger.info('API::map - get generated map');
    let map = new MapModel();
    map.mapId = '1';
    map.staticMapUrl = 'https://devops.com/wp-content/uploads/2020/04/Software-Testing.jpg';
    map.status = MapStatus.Generating;
    return response.success(res, map);
  };
  public getGeneratedMapGallery = (req, res) => {
    logger.info('API::map - get generated map gallery');
    let map = new MapModel();
    map.mapId = '1';
    map.staticMapUrl = 'https://devops.com/wp-content/uploads/2020/04/Software-Testing.jpg';
    let map2 = new MapModel();
    map2.mapId = '2';
    map2.staticMapUrl = 'https://images.unsplash.com/photo-1649771993311-4a59eb0b0458?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1956&q=80';
    map2.status = MapStatus.Generating;
    return response.success(res, [map, map2]);
  };
}

export default MapGenerationController;