
 const path = require('path');
 const glob = require('glob')
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const CopyWebpackPlugin = require('copy-webpack-plugin');

  module.exports = {
    entry: {
      app: glob.sync('./src/**/*.js')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
          title: 'Output Management',
          template: './src/index.html',
          filename: './index.html'
        }),
       new CopyWebpackPlugin([
            {from: './src/*.template.html', to: '[name].[ext]'}
        ])
        
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
  
  /*,
       
    new CopyWebpackPlugin([
            {from: './src/*.html.js', to: '[name].[ext]'}
        ])
 **/