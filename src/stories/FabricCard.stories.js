import FabricCard from '../components/FabricCard';

export default {
  title: 'FabricCard',
  component: FabricCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#F7F8FC' }] },
  },
};

const images = [
  'https://shop.beglarianfabrics.com/media/image/hd/8af1fa25-f0bd-4c3f-bf52-c3a2300c18d9',
  'https://shop.beglarianfabrics.com/media/image/hd/62a3fe3e-6073-4c36-9979-922dcae726de',
  'https://shop.beglarianfabrics.com/media/image/hd/7e40a940-b8c0-4505-bbe1-857a245e084b',
];

const thumbnails = [
  'https://shop.beglarianfabrics.com/media/image/thumbnail/8af1fa25-f0bd-4c3f-bf52-c3a2300c18d9',
  'https://shop.beglarianfabrics.com/media/image/thumbnail/62a3fe3e-6073-4c36-9979-922dcae726de',
  'https://shop.beglarianfabrics.com/media/image/thumbnail/7e40a940-b8c0-4505-bbe1-857a245e084b',
];

const videos = ['https://shop.beglarianfabrics.com/media/video/hd/a0a7f423-b506-43a7-9c65-3efe5c4b6e55'];

export const Fabric = {
  args: {
    images,
    videos,
    thumbnails,
    article: 'TX-075 w.128 cm defect',
    reservationTimeoutInMinutes: 120,
    price: 13.6,
    tag: 'Stripes',
    properties: {
      composition: [
        { material: 'WO', percent: 68, materialFull: 'Wool' },
        { material: 'PL', percent: 31, materialFull: 'Polyester' },
        { material: 'CH', percent: 1, materialFull: 'Chenille Fabric' },
        { material: 'WO', percent: 68, materialFull: 'Wool' },
        { material: 'PL', percent: 31, materialFull: 'Polyester' },
        { material: 'CH', percent: 1, materialFull: 'Chenille Fabric' },
      ],
      density: 190.0,
      type: 'Textile',
      width: 157.0,
      purpose: ['Dress/Blouse', 'Suit'],
      weaving: 'Linen',
      stretch: 'Non-stretch',
      color: ['Shades of brown', 'Blue'],
    },
    description: 'LAN. ANGELICO SRL',
    maxCount: 12.8,
    minCount: 5.4,
    lengthInCart: 0,
    isNew: false,
    onOrder: false,
  },
};

export const FabricLoginOrRegister = {
  args: {
    ...Fabric.args,
    isUnAuth: true,
  },
};

export const FabricInCart = {
  args: {
    ...Fabric.args,
    lengthInCart: 8,
    priceInCart: 456,
    reserveTimeLeftSeconds: 84 * 60,
  },
};

export const FabricInCartAndSold = {
  args: {
    ...Fabric.args,
    lengthInCart: 8,
    priceInCart: 456,
    reserveTimeLeftSeconds: 121 * 60,
    minCount: 0,
    maxCount: 0,
  },
};

export const FabricError = {
  args: {
    ...Fabric.args,
    lengthInCart: 15,
    priceInCart: 456,
    reserveTimeLeftSeconds: 5 * 60,
  },
};

export const NewFabric = {
  args: {
    ...Fabric.args,
    isNew: true,
  },
};

export const FabricOnSale = {
  args: {
    ...Fabric.args,
    sale: {
      percent: '20',
      oldPrice: 133,
    },
  },
};

export const FabricOnSaleInCart = {
  args: {
    ...Fabric.args,
    sale: {
      percent: '20',
      oldPrice: 133,
    },
    lengthInCart: 12,
    priceInCart: 456,
    reserveTimeLeftSeconds: 76 * 60,
  },
};

export const FabricSold = {
  args: {
    ...Fabric.args,
    minCount: 0,
    maxCount: 0,
  },
};

export const FabricOnOrder = {
  args: {
    ...Fabric.args,
    onOrder: true,
    colors: ['red', 'blue', 'green'],
  },
};

export const FabricLargeMinOrder = {
  args: {
    ...Fabric.args,
    minCount: 15,
    maxCount: 34,
  },
};

export const FabricSmallMaxOrder = {
  args: {
    ...Fabric.args,
    minCount: 3,
    maxCount: 8,
  },
};

export const FabricLiked = {
  args: {
    ...Fabric.args,
    isLiked: true,
  },
};

export const FabricNoDescription = {
  args: {
    ...Fabric.args,
    description: null,
  },
};
