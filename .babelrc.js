module.exports = {
  presets: ['@vue/babel-preset-jsx'],
  env: {
    default: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: { version: '3.19', proposals: true },
          },
        ],
      ],
    },
  },
};
