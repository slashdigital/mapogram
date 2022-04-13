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
    return this.handler(req, res);
  };
  public showMapGenerationStatus = (req, res) => {
    logger.info('Pages::map generation status page - render');
    
    return this.handler(req, res);
  };
  public showMapListPage = (req, res) => {
    return this.handler(req, res);
  };
}

export default PagesController;