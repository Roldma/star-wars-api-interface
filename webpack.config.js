const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './static/index.js'],
  output: {
    path: path.resolve(__dirname, './static'),
    publicPath: '/static/',
    filename: 'bundle.js',
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
        exclude: [/node_modules/, /server/],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /server/],
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
