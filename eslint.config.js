// eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config([
	{
		ignores: [".prettierrc.cjs"], // 👈 忽略 prettier 配置文件
		files: ["**/*.{ts,tsx,js,jsx}"],
		languageOptions: {
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			"react-refresh": reactRefresh,
		},
		rules: {
			// 关闭原生 no-unused-vars，避免和 TS 规则冲突
			"no-unused-vars": "off",
			// TypeScript 专用的 no-unused-vars，仅警告
			"@typescript-eslint/no-unused-vars": "warn",
			"react/react-in-jsx-scope": "off",
			"no-console": "off",
			"no-debugger": "error",
			"no-var": "error",
			"@typescript-eslint/no-namespace": "off",
			// ✅ react-refresh 推荐配置的核心规则
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
		},
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	reactHooks.configs["recommended-latest"],
]);
