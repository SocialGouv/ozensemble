module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier', 'plugin:import/recommended', 'plugin:react/jsx-runtime'],
  plugins: ['react', 'react-native'],
  globals: {
    fetch: false,
    Headers: false,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    // https://github.com/facebook/react-native/issues/28549
    'import/ignore': [
      'node_modules/react-native/index\\.js$',
      'react-native-push-notification',
      '@react-native-community/push-notification-ios',
      'react-native-swiper',
    ],
  },
  rules: {
    'import/export': 'error',
    'import/first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
    'import/no-duplicates': 'error',
    'no-shadow': 'off',
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'React',
      },
    ],
    'react/no-did-update-set-state': 'off',
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    // 'jsx-closing-bracket-location': [1, 'line-aligned'],
    curly: ['error', 'multi-line'],
    'comma-dangle': ['error', 'only-multiline'],
    'max-len': [
      'error',
      { code: 120, ignoreUrls: true, ignoreComments: true, ignoreTrailingComments: true, ignoreStrings: true },
    ],
  },
};
