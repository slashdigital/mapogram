/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  dev,
  distDir: '../../dist/src/client/.next', //! Warning: this path is relative to dir path
  dir: path.resolve(__dirname, '../../src/client'), // changing page client directory
  config: require('../../tsconfig.json'),

  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.API_URL,
  },
};
