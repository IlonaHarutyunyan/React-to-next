import Box from '@mui/material/Box';
import React from 'react';
import { Link } from 'react-router-dom';

import BarButton from './BarButton';
import CartIconEmpty from '../icons/CartIconEmpty';
import CartIconFull from '../icons/CartIconFull';

export default function BarCart(props) {
  const { count } = props;

  return (
    <Box>
      {count > 0 ? (
        <BarButton
          sx={{ backgroundColor: 'colors.golder', borderColor: 'colors.golder' }}
          component={Link}
          to={'/cart'}
          icon={CartIconFull}
          text={count}
        />
      ) : (
        <BarButton component={Link} to={'/cart'} icon={CartIconEmpty} />
      )}
    </Box>
  );
}
