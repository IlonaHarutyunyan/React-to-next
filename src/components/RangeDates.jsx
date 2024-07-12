import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import 'dayjs/locale/ru';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { currentLang } from '../i18n';
import CalendarIcon from '../icons/CalendarIcon';

export default function RangeInput(props) {
  const { from, to, setFrom, setTo, sx, placeholderFrom, placeholderTo } = props;

  const [thisFrom, setThisFrom] = useState(from);
  const [thisTo, setThisTo] = useState(to);

  const [t] = useTranslation(['common']);

  const onAccept = ({ newFrom, newTo }) => {
    if (newFrom && setFrom) {
      setFrom(newFrom);
    }

    if (newTo && setTo) {
      setTo(newTo);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLang}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          gap: '16px',
          justifyContent: 'space-between',
          ...sx,
        }}
      >
        <DatePicker
          minDate={dayjs('2020-01-01 00:00')}
          maxDate={dayjs()}
          disableFuture={true}
          value={thisFrom || null}
          onChange={(value, context) => {
            setThisFrom(value);

            if (!context?.validationError) {
              onAccept({ newFrom: value });
            }
          }}
          sx={{
            '& .MuiDatePicker-openPickerIcon': {
              color: 'red',
            },
          }}
          slots={{
            openPickerIcon: CalendarIcon,
          }}
          slotProps={{
            openPickerIcon: {
              sx: { fontSize: '16px' },
            },
            textField: {
              fullWidth: true,
              placeholder: placeholderFrom || t('rangeDate.placeholderFrom'),
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        fontWeight: 'bold',
                        borderRight: '1px solid',
                        borderColor: 'colors.lightGrey',
                        paddingRight: '16px',
                        marginRight: '16px',
                        color: 'colors.almostBlack',
                      }}
                    >
                      {t('rangeDate.from')}
                    </Box>
                  </InputAdornment>
                ),
              },
            },
          }}
        />

        <DatePicker
          minDate={dayjs('2020-01-01 00:00')}
          maxDate={dayjs()}
          disableFuture={true}
          value={thisTo || null}
          onChange={(value, context) => {
            setThisTo(value);

            if (!context?.validationError) {
              onAccept({ newTo: value });
            }
          }}
          sx={{
            '& .MuiDatePicker-openPickerIcon': {
              color: 'red',
            },
          }}
          slots={{
            openPickerIcon: CalendarIcon,
          }}
          slotProps={{
            openPickerIcon: {
              sx: { fontSize: '16px' },
            },
            textField: {
              fullWidth: true,
              placeholder: placeholderTo || t('rangeDate.placeholderTo'),
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        fontWeight: 'bold',
                        borderRight: '1px solid',
                        borderColor: 'colors.lightGrey',
                        paddingRight: '16px',
                        marginRight: '16px',
                        color: 'colors.almostBlack',
                      }}
                    >
                      {t('rangeDate.to')}
                    </Box>
                  </InputAdornment>
                ),
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
