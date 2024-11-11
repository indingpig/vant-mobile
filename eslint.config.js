import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
	...pluginVue.configs['flat/essential'],
	...vueTsEslintConfig(),
	skipFormatting,
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
	{
		name: 'app/custom-rules',
		rules: {
			'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
			'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
			"vue/multi-word-component-names": "off",
			'semi': ['error', 'always'],
		},
		files: ['**/*.{ts,mts,tsx,vue}']
	},
]
