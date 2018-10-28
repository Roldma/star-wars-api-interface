const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/client/index.js'],
  output: {
    path: path.resolve(__dirname, './static'),
    publicPath: '/static/',
    filename: 'newbundle.js',
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    host: 'localhost',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
