module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      1,
      {
        "useTabs": false,
        "printWidth": 120,
        "tabWidth": 2,
        "singleQuote": true,
        "semi": false,
        "trailingComma": "none",
        "jsxBracketSameLine": false
      }
    ]
  },
};
