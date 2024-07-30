module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/errors',
		'plugin:import/warnings'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'import'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'import/no-unused-modules': [1, { unusedExports: true }],
		'import/no-unresolved': [2, { ignore: ['\\.glb\\?url$'] }]
	},
	settings: {
		'import/resolver': {
			typescript: {
			project: './tsconfig.app.json',
			},
		},
	},
}
