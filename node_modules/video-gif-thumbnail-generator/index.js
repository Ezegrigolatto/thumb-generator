const logic  = require('./logic')

const convertToThumbnail = (path) => {
    return logic.convertToThumbnail(path)
}


const convertToGIF = (path) => {
    return logic.convertToGIF(path)
}

module.exports = {
    convertToThumbnail,
    convertToGIF
}