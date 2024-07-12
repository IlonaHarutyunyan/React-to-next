import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Link from './Link';
import AccountIcon from '../icons/AccountIcon';
import CloseIcon from '../icons/CloseIcon';
import { events, track, Track } from '../metrics';

export default function LoginRegister(props) {
  const { isOpen, close } = props;

  const { t } = useTranslation(['common']);
  const { sx } = props;

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
          alignItems: 'center',
          p: '32px',
          transform: 'translate(-50%, -50%)',
          maxWidth: '516px',
          width: '90%',
          borderRadius: '8px',
          backgroundColor: 'colors.gold',
          ...sx,
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
        <AccountIcon sx={{ color: 'colors.golder', fontSize: '48px', mb: '32px' }} />
        <Typography sx={{ mb: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center' }}>
          {t('loginRegister.title')}
        </Typography>
        <Typography sx={{ mb: '32px', fontSize: '14px', color: 'colors.darkGrey' }}>
          {t('loginRegister.text')}
        </Typography>
        <Box sx={{ display: 'flex', width: '100%', gap: '8px', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '100%' }}
            component={Link}
            to={'/auth/login'}
            passfrom="true"
            onClick={() => {
              track(events.modals.loginRegister.loginButton.click);
            }}
          >
            {t('loginRegister.loginButton')}
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ width: '100%' }}
            component={Link}
            passfrom="true"
            to={'/auth/register'}
            onClick={() => {
              track(events.modals.loginRegister.registerButton.click);
            }}
          >
            {t('loginRegister.registerButton')}
          </Button>
        </Box>

        <Track eventName={events.modals.loginRegister.shown} />
      </Paper>
    </Modal>
  );
}
