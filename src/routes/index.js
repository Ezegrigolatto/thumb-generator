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
    const host = req.get("host");
    res.send(`https://${host}/thumbnail/tn.png`);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/image", upload.single("file"), async (req, res) => {
  try {
    const arch = req.file;
    await pipeline(
      arch.stream,
      fs.createWriteStream(`${__dirname}/../uploads/${arch.originalName}`)
    );
    const host = req.get("host");
    res.send(`https://${host}/uploads?file=${arch.originalName}`);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
})

router.get("thumbnail",(req,res)=>{
  const host = req.get("host");
    res.send(`https://${host}/uploads?file=${arch.originalName}`);
})

router.get("/thumbnail/tn.png", (req, res) => {
  const dir = fs.realpathSync(`${__dirname}/../../thumbnail/`) + "/tn.png";
  res.sendFile(dir);
});

router.get("/uploads", (req, res) => {
  const {file} = req.query;
  const dir = fs.realpathSync(`${__dirname}/../uploads/`) + "/" + file;
  res.sendFile(dir);
});

module.exports = router;
