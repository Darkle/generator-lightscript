const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

const prompts = require('./prompts.js')

const npmModulesToInstall = {
  'LightScript (Original)': [
    'babel-preset-lightscript',
    'lightscript-eslint',
  ],
  '@oigroup/LightScript (Fork)': [
    '@oigroup/babel-preset-lightscript',
    '@oigroup/lightscript-eslint',
  ]
}
const targetingNode = (platform) => {
  if(platform === 'Web'){
    return ['']
  if(platform === 'Node.js'){
    return ['webpack-node-externals']
  }
  if(platform === 'Both'){
    return ['webpack-node-externals', 'parallel-webpack']
  }
}

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ${chalk.red('generator-lightscript')} generator`))

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer
      this.props = props
    })
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    )
  }

  install() {
    this.npmInstall(
      [
        ...this.props.lightscriptVersion,
        'babel-core',
        'babel-loader',
        'cross-env',
        'webpack',
        'webpack-cli',
        ...targetingNode(this.props.platform)
      ],
      { 'save-dev': true }
    )
  }
}
