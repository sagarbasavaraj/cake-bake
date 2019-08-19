const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("config");
const passport = require("passport");
const CakeBakeDb = require("./db/db");
const router = require("./routes/default-router");
const orderRoute = require("./routes/order-router");
const userRoute = require("./routes/user-router");
const StorageService = require("./services/storage-service");

//load passport middlewares
require("./auth/auth");

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

    app.use("/api/users", userRoute);
    app.use("/api/images", router(storageService));
    app.use(
      "/api/orders",
      passport.authenticate("jwt", { session: false }),
      orderRoute
    );

    //Handle errors
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({ error: err });
    });

    app.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  }
}

new CakeBakeServer().start();
