import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/Input';
import { events, Track } from '../../metrics';
import { resetError, setup } from '../../redux/slices/authSlice';

export default function CreatePassword() {
  const { t } = useTranslation([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    error: serverSideError,
    isLoading,
    data: { setupPasswordToken },
  } = useSelector(state => state.auth);

  const { handleSubmit, control, setError } = useForm();

  useEffect(() => {
    if (!setupPasswordToken) {
      navigate('/auth/register');
    }
  }, [setupPasswordToken]);

  const onSubmit = ({ password }) => {
    dispatch(setup({ password, setupPasswordToken }));
  };

  useEffect(() => {
    if (serverSideError?.message === 'user.register.passwordTooShort') {
      setError('password', { type: 'custom', message: t('common:errors.serverside.passwordTooShort') });
    }

    return () => dispatch(resetError());
  }, [serverSideError?.message]);

  return (
    <Box>
      <Box>
        <Typography variant="h2" sx={{ textTransform: 'none', mb: '24px', fontSize: '40px' }}>
          {t('auth:createPassword.title')}
        </Typography>
        <Typography variant="body2" sx={{ mb: '60px', fontSize: '14px' }}>
          {t('auth:createPassword.description')}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="password"
            rules={{ required: { value: true, message: t('common:errors.required') } }}
            control={control}
            defaultValue={''}
            render={({ field, _arg, fieldState: { error } }) => (
              <Input
                control={control}
                error={!!error?.message}
                helperText={error?.message}
                inputProps={{
                  type: 'password',
                  autoComplete: 'current-password',
                }}
                fullWidth
                label={t('auth:fields.password.label')}
                placeholder={t('auth:fields.password.placeholder')}
                sx={{ mb: '32px' }}
                {...field}
              />
            )}
          />

          <Button
            className={isLoading ? 'loading' : ''}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: '24px' }}
            onClick={handleSubmit(onSubmit)}
          >
            {t('auth:createPassword.finish')}
          </Button>

          <input type="submit" hidden />
        </form>
      </Box>

      <Track eventName={events.createPasswordPage.shown} />
    </Box>
  );
}
