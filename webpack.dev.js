const webpack = require('webpack');
const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        host: '0.0.0.0',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
    output: {
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            facebookPixel: process.env.FACEBOOK_PIXEL_ID,
            yandexPixel: process.env.YANDEX_PIXEL_ID,
            googleTag: process.env.GOOGLE_TAG_ID,
            pinterestTag: process.env.PINTEREST_TAG_ID,
            template: '!!handlebars-loader!src/index.hbs',
        }),
        new webpack.DefinePlugin({
            'process.env.MEDIA_URL': JSON.stringify('https://beglarianfabrics.b-cdn.net'),
            'process.env.LOCALE': JSON.stringify(process.env.LOCALE),
            'process.env.AMPLITUDE_API_KEY': JSON.stringify('1c7649ab2985769ae1f43ad14dd117aa'),
            'process.env.SENTRY_AUTH_TOKEN': JSON.stringify(process.env.SENTRY_AUTH_TOKEN) || null,
            'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN) || null,
            'process.env.FACEBOOK_PIXEL_ID': JSON.stringify(process.env.FACEBOOK_PIXEL_ID) || null,
            'process.env.YANDEX_PIXEL_ID': JSON.stringify(process.env.YANDEX_PIXEL_ID) || null,
            'process.env.GOOGLE_TAG_ID': JSON.stringify(process.env.GOOGLE_TAG_ID) || null,
            'process.env.PINTEREST_TAG_ID': JSON.stringify(process.env.PINTEREST_TAG_ID) || null,
            'process.env.MODE': JSON.stringify('development'),
            'process.env.PUBLIC_PATH': JSON.stringify('/'),
            'process.env.DEFAULT_PAGE': JSON.stringify('fabrics'),
        }),
    ],
});
