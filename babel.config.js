module.exports = api => {
  api.cache(true);

  const plugins = [];

  if (
    process.env.NODE_ENV === 'production' ||
    process.env.BABEL_ENV === 'production'
  ) {
    plugins.push('transform-remove-console');
  }
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
  };
};
