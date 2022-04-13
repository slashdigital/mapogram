import { RequestHandler } from 'next/dist/server/next';
import MapModel from '../../shared/models/map.model';
import { MapStatus } from '../utils/constants';
import logger from '../utils/log';



class PagesController {
  handler: RequestHandler;
  render: Function;
  constructor(_handler: RequestHandler, _render: Function) {
    this.handler = _handler;
    this.render = _render;
    this.showHomePage.bind(this);
    this.showMapGeneration.bind(this);
    this.showMapGenerationStatus.bind(this);
  }

  public showHomePage = (req, res) => {
    logger.info('Pages::home page - render');
    return this.handler(req, res);
  };

  public showMapGeneration = (req, res) => {
    logger.info('Pages::map generation page - render');
    let map = new MapModel();
    map.mapId = '1';
    map.staticMapUrl = 'https://devops.com/wp-content/uploads/2020/04/Software-Testing.jpg';
    map.status = MapStatus.Success;
    return this.render(req, res, {
      map
    });
  };
  public showMapGenerationStatus = (req, res) => {
    logger.info('Pages::map generation status page - render');
    
    let map = new MapModel();
    map.mapId = '1';
    map.staticMapUrl = 'https://devops.com/wp-content/uploads/2020/04/Software-Testing.jpg';
    map.status = MapStatus.Generating;
    return this.render(req, res, {
      map
    });
  };
  public showMapListPage = (req, res) => {
    let map = new MapModel();
    map.mapId = '1';
    map.staticMapUrl = 'https://devops.com/wp-content/uploads/2020/04/Software-Testing.jpg';
    let map2 = new MapModel();
    map2.mapId = '2';
    map2.staticMapUrl = 'https://images.unsplash.com/photo-1649771993311-4a59eb0b0458?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1956&q=80';
    map2.status = MapStatus.Generating;
    return this.render(req, res, {
      maps: [map, map2]
    });
  };
}

export default PagesController;