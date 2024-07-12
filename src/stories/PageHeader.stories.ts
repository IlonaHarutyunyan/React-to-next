import PageHeader from '../components/PageHeader';
import CartIconEmpty from '../icons/CartIconEmpty';

export default {
  title: 'PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
};

export const Full = {
  args: {
    title: 'Cocktail dress fabrics',
    text: `
            Burberry: waterproof fabrics, classic dense gabardine 
            for outerwear, pliable wool suiting, flowing and heavy dress blends from natural fibers, and knitwear
        `,
    icon: CartIconEmpty,
    oneSize: false,
  },
};

export const NoIcon = {
  args: {
    ...Full.args,
    icon: null,
  },
};

export const TitleOnly = {
  args: {
    ...Full.args,
    icon: null,
    text: null,
  },
};

export const OneSize = {
  args: {
    ...Full.args,
    oneSize: true,
  },
};

export const Loading = {
  args: {
    ...Full.args,
    isLoading: true,
  },
};

export const LoadingNoIcon = {
  args: {
    ...Full.args,
    icon: null,
    isLoading: true,
  },
};
