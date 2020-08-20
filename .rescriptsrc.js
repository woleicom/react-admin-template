const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const {appendWebpackPlugin,getPaths, edit} = require('@rescripts/utilities');
const WebpackBar = require('webpackbar');
const WebpackEnd = require('./plugins/webpack.end.js');
const resolve = dir => path.resolve(__dirname, dir);
const theme = {
  "@primary-color": "#7546c9"
}
const getMode = ()=>{
  let mode = process.env.NODE_ENV;
  process.argv.forEach((v,i)=>{
    if(v === '--mode' && process.argv[i+1]){
      mode = process.argv[i+1]
    }
  })
  return mode;
}
const logConfig = config => {
  // let loader = config.module.rules.find(v=>v.oneOf);
  // console.log(loader.oneOf[1]);
  return config
}
const webpackBarPlugin = config => {
  return appendWebpackPlugin(
    new WebpackBar(),
    config
  )
}
const webpackDotEnvPlugin = config => {
  let definePlugin = config.plugins.find(v=>v.constructor.name === 'DefinePlugin');
  if(definePlugin) {
    let mode = '.env.'+getMode();
    const envConfig = dotenv.parse(fs.readFileSync(resolve(mode)));
    for (const k in envConfig) {
      definePlugin.definitions['process.env'][k] = '"'+envConfig[k]+'"';
    }
  }
  return config;
}
const webpackEndConfig = config => {
  return appendWebpackPlugin(
    new WebpackEnd('build','项目名称'),
    config
  )
}
const webpackResolveAlias = config => {
  if(!config.resolve) { config.resolve = {}; }
  config.resolve.alias = {
    '@': resolve('src')
  };
  return config;
}
const useAntd = (config) => {
  const styleLoaders = getPaths(
    // Styleloaders are in config.module.rules inside an object only containing the "oneOf" prop
    (inQuestion) => inQuestion && !!inQuestion.oneOf,
    config
  )
  edit(
    (section) => {
      const loaders = section.oneOf
      // New style loaders should be added near the end of loaders, but before file-loader
      const fileLoaderIndex = loaders.findIndex(section => section.loader && section.loader.includes('file-loader'))
      const lessLoader = {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // sourceMap: NODE_ENV === 'production' && GENERATE_SOURCEMAP !== 'false',
                javascriptEnabled: true,
                modifyVars: theme || {}
              }
            }
          }
        ]
      }
      loaders.splice(fileLoaderIndex, 0, lessLoader)
      return section
    },
    styleLoaders,
    config
  )
  return config
}
let configArray = [
  ["use-eslint-config", ".eslintrc"],
  // Required for antd"s tree shaking babel-plugin-import
  ["use-babel-config", ".babelrc"],
  ['use-postcss-config'],
  // Provide a theme object based on this file
  // ["use-antd", { theme }],
  useAntd,
  webpackBarPlugin,
  webpackResolveAlias,
  webpackDotEnvPlugin
]
if(getMode() === 'production') {
  configArray.push(webpackEndConfig);
}
configArray.push(logConfig);
module.exports = configArray