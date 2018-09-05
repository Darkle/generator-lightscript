
const npmLibsForTargetingNode = (platform) => {
  if(platform === 'Web'){
    return ['']
  }
  if(platform === 'Node.js'){
    return ['webpack-node-externals']
  }
  if(platform === 'Both'){
    return ['webpack-node-externals', 'parallel-webpack']
  }
}

module.exports = npmLibsForTargetingNode
