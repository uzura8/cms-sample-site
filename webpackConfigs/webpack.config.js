'use strict';
const webpack = require('webpack');
const path = require('path');
const root = path.join(__dirname, '../');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devServerRouteConfig = require('./dev-server-route-config');
const cssLoaderConfig = require('./css-loader-config');
const postcssLoaderConfig = require('./postcss-loader-config');
const sassLoaderConfig = require('./sass-loader-config');

module.exports = [
  {
    devtool: 'source-map',
    context: path.resolve(__dirname, '../'),
    entry: {
      index: path.join(root, 'src/client/js/index.js'),
    },
    output: {
      path: path.join(root, 'public/assets/js'),
      filename: '[name].js',
      publicPath: '/assets/js',
    },
    optimization: {
      splitChunks: {
        name: 'vendor',
        chunks: 'initial'
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                loaders: {
                  scss: [
                    'vue-style-loader',
                    cssLoaderConfig,
                    postcssLoaderConfig,
                    sassLoaderConfig,
                  ],
                }
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            },
          ]
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            cssLoaderConfig,
            postcssLoaderConfig,
            sassLoaderConfig,
          ],
        },
      ]
    },
    resolve: {
      modules: [
        path.join(root, 'src/client'),
        'node_modules'
      ],
      extensions: ['*', '.js', '.vue', '.json'],
      alias: {
        '@': path.join(root, 'src/client/js'),
        'vue$': 'vue/dist/vue.esm.js',
        'vue-router$': 'vue-router/dist/vue-router.esm.js',
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    //for webpack-dev-server
    devServer: {
      open: true,// Open at brower automatically
      //openPage: 'index.html',// Open this page automatically
      contentBase: path.join(root, 'public'),// RootDir for build files
      watchContentBase: true, // Watch changed forfiles under  contentBase dir
      host: 'localhost',
      port: 8080,
      before: devServerRouteConfig,
      clientLogLevel: 'debug',
    },
  },
  {
    devtool: 'source-map',
    entry: {
      style: path.join(root, 'src/client/scss/style.scss'),
    },
    output: {
      path: path.join(root, 'public/assets/css'),
      filename: '[name].css',
      publicPath: '/assets/css',
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            cssLoaderConfig,
            postcssLoaderConfig,
            sassLoaderConfig,
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].min.css'
      })
    ]
  },
];
