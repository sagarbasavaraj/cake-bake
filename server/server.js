const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const CakeBakeDb = require("./db/db");
const orderRouter = require("./routes/orders");

class CakeBakeServer {
  async start() {
    const app = express();
    const PORT = config.get("port");
    const cakeBakeDb = new CakeBakeDb();
    await cakeBakeDb.connectDB();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use("/api/cakes", orderRouter);

    app.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  }
}

new CakeBakeServer().start();
