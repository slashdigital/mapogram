const nextBuild = require("next/dist/build").default;
const nextConfig = require("../config/next");

nextBuild(nextConfig.dir, nextConfig.config);