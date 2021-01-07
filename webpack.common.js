/*
 * @Author: your name
 * @Date: 2020-12-15 21:45:20
 * @LastEditTime: 2021-01-07 22:28:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-app-base\webpack.common.js
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'js/bundle.js'
  },
  optimization: {
    // 自定义压缩插件
    minimize: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ],
    // 开启去除副作用功能
    sideEffects: false,
    // Tree shaking
    // 标记枯树叶
    // usedExports: true,
    // scope Hoisting作用域提升
    // 尽可能将所有的模块合并输出到一个函数中
    // 既提升了运行效率，又减少了代码体积
    concatenateModules: true
    // 摇掉
    // minimize: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'eslint-loader',
        // 优先使用eslint
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        use: [
          // style-loader 样式通过style标签注入
          // MiniCssExtractPlugin.loader,//通过link标签注入
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            // 更新之后必须设置，不然不是commonjs方式，编译之后为对象
            esModule: false,
            outputPath: 'img',
            name: '[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Tutorial',
      template: 'public/index.html'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('http://localhost:8080/')
    })
  ]
}
