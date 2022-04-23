// @ts-nocheck
import { resolve } from 'path';
import webpackBar from 'webpackbar';
import fs from 'fs';
import Env from 'dotenv';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import ESLintPlugin from 'eslint-webpack-plugin';

import { name } from '../package.json';

const __root = resolve(__dirname, '../');

// 载入 env/.env* 环境变量
const envPath = resolve(__root, './env');
if (fs.existsSync(envPath)) {
  const reg = new RegExp(/^\.env/);
  fs.readdirSync(envPath).forEach((fileName) => {
    reg.test(fileName) && Env.config({ path: resolve(envPath, fileName) });
  });
}

const resRules = [
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  },
];
const jsRules = [
  {
    test: /\.js$/i,
    include: resolve(__root, 'src'),
    exclude: [
      /node_modules[\\/]core-js/,
      /node_modules[\\/]webpack[\\/]buildin/,
    ],
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
];
const vueRules = [
  {
    test: /\.vue$/i,
    use: ['vue-loader'],
  },
];

const config = {
  entry: {
    index: './src/index.js',
  },
  output: {
    publicPath: '/',
    filename: '[name].bundle.[contenthash:8].js',
    path: resolve(__root, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name].[hash][ext][query]',
  },
  resolve: {
    mainFields: ['jsnext:main', 'module', 'main'], // 优先使用 esm
    alias: {
      '@': resolve(__root, './src'),
    },
    extensions: ['.js'],
  },
  performance: {
    // 入口起点的最大警告体积 10MB
    maxEntrypointSize: 1024 * 1024 * 10,
  },
  stats: 'normal',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__root, './src/index.ejs'),
      templateParameters: {
        title: name,
      },
    }),
    new VueLoaderPlugin(),
    new ESLintPlugin({
      eslintPath: resolve(__root, './node_modules/eslint'),
      extensions: ['js', 'vue'],
      exclude: [resolve(__root, './node_modules')],
      fix: false,
    }),
    new webpackBar(),
  ],
  module: {
    rules: [...resRules, ...vueRules, ...jsRules],
  },
};

export default config;
