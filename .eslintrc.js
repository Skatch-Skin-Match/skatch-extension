module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    es2021: true,
    browser: true,
    jest: true,
    node: true,
  },
  plugins: ["@typescript-eslint", "import", "simple-import-sort", "tailwindcss"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "plugin:storybook/recommended",
  ],
  rules: {
    // "no-console": ["error", { allow: ["warn", "info", "error"] }],
    "no-restricted-syntax": [
      "error",
      {
        selector: "TSEnumDeclaration",
        message: "Don't declare enums",
      },
    ],
    "prefer-arrow-callback": "warn",
    "prefer-const": "warn",
    "func-style": ["warn", "expression"],
    // "arrow-body-style": ["error", "always"],
    // "no-restricted-imports": ["error", { paths: [{ name: "react", importNames: ["default"] }] }],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/display-name": "error",
    "react/destructuring-assignment": "warn",
    // "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/newline-after-import": "warn",
    // "import/no-default-export": "error",
    // "simple-import-sort/imports": "error",
    // "simple-import-sort/exports": "error",
    // "tailwindcss/classnames-order": "warn",
    // "tailwindcss/no-custom-classname": "warn",
    // "tailwindcss/no-contradicting-classname": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
    // "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    // "@typescript-eslint/naming-convention": [
    //   "error",
    //   { selector: ["typeAlias", "typeParameter"], format: ["PascalCase"] },
    //   {
    //     selector: ["property", "parameterProperty", "method"],
    //     format: ["camelCase"],
    //   },
    //   {
    //     selector: "variable",
    //     types: ["boolean"],
    //     format: ["PascalCase"],
    //     prefix: ["is", "has", "should"],
    //   },
    // ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
  },
  overrides: [
    {
      files: ["src/pages/**/*.tsx"],
      rules: {},
    },
  ],
};
