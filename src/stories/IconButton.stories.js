import IconButton from '../components/IconButton';
import CartIconEmpty from '../icons/CartIconEmpty';
import CartIconFull from '../icons/CartIconFull';
import LikeIcon from '../icons/LikeIcon';
import LikeIconActive from '../icons/LikeIconActive';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';

export default {
  title: 'IconButton',
  component: IconButton,
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    disabled: false,
    color: 'primary',
    variant: 'contained',
    icon: CartIconEmpty,
  },
};

export const PrimaryDisabled = {
  args: {
    disabled: true,
    color: 'primary',
    variant: 'contained',
    icon: CartIconEmpty,
  },
};

export const Secondary = {
  args: {
    disabled: false,
    color: 'secondary',
    variant: 'contained',
    icon: PlusIcon,
  },
};

export const SecondaryDisabled = {
  args: {
    disabled: true,
    color: 'secondary',
    variant: 'contained',
    icon: MinusIcon,
  },
};

export const Like = {
  args: {
    disabled: false,
    color: 'secondary',
    variant: 'contained',
    icon: LikeIcon,
  },
};

export const LikeActive = {
  args: {
    disabled: false,
    color: 'error',
    variant: 'contained',
    icon: LikeIconActive,
  },
};

export const Success = {
  args: {
    disabled: false,
    color: 'success',
    variant: 'contained',
    icon: CartIconFull,
  },
};

export const SuccessDisabled = {
  args: {
    disabled: true,
    color: 'success',
    variant: 'contained',
    icon: CartIconFull,
  },
};
