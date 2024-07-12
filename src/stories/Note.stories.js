import Note from '../components/Note';

export default {
  title: 'Note',
  component: Note,
  tags: ['autodocs'],
};

export const Info = {
  args: {
    variant: 'info',
    children: 'Text for this info note',
  },
};

export const Success = {
  args: {
    variant: 'success',
    children: 'Text for this success note',
  },
};

export const InfoIcon = {
  args: {
    variant: 'info',
    icon: true,
    children: 'Text for this info note',
  },
};

export const SuccessIcon = {
  args: {
    icon: true,
    variant: 'success',
    children: 'Text for this success note',
  },
};

export const InfoIconCentered = {
  args: {
    variant: 'info',
    centered: true,
    icon: true,
    children: 'Text for this info note',
  },
};

export const SuccessIconCentered = {
  args: {
    icon: true,
    centered: true,
    variant: 'success',
    children: 'Text for this success note',
  },
};
