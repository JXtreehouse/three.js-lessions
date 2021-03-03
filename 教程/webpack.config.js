/*
 * @Author: your name
 * @Date: 2021-03-02 17:44:23
 * @LastEditTime: 2021-03-02 19:34:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /three.js-lessions/教程/webpack.config.js
 */
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: __dirname + '/example/lol-engine/LOLLoader-main.js',
    output: {
        path: __dirname + '/example/dist',
        filename: 'LOLLoader.js',
    },
};
