
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const CopyWebpackPlugin = require('copy-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
          title: 'Output Management',
          template: './src/index.html',
          filename: './index.html'
        }),
        new CopyWebpackPlugin([
            {from: './src/todo.json', to: './todo.json'}
        ])
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };