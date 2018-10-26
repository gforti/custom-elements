
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const package = require('./package.json');

module.exports = {
   entry: {
    index: "./src/index.js",
    // vendor: Object.keys(package.dependencies)
  },
   output: {
     filename: '[name].js',
     path: path.resolve(__dirname, 'dist')
   },
   resolve: { extensions: ['.js'] },
   devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 9000,
      historyApiFallback: {
        rewrites: [
            {from: /.*\.html/, to: '/index.html'},
            {
              from: /.*$/,
              to: function(context) {
                  console.log('path catch?', context.parsedUrl.pathname)
                return '/' //?goto=' + context.parsedUrl.pathname;
              }
            }
        ]
      },
      open: true,
   },
   module:{
      rules:[
        {
          test:/\.css$/,
          use:['style-loader','css-loader']
        }
      ]
   },
   plugins: [
       new CleanWebpackPlugin(['dist']),
       new HtmlWebpackPlugin({
         hash: true,
         title: '',
         template: './src/index.html',
         filename: './index.html',
         chunks: ['vendor', 'index'],
       })
   ]   
}