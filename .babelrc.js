let plugins = [
  '@babel/plugin-proposal-object-rest-spread', // allows ...spread notation
  '@babel/plugin-transform-runtime',
];

if (process.env.NODE_ENV === 'production') {
  plugins.push([
    'transform-react-remove-prop-types',
    {
      mode: 'remove',
      removeImport: true,
    },
  ]);
}

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'chrome >= 53',
            'firefox >= 45.0',
            'ie >= 11',
            'edge >= 37',
            'safari >= 9',
            'opera >= 40',
            'op_mini >= 18',
            'Android >= 7',
            'and_chr >= 53',
            'and_ff >= 49',
            'ios_saf >= 10',
          ],
          node: 'current',
        },
        useBuiltIns: 'usage',
        corejs: '3',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: plugins,
};
