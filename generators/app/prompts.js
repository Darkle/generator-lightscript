const prompts = [
  {
    type: 'list',
    store: true,
    name: 'lightscriptVersion',
    message: 'Which version of LightScript would you like to use?',
    default: 'original',
    choices: [
      'LightScript (Original)',
      '@oigroup/LightScript (Fork)'
    ]
  },
  {
    type: 'list',
    store: true,
    name: 'platform',
    message: 'What platform(s) are you targeting?',
    default: 'Web',
    choices: [
      'Web',
      'Node.js',
      'Both'
    ]
  },
  {
    type: 'confirm',
    store: true,
    name: 'setCompilerOptions',
    message: 'Would you like to configure any LightScript compiler options? (optional)',
    default: false,
  },
  {
    type: 'confirm',
    store: true,
    name: 'stdlib',
    message: 'Enable stdlib? (LightScript can make all of Lodash available to be imported as needed. This is known as the "Standard Library" in Lightscript)',
    default: true,
    when: (props) => props.setCompilerOptions
  },
  {
    type: 'confirm',
    store: true,
    name: 'bangCall',
    message: 'Enable bangCall? (Call functions with paren-free syntax using `!`)',
    default: false,
    when: (props) =>
      props.setCompilerOptions && props.lightscriptVersion === '@oigroup/LightScript (Fork)'
  },
  {
    type: 'confirm',
    store: true,
    name: 'safeCall',
    message: 'Enable safeCall? (Call a function using `?` to check callability first)',
    default: false,
    when: (props) =>
      props.setCompilerOptions && props.lightscriptVersion === '@oigroup/LightScript (Fork)'
  },
  {
    type: 'confirm',
    store: true,
    name: 'existential',
    message: 'Enable existential? (Postfix `?` checks that an expression is not loose-equal to `null`)',
    default: false,
    when: (props) =>
      props.setCompilerOptions && props.lightscriptVersion === '@oigroup/LightScript (Fork)'
  },
  {
    type: 'confirm',
    store: true,
    name: 'useRequire',
    message: 'Enable useRequire? (Generate `require` rather than `import` when the compiler introduces a module)',
    default: false,
    when: (props) =>
      props.setCompilerOptions && props.lightscriptVersion === '@oigroup/LightScript (Fork)'
  },
  {
    type: 'confirm',
    store: true,
    name: 'flippedImports',
    message: "Enable flippedImports? (Allow imports via `import 'path': [specifier]` syntax)",
    default: false,
    when: (props) =>
      props.setCompilerOptions && props.lightscriptVersion === '@oigroup/LightScript (Fork)'
  },
  {
    type: 'confirm',
    store: true,
    name: 'disableJsx',
    message: `Enable disableJsx? (Don't parse JSX expressions)`,
    default: false,
    when: (props) =>
      props.setCompilerOptions && props.lightscriptVersion === '@oigroup/LightScript (Fork)'
  },
  {
    type: 'confirm',
    store: true,
    name: 'disableFlow',
    message: `Enable disableFlow? (Don't parse Flow type annotations)`,
    default: false,
    when: (props) =>
      props.setCompilerOptions && props.lightscriptVersion === '@oigroup/LightScript (Fork)'
  },
  {
    type: 'confirm',
    store: true,
    name: 'placeholderArgs',
    message: `Enable placeholderArgs? (Specify arguments for a function using placeholders in the body)`,
    default: false,
    when: (props) =>
      props.setCompilerOptions && props.lightscriptVersion === '@oigroup/LightScript (Fork)'
  },
  {
    type: 'checkbox',
    store: true,
    name: 'patternMatching',
    message: "Enable enhanced patternMatching? (Test and branch using `match` keyword - Experimental (Stage: 1))",
    default: false,
    when: (props) =>
      props.setCompilerOptions && props.lightscriptVersion === '@oigroup/LightScript (Fork)'
  },
]

module.exports = prompts