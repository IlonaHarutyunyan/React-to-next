import Promo from '../components/Promo';

export default {
  title: 'Promo',
  component: Promo,
  tags: ['autodocs'],
};

export const NoBonus = {
  args: {
    sum: 500,
  },
};

export const FreeDelivery = {
  args: {
    sum: 1500,
  },
};

export const FirstDiscount = {
  args: {
    sum: 3500,
  },
};

export const ModerateDiscount = {
  args: {
    sum: 7500,
  },
};

export const NearMax = {
  args: {
    sum: 13000,
  },
};

export const MoreThanMax = {
  args: {
    sum: 20000,
  },
};
