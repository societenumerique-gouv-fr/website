import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'next', 'prettier'),
  {
    files: ['tests/**', '**/*.spec.ts', '**/*.spec.js', '**/*.test.ts', '**/*.test.js'],
    ...compat.extends('plugin:vitest/legacy-recommended')[0]
  }
];
