const nextBuild = require("next/dist/build").default;
const nextConfig = require("../config/next");

const { NODE_ENV } = process.env;
nextBuild(nextConfig.dir, nextConfig.config, NODE_ENV == 'production', true, false).then((e) => {
  console.log('Build successfully');
  process.exit(0);
});