import Pagination from '../components/Pagination';

export default {
  title: 'Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#F7F8FC' }] },
  },
};

export const SliderControl = {
  args: {
    to: 177,
    current: 1,
  },
};
