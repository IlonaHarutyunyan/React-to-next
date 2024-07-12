import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Controller as HookController } from 'react-hook-form';

import Input from './Input';

const Controller = styled(props => (
  <Box sx={{ width: '100%', display: 'flex', flexFlow: 'column' }}>
    <HookController {...props} />
  </Box>
))(({ theme }) => ({}));

function HookFormInput(props) {
  const {
    control,
    name,
    defaultValue = '',
    description,
    label,
    required,
    fullWidth,
    placeholder,
    rules,
    disabled,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, _arg, fieldState: { error } }) => (
        <>
          {!!description && (
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
          <Input
            {...field}
            required={required}
            disabled={disabled}
            sx={{ background: 'white !important', borderRadius: '8px', order: 2 }}
            control={control}
            error={!!error?.message}
            helperText={error?.message}
            fullWidth={fullWidth}
            label={label}
            placeholder={placeholder}
          />
        </>
      )}
    />
  );
}

export default HookFormInput;
