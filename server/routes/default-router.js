const express = require("express");
const {ObjectId} = require('mongoose').Types;

function router(storageService) {
  const router = express.Router();
  const { upload, gfs } = storageService;

  //get all images
  router.get("/", async (req, res) => {
    gfs.files.find().toArray((err, files) => {
      if (err) {
        return res.status(500).send({ err });
      }
      if (!files || !files.length) {
        return res.status(404).send({ msg: "No files exist" });
      }
      return res.send({ files });
    });
  });

  router.get("/details/:id", async (req, res) => {
    gfs.files.findOne({ _id: ObjectId(req.params.id) }, (err, file) => {
      if (err) {
        return res.status(500).send({ err });
      }
      if (!file || !file.length) {
        return res.status(404).send({ msg: "No file exist" });
      }
      return res.send({ file });
    });
  });

  router.get("/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (err) {
        return res.status(500).send({ err });
      }
      if (!file || !file.length) {
        return res.status(404).send({ msg: "No files exist" });
      }
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    });
  });

  //upload images
  router.post("/upload", upload.array("images"), (req, res) => {
    res.json({ file: req.files });
  });

  router.delete("/:id", (req, res) => {
    gfs.remove({ _id: req.params.id, root: "photos" }, err => {
      if (err) {
        return res.send(404).json({ err });
      }
      return res.send({ _id: req.params.id, msg: "deleted successfully" });
    });
  });

  return router;
}

module.exports = router;
