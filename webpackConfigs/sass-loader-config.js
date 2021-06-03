const path = require('path');
const root = path.join(__dirname, '../');

module.exports = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
    sassOptions: {
      includePaths: [
        path.join(root, 'src/client/scss/'),
        path.join(root, 'node_modules/'),
      ],
    },
  },
}
