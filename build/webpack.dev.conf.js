var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, extract: true })
  },
  output: {
    path: '/',
    filename: utils.assetsPath('js/[name].js?[hash]'),
    chunkFilename: utils.assetsPath('js/[id].js[hash]')
  },
  vue: {
    loaders: utils.cssLoaders({
      // sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "window.jQuery":"jquery"
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin(utils.assetsPath('css/[name].css?[contenthash]')),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      // chunks: ['app'],
      inject: true
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'preview.html',
    //   template: './src/preview.html',
    //   chunks: ['preview'],
    //   inject: true
    // })
  ]
})
