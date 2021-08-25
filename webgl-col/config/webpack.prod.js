/*
 * @Author: your name
 * @Date: 2021-08-24 17:36:35
 * @LastEditTime: 2021-08-25 17:17:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /webgl-col/config/webpack.prod.js
 */
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  mode: "production",
});
