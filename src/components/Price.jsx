import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Label from './Label';

export default function Price(props) {
  const { price, sale, perMeter = true, showPercent = true } = props;

  const { t } = useTranslation([]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      <Typography variant="body1" sx={{ mb: '4px', fontSize: '18px', fontWeight: 'bold', textAlign: 'right' }}>
        {`${price.toFixed(1)}\xa0`}
        <Typography
          variant="body1"
          component="span"
          sx={{ fontSize: '14px', color: 'colors.darkGrey', fontWeight: 600 }}
        >
          {t('common:units.currency')}
          {!!perMeter && `/${t('common:units.metersShort')}`}
        </Typography>
      </Typography>
      {!!sale?.oldPrice && (
        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', mb: '4px' }}>
          {!!showPercent && <Label text={`-${sale.percent}%`} variant="alert" />}
          <Typography
            variant="body1"
            color="error"
            sx={{
              fontSize: 14,
              fontWeight: 'bold',
              textDecoration: 'line-through',
            }}
          >
            {`${sale.oldPrice.toFixed(1)}\xa0${t('common:units.currency')}`}
          </Typography>
        </Box>
      )}
      <Typography variant="body1" component="span" sx={{ fontSize: '12px', color: 'colors.darkGrey' }}>
        {t('common:tax')}
      </Typography>
    </Box>
  );
}
