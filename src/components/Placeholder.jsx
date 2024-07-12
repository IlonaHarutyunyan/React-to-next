import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Link from './Link';
import WarningIcon from '../icons/WarningIcon';

export default function Placeholder(props) {
  const { onClearFilters, sx } = props;

  const { t } = useTranslation(['common']);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        mb: '60px',
        mt: '60px',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: { xs: '320px', sm: '432px', md: '624px' },
        }}
      >
        <WarningIcon sx={{ mb: '18px', fontSize: '44px', color: 'colors.mediumGrey' }} />

        <Typography
          variant="h1"
          sx={{
            color: 'colors.almostBlack',
            fontWeight: 600,
            textAlign: 'center',
            mb: '16px',
            lineHeight: '140%',
            fontSize: { xs: '32px', sm: '40px', md: '52px' },
          }}
        >
          {t('search.placeholder.title')}
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',
            fontWeight: 400,
            color: 'colors.darkGrey',
            fontSize: { xs: '14px', sm: '16px' },
          }}
        >
          {t('search.placeholder.text')}&nbsp;
          <Link onClick={() => onClearFilters()}>{t('search.placeholder.clear')}</Link>
        </Typography>
      </Box>
    </Box>
  );
}
