import NavBanner from '../components/NavBanner';

export default {
  title: 'NavBanner',
  component: NavBanner,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    text: 'Тысячи тканей в нашем каталоге',
    buttonText: 'Перейти в каталог',
    to: '/fabrics',
    type: 'mailing',
  },
};
