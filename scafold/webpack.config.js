const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
// const package = require('./package.json');

module.exports = {
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    historyApiFallback: {
      rewrites: [
        { from: /.*\.html?/, to: '/' },
        { from: /^[\w/]+$/, to: '/' },
      ],
      verbose: true
    },
    host: '0.0.0.0',
    open: true,
    port: 9000,
  },
  entry: {
    index: './src/main.js',
    // vendor: Object.keys(package.dependencies)
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      chunks: ['vendor', 'index'],
      filename: './index.html',
      hash: true,
      template: './index.html',
      title: '',
    }),
    new CopyWebpackPlugin([
      { from: './assets', ignore: ['*.js'], to: 'assets' },
      { from: 'serve.template.js', to: 'serve.js' },
      { from: 'package.template.json', to: 'package.json' },
      { from: 'LICENSE.md', to: 'LICENSE.md' },
    ])
  ],
  resolve: { extensions: ['.js'] },
  watch: false
}
