import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Banner from '../../components/Banner';
import Input from '../../components/Input';
import Link from '../../components/Link';
import PhoneInput from '../../components/PhoneInput';
import SupportModal from '../../components/SupportModal';
import { events, track, Track } from '../../metrics';
import { fetchCountriesAndActivities, register, resetAction, resetError } from '../../redux/slices/authSlice';

function Register() {
  const { t } = useTranslation(['auth']);
  const dispatch = useDispatch();
  const { state: locationState } = useLocation();
  const navigate = useNavigate();

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    setError,
    formState: { isDirty },
  } = useForm({
    shouldFocusError: false,
  });

  const {
    data: { countries, action },
    error: serverSideError,
    isLoading,
  } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchCountriesAndActivities());

    return () => {
      dispatch(resetError());
    };
  }, []);

  const onSubmitError = submitErrors => {
    Object.keys(submitErrors)?.forEach(x => {
      track(events.registerPage.form.error, { error: x });
    });
  };

  const onSubmit = ({ userLogin, country, phone, name }) => {
    track(events.registerPage.form.submit);

    dispatch(
      register({
        email: userLogin,
        phone: phone.replace('+', ''),
        country: country.id,
        name,
      }),
    );
  };

  useEffect(() => {
    if (action === 'login') {
      track(events.registerPage.loginRedirect);

      navigate(`/auth/login?email=${watch('userLogin')}`, { state: locationState });
    }

    if (action === 'setup') {
      track(events.registerPage.createPasswordRedirect);

      navigate(`/auth/create`, { state: locationState });
    }

    return () => dispatch(resetAction());
  }, [action]);

  useEffect(() => {
    if (serverSideError?.message === 'user.register.phoneInputError') {
      setError('phone', { type: 'custom', message: t('common:errors.serverside.phoneInputError') });

      track(events.registerPage.form.error, { error: 'phoneInputError' });
    }

    return () => {
      dispatch(resetError());
    };
  }, [serverSideError?.id]);

  useEffect(() => {
    if (isDirty) {
      track(events.registerPage.form.started);
    }
  }, [isDirty]);

  return (
    <Box>
      <Typography variant="h2" sx={{ textTransform: 'none', mb: '24px', fontSize: '40px' }}>
        {t('register.title')}
      </Typography>
      <Typography variant="body2" sx={{ mb: '24px', fontSize: '14px' }}>
        {t('register.description')}
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ mb: '60px' }}
        component={Link}
        to={'/auth/login'}
        onClick={() => {
          track(events.registerPage.alreadyHaveAnAccountButton.click);
        }}
      >
        {t('register.already')}
      </Button>

      <Banner sx={{ mb: '24px', mt: '-24px' }} location="register" />

      <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <Controller
          name="name"
          rules={{
            required: { value: true, message: t('common:errors.required') },
          }}
          control={control}
          defaultValue={''}
          render={({ field, _arg, fieldState: { error } }) => (
            <Input
              required={true}
              control={control}
              error={!!error?.message}
              helperText={error?.message}
              inputProps={{
                autoComplete: 'name',
              }}
              fullWidth
              label={t('fields.name.label')}
              placeholder={t('fields.name.placeholder')}
              sx={{ mb: '32px' }}
              {...field}
            />
          )}
        />

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
          defaultValue={''}
          render={({ field, _arg, fieldState: { error } }) => (
            <Input
              required={true}
              control={control}
              error={!!error?.message}
              helperText={error?.message}
              inputProps={{
                type: 'email',
                autoComplete: 'username',
              }}
              fullWidth
              label={t('fields.email.label')}
              placeholder={t('fields.email.placeholder')}
              sx={{ mb: '32px' }}
              {...field}
            />
          )}
        />

        <Box sx={{ mb: '32px' }}>
          <PhoneInput
            watch={watch}
            setValue={setValue}
            countries={countries}
            countryControl={control}
            phoneControl={control}
          />
        </Box>

        <Button
          fullWidth
          className={isLoading ? 'loading' : ''}
          variant="contained"
          color="primary"
          sx={{ mb: '16px' }}
          onClick={handleSubmit(onSubmit, onSubmitError)}
        >
          {t('register.create')}
        </Button>
        <Button
          variant="outlined"
          color="white"
          sx={{ width: '100%', mb: '32px' }}
          onClick={() => setIsSupportModalOpen(true)}
        >
          {t('auth:contact')}
        </Button>
        <Typography variant="body2" sx={{ mb: '24px', fontSize: '12px' }}>
          {t('register.disclaimer')}
        </Typography>
        <input type="submit" hidden />
      </form>

      {isSupportModalOpen && (
        <SupportModal
          title={t('modals:loginSupport.title')}
          text={t('modals:loginSupport.text')}
          isOpen={true}
          close={() => setIsSupportModalOpen(false)}
          type="auth"
          userLogin={watch('userLogin')}
          userPhone={watch('phone')}
        />
      )}

      <Track eventName={events.registerPage.shown} />
    </Box>
  );
}

export default Register;
