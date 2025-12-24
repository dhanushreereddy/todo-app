import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },
  async webpackFinal(config) {
    // Disable source maps to avoid invalid mapping errors in this environment
    if (config && typeof config === 'object') {
      // @ts-ignore
      config.devtool = false
    }
    return config
  }
}

export default config
