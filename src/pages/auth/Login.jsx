import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import Input from '../../components/Input';
import Link from '../../components/Link';
import SupportModal from '../../components/SupportModal';
import { events, track, Track } from '../../metrics';
import { login, resetError } from '../../redux/slices/authSlice';

function Login() {
  const { t } = useTranslation([]);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const { error: serverSideError, isLoading } = useSelector(state => state.auth);

  const {
    handleSubmit,
    control,
    setError,
    watch,
    formState: { isDirty },
  } = useForm();

  const onSubmit = ({ userLogin, password }) => {
    track(events.loginPage.form.submit);

    dispatch(login({ userLogin, password }));
  };

  useEffect(() => {
    if (serverSideError?.message === 'auth.user.notFound') {
      setError('userLogin', { type: 'custom', message: t('common:errors.serverside.noSuchUser') });

      track(events.loginPage.form.error, { error: 'noSuchUser' });
    }

    if (serverSideError?.message === 'auth.user.wrongPassword') {
      setError('password', { type: 'custom', message: t('common:errors.serverside.wrongPassword') });

      track(events.loginPage.form.error, { error: 'wrongPassword' });
    }

    return () => {
      dispatch(resetError());
    };
  }, [serverSideError?.id]);

  useEffect(() => {
    if (isDirty) {
      track(events.loginPage.form.started);
    }
  }, [isDirty]);

  const email = searchParams.get('email');

  return (
    <Box>
      <Box>
        <Typography variant="h2" sx={{ textTransform: 'none', mb: '24px', fontSize: '40px' }}>
          {t('auth:login.title')}
        </Typography>
        {email && (
          <Typography variant="body2" sx={{ mb: '60px', fontSize: '14px' }}>
            {t('auth:login.already1')} <Link to={`/auth/recovery?email=${email}`}>{t('auth:login.restore')}</Link>{' '}
            {t('auth:login.already2')}
          </Typography>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="userLogin"
            rules={{
              required: { value: true, message: t('common:errors.required') },
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,15}$/,
                message: t('common:errors.emailFormat'),
              },
            }}
            control={control}
            defaultValue={email || ''}
            render={({ field, _arg, fieldState: { error } }) => (
              <Input
                control={control}
                error={!!error?.message}
                helperText={error?.message}
                inputProps={{
                  type: 'email',
                  autoComplete: 'username',
                  autoFocus: true,
                }}
                fullWidth
                label={t('auth:fields.email.label')}
                placeholder={t('auth:fields.email.placeholder')}
                sx={{ mb: '32px' }}
                {...field}
              />
            )}
          />

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
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: '24px' }}
            onClick={handleSubmit(onSubmit)}
            className={isLoading ? 'loading' : ''}
          >
            {t('auth:login.login')}
          </Button>

          <input type="submit" hidden />
        </form>
        <Box sx={{ width: '100%', display: 'flex', gap: '16px', mb: '24px' }}>
          <Button
            variant="outlined"
            color="white"
            sx={{ width: '100%' }}
            component={Link}
            to={`/auth/recovery${watch('userLogin') || email ? `?email=${watch('userLogin') || email}` : ''}`}
            onClick={() => {
              track(events.loginPage.restorePasswordButton.click);
            }}
          >
            {t('auth:login.forgot')}
          </Button>
          <Button
            variant="outlined"
            color="white"
            sx={{ width: '100%' }}
            component={Link}
            to={'/auth/register'}
            onClick={() => {
              track(events.loginPage.createAccountButton.click);
            }}
          >
            {t('auth:login.new')}
          </Button>
        </Box>
        <Button
          variant="outlined"
          color="white"
          sx={{ width: '100%', mb: '60px' }}
          onClick={() => setIsSupportModalOpen(true)}
        >
          {t('auth:contact')}
        </Button>
      </Box>

      {isSupportModalOpen && (
        <SupportModal
          title={t('modals:loginSupport.title')}
          text={t('modals:loginSupport.text')}
          isOpen={true}
          close={() => setIsSupportModalOpen(false)}
          type="auth"
          userLogin={watch('userLogin')}
        />
      )}

      <Track eventName={events.loginPage.shown} />
    </Box>
  );
}

export default Login;
