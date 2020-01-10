var path = require('path');
var webpack = require('webpack');
var StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = [
  {
    entry: [
      './lib/main.ts',
      './lib/index.html',
      './lib/main.css',
      './lib/settings.svg',
    ],
    devtool: 'inline-source-map',
    output: {
      filename: 'scripts/main.min.js',
      path: path.join(__dirname, '/build'),
      libraryTarget: 'window',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          type: 'javascript/auto',
          test: /\.(html)$/,
          use: [
            { loader: 'file-loader', options: { name: '[name].[ext]' } },
          ],
        },
        {
          test: /\.(jpg|png|gif|svg|ico)$/,
          use: [
            { loader: 'file-loader', options: { name: 'images/[name].[ext]' } },
          ],
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'file-loader', options: { name: 'styles/[name].[ext]' } },
          ],
        },
        {
          test: /images\/*\.svg$/,
          use: 'file-loader',
        },

      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    optimization: {
      minimize: true,
    },
    plugins: [
      new StringReplacePlugin(),
    ],
  },
  {
    entry: [
      './lib/worker.ts',
    ],
    devtool: 'inline-source-map',
    output: {
      filename: 'scripts/worker.min.js',
      path: path.join(__dirname, '/build'),
      libraryTarget: 'this', // Fixes hot loading of web worker not working in Webpack
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    optimization: {
      minimize: true,
    },
    plugins: [
      new StringReplacePlugin(),
    ],
  },
];
