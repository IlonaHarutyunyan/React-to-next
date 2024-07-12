import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Time from './Time';
import CloseIcon from '../icons/CloseIcon';
import QuestionIcon from '../icons/QuestionIcon';
import { events, Track } from '../metrics';

export default function ReservationModal(props) {
  const { isOpen, close, reservationTimeoutInMinutes } = props;

  const { t } = useTranslation(['modals']);

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
          borderRadius: '8px',
          width: '90%',
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
        <QuestionIcon sx={{ color: 'colors.almostBlack', fontSize: '48px', mb: '32px' }} />
        <Typography variant="h3" sx={{ mb: '8px' }}>
          {t('reservation.title')}
        </Typography>
        <Typography variant="body2" sx={{ mb: '32px' }}>
          {t('reservation.text1')}{' '}
          <Time
            sx={{ fontWeight: 700, color: 'colors.almostBlack' }}
            fullTimeUnits
            timeInMinutes={reservationTimeoutInMinutes}
          />
          <br />
          <br />
          {t('reservation.text2')}
        </Typography>
        <Button color="primary" variant="contained" fullWidth onClick={() => close()}>
          {t('addToCart.continueButton')}
        </Button>

        <Track eventName={events.modals.reservation.shown} />
      </Paper>
    </Modal>
  );
}
