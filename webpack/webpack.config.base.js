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

    resolve: {
		extensions: ['.js', '.jsx', 'json', '.riot', '.css', '.scss', '.gif', '.svg']
	},

    plugins: [
        new CleanWebpackPlugin(),
    ]
};
