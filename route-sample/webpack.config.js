const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
// const package = require('./package.json');

module.exports = {
   watch:false,
   entry: {
    index: "./src/index.js",
    // vendor: Object.keys(package.dependencies)
  },
   output: {
     filename: '[name].js',
     path: resolve(__dirname, 'dist')
   },
   resolve: { extensions: ['.js'] },
   devServer: {
      contentBase: resolve(__dirname, 'dist'),
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
         template: './index.html',
         filename: './index.html',
         chunks: ['vendor', 'index'],
       }),
        new CopyWebpackPlugin([
            { from: 'src/assets', to: 'assets', ignore: [ '*.js' ] }
        ])
   ]   
}

function clearSlashes(base)  {
    return base.toString().replace(/\/$/, '').replace(/^\//, '')
}