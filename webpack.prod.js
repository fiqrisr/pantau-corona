const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new CleanWebpackPlugin()],
});
