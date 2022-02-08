const { Router } = require("express");
const converter = require("video-gif-thumbnail-generator");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const multer = require("multer");
const upload = multer();

const router = Router();

router.post("/video", upload.single("file"), async (req, res) => {
  try {
    const arch = req.file;
    await pipeline(
      arch.stream,
      fs.createWriteStream(`${__dirname}/../uploads/${arch.originalName}`)
    );
    await converter.convertToThumbnail(
      `${__dirname}/../uploads/${arch.originalName}`
    );
    const dir = fs.realpathSync(`${__dirname}/../../thumbnail/`) + "/tn.png";
    res.send("ok");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
router.post("/thumbnail", function (req, res) {
  console.log(req.body);
  res.send("ok");
});

router.get("/thumbnail", (req, res) => {
  const dir = fs.realpathSync(`${__dirname}/../../thumbnail/`) + "/tn.png";
  res.sendFile(dir);
});

module.exports = router;
