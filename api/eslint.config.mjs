import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,       
    recommendedConfig: js.configs.recommended, 
    allConfig: js.configs.all,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:react-hooks/recommended", "prettier", "plugin:@next/next/recommended"),
    ...compat.plugins("react", "unused-imports", "import", "@typescript-eslint", "prettier"),
    ...compat.env({
        es2021: true,
        node: true
    }),
    ...compat.config({
        parser: "@typescript-eslint/parser",
        rules: {
            "import/order": ["warn", {
                "groups": [
                    "type",
                    "builtin",
                    "object",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                ],
                "pathGroups": [{
                    "pattern": "~/**",
                    "group": "external",
                    "position": "after",
                }],

                "newlines-between": "always",
            }],


            "padding-line-between-statements": ["warn", {
                "blankLine": "always",
                "prev": "*",
                "next": "return",
            }, {
                "blankLine": "always",
                "prev": ["const", "let", "var"],
                "next": "*",
            }, {
                "blankLine": "any",
                "prev": ["const", "let", "var"],
                "next": ["const", "let", "var"],
            }],
        }
    })
];


export default eslintConfig;
