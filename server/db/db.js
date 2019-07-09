const mongoose = require("mongoose");
const config = require("config");

class CakeBakeDb {
  async connectDB() {
    try {
      const db = await mongoose.connect(config.get("mongoURI"), {
        dbName: "cakebake",
        useNewUrlParser: true
      });
      console.log("connected to MongoDB.....");
    } catch (e) {
      console.error("Error in connecting to data base: ", e.message);
      process.exit();
    }
  }
}

module.exports = CakeBakeDb;
