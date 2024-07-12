import Input from '../components/Input';

export default {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    value: 'Text goes here',
  },
};

export const PrimaryEditable = {
  args: {},
};

export const Placeholder = {
  args: {
    placeholder: 'Placeholder text',
  },
};

export const PlaceholderAndLabel = {
  args: {
    placeholder: 'Placeholder text',
    label: `Here's the label`,
  },
};

export const Error = {
  args: {
    error: true,
    value: 'Text goes here',
  },
};

export const ErrorEditable = {
  args: {
    error: true,
  },
};
