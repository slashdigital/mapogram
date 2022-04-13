

import next from 'next';
import { URL } from 'url';

const app = next(require('../../../config/next'));
const handler = app.getRequestHandler();


const render: Function = (req, res, params): void => {
  console.log(req.url);
  // const url = new URL(req.url);
  // console.log(url);
  app.render(req, res, req.url , { ...params });
};

export {
  app,
  handler,
  render
}