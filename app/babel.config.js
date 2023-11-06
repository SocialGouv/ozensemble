module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin', 'nativewind/babel', 'babel-plugin-macros'],
  env: {
    development: {
      plugins: [
        [
          'module-resolver',
          {
            alias: {
              'twin.macro': 'twin.macro/dist/browser-styles.js',
            },
          },
        ],
      ],
    },
  },
};
