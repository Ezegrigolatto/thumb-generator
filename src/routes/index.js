const { Router } = require("express");
const converter = require("video-gif-thumbnail-generator");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const multer = require("multer");
const upload = multer();

const router = Router();

router.post("/video", upload.single("file"), async (req, res) => {
    console.log("hasta aca llegue antes de guardar el video")
    console.log(req.file)
  try {
    const arch = req.file;
    await pipeline(
      arch.stream,
      fs.createWriteStream(`../uploads/${arch.originalName}`)
    );
    await converter.convertToThumbnail(
      `../uploads/${arch.originalName}`
    );
    const dir = fs.realpathSync(`../../thumbnail/`) + "/tn.png";
    res.send("ok");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
router.post("/thumbnail/tn.png", function (req, res) {
  console.log(req.body);
  res.send("ok");
});

router.get("/thumbnail/tn.png", (req, res) => {
  const dir = fs.realpathSync(`${__dirname}/../../thumbnail/`) + "/tn.png";
  res.sendFile(dir);
});

module.exports = router;
