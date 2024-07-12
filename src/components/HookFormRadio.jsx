import { FormHelperText, Radio, RadioGroup } from '@mui/material';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
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

function HookFormRadio(props) {
  const {
    control,
    name,
    options,
    defaultValue = '',
    label,
    required,
    rules,
    disabled,
    onChange,
    itemDescription,
  } = props;

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
          <RadioGroup
            {...field}
            value={field.value}
            onChange={e => {
              field.onChange(e);
              if (onChange) {
                onChange(e);
              }
            }}
            error={error?.message}
            label={label}
          >
            {options.map(value => (
              <React.Fragment key={`${value.code}-fragment`}>
                <FormControlLabel
                  key={`${value.code}-label`}
                  value={value.code}
                  control={
                    <Radio key={value.code} sx={{ color: error ? 'colors.red' : 'none' }} disabled={!!disabled} />
                  }
                  label={value.name}
                />
                {itemDescription && itemDescription(value.code) && (
                  <FormHelperText key={`${value.code}-helper`} sx={{ ml: 3, mt: 0 }}>
                    {itemDescription(value.code)}
                  </FormHelperText>
                )}
              </React.Fragment>
            ))}
          </RadioGroup>
          {error && (
            <FormHelperText sx={{ color: error ? 'colors.red' : 'colors.darkGrey' }}>{error.message}</FormHelperText>
          )}
        </>
      )}
    />
  );
}

export default HookFormRadio;
