const path = require('path');
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true, // Clean the output directory before emit.
  },
  // Add more production-specific configurations here
});