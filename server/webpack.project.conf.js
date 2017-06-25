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
            return require('extract-text-webpack-plugin').extract('vue-style-loader', sourceLoader)
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
        dist: path.join(__dirname , './static/js/_preview.js')
    },
    output: {
        path: './',
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
        ].concat(styleLoaders())
    },
    devtool: '#eval-source-map',
    vue: {
        loaders: cssLoaders(),
        postcss: [
            postcss({
                browsers: ['last 2 versions']
            })
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ]
}