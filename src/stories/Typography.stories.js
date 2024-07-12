import Typography from '@mui/material/Typography';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Typography',
  component: Typography,
  tags: ['autodocs'],
};

const children = 'Test text';

export const H1 = {
  args: {
    label: 'H1',
    variant: 'h1',
    children: 'Как мы работаем',
  },
};

export const H2 = {
  args: {
    label: 'H2',
    variant: 'h2',
    children: 'Ваш заказ',
  },
};

export const H3 = {
  args: {
    label: 'H3',
    variant: 'h3',
    children: 'Товар добавлен в корзину',
  },
};

export const H4 = {
  args: {
    label: 'H4',
    variant: 'h4',
    children: 'Итого',
  },
};

export const Body1 = {
  args: {
    label: 'Body 1',
    variant: 'body1',
    children,
  },
};

export const Body2 = {
  args: {
    label: 'Body 2',
    variant: 'body2',
    children: `
            К сожалению, некоторые из добавленных вами тканей в настоящее время 
            недоступны для заказа или изменилось их доступное наличие. Если у вас возникли вопросы 
            или проблемы, пожалуйста, обращайтесь в нашу службу поддержки клиентов
        `,
  },
};

export const Subtitle1 = {
  args: {
    label: 'Subtitle 1',
    variant: 'subtitle',
    children: 'Возможен заказ от',
  },
};
