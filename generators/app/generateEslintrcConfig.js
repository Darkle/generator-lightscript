
function generateEslintrcConfig(isLightScriptFork){
  return {
    "parser": isLightScriptFork ? "@oigroup/lightscript-eslint" : "lightscript-eslint",
    "extends": [
      "eslint:recommended"
    ],
    "globals": {
      "ISDEV": true
    },
    "env": {
      "browser": true,
      "node": true,
      "es6": true
    }
  }
}

module.exports = generateEslintrcConfig
