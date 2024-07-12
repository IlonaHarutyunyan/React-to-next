import Button from '@mui/material/Button';

import MagnifierIcon from '../icons/MagnifierIcon';

export default {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#F7F8FC' }] },
  },
};

export const Primary = {
  args: {
    disabled: false,
    className: 'loading',
    color: 'primary',
    variant: 'contained',
    children: 'Primary action',
  },
};

export const PrimaryIcon = {
  args: {
    disabled: false,
    color: 'primary',
    variant: 'contained',
    children: 'Primary action',
    startIcon: <MagnifierIcon />,
  },
};

export const PrimaryIconDisabled = {
  args: {
    disabled: true,
    color: 'primary',
    variant: 'contained',
    children: 'Primary action',
    startIcon: <MagnifierIcon />,
  },
};

export const PrimaryLoading = {
  args: {
    disabled: false,
    color: 'primary',
    variant: 'contained',
    children: 'Primary action',
    className: 'loading',
  },
};

export const Secondary = {
  args: {
    disabled: false,
    color: 'secondary',
    variant: 'contained',
    children: 'Secondary action',
  },
};

export const SecondaryIcon = {
  args: {
    disabled: false,
    color: 'secondary',
    variant: 'contained',
    children: 'Secondary action',
    startIcon: <MagnifierIcon />,
  },
};

export const SecondaryIconDisabled = {
  args: {
    disabled: true,
    color: 'secondary',
    variant: 'contained',
    children: 'Secondary action',
    startIcon: <MagnifierIcon />,
  },
};

export const SecondaryLoading = {
  args: {
    disabled: false,
    color: 'secondary',
    variant: 'contained',
    children: 'Secondary action',
    className: 'loading',
  },
};

export const Success = {
  args: {
    disabled: false,
    color: 'success',
    variant: 'contained',
    children: 'Armenian action',
  },
};

export const SuccessIcon = {
  args: {
    disabled: false,
    color: 'success',
    variant: 'contained',
    children: 'Armenian action',
    startIcon: <MagnifierIcon />,
  },
};

export const SuccessIconDisabled = {
  args: {
    disabled: true,
    color: 'success',
    variant: 'contained',
    children: 'Armenian action',
    startIcon: <MagnifierIcon />,
  },
};

export const SuccessLoading = {
  args: {
    disabled: false,
    color: 'success',
    variant: 'contained',
    children: 'Armenian action',
    className: 'loading',
  },
};

export const White = {
  args: {
    disabled: false,
    color: 'white',
    variant: 'contained',
    children: 'Call to action',
  },
};

export const WhiteIcon = {
  args: {
    disabled: false,
    color: 'white',
    variant: 'contained',
    children: 'Call to action',
    startIcon: <MagnifierIcon />,
  },
};

export const WhiteIconDisabled = {
  args: {
    disabled: true,
    color: 'white',
    variant: 'contained',
    children: 'Call to action',
    startIcon: <MagnifierIcon />,
  },
};

export const WhiteLoading = {
  args: {
    disabled: false,
    color: 'white',
    variant: 'contained',
    children: 'Call to action',
    className: 'loading',
  },
};

export const WhiteOutlined = {
  args: {
    disabled: false,
    color: 'white',
    variant: 'outlined',
    children: 'Call to action',
  },
};

export const WhiteOutlinedIcon = {
  args: {
    disabled: false,
    color: 'white',
    variant: 'outlined',
    children: 'Call to action',
    startIcon: <MagnifierIcon />,
  },
};

export const WhiteOutlinedIconDisabled = {
  args: {
    disabled: true,
    color: 'white',
    variant: 'outlined',
    children: 'Call to action',
    startIcon: <MagnifierIcon />,
  },
};

export const WhiteOutlinedLoading = {
  args: {
    disabled: false,
    color: 'white',
    variant: 'outlined',
    children: 'Call to action',
    className: 'loading',
  },
};

export const Confirm = {
  args: {
    disabled: false,
    color: 'confirm',
    variant: 'contained',
    children: 'Call to action',
  },
};

export const ConfirmIcon = {
  args: {
    disabled: false,
    color: 'confirm',
    variant: 'contained',
    children: 'Call to action',
    startIcon: <MagnifierIcon />,
  },
};

export const ConfirmIconDisabled = {
  args: {
    disabled: true,
    color: 'confirm',
    variant: 'contained',
    children: 'Call to action',
    startIcon: <MagnifierIcon />,
  },
};

export const ConfirmLoading = {
  args: {
    disabled: false,
    color: 'confirm',
    variant: 'contained',
    children: 'Call to action',
    className: 'loading',
  },
};
