var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

var env = config.build.env
// const { VueSSRServerPlugin } = require('vue-ssr-webpack-plugin')
var webpackConfig = merge(baseWebpackConfig, {
  target: 'node',
  entry: {
    app: './src/client/server.js'
  },
  devtool: null,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    // chunkFilename: utils.assetsPath('js/[id].js'),
    libraryTarget: 'commonjs2'
  },
  vue: {
    loaders: utils.cssLoaders({
      // sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    // new webpack.ProvidePlugin({
    //     $:"jquery",
    //     jQuery:"jquery",
    //     "window.jQuery":"jquery"
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
      'process.env.VUE_ENV': '"server"'
    }),
    // new ExtractTextPlugin(utils.assetsPath('css/[name].css')),
    new VueSSRServerPlugin()
  ]
})

module.exports = webpackConfig

    


