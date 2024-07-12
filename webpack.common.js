/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

const webpack = require('webpack');

const path = require('path');

const withReport = process.env.npm_config_withReport;

module.exports = {
    context: `${__dirname}/src`,
    entry: './index.jsx',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                    },
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css'],
    },
    output: {
        filename: 'bundle.[name].[hash].js',
        chunkFilename: 'bundle.[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                reactVendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                    name: 'vendor-react',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
};
