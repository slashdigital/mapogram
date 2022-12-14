/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import bodyParser from 'body-parser';
import appRouter from './routes/app.router';
import apiRouter from './routes/api.router';
import path from 'path';
import { app as nextApp, handler } from './config/next.server';
import './services/scheduler/scheduler';

const PORT = parseInt(process.env.PORT);
const HOST = process.env.HOST;

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
  }

  private routerConfig() {
    this.app.use('/api', apiRouter);
    this.app.use('/', appRouter);
  }

  public start = (port: number, host: string) => {
    return new Promise((resolve, reject) => {
      nextApp
        .prepare()
        .then(() => {
          this.app.use(express.static(path.join(__dirname, './public')));
          this.app.get('*', (req, res) => {
            return handler(req, res);
          });

          this.app
            .listen(port, host, () => {
              resolve(port);
            })
            .on('error', (err: Object) => reject(err));
        })
        .catch((err: Object) => reject(err));
    });
  };
}
const server = new Server();
server.start(PORT, HOST).then(() => {
  console.log(`Running server at ${HOST}:${PORT}`);
}).catch(err => console.log(err));

export default server;
