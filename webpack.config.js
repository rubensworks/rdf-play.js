// eslint-disable-next-line import/no-nodejs-modules
const path = require('node:path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = [
  {
    entry: [
      './lib/main.ts',
      './lib/index.html',
      './lib/main.css',
      './lib/settings.svg',
    ],
    devtool: 'cheap-module-source-map',
    output: {
      filename: 'scripts/main.min.js',
      path: path.join(__dirname, '/build'),
      libraryTarget: 'window',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/u,
          use: 'ts-loader',
          exclude: /node_modules/u,
        },
        {
          type: 'javascript/auto',
          test: /\.(html)$/u,
          use: [
            { loader: 'file-loader', options: { name: '[name].[ext]' }},
          ],
        },
        {
          test: /\.(jpg|png|gif|svg|ico)$/u,
          use: [
            { loader: 'file-loader', options: { name: 'images/[name].[ext]' }},
          ],
        },
        {
          test: /\.css$/u,
          use: [
            { loader: 'file-loader', options: { name: 'styles/[name].[ext]' }},
          ],
        },
        {
          test: /images\/*\.svg$/u,
          use: 'file-loader',
        },

      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [
      new NodePolyfillPlugin(),
    ],
  },
  {
    entry: [
      './lib/worker.ts',
    ],
    devtool: 'cheap-module-source-map',
    output: {
      filename: 'scripts/worker.min.js',
      path: path.join(__dirname, '/build'),
      // Fixes hot loading of web worker not working in Webpack
      libraryTarget: 'this',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/u,
          use: 'ts-loader',
          exclude: /node_modules/u,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      // Fix for circular dependency: https://github.com/Richienb/node-polyfill-webpack-plugin/issues/18
      new NodePolyfillPlugin({ excludeAliases: [ 'console' ]}),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            safari10: true,
          },
        }),
      ],
    },
    performance: {
      maxAssetSize: 1_190_000,
      maxEntrypointSize: 1_190_000,
    },
  },
];
