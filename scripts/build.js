/* eslint-disable @typescript-eslint/no-var-requires */
const nextBuild = require('next/dist/build').default;
const nextConfig = require('../config/next');

const { NODE_ENV } = process.env;
nextBuild(nextConfig.dir, nextConfig, NODE_ENV == 'production', true, false).then(() => {
  console.log('Build successfully');
  process.exit(0);
});
