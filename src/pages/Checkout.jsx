import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Address from '../components/Address';
import EmptyPage from '../components/EmptyPage';
import HookFormInput from '../components/HookFormInput';
import HookFormSelect from '../components/HookFormSelect';
import Link from '../components/Link';
import OrderTotal from '../components/OrderTotal';
import HookFormInputSkeleton from '../components/skeletons/HookFormInputSkeleton';
import SupportModal from '../components/SupportModal';
import CartIconEmpty from '../icons/CartIconEmpty';
import SuccessIcon from '../icons/SuccessIcon';
import { events, track } from '../metrics';
import { fetchCheckout, resetState, saveCheckoutInfo } from '../redux/slices/cartSlice';
import { isNoneOrEmpty } from '../utils/check';

function Checkout() {
  const { t } = useTranslation(['cart']);

  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm();

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const {
    data: {
      total,
      checkoutInfo: {
        firstName,
        secondName,
        vat,
        companyName,
        paymentMethod,
        deliveryMethod,
        packageType,
        paymentMethods,
        deliveryMethods,
        packageTypes,
        countries,
        delivery: {
          country: deliveryCountry,
          city: deliveryCity,
          address: deliveryAddress,
          zipCode: deliveryZipCode,
        } = {},
        invoice: { country: invoiceCountry, city: invoiceCity, address: invoiceAddress, zipCode: invoiceZipCode } = {},
      },
    },
    error,
    isCheckoutLoading,
    isCheckoutSaving,
    isCheckoutSaved,
  } = useSelector(state => state.cart);

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

  const orderNotFound =
    (!isCheckoutLoading && (!paymentMethods || !total?.count)) || error === 'Request failed with status code 404';

  const onSubmit = formData => {
    const checkoutInfo = _.pickBy(formData, x => x !== '');

    const delivery = {
      address: checkoutInfo.deliveryAddress,
      city: checkoutInfo.deliveryCity,
      country: checkoutInfo.deliveryCountry,
      zipCode: checkoutInfo.deliveryZipCode,
    };

    delete checkoutInfo.deliveryAddress;
    delete checkoutInfo.deliveryCity;
    delete checkoutInfo.deliveryCountry;
    delete checkoutInfo.deliveryZipCode;

    checkoutInfo.delivery = delivery;

    if (isSameAddress) {
      checkoutInfo.invoice = delivery;
    } else {
      const invoice = {
        address: checkoutInfo.invoiceAddress,
        city: checkoutInfo.invoiceCity,
        country: checkoutInfo.invoiceCountry,
        zipCode: checkoutInfo.invoiceZipCode,
      };
      checkoutInfo.invoice = invoice;
    }

    delete checkoutInfo.invoiceAddress;
    delete checkoutInfo.invoiceCity;
    delete checkoutInfo.invoiceCountry;
    delete checkoutInfo.invoiceZipCode;

    track(events.checkoutPage.save, {
      checkoutInfo,
      total,
    });

    dispatch(saveCheckoutInfo({ orderId, checkoutInfo }));
  };

  useEffect(() => {
    if (!orderId) {
      navigate('/cart');
    } else {
      dispatch(fetchCheckout({ orderId }));

      track(events.checkoutPage.shown, {
        total,
      });
    }

    return () => dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isCheckoutSaved]);

  useEffect(() => {
    setIsSameAddress(isAddressEqual);
  }, [isCheckoutLoading]);

  return (
    <>
      {orderNotFound && (
        <EmptyPage
          title={t('cart:checkout.placeholder.title')}
          text={t('cart:checkout.placeholder.text')}
          icon={CartIconEmpty}
          to="/orders"
          buttonText={t('cart:placeholder.visitOrders')}
          secondaryTo="/fabrics"
          secondaryButtonText={t('cart:placeholder.visitCatalog')}
          withSupport={true}
        />
      )}
      {!orderNotFound && orderId && (
        <Paper
          sx={{
            margin: 'auto',
            padding: '32px',
            width: {
              xs: '80%',
              sm: '432px',
              md: '516px',
              lg: '624px',
            },
          }}
        >
          {!isCheckoutSaved && (
            <>
              <SuccessIcon sx={{ fontSize: '48px', mb: '32px' }} />

              <Typography variant="h3" sx={{ mb: '8px' }}>
                {t('confirmation.title')}
              </Typography>

              <Typography variant="body2" sx={{ mb: '32px' }}>
                {t('confirmation.text')}
              </Typography>

              <OrderTotal isLoading={isCheckoutLoading} {...total} />

              {isCheckoutLoading && (
                <>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      gap: '24px',
                      mt: '16px',
                      flexDirection: { xs: 'column', sm: 'row' },
                    }}
                  >
                    <HookFormInputSkeleton />
                    <HookFormInputSkeleton />
                  </Box>

                  <HookFormInputSkeleton />
                  <HookFormInputSkeleton />
                  <HookFormInputSkeleton />
                </>
              )}

              {!isCheckoutLoading && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px', mt: '24px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '24px',
                        flexDirection: { xs: 'column', sm: 'row' },
                      }}
                    >
                      <HookFormInput
                        name="firstName"
                        required={true}
                        rules={{
                          required: { value: true, message: t('common:errors.required') },
                        }}
                        control={control}
                        defaultValue={firstName}
                        label={t('confirmation.firstName.label')}
                        fullWidth
                      />

                      <HookFormInput
                        name="secondName"
                        required={true}
                        rules={{
                          required: { value: true, message: t('common:errors.required') },
                        }}
                        control={control}
                        defaultValue={secondName}
                        label={t('confirmation.secondName.label')}
                        fullWidth
                      />
                    </Box>

                    {/* Delivery */}
                    <HookFormSelect
                      name="deliveryMethod"
                      required={true}
                      rules={{
                        required: { value: true, message: t('common:errors.required') },
                      }}
                      options={deliveryMethods}
                      control={control}
                      defaultValue={deliveryMethod}
                      label={t('confirmation.deliveryMethod.label')}
                      fullWidth
                    />

                    <Divider />

                    <Box sx={{ display: 'flex', gap: '32px', flexDirection: 'column' }}>
                      <Typography variant="h4">{t('confirmation.delivery.label')}</Typography>
                      <Typography variant="body2" sx={{ mt: '-24px' }}>
                        {t('confirmation.delivery.description')}
                      </Typography>

                      <Address
                        control={control}
                        countries={countries}
                        country={deliveryCountry}
                        address={deliveryAddress}
                        zipCode={deliveryZipCode}
                        city={deliveryCity}
                        prefix="delivery"
                      />
                    </Box>

                    <Divider />

                    {/* Invoice */}

                    <Box sx={{ display: 'flex', gap: '32px', flexDirection: 'column' }}>
                      <Typography variant="h4">{t('confirmation.invoice.label')}</Typography>
                      <Typography variant="body2" sx={{ mt: '-24px' }}>
                        {t('confirmation.invoice.description')}
                      </Typography>

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isSameAddress}
                            onChange={() => {
                              setIsSameAddress(!isSameAddress);
                            }}
                          />
                        }
                        label={t('confirmation.invoice.sameAddress')}
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
                        />
                      )}
                    </Box>

                    <Divider />

                    <HookFormSelect
                      name="paymentMethod"
                      required={true}
                      rules={{
                        required: { value: true, message: t('common:errors.required') },
                      }}
                      options={paymentMethods}
                      control={control}
                      defaultValue={paymentMethod}
                      label={t('confirmation.paymentMethod.label')}
                      description={t('confirmation.paymentMethod.description')}
                      fullWidth
                    />

                    <HookFormSelect
                      name="packageType"
                      required={true}
                      rules={{
                        required: { value: true, message: t('common:errors.required') },
                      }}
                      options={packageTypes}
                      control={control}
                      defaultValue={packageType}
                      label={t('confirmation.packageType.label')}
                      fullWidth
                    />

                    <HookFormInput
                      name="companyName"
                      control={control}
                      defaultValue={companyName}
                      label={t('confirmation.companyName.label')}
                      fullWidth
                    />

                    <HookFormInput
                      name="vat"
                      control={control}
                      defaultValue={vat}
                      label={t('confirmation.vat.label')}
                      description={t('confirmation.vat.description')}
                      fullWidth
                    />

                    {error && (
                      <Typography variant="body2" color="error" sx={{ fontSize: '12px' }}>
                        {t('common:errors.something')}
                      </Typography>
                    )}

                    <Button
                      className={isCheckoutSaving ? 'loading' : ''}
                      fullWidth
                      variant="contained"
                      color="confirm"
                      onClick={handleSubmit(onSubmit)}
                    >
                      {t('cart:checkout.confirm')}
                    </Button>
                    <input type="submit" hidden />
                  </Box>
                </form>
              )}

              <Button
                color="white"
                variant="outlined"
                fullWidth
                sx={{ my: '16px' }}
                onClick={() => setIsSupportModalOpen(true)}
              >
                {t('confirmation.manager')}
              </Button>
            </>
          )}
          {isCheckoutSaved && (
            <>
              <SuccessIcon sx={{ fontSize: '48px', mb: '32px' }} />

              <Typography variant="h3" sx={{ mb: '8px' }}>
                {t('thanks.title')}
              </Typography>

              <Typography variant="body2" sx={{ mb: '32px' }}>
                {t('thanks.text')}
              </Typography>

              <Button component={Link} to={'/orders'} color="primary" variant="contained" fullWidth sx={{ mb: '8px' }}>
                {t('confirmation.toOrders')}
              </Button>

              <Button
                component={Link}
                to={'/fabrics'}
                color="secondary"
                variant="contained"
                fullWidth
                sx={{ mb: '8px' }}
              >
                {t('confirmation.toCatalog')}
              </Button>

              <Button color="white" variant="outlined" fullWidth onClick={() => setIsSupportModalOpen(true)}>
                {t('confirmation.manager')}
              </Button>
            </>
          )}

          <SupportModal
            title={t('modals:cartSupport.title')}
            text={t('modals:cartSupport.text')}
            isOpen={isSupportModalOpen}
            close={() => setIsSupportModalOpen(false)}
            type="cart"
          />
        </Paper>
      )}
    </>
  );
}

export default Checkout;
