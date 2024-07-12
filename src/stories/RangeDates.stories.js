import RangeDates from '../components/RangeDates';

export default {
  title: 'RangeDates',
  component: RangeDates,
  tags: ['autodocs'],
};

export const RangeDatesEmpty = {
  args: {},
};

export const RangeDatesOverridedPlaceholder = {
  args: {
    placeholderFrom: 'Дата от',
    placeholderTo: 'Дата до',
  },
};
