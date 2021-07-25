const fs = require('fs');
const webpack = require('webpack');
const dotenv = require('dotenv');

const DOT_ENV_CONFIG = dotenv.config();

if (DOT_ENV_CONFIG.error) {
  throw DOT_ENV_CONFIG.error;
}

module.exports = ({ resolvePath, IS_PROD, START_DEV_SERVER }) => {
  // const APP_ENV = process.env.APP_ENV || 'live';
  const webpackDevServerPort = 3000;

  const clientConfig = {
    target: 'web', // compile for browser environment
    entry: START_DEV_SERVER
      ? [
          `webpack-dev-server/client?http://localhost:${webpackDevServerPort}`,
          'webpack/hot/only-dev-server',
          './src/client',
        ]
      : ['./src/poly', './src/client'],
    devServer: {
      host: 'localhost',
      port: webpackDevServerPort,
      historyApiFallback: true,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      disableHostCheck: true,
    },
    output: {
      path: resolvePath('build/public'),
      filename: START_DEV_SERVER
        ? 'static/js/[name].js'
        : 'static/js/[name].[chunkhash:8].js',
      publicPath: START_DEV_SERVER
        ? `http://localhost:${webpackDevServerPort}`
        : prodPublicPath,
    },
    node: {
      fs: 'empty',
      __filename: 'mock',
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new webpack.NormalModuleReplacementPlugin(
        /(.*)logger.node(\.*)/,
        resource => {
          resource.request = resource.request.replace(
            /logger.node/,
            `logger.web`,
          );
        },
      ),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],
  };

  if (START_DEV_SERVER) {
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return clientConfig;
};
