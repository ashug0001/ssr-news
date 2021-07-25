const { merge } = require('webpack-merge');
const fs = require('fs');
const path = require('path');

const { webpackDirAlias } = require('./dirAlias');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = (shell = {}) => {
  const IS_PROD = process.env.NODE_ENV === 'production';
  const START_DEV_SERVER = !IS_PROD;
  const CONFIG_FILE = shell.config;

  const baseConfig = {
    mode: IS_PROD ? 'production' : 'development',
    devtool: IS_PROD ? 'source-map' : 'cheap-eval-source-map',
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        ...webpackDirAlias,
      },
    },
    node: {
      __filename: true,
      __dirname: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [resolvePath('src')],
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: true,
                cacheDirectory: true,
                presets: [],
              },
            },
          ],
        },
      ],
    },
  };

  const mergeIntoBaseConfig = app => {
    const specialisedConfig = require(`./webpack.config.${app}.js`)({
      resolvePath,
      IS_PROD,
      START_DEV_SERVER,
    });
    return merge(baseConfig, specialisedConfig);
  };

  if (CONFIG_FILE) {
    return mergeIntoBaseConfig(CONFIG_FILE);
  }

  return ['client', 'server'].map(mergeIntoBaseConfig);
};
