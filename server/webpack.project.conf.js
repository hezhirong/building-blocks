var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var postcss = require('autoprefixer');
var path = require('path')
var webpack = require('webpack')
function cssLoaders (options) {
    options = options || {}
    function generateLoaders(loaders) {
        var sourceLoader = loaders.map(function (loader) {
            var extraParamChar
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?')
                extraParamChar = '&'
            } else {
                loader = loader + '-loader'
                extraParamChar = '?'
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
        }).join('!')
        if (options.extract) {
            return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
        } else {
            return ['vue-style-loader', sourceLoader].join('!')
        }
    }
    return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        scss: generateLoaders(['css', 'sass'])
    }
}
function styleLoaders(options) {
    var output = []
    var loaders = cssLoaders(options)
    for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader: loader
        })
    }
    return output
}
module.exports = {
    entry: {
        app: path.join(__dirname , './static/js/_preview.js')
    },
    output: {
        path: path.resolve(__dirname, './static/dist'),
		publicPath: '/dist/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.scss'],
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: './img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: './fonts/[name].[ext]'
                }
            }
        ].concat(styleLoaders({extract: true}))
    },
    devtool: '#eval-source-map',
    vue: {
        loaders: cssLoaders({extract: true}),
        postcss: [
            postcss({
                browsers: ['last 2 versions']
            })
        ]
    },
    plugins: [
		new ExtractTextPlugin('./css/[name].css?[contenthash]'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
		new HtmlWebpackPlugin({
			filename: 'preview.html',
			template: './server/static/pages/preview.html',
			inject: true
		}),
    ]
}