const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  webpackDirAlias: {
    '#components': resolvePath('src/app/components'),
    '#app': resolvePath('src/app'),
    '#server': resolvePath('src/server'),
  },
  eslintDirAlias: {
    map: [
      ['#app', './src/app'],
      ['#components', './src/components'],
      ['#server', './src/server'],
    ],
    extensions: ['.js', '.jsx', '.json'],
  },
};
