/*
 * @Author: your name
 * @Date: 2021-08-24 17:36:29
 * @LastEditTime: 2021-08-27 11:46:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webgl-col/config/webpack.dev.js
 */
const merge = require("webpack-merge")
const commonConfig = require("./webpack.common")

module.exports = merge(commonConfig, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "../dist",
        host: "localhost",
    },
})
