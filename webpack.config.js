const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const buildPath = path.resolve(__dirname, 'dist')

module.exports = {
  devtool: 'source-map',

  entry: {
    index: './src/page-index/main.js',
    event: './src/page-event/main.js',
    // test: './src/page-index/main.js',
  },

  output: {
    filename: '[name].[contenthash].js',
    path: buildPath,
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test:/\.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        resourceQuery: /template/,
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/page-index/tmpl.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-event/tmpl.html',
      inject: true,
      chunks: ['event'],
      filename: 'event.html'
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/page-test/tmpl.html',
    //   inject: true,
    //   chunks: ['test'],
    //   filename: 'test.html'
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    })
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true
      }),
      new CssMinimizerPlugin()
    ]
  }
}
