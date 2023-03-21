/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const WebpackNodeExternals = require('webpack-node-externals');
const ReloadServerPlugin = require('./webpack/ReloadServerPlugin');

const cwd = process.cwd();

module.exports = {
  target: 'node',
  mode: 'development',
  devtool: 'source-map',
  entry: {
    server: ['./src/index.ts'],
  },
  output: {
    path: path.resolve('build'),
    filename: 'server.js',
  },
  node: {
    __dirname: true,
  },
  externals: [
    WebpackNodeExternals({
      allowlist: ['webpack/hot/poll?1000'],
    }),
    WebpackNodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
      allowlist: [/@violetit/],
    }),
  ],
  resolve: {
    extensions: ['.ts'],
    alias: {
      '@app': path.resolve(cwd, 'src/app'),
      '@config': path.resolve(cwd, 'src/config'),
      '@database': path.resolve(cwd, 'src/database'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
        include: [path.join(cwd, 'src')],
      },
    ],
  },
  plugins: [
    new ReloadServerPlugin({
      script: path.resolve('build', 'server.js'),
    }),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
