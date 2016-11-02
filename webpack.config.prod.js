const path = require('path');
const  webpack = require('webpack');
const  HtmlWebpackPlugin = require('html-webpack-plugin');
const  CopyWebpackPlugin = require('copy-webpack-plugin');
const  TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

const p = (f)=>path.resolve(__dirname + f)

module.exports = {
    entry: {
        'main': p('/app/index.ts')
    },

    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
        root: [
            path.resolve('./node_modules'),
            path.resolve('./app/'),
        ],
        alias: {
            artw: path.resolve(__dirname + '/app/artw')
        },
    },

    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: 'awesome-typescript',
            query: {
                tsconfig: 'tsconfig.json',
                useWebpackText: true,
                module: "es2015",
                useForkChecker: true
            }
        },
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loader: 'file'
            },
            //{test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css"},
            //{test: /\.useable\.css$/, loader: "style/useable!css"},
            {test: /\.txt/, loader: "raw"},
            [
                {
                    test: /\.htm$/,
                    name: "mandrillTemplates",
                    loader: 'raw!html-minify'
                }
            ]
        ],
    },
    'html-minify-loader': {
        empty: true,        // KEEP empty attributes
        cdata: true,        // KEEP CDATA from scripts
        comments: true,     // KEEP comments
        dom: {                            // options of !(htmlparser2)[https://github.com/fb55/htmlparser2]
            lowerCaseAttributeNames: false,      // do not call .toLowerCase for each attribute name (Angular2 use camelCase attributes)
        }
    },
    output: {
        filename: '[name].js?x='+Math.random(),
        publicPath: './',
        path: path.resolve(__dirname + '/dist'),
    },

    plugins: [
        new TsConfigPathsPlugin(),
        new CopyWebpackPlugin(
            [
                {from: './src/index.html'},
                {
                    from: './assets',
                    to: 'assets'
                },
                {
                    from: './libs',
                    to: 'libs'
                },
            ]
        ),
        new webpack.ProvidePlugin({}),
        new HtmlWebpackPlugin(
            {
                template: './app/index.html'
            }
        )
//,         new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
};