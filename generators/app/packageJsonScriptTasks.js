const packageJsonScriptTasks = (platform) => {
  const webpackVersion = platform === 'Both' ? 'parallel-webpack' : 'webpack'
  return {
    "scripts": {
      "ww": `cross-env NODE_ENV=development ${ webpackVersion } --watch --no-stats`,
      "build": "cross-env NODE_ENV=production webpack"
    }
  }
}

module.exports = packageJsonScriptTasks













