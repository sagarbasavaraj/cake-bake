const mongoose = require("mongoose");
const config = require("config");

class CakeBakeDb {
  async connectDB() {
    let instance = null;
    try {
      instance = await mongoose.connect(config.get("mongoURI"), {
        dbName: "cakebake",
        useNewUrlParser: true
      });
      mongoose.set("useFindAndModify", false);
      console.log("connected to MongoDB.....");
    } catch (e) {
      console.error("Error in connecting to data base: ", e.message);
      process.exit();
    }
    return instance;
  }
}

module.exports = CakeBakeDb;
