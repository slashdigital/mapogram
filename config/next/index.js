const path = require("path");
require('dotenv').config()

const dev = process.env.NODE_ENV !== "production";

console.log(process.env);

module.exports = {
  dev,
  distDir: 'build',
  dir: path.resolve(__dirname, "../../src/client"), // changing page client directory
  config: require("../../tsconfig.json"),
  
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.API_URL,
  },
};