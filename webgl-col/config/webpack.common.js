/*
 * @Author:AlexZ33
 * @FilePath: /webgl-col/config/webpack.common.js
 */
const  path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
// https://www.cnblogs.com/xiaozhumaopao/p/10792168.html
const {CleanWebpackPlugin} = require("clean-webpack-plugin"); // 清除文件   配合 webpack -p 这条命令来使用，就是说在为生产环境编译文件的时候，先把 build或dist (就是放生产环境用的文件) 目录里的文件先清除干净，再生成新的。


const entryNames = glob
  .sync(path.resolve(__dirname, '../src/examples/*/index.js'))
  .map((fileName) => fileName.match(/\/src\/examples\/(\S*)\/index\.js/)[1]);
const entries = entryNames.reduce(
  (prevObj, entryName) => ({
    ...prevObj,
    [`${entryName}/index`]: path.resolve(__dirname, `../src/examples/${entryName}/index.js`),
  }),
  {}
);
const examplePages = entryNames.map(
  (exampleName) =>
    new HtmlWebpackPlugin({
      title: exampleName,
      filename: `${exampleName}/index.html`,
      template: './src/index.html',
      chunks: [`${exampleName}/index`],
    })
);
// 通过其他合适的方式判断是否为本地调试环境也一样，自由选择。
const styleLoader = process.env.BUILD_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader;

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: styleLoader,
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: ['glslify-import-loader', 'raw-loader', 'glslify-loader'],
      },
      {
        test: /\.(jpeg|png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 在每次打包前，自动清理/dist/目录下的文件
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    ...examplePages,
  ],
};