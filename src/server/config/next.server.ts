/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */
import next from 'next';

const app = next(require('../../../config/next'));
const handler = app.getRequestHandler();

const render: Function = (req, res, params): void => {
  console.log(req.url);
  app.render(req, res, req.url, { ...params });
};

export { app, handler, render };
