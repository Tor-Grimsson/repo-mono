import js from "@eslint/js"

export default [
  {
    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**"
    ]
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        fetch: "readonly",
        ResizeObserver: "readonly",
        sessionStorage: "readonly",
        localStorage: "readonly"
      }
    },
    plugins: {
      "react-hooks": {
        rules: {
          "exhaustive-deps": {
            meta: {
              type: "suggestion",
              docs: {
                description: "placeholder rule for environments without react-hooks plugin"
              },
              schema: []
            },
            create: () => ({})
          }
        }
      }
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",
      "react-hooks/exhaustive-deps": "off"
    }
  },
  {
    files: ["src/data/styleguide/add-preview-flags.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly"
      }
    }
  }
]
