import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import Link from '../../components/Link';
import { events, track, Track } from '../../metrics';

export default function PasswordRecovery() {
  const { t } = useTranslation(['auth']);
  const [searchParams] = useSearchParams();

  const email = searchParams.get('email');

  return (
    <Box>
      <Box>
        <Typography variant="h2" sx={{ textTransform: 'none', mb: '24px', fontSize: '40px' }}>
          {t('recovery.confirm.title')}
        </Typography>

        <Typography variant="body2" sx={{ mb: '8px', fontSize: '16px' }}>
          {t('recovery.confirm.description')}
        </Typography>

        {email && (
          <Typography variant="body1" sx={{ mb: '24px', fontSize: '16px', fontWeight: 'bold' }}>
            {email}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mb: '24px' }}
          component={Link}
          to={'/auth/login'}
          onClick={() => {
            track(events.checkEmailPage.goBackButton.click);
          }}
        >
          {t('recovery.goBack')}
        </Button>
      </Box>

      <Track eventName={events.checkEmailPage.shown} />
    </Box>
  );
}
