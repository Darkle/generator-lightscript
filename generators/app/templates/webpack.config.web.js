const path = require('path')

const webpack = require('webpack')

const projectDir = path.resolve(__dirname)
const appDir = path.join(projectDir, 'app')
const mainAppEntryPoint = path.join(appDir, 'appMain.lsc')
// ISDEV is a global that is injected into the JS.
const ISDEV = process.env.NODE_ENV !== 'production'

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
console.log('ISDEV: ', ISDEV)

const webpackOptions = {
  entry: mainAppEntryPoint,
  output: {
    filename: 'appMain-compiled.js',
    path: appDir
  },
  mode: process.env.NODE_ENV,
  target: 'web',
  devtool: ISDEV ? 'source-map' : 'none',
  context: projectDir,
  module: {
    rules: [
      {
        test: /.lsc$/,
        exclude: [
          /(node_modules)/
        ],
        loader: 'babel-loader',
        options: {
          sourceMap: ISDEV
        }
      },
    ]
  },
  resolve: {
    extensions: ['.lsc', '.js']
  },
  optimization: {
    minimize: !ISDEV
  },
  plugins: [
    new webpack.DefinePlugin({ ISDEV }),
  ]
}

module.exports = webpackOptions
