// @ts-nocheck
import Webpack from 'webpack';
import { merge } from 'webpack-merge';
import { resolve } from 'path';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import commonConfig from './webpack.config.common';

const __root = resolve(__dirname, '../');

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  // 'vue-style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [autoprefixer, cssnano],
      },
    },
  },
];
const cssRules = [
  {
    test: /\.css$/i,
    use: [...commonCssLoader],
  },
  {
    test: /\.(sass|scss)$/i,
    use: [
      ...commonCssLoader,
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [resolve(__root, './src/commons/styles/var.scss')],
        },
      },
    ],
  },
  {
    test: /\.less$/i,
    use: [...commonCssLoader, 'less-loader'],
  },
  {
    test: /\.(styl|stylus)$/i,
    use: [...commonCssLoader, 'stylus-loader'],
  },
];

let plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css',
  }),
  new TerserPlugin({
    terserOptions: {
      mangle: {
        safari10: true,
      },
    },
    parallel: true,
    extractComments: false,
  }),
];
process.env.ANALYZE && plugins.push(new BundleAnalyzerPlugin());

const prodConfig = {
  mode: 'production',
  performance: {
    hints: false,
  },
  output: {
    publicPath: '',
  },
  module: {
    rules: [...cssRules],
  },
  plugins,
};

Webpack(merge(commonConfig, prodConfig)).run();

export default merge(commonConfig, prodConfig);
