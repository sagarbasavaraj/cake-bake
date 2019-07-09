const express = require("express");
const config = require("config");
const CakeBakeDb = require("./db/db");

class CakeBakeServer {
  constructor(requestHandler) {
    this.appRequestHandler = requestHandler;
  }
  
  async start() {
    const server = express();
    const port = config.get("port");
    const cakeBakeDb = new CakeBakeDb();
    await cakeBakeDb.connectDB();

    server.get("*", (req, res) => {
      return this.appRequestHandler(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
}

module.exports = CakeBakeServer;
