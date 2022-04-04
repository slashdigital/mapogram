const nextBuild = require("next/dist/build").default;
const nextConfig = require("../config/next");
nextBuild(nextConfig.dir, nextConfig.config, false, true, false).then((e) => {
  console.log('Build successfully');
  process.exit(0);
});