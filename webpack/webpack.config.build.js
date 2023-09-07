const BaseConfig = require('./webpack.config.base.js');
const {merge} = require("webpack-merge");

const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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

    optimization: {
        minimize: true,
        concatenateModules: false,
        minimizer: [new TerserPlugin({
            extractComments: false,
            include: /\.min\.js$/,
        })],
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: path.resolve(__dirname, '../bundle_report/report.html'),
            generateStatsFile: true,
            statsFilename: path.resolve(__dirname, '../bundle_report/stats.json')

        }),
    ]
});