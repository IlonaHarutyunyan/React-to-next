import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Time from './Time';
import CartIconEmpty from '../icons/CartIconEmpty';
import CloseIcon from '../icons/CloseIcon';
import { events, track, Track } from '../metrics';

export default function AddToCartModal(props) {
  const { isOpen, close } = props;

  const { t } = useTranslation(['modals']);

  const {
    data: {
      reservationTimeoutInMinutes,
      stats: {
        cart: { sum },
      },
    },
  } = useSelector(state => state.user);

  return (
    <Modal disableAutoFocus={true} disableEnforceFocus={true} open={isOpen} onClose={close}>
      <Paper
        sx={{
          boxSizing: 'border-box',
          position: 'absolute',
          top: '50%',
          left: '50%',
          display: 'flex',
          flexDirection: 'column',
          p: '32px',
          transform: 'translate(-50%, -50%)',
          maxWidth: '356px',
          width: '90%',
          borderRadius: '8px',
        }}
      >
        <CloseIcon
          onClick={() => close()}
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: 'colors.almostBlack',
            cursor: 'pointer',
          }}
        />
        <CartIconEmpty sx={{ color: 'colors.almostBlack', fontSize: '48px', mb: '32px' }} />
        <Typography variant="h3" sx={{ mb: '24px' }}>
          {t('addToCart.title')}
        </Typography>
        <Typography variant="body2" sx={{ mb: '16px' }}>
          {t('addToCart.text')}{' '}
          <Time
            sx={{ fontWeight: 'bold', color: 'colors.almostBlack' }}
            fullTimeUnits
            timeInMinutes={reservationTimeoutInMinutes}
          />
          .
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          sx={{ mb: '8px' }}
          onClick={() => {
            track(events.modals.addToCart.goToCart);
            close();
          }}
          component={Link}
          to={'/cart'}
        >
          {t('addToCart.goToCartButton')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => {
            track(events.modals.addToCart.continue);
            close();
          }}
        >
          {t('addToCart.continueButton')}
        </Button>

        <Track eventName={events.modals.addToCart.shown} />
      </Paper>
    </Modal>
  );
}
