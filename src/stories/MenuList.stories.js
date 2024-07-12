import MenuList from '../components/MenuList';
import AccountIcon from '../icons/AccountIcon';
import CallIcon from '../icons/CallIcon';
import CartIconFull from '../icons/CartIconFull';
import FabricIcon from '../icons/FabricIcon';
import LikeIcon from '../icons/LikeIcon';
import ListIcon from '../icons/ListIcon';
import MagnifierIcon from '../icons/MagnifierIcon';
import PayIcon from '../icons/PayIcon';
import QuestionIcon from '../icons/QuestionIcon';
import WarningIcon from '../icons/WarningIcon';
import { colors as palette } from '../theme';

export default {
  title: 'MenuList',
  component: MenuList,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: palette.almostBlack }] },
  },
};

export const Drawer = {
  args: {
    sx: { maxWidth: 375 },
    items: {
      main: [
        {
          title: 'All Fabrics',
          link: '/fabrics',
          icon: <MagnifierIcon />,
        },
        {
          title: 'Mailings',
          link: '/mailings',
          icon: <FabricIcon />,
        },
        {
          title: 'Wishlist',
          icon: <LikeIcon />,
          link: '/wishlist',
        },
        {
          title: 'Faq',
          link: '/faq',
          icon: <QuestionIcon />,
        },
        {
          title: 'Contacts',
          link: '/contacts',
          icon: <CallIcon />,
        },
      ],
      sections: [
        {
          sectionTitle: 'User',
          items: [
            {
              title: 'Profile',
              link: '/profile',
              user: true,
              icon: <AccountIcon />,
            },
            {
              title: 'Cart',
              icon: <CartIconFull />,
              link: '/cart',
              user: true,
            },
            {
              title: 'Orders',
              link: '/orders',
              user: true,
              icon: <ListIcon />,
            },
            {
              title: 'Invoices',
              link: '/invoices',
              user: true,
              icon: <PayIcon />,
            },
          ],
        },
        {
          items: [
            {
              title: 'Logout',
              color: palette.red,
              icon: <WarningIcon />,
            },
          ],
        },
      ],
    },
  },
};

export const DrawerWithLabels = {
  args: {
    sx: { maxWidth: 375 },
    items: {
      main: [
        {
          title: 'All Fabrics',
          link: '/fabrics',
          icon: <MagnifierIcon />,
        },
        {
          title: 'Mailings',
          label: {
            variant: 'promotion',
            text: 'New',
          },
          link: '/mailings',
          icon: <FabricIcon />,
        },
        {
          title: 'Wishlist',
          label: {
            text: '5819',
          },
          icon: <LikeIcon />,
          link: '/wishlist',
        },
        {
          title: 'Faq',
          link: '/faq',
          icon: <QuestionIcon />,
        },
        {
          title: 'Contacts',
          link: '/contacts',
          icon: <CallIcon />,
        },
      ],
      sections: [
        {
          sectionTitle: 'User',
          items: [
            {
              title: 'Profile',
              link: '/profile',
              user: true,
              icon: <AccountIcon />,
            },
            {
              title: 'Cart',
              textSecondary: `1 456 EUR`,
              label: {
                variant: 'success',
                text: '246',
              },
              icon: <CartIconFull />,
              link: '/cart',
              user: true,
            },
            {
              title: 'Orders',
              link: '/orders',
              user: true,
              icon: <ListIcon />,
            },
            {
              title: 'Invoices',
              label: {
                variant: 'alert',
                text: 'Not payed yet',
              },
              link: '/invoices',
              user: true,
              icon: <PayIcon />,
            },
          ],
        },
        {
          items: [
            {
              title: 'Logout',
              color: palette.red,
              icon: <WarningIcon />,
            },
          ],
        },
      ],
    },
  },
};

export const DrawerWithDoubleSection = {
  args: {
    sx: { maxWidth: 375 },
    items: {
      main: [
        {
          title: 'All Fabrics',
          link: '/fabrics',
          icon: <MagnifierIcon />,
        },
        {
          title: 'Mailings',
          label: {
            variant: 'promotion',
            text: 'New',
          },
          link: '/mailings',
          icon: <FabricIcon />,
        },
        {
          title: 'Wishlist',
          label: {
            text: '5819',
          },
          icon: <LikeIcon />,
          link: '/wishlist',
        },
        {
          title: 'Faq',
          link: '/faq',
          icon: <QuestionIcon />,
        },
        {
          title: 'Contacts',
          link: '/contacts',
          icon: <CallIcon />,
        },
      ],
      sections: [
        {
          sectionTitle: 'User',
          items: [
            {
              title: 'Profile',
              link: '/profile',
              user: true,
              icon: <AccountIcon />,
            },
            {
              title: 'Cart',
              textSecondary: `1 456 EUR`,
              label: {
                variant: 'success',
                text: '246',
              },
              icon: <CartIconFull />,
              link: '/cart',
              user: true,
            },
          ],
        },
        {
          sectionTitle: 'HuyUser',
          items: [
            {
              title: 'Orders',
              link: '/orders',
              user: true,
              icon: <ListIcon />,
            },
            {
              title: 'Invoices',
              label: {
                variant: 'alert',
                text: 'Not payed yet',
              },
              link: '/invoices',
              user: true,
              icon: <PayIcon />,
            },
          ],
        },
        {
          items: [
            {
              title: 'Logout',
              color: palette.red,
              icon: <WarningIcon />,
            },
            {
              title: 'Delete Account',
              color: palette.red,
              icon: <AccountIcon />,
            },
          ],
        },
      ],
    },
  },
};

export const Popover = {
  args: {
    sx: { maxWidth: 375 },
    items: {
      sections: [
        {
          items: [
            {
              title: 'Profile',
              link: '/profile',
              user: true,
              icon: <AccountIcon />,
            },
            {
              title: 'Orders',
              link: '/orders',
              user: true,
              icon: <ListIcon />,
            },
            {
              title: 'Invoices',
              label: {
                variant: 'alert',
                text: 'Not payed yet',
              },
              link: '/invoices',
              user: true,
              icon: <PayIcon />,
            },
          ],
        },
        {
          items: [
            {
              title: 'Logout',
              color: palette.red,
              icon: <WarningIcon />,
            },
          ],
        },
      ],
    },
  },
};
