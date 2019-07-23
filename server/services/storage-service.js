const multer = require("multer");
const GridFsStream = require("gridfs-stream");
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
            const nameWithoutExt = path.parse(file.originalname).name;
            const fileInfo = {
              filename: filename,
              bucketName: "photos",
              metadata: {
                originalname: file.originalname,
                title: nameWithoutExt
              }
            };
            resolve(fileInfo);
          });
        });
      }
    });

    //initialize stream
    this.gfs = GridFsStream(db, mongoose.mongo);
    //collection
    this.gfs.collection("photos");
    this.upload = multer({ storage });
  }
}

module.exports = StorageService;
