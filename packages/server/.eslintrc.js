module.exports = {
  extends: ["plugin:jest/recommended", "@atomix/eslint-config"],
  parser: "babel-eslint",
  globals: {
    grecaptcha: true,
  },
  rules: {
    quotes: "off",
    "sort-imports": [
      "warn",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: true,
      },
    ],
  },
}
