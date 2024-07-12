import i18n from './i18next.js';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../src/theme.js';
import css from '../src/App.css';
import { withRouter } from 'storybook-addon-react-router-v6';

/** @type { import('@storybook/react').Preview } */
const preview = {
    globals: {
        locale: 'en',
        locales: {
            en: 'English',
            ru: 'Russian',
        },
    },
    parameters: {
        i18n,
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export const withMuiTheme = Story => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
    </ThemeProvider>
);

export const decorators = [withMuiTheme, withRouter];
export default preview;
