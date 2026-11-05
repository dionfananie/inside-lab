import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		name: "inside-lab/ignores",
		ignores: [
			"build/**",
			"node_modules/**",
			".react-router/**",
			".wrangler/**",
			"worker-configuration.d.ts",
			"**/*.tsbuildinfo",
		],
	},
	{
		name: "inside-lab/typescript",
		files: ["**/*.{ts,tsx}"],
		extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{ prefer: "type-imports", fixStyle: "inline-type-imports" },
			],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/only-throw-error": [
				"error",
				{ allow: [{ from: "lib", name: "Response" }] },
			],
		},
	},
	{
		name: "inside-lab/react",
		files: ["app/**/*.{ts,tsx}"],
		extends: [reactHooks.configs.flat.recommended, jsxA11y.flatConfigs.recommended],
	},
	{
		name: "inside-lab/javascript",
		files: ["**/*.{js,mjs,cjs}"],
		extends: [js.configs.recommended],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
	{
		name: "inside-lab/worker-scripts",
		files: ["public/**/*.js"],
		languageOptions: {
			globals: {
				...globals.worker,
			},
		},
	},
);
