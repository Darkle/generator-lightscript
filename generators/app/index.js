const path = require('path')

const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

const prompts = require('./prompts.js')
const packageJsonScriptTasks = require('./packageJsonScriptTasks.js')
const generateBabelrcConfig = require('./generateBabelrcConfig.js')
const generateEslintrcConfig = require('./generateEslintrcConfig.js')
const lightscriptNpmVersion = require('./lightscriptNpmVersion.js')
const npmLibsForTargetingNode = require('./npmLibsForTargetingNode.js')
const chooseWebpackConfig = require('./chooseWebpackConfig.js')

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
    const platform = this.props.platform
    const appDir = path.join(this.destinationRoot(), 'app')
    const backendDir = path.join(appDir, 'backend')
    const frontendDir = path.join(appDir, 'frontend')
    const isLightScriptFork = this.props.lightscriptVersion === '@oigroup/LightScript (Fork)'

    this.fs.copy(
      this.templatePath('.gitattributes'),
      this.destinationPath('.gitattributes')
    )
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    )
    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore')
    )
    this.fs.copy(
      this.templatePath(chooseWebpackConfig[platform].srcFileName),
      this.destinationPath('webpack.config.js')
    )

    if(platform === 'Web'){
      this.fs.copy(
        this.templatePath('appMainWeb.lsc'),
        path.join(appDir, 'appMain.lsc')
      )
    }
    if(platform === 'Node.js'){
      this.fs.copy(
        this.templatePath('appMainNode.lsc'),
        path.join(appDir, 'appMain.lsc')
      )
    }
    if(platform === 'Both'){
      this.fs.copy(
        this.templatePath('backendAppMain.lsc'),
        path.join(backendDir, 'backendAppMain.lsc')
      )
      this.fs.copy(
        this.templatePath('frontendAppMain.lsc'),
        path.join(frontendDir, 'frontendAppMain.lsc')
      )
    }

    // Extend or create package.json file in destination path
    this.fs.extendJSON(
      this.destinationPath('package.json'),
      {
        ...packageJsonScriptTasks(platform),
        ...{
          devDependencies: {
            // Things tend to break if we use a higher version of eslint.
            eslint: isLightScriptFork ? '=4.8.0' : '=3.18.0',
            "babel-core": "^6.26.3",
            "babel-loader": "^7.1.5",
          }
        }
      }
    )
    this.fs.writeJSON(
      this.destinationPath('.babelrc'),
      generateBabelrcConfig(this.props, isLightScriptFork)
    )
    this.fs.writeJSON(
      this.destinationPath('.eslintrc.json'),
      generateEslintrcConfig(isLightScriptFork)
    )
  }

  install() {
    this.npmInstall(
      [
        ...lightscriptNpmVersion[this.props.lightscriptVersion],
        'cross-env',
        'webpack',
        'webpack-cli',
        ...npmLibsForTargetingNode(this.props.platform),
      ],
      { 'save-dev': true }
    )
  }
}
