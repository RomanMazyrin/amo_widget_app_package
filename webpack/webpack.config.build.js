const BaseConfig = require('./webpack.config.base.js');
const {merge} = require("webpack-merge");

const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

const PROJECT_ROOT = path.resolve(__dirname, '../');
const ENTRY_FILE = path.resolve(PROJECT_ROOT, '/src/index.js');


module.exports = merge(BaseConfig, {

    entry: {
        'build': ENTRY_FILE,
        'build.min': ENTRY_FILE,
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        library: {
            name: "amocrm_widget_lib",
            type: 'umd',
            umdNamedDefine: false,
            export: "default"
        },
        globalObject: "this"
    },

    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom",
            root: "ReactDOM"
        },
    },

    optimization: {
        minimize: true,
        concatenateModules: false,
        minimizer: [new TerserPlugin({
            extractComments: false,
            include: /\.min\.js$/,
        })],
    }
});