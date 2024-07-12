/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-react-i18next',
        'storybook-addon-react-router-v6',
        '@storybook/addon-mdx-gfm',
        '@storybook/addon-coverage',
        '@storybook/addon-webpack5-compiler-swc',
        '@storybook/addon-onboarding',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    swc: (config, options) => ({
        jsc: {
            transform: {
                react: {
                    runtime: 'automatic',
                },
            },
        },
    }),
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        },
    },
    docs: {
        autodocs: 'tag',
    },
    staticDirs: ['../public'],
};
export default config;
