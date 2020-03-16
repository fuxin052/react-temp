
const {
  override, fixBabelImports, addLessLoader, addBabelPlugin,
  addBundleVisualizer, addWebpackAlias
} = require('customize-cra');
const modifyVars = require('./antd.theme');
const path = require("path");

module.exports = override(
  /**
   * antd按需加载
   */
  fixBabelImports('import', {
    libraryName: 'antd',
    style: true,
  }),
  /**
   * lodash按需加载
   */
  fixBabelImports('lodash', {
    libraryDirectory: "",
    camel2DashComponentName: false
  }),
  /**
   * less支持
   */
  addLessLoader({
    javascriptEnabled: true,
    localIdentName: '[local]--[hash:base64:5]',
    modifyVars,
  }),
  /**
   * @ 装饰器支持
   */
  addBabelPlugin(
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ),
  /**
   * 设置webpack别名
   */
  addWebpackAlias({
    "src": path.resolve(__dirname, "src")
  }),
  /**
   * 打包分析
   */
  process.env.NODE_ENV === 'production' && addBundleVisualizer()
);



