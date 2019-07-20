const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const config = require("config");
const CakeBakeDb = require("./db/db");
const router = require("./routes/router");
const StorageService = require('./services/storage-service');

class CakeBakeServer {
  async start() {
    const app = express();
    const PORT = config.get("port");
    const cakeBakeDb = new CakeBakeDb();
    const dbInstance = await cakeBakeDb.connectDB();
    const storageService = new StorageService(dbInstance.connection.db);

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use("/api/cakes", router(storageService));

    app.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  }
}

new CakeBakeServer().start();
