import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import React from 'react';

import { currentLang } from '../i18n';
import ArrowDownIcon from '../icons/ArrowDownIcon';

const languages = [
  {
    flag: '🇨🇳',
    title: '中文',
    id: 'cn',
  },
  {
    flag: '🇷🇺',
    title: 'RU',
    id: 'ru',
  },
  {
    flag: '🇫🇷',
    title: 'FR',
    id: 'fr',
  },
  {
    flag: '🇬🇧',
    title: 'EN',
    id: 'en',
  },
];

const currentLanguage = languages.find(x => x.id === currentLang);

languages.sort(x => (x.id === currentLang ? 1 : -1));

export default function LangPicker(props) {
  const { sx, dark } = props;

  return (
    <Select
      IconComponent={iconProps => (
        <ArrowDownIcon
          {...iconProps}
          sx={{ fontSize: '16px', right: '12px !important', color: !dark && 'white !important' }}
        />
      )}
      MenuProps={{
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        sx: {
          '.MuiMenu-paper': {
            transform: {
              xs: 'translate(-1px, 58px) !important',
              sm: 'translate(-3px, 58px) !important',
            },
          },
        },
      }}
      sx={{
        ...sx,
        '.MuiSelect-select': {
          color: !dark && 'white !important',
        },
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: !dark && 'transparent !important',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: !dark && 'transparent !important',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: !dark && 'transparent !important',
        },
      }}
      value={currentLanguage}
      onChange={event => {
        const {
          target: {
            value: { id },
          },
        } = event;

        localStorage.setItem('bfLang', id);

        const url = new URL(window.location.href);
        url.searchParams.delete('lang');

        window.location.assign(url);
      }}
      input={<OutlinedInput sx={{ color: 'white !important' }} />}
      renderValue={x => (
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <Box>{x.flag}</Box>
          <Box>{x.title}</Box>
        </Box>
      )}
    >
      {languages.map(x => (
        <MenuItem
          sx={{
            height: '48px',
            display: 'flex',
            flexDirection: 'column',
            py: 0,
            px: '16px',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
          key={x.id}
          value={x}
        >
          <Box sx={{ fontWeight: 'bold', mt: 'auto', display: 'flex', gap: '8px' }}>
            <Box>{x.flag}</Box>
            <Box>{x.title}</Box>
          </Box>

          <Divider sx={{ width: '100%', marginTop: 'auto' }} key={`sort-divider-${x.id}`} />
        </MenuItem>
      ))}
    </Select>
  );
}
