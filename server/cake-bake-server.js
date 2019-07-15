const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const CakeBakeDb = require("./db/db");
const orderRouter = require('./routes/orders');

class CakeBakeServer {
  constructor(requestHandler) {
    this.appRequestHandler = requestHandler;
  }
  
  async start() {
    const app = express();
    const port = config.get("port");
    const cakeBakeDb = new CakeBakeDb();
    await cakeBakeDb.connectDB();

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use('/api/cakes', orderRouter);

    app.get("*", (req, res) => {
      return this.appRequestHandler(req, res);
    });

    app.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
}

module.exports = CakeBakeServer;
