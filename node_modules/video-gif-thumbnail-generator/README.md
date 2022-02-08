# Convert Video to gif or thumbnail

## Installation

Use the package manager npm to install.

```bash
npm i video-gif-thumbnail-generator
```
## Don't forget to craete a "thumbnail" folder because all files get stored in thumbnail folder

## Usage

```javascript
const converter = require('video-gif-thumbnail-generator')
```

```
create Thumbnail
```

```javascript
1. converter.convertToThumbnail('url') //url should be any local file or any live video url
```

```
create GIF
```

```javascript
1. converter.convertToGIF('url') //url should be any local file or any live video url
```