import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Address from '../components/Address';
import HookFormInput from '../components/HookFormInput';
import PageHeader from '../components/PageHeader';
import { fetchUserProfile, setIsProfileUpdatedToken, updateUserProfile } from '../redux/slices/userSlice';
import { isNoneOrEmpty } from '../utils/check';

function User() {
  const { t } = useTranslation(['user']);

  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState(false);

  const {
    data: { profile },
    isLoading,
    isProfileUpdatedToken,
    isPending,
  } = useSelector(state => state.user);

  const { handleSubmit, control, reset } = useForm();

  const {
    firstName,
    secondName,
    phone,
    email,
    vat,
    countries,
    delivery: {
      id: deliveryId,
      country: deliveryCountry,
      city: deliveryCity,
      address: deliveryAddress,
      zipCode: deliveryZipCode,
    } = {},
    invoice: {
      id: invoiceId,
      country: invoiceCountry,
      city: invoiceCity,
      address: invoiceAddress,
      zipCode: invoiceZipCode,
    } = {},
  } = profile || {};

  function isAddressEqual() {
    const fields = [
      deliveryCountry,
      invoiceCountry,
      deliveryCity,
      invoiceCity,
      deliveryAddress,
      invoiceAddress,
      deliveryZipCode,
      invoiceZipCode,
    ];

    if (fields.every(isNoneOrEmpty)) {
      return false;
    }

    return (
      deliveryCountry?.id === invoiceCountry?.id &&
      deliveryCity === invoiceCity &&
      deliveryAddress === invoiceAddress &&
      deliveryZipCode === invoiceZipCode
    );
  }

  const [isSameAddress, setIsSameAddress] = useState(isAddressEqual());

  const onSubmit = formData => {
    const { phone: phoneNotTrimmed } = formData;
    const phoneTrimmed = phoneNotTrimmed.replace('+', '');

    const data = _.pickBy(formData, x => x !== '');

    const delivery = {
      address: data.deliveryAddress,
      city: data.deliveryCity,
      country: data.deliveryCountry,
      zipCode: data.deliveryZipCode,
    };

    delete data.deliveryAddress;
    delete data.deliveryCity;
    delete data.deliveryCountry;
    delete data.deliveryZipCode;

    data.delivery = delivery;

    if (isSameAddress) {
      data.invoice = delivery;
    } else {
      const invoice = {
        address: data.invoiceAddress,
        city: data.invoiceCity,
        country: data.invoiceCountry,
        zipCode: data.invoiceZipCode,
      };
      data.invoice = invoice;
    }

    delete data.invoiceAddress;
    delete data.invoiceCity;
    delete data.invoiceCountry;
    delete data.invoiceZipCode;

    dispatch(updateUserProfile({ ...data, phone: phoneTrimmed }));
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  useEffect(() => {
    setIsSameAddress(isAddressEqual);
  }, [isLoading]);

  useEffect(() => {
    if (isProfileUpdatedToken) {
      dispatch(setIsProfileUpdatedToken(false));
      reset({
        firstName,
        secondName,
        phone,
        email,
        vat,
        deliveryId,
        deliveryCountry,
        deliveryCity,
        deliveryAddress,
        deliveryZipCode,
        invoiceId,
        invoiceCountry,
        invoiceCity,
        invoiceAddress,
        invoiceZipCode,
      });
      setIsEditMode(false);
      setIsSameAddress(isAddressEqual);
    }
  }, [isProfileUpdatedToken]);

  const SaveBlock = () => (
    <Box sx={{ my: '24px' }}>
      {!!isEditMode && (
        <Box
          sx={{
            display: 'flex',
            gap: '24px',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => {
              reset();

              setIsEditMode(false);
            }}
          >
            {t('profile.cancelButton')}
          </Button>

          <Button
            className={isPending ? 'loading' : ''}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            {t('profile.saveButton')}
          </Button>
          <input type="submit" hidden />
        </Box>
      )}

      {!isEditMode && (
        <>
          <Button fullWidth variant="contained" color="secondary" onClick={() => setIsEditMode(true)}>
            {t('profile.editButton')}
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <Container sx={{ maxWidth: '624px !important' }}>
      <PageHeader title={t('profile.title')} text={email} />

      {!isLoading && profile && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <SaveBlock />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Box sx={{ display: 'flex', gap: '24px', flexDirection: { xs: 'column', sm: 'row' } }}>
              <HookFormInput
                disabled={!isEditMode}
                name="firstName"
                control={control}
                defaultValue={firstName}
                fullWidth
                label={t('profile.fields.firstName.label')}
                placeholder={t('profile.fields.firstName.placeholder')}
              />

              <HookFormInput
                disabled={!isEditMode}
                name="secondName"
                control={control}
                defaultValue={secondName}
                fullWidth
                label={t('profile.fields.secondName.label')}
                placeholder={t('profile.fields.secondName.placeholder')}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: '24px', flexDirection: { xs: 'column', sm: 'row' } }}>
              <HookFormInput
                disabled={!isEditMode}
                name="phone"
                required={true}
                rules={{
                  required: { value: true, message: t('common:errors.required') },
                  pattern: {
                    value: /^\+?[0-9]{7,16}$/,
                    message: t('common:errors.serverside.phoneInputError'),
                  },
                }}
                control={control}
                defaultValue={phone}
                label={t('profile.fields.phone.label')}
                fullWidth
              />

              <HookFormInput
                disabled={!isEditMode}
                name="vat"
                control={control}
                defaultValue={vat}
                label={t('profile.fields.vat.label')}
                fullWidth
              />
            </Box>

            {/* Delivery */}

            <Typography variant="h4">{t('cart:confirmation.delivery.label')}</Typography>

            <Address
              control={control}
              countries={countries}
              country={deliveryCountry}
              address={deliveryAddress}
              zipCode={deliveryZipCode}
              city={deliveryCity}
              prefix="delivery"
              isRequired={false}
              isDisabled={!isEditMode}
            />

            <Divider />

            {/* Invoice */}

            <Typography variant="h4">{t('cart:confirmation.invoice.label')}</Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={isSameAddress}
                  disabled={!isEditMode}
                  onChange={() => {
                    setIsSameAddress(!isSameAddress);
                  }}
                />
              }
              label={t('cart:confirmation.invoice.sameAddress')}
            />

            {!isSameAddress && (
              <Address
                control={control}
                countries={countries}
                country={invoiceCountry}
                address={invoiceAddress}
                zipCode={invoiceZipCode}
                city={invoiceCity}
                prefix="invoice"
                isRequired={false}
                isDisabled={!isEditMode}
              />
            )}
          </Box>

          <SaveBlock />
        </form>
      )}
    </Container>
  );
}

export default User;
