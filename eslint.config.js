const config = require('@rubensworks/eslint-config');

module.exports = config([
  {
    files: [ '**/*.ts' ],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: [ './tsconfig.eslint.json' ],
      },
    },
  },
  {
    // Override rules like this
    rules: {
      'no-implicit-coercion': 'off',
      'ts/no-unsafe-assignment': 'off',
    },
  },
]);
