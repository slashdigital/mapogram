const path = require("path");
const dev = process.env.NODE_ENV !== "production";

module.exports = {
  dev,
  dir: path.resolve(__dirname, "../../src/client"), // changing page client directory
  config: require("../../tsconfig.json")
};