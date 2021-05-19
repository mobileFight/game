module.exports = {
  extends: [
    "@atomix/eslint-config",
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "no-use-before-define": [
      "error",
      {
        functions: false,
        classes: true,
        variables: false,
      },
    ],
    quotes: "off",
    "no-shadow": "warn",
  },
}
