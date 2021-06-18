const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.min.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public/assets/', to: 'assets/' }],
    }),
  ],
});
