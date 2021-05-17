/**
 * Webpack main configuration file
 */

const path = require('path');
// const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('./configuration/environment');

// const templateFiles = fs.readdirSync(
//   path.resolve(__dirname, environment.paths.source, 'templates'),
// );
// const htmlPluginEntries = templateFiles.map(
//   (template) =>
//     new HTMLWebpackPlugin({
//       inject: true,
//       hash: false,
//       filename: template,
//       template: path.resolve(environment.paths.source, 'templates', template),
//       favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
//       chank: ['app'],
//     }),
// );

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'js', 'app.js'),
    auth: path.resolve(environment.paths.source, 'js', 'auth.js'),
    film: path.resolve(environment.paths.source, 'js', 'film.js'),
  },
  output: {
    filename: 'js/[name].js',
    path: environment.paths.output,
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|gif|jpe?g)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/design/[name].[hash:6].[ext]',
              publicPath: '../',
              limit: environment.limits.images,
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'fonts/[name].[hash:6].[ext]',
              publicPath: '../',
              limit: environment.limits.fonts,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new ImageMinimizerPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
        ],
      },
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, 'images', 'content'),
          to: path.resolve(environment.paths.output, 'images', 'content'),
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
      ],
    }),

    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: 'index.html',
      template: path.resolve(environment.paths.source, 'templates', 'index.html'),
      favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
      chunks: ['app'],
    }),
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: 'auth.html',
      template: path.resolve(environment.paths.source, 'templates', 'auth.html'),
      favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
      chunks: ['auth'],
    }),
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: 'notfound.html',
      template: path.resolve(environment.paths.source, 'templates', 'notfound.html'),
      favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
      chunks: [''],
    }),
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: 'film.html',
      template: path.resolve(environment.paths.source, 'templates', 'film.html'),
      favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
      chunks: ['film'],
    }),
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: 'film.html',
      template: path.resolve(environment.paths.source, 'templates', 'film.html'),
      favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
      chunks: ['film'],
    }),
  ],
  // .concat(htmlPluginEntries),
  target: 'web',
};
