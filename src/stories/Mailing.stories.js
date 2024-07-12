import Mailing from '../components/Mailing';

export default {
  title: 'Mailing',
  component: Mailing,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#F7F8FC' }] },
  },
};

const thumbnails = [
  'https://shop.beglarianfabrics.com/media/image/thumbnail/8af1fa25-f0bd-4c3f-bf52-c3a2300c18d9',
  'https://shop.beglarianfabrics.com/media/image/thumbnail/62a3fe3e-6073-4c36-9979-922dcae726de',
  'https://shop.beglarianfabrics.com/media/image/thumbnail/7e40a940-b8c0-4505-bbe1-857a245e084b',
];

export const MailingDefault = {
  args: {
    title: '#301 Italian prints and gorgeous from Burberry',
    description: 'Lights jacquards, tweeds, chiffons, meshes, laces',
    count: 93,
    thumbnails,
  },
};

export const MailingTwothumbnails = {
  args: {
    title: '#301 Italian prints and gorgeous from Burberry',
    description: 'Lights jacquards, tweeds, chiffons, meshes, laces',
    count: 93,
    thumbnails: [
      'https://shop.beglarianfabrics.com/media/image/thumbnail/8af1fa25-f0bd-4c3f-bf52-c3a2300c18d9',
      'https://shop.beglarianfabrics.com/media/image/thumbnail/62a3fe3e-6073-4c36-9979-922dcae726de',
    ],
  },
};

export const MailingOneImage = {
  args: {
    title: '#301 Italian prints and gorgeous from Burberry',
    description: 'Lights jacquards, tweeds, chiffons, meshes',
    count: 93,
    thumbnails: ['https://shop.beglarianfabrics.com/media/image/thumbnail/8af1fa25-f0bd-4c3f-bf52-c3a2300c18d9'],
  },
};

export const MailingNew = {
  args: {
    isNew: true,
    title: '#301 Italian prints and gorgeous from Burberry',
    description: 'Lights jacquards, tweeds, chiffons, meshes',
    count: 93,
    thumbnails,
  },
};

export const MailingSale = {
  args: {
    isSale: true,
    title: '#301 Italian prints and gorgeous from Burberry',
    description: 'Lights jacquards, tweeds, chiffons, meshes',
    count: 93,
    thumbnails,
  },
};

export const MailingNoDescription = {
  args: {
    isNew: true,
    title: '#301 Italian prints and gorgeous from Burberry',
    count: 93,
    thumbnails,
  },
};
