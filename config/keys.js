module.exports = {
  URI: process.env.URI,
  SECRET_OR_KEY: process.env.SECRET_OR_KEY,
  AWS_USERNAME: process.env.AWS_USERNAME,
  AWS_PASSWORD: process.env.AWS_PASSWORD,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET: process.env.AWS_BUCKET
}

// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./keys_prod');
// } else if (process.env.NODE_ENV === 'test') {
//   module.exports = require('./keys_test');
// } else {
//   module.exports = require('/keys_dev');
// }
