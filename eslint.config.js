import antfu from '@antfu/eslint-config';

export default antfu(
	{
		solid: true,
		unocss: true,
		stylistic: { semi: true, indent: 'tab' },
	},
	{
		rules: {
			'no-console': 'off',
			'solid/reactivity': 'off',
			'style/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
			'unused-imports/no-unused-vars': 'off',
			'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			// NOTE: Overwrite newlinesBetween from the original config.
			// https://github.com/antfu/eslint-config/blob/b63e52b55979cbc45dcf4bfe511a90c4c47c2180/src/configs/perfectionist.ts#L19-L35
			'perfectionist/sort-imports': ['error', {
				groups: [
					'type',
					['parent-type', 'sibling-type', 'index-type', 'internal-type'],

					'builtin',
					'external',
					'internal',
					['parent', 'sibling', 'index'],
					'side-effect',
					'object',
					'unknown',
				],
				newlinesBetween: 'always',
				order: 'asc',
				type: 'natural',
			}],
		},
	},
);
