// @ts-nocheck
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import { resolve } from 'path';

import autoprefixer from 'autoprefixer';

import commonConfig from './webpack.config.common';

const __root = resolve(__dirname, '../');

const commonCssLoader = [
  'vue-style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [autoprefixer],
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

const devConfig = {
  cache: true,
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    chunkIds: 'named',
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: 'warning',
    // 生成文件的最大体积
    maxAssetSize: 1024 * 1024,
  },
  module: {
    rules: [...cssRules],
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    port: '9000',
    allowedHosts: 'all',
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    proxy: process.env.PROXY_HOST
      ? {
          '**': {
            target: process.env.PROXY_HOST,
            changeOrigin: true,
            secure: false,
            bypass: function (req, res, proxyOptions) {
              // 不是 ajax 请求不走代理，防止页面请求也被代理
              if (req.headers.accept?.indexOf('html') !== -1) {
                return '/index.html';
              } else if (req.headers['x-requested-with'] !== 'XMLHttpRequest') {
                return false;
              }
            },
          },
        }
      : undefined,
  },
};

(async () => {
  const config = merge(commonConfig, devConfig);
  await new WebpackDevServer(config.devServer, Webpack(config)).start();
})();

export default devConfig;
