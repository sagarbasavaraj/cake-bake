const multer = require("multer");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const crypto = require("crypto");
const path = require("path");

const GridFsStorage = require("multer-gridfs-storage");

class StorageService {
  constructor(db) {
    const storage = new GridFsStorage({
      db,
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) {
              return reject(err);
            }
            //generate random names.
            const filename =
              buf.toString("hex") + path.extname(file.originalname);
            const fileInfo = {
              filename: filename,
              bucketName: "photos"
            };
            resolve(fileInfo);
          });
        });
      }
    });
    this.gfs = Grid(db, mongoose.mongo);
    this.gfs.collection("photos");
    this.upload = multer({ storage });
  }

  static get upload() {
    return this.upload;
  }
}

module.exports = StorageService;
