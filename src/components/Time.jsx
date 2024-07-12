import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import pluralize from '../utils/pluralize';

const timeFromMinutes = (timeInMinutes, fullTimeUnits = false) => {
  const { t } = useTranslation(['common']);

  let result = 0;

  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;

  const showMinutes = hours < 2;

  const hoursFormatted = hours
    ? `${hours}\xa0${fullTimeUnits ? pluralize(hours, t('units.hours')) : t('units.hoursShort')}`
    : '';
  const minutesFormatted = minutes
    ? `${minutes}\xa0${fullTimeUnits ? pluralize(minutes, t('units.minutes')) : t('units.minutesShort')}`
    : '';
  const delimeter = hours && minutes ? '\xa0' : '';

  if (timeInMinutes === 0) {
    result = `0\xa0${fullTimeUnits ? pluralize(0, t('units.minutes')) : t('units.minutesShort')}`;
  } else {
    result = `${hoursFormatted}${delimeter}${showMinutes ? minutesFormatted : ''}`;
  }

  return result;
};

export default function Time(props) {
  const { timeInMinutes, fullTimeUnits, sx } = props;

  const result = timeFromMinutes(timeInMinutes, fullTimeUnits);

  return (
    <Typography component="span" sx={{ color: 'inherit', display: 'inline', fontSize: 'inherit', ...sx }}>
      {result}
    </Typography>
  );
}

export { timeFromMinutes };
