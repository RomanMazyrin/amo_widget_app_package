const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {

    mode : process.env.NODE_ENV,

    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: "sass-loader"}
                ],
            },
        ]
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

        "react-dom/client": {
            commonjs: "react-dom/client",
            commonjs2: "react-dom/client",
            amd: "react-dom/client",
            root: "ReactDOMClient"
        },
    },

    resolve: {
		extensions: ['.js', '.jsx', 'json', '.riot', '.css', '.scss', '.gif', '.svg']
	},

    plugins: [
        new CleanWebpackPlugin(),
    ]
};
