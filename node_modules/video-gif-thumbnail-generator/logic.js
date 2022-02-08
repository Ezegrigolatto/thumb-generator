const fs = require ('fs')
var md5 = require ('md5');
var ffmpeg = require('ffmpeg');
var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffprobePath = require('@ffprobe-installer/ffprobe').path;
var ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

exports.convertToThumbnail = async (inputFile) =>{
    var proc = new ffmpeg(inputFile)
    .takeScreenshots({
        count: 1,
        timemarks: [ '600' ] // number of seconds
      }, './thumbnail/', function(err) {
      console.log('screenshots were saved')
    });
      let fileName = ''
     var proc = await ffmpeg(inputFile)
        .on('filenames', function(filenames) {
          console.log('screenshots are ' + filenames.join(', '));   
          fileName = filenames.join(', ')
        })
        .on('end', function() {
          console.log('screenshots were saved');
        })
        .on('error', function(err) {
          console.log('an error happened: ' + err.message);
        })
        // take 1 screenshots at predefined timemarks and size
        .takeScreenshots({ count: 1, timemarks: [ '00:00:01.000' ], size: '200x200' }, "./thumbnail/");
        fs.rename('./thumbnail/'+fileName , './thumbnail/'+md5(Date.now())+'.png', () => {
            console.log("\nFile Renamed!\n");
        });
}
let gifURL   = Math.round((new Date()).getTime() / 1000)+'.gif'
exports.convertToGIF = async(fileName) => {
    // create sort vedio
    ffmpeg(fileName)
        .setStartTime('00:00:03')
        .setDuration('10')
        .size("480x320")
        .output(`./thumbnail/${gifURL}`)
        .on('end', function(err) {
        if(!err) { console.log('conversion Done') }
        })
        .on('error', function(err){
        console.log('error: ', err)
    }).run()
}


