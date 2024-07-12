import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Controller as HookController } from 'react-hook-form';

import { colors } from '../theme';

const Controller = styled(props => (
  <Box sx={{ width: '100%', display: 'flex', flexFlow: 'column' }}>
    <HookController {...props} />
  </Box>
))(({ theme }) => ({}));

function HookFormSelect(props) {
  const { control, name, options, defaultValue = '', description, label, required, fullWidth, rules, disabled } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({ field, _arg, fieldState: { error } }) => (
        <>
          <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: '8px' }}>
            {label} {!!required && <span style={{ color: colors.red }}>*</span>}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              sx={{
                mb: '12px',
                order: 1,
                fontSize: '12px',
                color: error ? 'colors.red' : 'colors.darkGrey',
              }}
            >
              {description}
            </Typography>
          )}
          <Select
            fullWidth={fullWidth}
            sx={{ order: 2 }}
            {...field}
            control={control}
            error={!!error?.message}
            renderValue={x => x.name}
            onChange={e => {
              field.onChange(e.target.value);
            }}
            disabled={!!disabled}
          >
            {options.map(x => (
              <MenuItem
                sx={{
                  height: '48px',
                  display: 'flex',
                  flexDirection: 'column',
                  py: 0,
                  px: '20px',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
                key={x.id}
                value={x}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    display: 'flex',
                    marginTop: 'auto',
                  }}
                >
                  {x.name}
                </Typography>
                <Divider sx={{ width: '100%', marginTop: 'auto' }} key={`divider-${x.id}`} />
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    />
  );
}

export default HookFormSelect;
