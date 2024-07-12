import Box from '@mui/material/Box';
import React from 'react';
import { useTranslation } from 'react-i18next';

import HookFormInput from './HookFormInput';
import HookFormSelect from './HookFormSelect';

export default function Address({
  control,
  countries,
  country,
  address,
  zipCode,
  city,
  prefix,
  isRequired = true,
  isDisabled = false,
  onChange = () => {},
}) {
  const { t } = useTranslation(['cart']);

  return (
    <>
      <HookFormSelect
        key={`${prefix}Country`}
        name={`${prefix}Country`}
        required={isRequired}
        rules={{
          required: { value: isRequired, message: t('common:errors.required') },
        }}
        options={countries}
        control={control}
        defaultValue={country}
        label={t(`confirmation.${prefix}.country.label`)}
        fullWidth
        disabled={isDisabled}
        onChange={e => onChange(e)}
      />

      <Box
        sx={{
          display: 'flex',
          gap: '24px',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
        key={`${prefix}Box`}
      >
        <HookFormInput
          key={`${prefix}ZipCode`}
          name={`${prefix}ZipCode`}
          required={isRequired}
          rules={{
            required: { value: isRequired, message: t('common:errors.required') },
          }}
          control={control}
          defaultValue={zipCode}
          label={t(`confirmation.${prefix}.zipCode.label`)}
          fullWidth
          disabled={isDisabled}
          onChange={e => onChange(e)}
        />

        <HookFormInput
          key={`${prefix}City`}
          name={`${prefix}City`}
          required={isRequired}
          rules={{
            required: { value: isRequired, message: t('common:errors.required') },
          }}
          control={control}
          defaultValue={city}
          label={t(`confirmation.${prefix}.city.label`)}
          fullWidth
          disabled={isDisabled}
          onChange={e => onChange(e)}
        />
      </Box>

      <HookFormInput
        key={`${prefix}Address`}
        name={`${prefix}Address`}
        required={isRequired}
        rules={{
          required: { value: isRequired, message: t('common:errors.required') },
        }}
        control={control}
        defaultValue={address}
        label={t(`confirmation.${prefix}.address.label`)}
        fullWidth
        disabled={isDisabled}
        onChange={e => onChange(e)}
      />
    </>
  );
}
