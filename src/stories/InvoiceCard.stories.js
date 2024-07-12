import InvoiceCard from '../components/InvoiceCard';
import { colors as palette } from '../theme';

export default {
  title: 'InvoiceCard',
  component: InvoiceCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: palette.almostBlack }] },
  },
};

export const InvoiceCardDefault = {
  args: {
    id: 'testid',
    number: 1488,
    sum: 129,
    type: 'Счет',
    discount: 14,
    dateOfOrder: '20.12.2022',
  },
};
