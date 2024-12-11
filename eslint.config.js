import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [
            js.configs.recommended,
            react.configs.recommended,
            reactHooks.configs.recommended,
            importPlugin.configs.recommended,
            jsxA11y.configs.recommended,
            prettier,
            ...tseslint.configs.recommended,
        ],
        files: ['**/*.{ts,tsx}'],
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                node: {
                    paths: ['src'],
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: true,
                    argsIgnorePattern: '^_',
                },
            ],
            'react/react-in-jsx-scope': 'off',
        },
    },
);
