module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    ignorePatterns: ["dist/"],
    rules: {
        "camelcase": "error",
        indent: ["error", 4], // enforce consistent indentation
            quotes: ["error", "double"], // enforce the consistent use of double quotes
            semi: ["error", "always"], // require semicolons at the end of statements
            "no-unused-vars": "warn", // warn about unused variables
            "no-console": "warn", // warn about console usage
            "no-else-return": "error", // disallow `else` blocks after `return` statements
            "no-use-before-define": "error", // disallow the use of variables before they are defined

            // Best Practices
            eqeqeq: "error", // require the use of `===` and `!==`
            "no-eval": "error", // disallow the use of `eval()`
            "no-extend-native": "error", // disallow extending native types
            "no-implied-eval": "error", // disallow implied `eval()`
            "no-throw-literal": "error", // disallow throwing literals as exceptions

            // Stylistic Issues
            "array-bracket-spacing": ["error", "never"], // disallow spaces inside array brackets
            "comma-spacing": "error", // enforce consistent spacing after commas
            "key-spacing": "error", // enforce consistent spacing between keys and values in object literals
            "object-curly-spacing": ["error", "always"], // enforce consistent spacing inside curly braces of object literals
            "arrow-spacing": "error", // enforce consistent spacing before and after the arrow in arrow functions

            // ES6 Specific
            "arrow-parens": ["error", "always"], // require parentheses around arrow function parameters
            "no-var": "error", // require `let` or `const` instead of `var`
            "prefer-const": "error", // require `const` declarations for variables that are never reassigned
    },
};
