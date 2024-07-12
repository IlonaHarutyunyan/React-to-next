import LangPicker from '../components/LangPicker';
import { colors as palette } from '../theme';

export default {
  title: 'LangPicker',
  component: LangPicker,
  tags: ['autodocs'],
};

export const Default = {
  args: {},
  parameters: {
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: palette.almostBlack }] },
  },
};

export const Dark = {
  args: {
    dark: true,
  },
};
