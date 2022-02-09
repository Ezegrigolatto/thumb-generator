const server = require('./src/app.js');

  server.listen(process.env.PORT, () => {
    console.log('listening at 3001'); // eslint-disable-line no-console
  });

  // server.listen(3001, () => {
  //   console.log('listening at 3001'); // eslint-disable-line no-console
  // });
