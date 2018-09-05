

function generateBabelrcConfig(props, isLightScriptFork){
  const patternMatching = props.extendedPatternMatching ? 'enhanced' : 'default'

  if(typeof props.stdlib === 'undefined'){
    props.stdlib = true
  }

  if(isLightScriptFork){
    return {
      "presets": [
        [
          '@oigroup/babel-preset-lightscript',
          {
            "stdlib": props.stdlib,
            "bangCall": !!props.bangCall,
            "safeCall": !!props.safeCall,
            "existential": !!props.existential,
            "useRequire": !!props.useRequire,
            "flippedImports": !!props.flippedImports,
            "disableJsx": !!props.disableJsx,
            "disableFlow": !!props.disableFlow,
            "placeholderArgs": !!props.placeholderArgs,
            patternMatching
          }
        ]
      ]
    }
  }
  return {
    "presets": [
      [
        'babel-preset-lightscript',
        {
          "stdlib": props.stdlib
        }
      ]
    ]
  }

}

module.exports = generateBabelrcConfig
