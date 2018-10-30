const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const package = require('./package.json');


function clearSlashes(base)  {
    return base.toString().replace(/\/$/, '').replace(/^\//, '');
}

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
            {from: /.*\.html/, to: '/'},
            {from: /^[\w\/]+$/, to: '/'},
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