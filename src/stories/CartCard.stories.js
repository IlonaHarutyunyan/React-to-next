import CartCard from '../components/CartCard';

export default {
  title: 'CartCard',
  component: CartCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#F7F8FC' }] },
  },
};

const thumbnail = 'https://shop.beglarianfabrics.com/media/image/thumbnail/8af1fa25-f0bd-4c3f-bf52-c3a2300c18d9';

export const Fabric = {
  args: {
    thumbnail,
    reserveTimeLeftSeconds: 67 * 60,
    article: 'TX-075 w.128 cm defect',
    title: 'Albert Guégain',
    onRemove: true,
    onEdit: true,
    cuts: [
      {
        title: 'Рулон A',
        length: 35,
        oldLength: null,
      },
      {
        title: 'Рулон Б',
        length: 12,
        oldLength: null,
      },
      {
        title: 'Рулон В',
        length: 13,
        oldLength: null,
      },
    ],
    price: 2174,
    oldPrice: null,
    length: 35,
    oldLength: null,
  },
};

export const FabricNoReserve = {
  args: {
    ...Fabric.args,
    reserveTimeLeftSeconds: 0,
  },
};

export const FabricOneCut = {
  args: {
    ...Fabric.args,
    cuts: [
      {
        title: 'Рулон',
        length: 35,
        oldLength: null,
      },
    ],
  },
};

export const FabricSmallReserve = {
  args: {
    ...Fabric.args,
    reserveTimeLeftSeconds: 27 * 60,
  },
};

export const FabricHugeReserve = {
  args: {
    ...Fabric.args,
    reserveTimeLeftSeconds: 25 * 47 * 60,
  },
};

export const FabricChanged = {
  args: {
    ...Fabric.args,
    cuts: [
      {
        title: 'Рулон A',
        length: 35,
        oldLength: null,
      },
      {
        title: 'Рулон Б',
        length: 12,
        oldLength: 20,
      },
      {
        title: 'Рулон В',
        length: 13,
        oldLength: 100,
      },
    ],
    price: 2174,
    oldPrice: 3756,
    length: 35,
    oldLength: 124,
  },
};

export const FabricSoldOut = {
  args: {
    ...Fabric.args,
    isSold: true,
  },
};

export const Sample = {
  args: {
    thumbnail,
    article: 'TX-075 w.128 cm',
    title: 'Albert Guégain',
    length: 0,
    onRemove: true,
    onEdit: true,
  },
};
