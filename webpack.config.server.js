const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = ({ resolvePath, START_DEV_SERVER }) => {
  const serverConfig = {
    target: 'node',
    entry: START_DEV_SERVER ? ['webpack/hot/poll?100', './src'] : ['./src'],
    devtool: false,
    output: {
      path: resolvePath('build'),
      filename: 'server.js',
    },
    optimization: {
      minimize: false,
    },
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    node: {
      __dirname: false,
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  };

  if (START_DEV_SERVER) {
    const StartServerPlugin = require('start-server-webpack-plugin');
    serverConfig.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new StartServerPlugin('server.js'),
    ];
  }

  return serverConfig;
};
