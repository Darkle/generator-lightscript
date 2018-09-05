const path = require('path')

const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const projectDir = path.resolve(__dirname)
const appDir = path.join(projectDir, 'app')
const backendDir = path.join(appDir, 'backend')
const frontendDir = path.join(appDir, 'frontend')
const backendMainAppEntryPoint = path.join(backendDir, 'backendAppMain.lsc')
const frontendMainAppEntryPoint = path.join(frontendDir, 'frontendAppMain.lsc')
// ISDEV is a global that is injected into the JS.
const ISDEV = process.env.NODE_ENV !== 'production'

console.log('ISDEV: ', ISDEV)
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)

/*****
* Since we are compiling for both the web and for node, we export two different configs here.
* parallel-webpack runs them both at the same time for us.
*/
const commonWebpackOptions = {
  mode: process.env.NODE_ENV,
  devtool: ISDEV ? 'source-map' : 'none',
  context: projectDir,
  module: {
    rules: [
      {
        test: /\.lsc$/,
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
    minimize: false
  },
  plugins: [
    new webpack.DefinePlugin({ISDEV}),
  ]
}

const frontendWebpackOptions = {
  ...commonWebpackOptions,
  target: 'web',
  entry: frontendMainAppEntryPoint,
  output: {
    filename: 'frontendAppMain-compiled.js',
    path: frontendDir
  },
  optimization: {
    minimize: !ISDEV
  }
}

/*****
* We dont want webpack to include polyfills or mocks for various node stuff, which we set with
* the 'node' key https://webpack.js.org/configuration/node/
*
* We also dont want webpack to transpile the stuff in node_modules folder, so we use the
* webpack-node-externals plugin.
*/
const backendWebpackOptions = {
  ...commonWebpackOptions,
  target: 'node',
  entry: backendMainAppEntryPoint,
  output: {
    filename: 'backendAppMain-compiled.js',
    path: backendDir
  },
  optimization: {
    minimize: false
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },
  externals: [nodeExternals()],
}

module.exports = [
  backendWebpackOptions,
  frontendWebpackOptions,
]
