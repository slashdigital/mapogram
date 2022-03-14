const express = require("express");
const next = require("next");

const PORT = process.env.PORT || 3000;
const app = next(require('../../config/next'));
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    // const showRoutes = require("./routes/index.js");

    // server.use("/api", showRoutes(server));

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });