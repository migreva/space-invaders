const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	context: process.cwd(), // to automatically find tsconfig.json
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@space-invaders': path.resolve(__dirname, 'src')
    }
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
};
