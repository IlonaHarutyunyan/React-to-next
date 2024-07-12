import BarCart from '../components/BarCart';
import { colors as palette } from '../theme';

export default {
  title: 'BarCart',
  component: BarCart,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: palette.almostBlack }] },
  },
};

export const Empty = {
  args: {
    label: 'Empty',
  },
};

export const Full = {
  args: {
    label: 'Full',
    count: 23,
  },
};
