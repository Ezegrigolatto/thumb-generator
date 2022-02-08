const { Router } = require("express");
const converter = require('video-gif-thumbnail-generator')
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline);
const multer = require("multer");
const upload = multer();


const router = Router();


router.post("/video", upload.single("file"), async (req, res) => {
    const arch = req.file;
    await pipeline(arch.stream, fs.createWriteStream(`${__dirname}/../uploads/${arch.originalName}`));
    await converter.convertToThumbnail(`${__dirname}/../uploads/${arch.originalName}`);
    res.send("ok");
});

module.exports = router;
