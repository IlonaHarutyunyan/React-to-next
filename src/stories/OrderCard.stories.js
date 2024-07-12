import OrderCard from '../components/OrderCard';
import { colors as palette } from '../theme';

export default {
  title: 'OrderCard',
  component: OrderCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: palette.almostBlack }] },
  },
};

export const OrderCardDefault = {
  args: {
    id: 'testid',
    number: 2808,
    sum: 1322,
    status: 'In Progerss',
    count: 23,
    length: 145,
    dateOfOrder: '23.10.2023',
    dateOfUpdate: '25.10.2023',
  },
};
