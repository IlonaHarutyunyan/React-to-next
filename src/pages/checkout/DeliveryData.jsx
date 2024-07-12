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
import { useNavigate } from 'react-router-dom';

import Address from '../../components/Address';
import HookFormRadio from '../../components/HookFormRadio';
import InfoModal from '../../components/InfoModal';
import OrderTotal from '../../components/OrderTotal';
import PageHeader from '../../components/PageHeader';
import HookFormInputSkeleton from '../../components/skeletons/HookFormInputSkeleton';
import SupportModal from '../../components/SupportModal';
import WarningIcon from '../../icons/WarningIcon';
import {
  cartChangedModalClosed,
  confirmDeliveryData,
  setIsCheckoutConfirmStep,
  setIsDeliveryDataStep,
} from '../../redux/slices/cartSlice';
import { isNoneOrEmpty } from '../../utils/check';

function DeliveryData() {
  const { t } = useTranslation(['cart']);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  const {
    data: {
      total,
      deliveryData: {
        packageType,
        packageTypes,
        deliveryMethod,
        deliveryMethods,
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
    isDeliveryDataLoading,
    isDeliveryDataStep,
    isDeliveryOffersLoading,
    isDeliveryDataConfirming,
    isCartChangedModalOpen,
  } = useSelector(state => state.cart);

  const [currentDeliveryMethod, setCurrentDeliveryMethod] = useState(deliveryMethod?.code || '');

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // const [isFormChanged, setIsFormChanged] = useState(true);
  // const [isDeliverySelected, setIsDeliverySelected] = useState(false);

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

  useEffect(() => {
    setIsSameAddress(isAddressEqual());
  }, [
    deliveryCountry,
    invoiceCountry,
    deliveryCity,
    invoiceCity,
    deliveryAddress,
    invoiceAddress,
    deliveryZipCode,
    invoiceZipCode,
  ]);

  useEffect(() => {
    if (!isDeliveryDataStep) {
      navigate('/cart');
    }
  }, [dispatch]);

  useEffect(() => {
    if (deliveryMethod?.code) {
      setCurrentDeliveryMethod(deliveryMethod.code);
    }
  }, [deliveryMethod]);

  function onDeliveryMethodChange(event) {
    setCurrentDeliveryMethod(event.target.value);
    // setIsFormChanged(true);
  }

  function onPackageTypeChange(event) {
    // setIsFormChanged(true);
  }

  function onDeliveryAddressChange(event) {
    // setIsFormChanged(true);
  }

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

    if (currentDeliveryMethod !== 'self_pickup') {
      checkoutInfo.delivery = delivery;
    }

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

    const selectedDeliveryMethod = deliveryMethods.find(
      i => checkoutInfo.deliveryMethod && i.code === checkoutInfo.deliveryMethod,
    );

    if (selectedDeliveryMethod) {
      delete checkoutInfo.deliveryMethod;
      checkoutInfo.deliveryMethod = selectedDeliveryMethod;
    }

    const selectedPackageType = packageTypes.find(i => checkoutInfo.packageType && i.code === checkoutInfo.packageType);

    if (selectedPackageType) {
      delete checkoutInfo.packageType;
      checkoutInfo.packageType = selectedPackageType;
    }
    // track(events.checkoutPage.save, {
    //     checkoutInfo,
    //     total,
    // });

    dispatch(confirmDeliveryData({ checkoutInfo }));
  };

  useEffect(() => {
    if (isDeliveryDataConfirming) {
      window.scrollTo(0, 0);
      dispatch(setIsCheckoutConfirmStep(true));
      dispatch(setIsDeliveryDataStep(false));
      navigate(`/checkout/confirm`);
    }
  }, [isDeliveryDataConfirming]);

  if (isDeliveryDataLoading || !countries) {
    return (
      <>
        <PageHeader title={t('cart:checkout.deliveryData.title')} oneSize={true} sx={{ mb: '40px' }} />

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
    );
  }

  return (
    <>
      <PageHeader title={t('cart:checkout.deliveryData.title')} oneSize={true} sx={{ mb: '40px' }} />

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              mt: '24px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h4">{t('cart:checkout.deliveryData.label')}</Typography>

              <HookFormRadio
                name="packageType"
                control={control}
                defaultValue={packageType?.code || ''}
                options={packageTypes}
                label={t('confirmation.packageType.label')}
                required={true}
                onChange={e => onPackageTypeChange(e)}
                rules={{
                  required: {
                    value: true,
                    message: t('common:errors.required'),
                  },
                }}
              />

              <HookFormRadio
                name="deliveryMethod"
                control={control}
                defaultValue={deliveryMethod?.code || ''}
                options={deliveryMethods}
                label={t('confirmation.deliveryMethod.label')}
                required={true}
                onChange={e => onDeliveryMethodChange(e)}
                rules={{
                  required: {
                    value: true,
                    message: t('common:errors.required'),
                  },
                }}
                itemDescription={code => (code === 'self_pickup' ? t('checkout.warehouse') : null)}
              />
            </Box>

            <Divider />

            {(currentDeliveryMethod === 'transport_company' || currentDeliveryMethod === 'other') && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '16px',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h4">{t('confirmation.delivery.address.label')}</Typography>

                  <Address
                    control={control}
                    countries={countries}
                    country={deliveryCountry}
                    address={deliveryAddress}
                    zipCode={deliveryZipCode}
                    city={deliveryCity}
                    prefix="delivery"
                    onChange={onDeliveryAddressChange}
                  />
                </Box>

                <Divider />
              </>
            )}

            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h4">{t('confirmation.invoice.label')}</Typography>

              {currentDeliveryMethod && currentDeliveryMethod === 'transport_company' && (
                <>
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
                </>
              )}

              {((!isSameAddress && currentDeliveryMethod === 'transport_company') ||
                currentDeliveryMethod === 'self_pickup' ||
                currentDeliveryMethod === 'other') && (
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
          </Box>

          <input type="submit" hidden />
        </form>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            mt: '24px',
          }}
        >
          {/* {!isFormChanged && packages && ( */}
          {/*     <> */}
          {/*         <Divider /> */}

          {/*         <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column' }}> */}
          {/*             <Typography variant="h4">{t('confirmation.delivery.dimensions')}</Typography> */}

          {/*         </Box> */}
          {/*     </> */}
          {/* )} */}

          {/* {!isFormChanged && offers && offers === [] && ( */}
          {/*     <> */}
          {/*         <Divider /> */}

          {/*         <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column' }}> */}
          {/*             <Typography variant="h4">{t('confirmation.delivery.offer')}</Typography> */}

          {/*             <Typography */}
          {/*                 variant="body1">{t('confirmation.delivery.offerNotFound')}</Typography> */}
          {/*         </Box> */}
          {/*     </> */}
          {/* )} */}

          {/* {!isFormChanged && offers && offers !== [] && ( */}
          {/*     <> */}
          {/*         <Divider /> */}

          {/*         <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column' }}> */}
          {/*             <Typography variant="h4">{t('confirmation.checkout.offer')}</Typography> */}

          {/*             <Typography */}
          {/*                 variant="body1">{t('confirmation.checkout.offerNotFound')}</Typography> */}
          {/*         </Box> */}
          {/*     </> */}
          {/* )} */}

          {/* <Divider /> */}
          <OrderTotal isLoading={isDeliveryDataLoading} {...total} />

          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              flexDirection: 'column',
            }}
          >
            <Button
              className={isDeliveryDataConfirming ? 'loading' : ''}
              fullWidth
              variant="contained"
              color="confirm"
              onClick={handleSubmit(onSubmit)}
            >
              {t('cart:checkout.next')}
            </Button>

            <Button color="white" variant="outlined" fullWidth onClick={() => navigate('/cart')}>
              {t('checkout.backToCart')}
            </Button>

            <Button color="white" variant="outlined" fullWidth onClick={() => setIsSupportModalOpen(true)}>
              {t('confirmation.manager')}
            </Button>
          </Box>
        </Box>

        <SupportModal
          title={t('modals:cartSupport.title')}
          text={t('modals:cartSupport.text')}
          isOpen={isSupportModalOpen}
          close={() => setIsSupportModalOpen(false)}
          type="cart"
        />

        <InfoModal
          isOpen={isCartChangedModalOpen}
          close={() => {
            dispatch(cartChangedModalClosed());
          }}
          title={t('modals:cartChanged.title')}
          text={t('modals:cartChanged.text')}
          Icon={WarningIcon}
          buttonPrimaryText={t('modals:cartChanged.button')}
        />
      </Paper>
    </>
  );
}

export default DeliveryData;
