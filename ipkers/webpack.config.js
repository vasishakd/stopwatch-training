const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const devtool = isDev ? 'eval-cheap-module-source-map' : false;

module.exports = {
  entry: './src/js/app.js',
  mode: process.env.NODE_ENV,
  plugins: [new ESLintPlugin()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
          }
      },
    ]
  },
  devtool,
  output: {
    filename: 'bundle.min.js',
  },
};