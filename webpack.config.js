const path = require('path');
const nodeExternals = require('webpack-node-externals');
const autoprefixer = require('autoprefixer');

const clientConfig = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    publicPath: '/public/assets',
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
        ],
      },
    ],
  },
};

const serverConfig = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['./server/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

module.exports = [clientConfig, serverConfig];
