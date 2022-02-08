const { Router } = require("express");
const converter = require('video-gif-thumbnail-generator')
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline);
const multer = require("multer");
const upload = multer();


// const { Diet, Recipe } = require("../db");

const router = Router();


router.post("/video", upload.single("file"), async (req, res) => {
    const arch = req.file;
    await pipeline(arch.stream, fs.createWriteStream(`${__dirname}/../uploads/${arch.originalName}`));
    await converter.convertToThumbnail(`${__dirname}/../uploads/${arch.originalName}`);  
    res.send("ok");
});

router.get('/', (req, res) => {
    const dir=fs.realpathSync(`${__dirname}/../../thumbnail/`) + "/tn.png";
    console.log(dir)
    res.sendFile(dir);
})


module.exports = router;
