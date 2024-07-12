import RangeInput from '../components/RangeInput';

export default {
  title: 'RangeInput',
  component: RangeInput,
  tags: ['autodocs'],
};

export const RangeInputEmpty = {
  args: {
    placeholderFrom: 'от',
    placeholderTo: 'до',
    units: 'м.',
  },
};

export const RangeInputDefault = {
  args: {
    ...RangeInputEmpty.args,
    from: 10,
    to: 30,
  },
};

export const RangeInputError = {
  args: {
    ...RangeInputEmpty.args,
    from: 50,
    to: 30,
  },
};
