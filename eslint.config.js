import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base JS and TS configs
  js.configs.recommended,
  
  // Next.js plugin
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  
  // Other configs
  ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:@next/next/recommended"),
  {
    // Ignore patterns (previously in .eslintignore)
    ignores: [
      "**/node_modules",
      ".next",
      "out",
      "build",
      "dist",
      "coverage",
      "*.d.ts",
      "**/*.d.ts",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/dist/**",
      "**/coverage/**",
      "**/*.config.js",
      "**/*.config.cjs",
      "**/*.config.mjs",
      "**/*.config.ts",
      "**/public/**",
      "**/.vercel/**",
      "**/.vscode/**",
      "**/.idea/**",
      "**/*.swp",
      "**/*.swo",
      "**/.DS_Store",
      "**/Thumbs.db",
      "**/ehthumbs.db",
      "**/.git",
      "**/.gitignore",
      "**/.npmrc",
      "**/package-lock.json",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
      "**/yarn-error.log*"
    ],
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': ['warn', { fixToUnknown: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false
        },
      ],

      // Best practices
      'prefer-const': 'error',
      'no-var': 'error',
      'no-prototype-builtins': 'error',

      // Console and debugging
      'no-console': [
        process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        { allow: ['warn', 'error', 'info'] },
      ],
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

      // React specific rules
      'react-hooks/exhaustive-deps': 'warn',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',

      // Import rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // Custom rules
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(warn|error|info|debug|trace)$/]",
          message: 'Unexpected console statement. Use a proper logging library.',
        },
      ]
    }
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "public/**",
      "*.config.js",
      "*.config.mjs"
    ]
  }
];

export default eslintConfig;