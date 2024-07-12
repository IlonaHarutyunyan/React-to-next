import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import HookFormInput from '../../components/HookFormInput';
import InfoModal from '../../components/InfoModal';
import OrderTotal from '../../components/OrderTotal';
import PageHeader from '../../components/PageHeader';
import HookFormInputSkeleton from '../../components/skeletons/HookFormInputSkeleton';
import SupportModal from '../../components/SupportModal';
import WarningIcon from '../../icons/WarningIcon';
import {
  cartChangedModalClosed,
  checkoutConfirm,
  setIsCheckoutConfirmStep,
  setIsCheckoutPaymentStep,
  setIsCheckoutSuccessStep,
} from '../../redux/slices/cartSlice';

function Confirm() {
  const { t } = useTranslation(['cart']);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  const {
    data: {
      total,
      checkoutData: { firstName, secondName, vat, companyName, isPaymentAvailable },
    },
    isCheckoutConfirmStep,
    isDeliveryDataConfirming,
    isCartChangedModalOpen,
    isCheckoutConfirming,
  } = useSelector(state => state.cart);

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  useEffect(() => {
    if (!isCheckoutConfirmStep) {
      navigate('/cart');
    }
  }, [dispatch]);

  const onSubmit = formData => {
    const checkoutInfo = _.pickBy(formData, x => x !== '');

    dispatch(checkoutConfirm({ checkoutInfo }));
  };

  useEffect(() => {
    if (isCheckoutConfirming) {
      window.scrollTo(0, 0);

      if (isPaymentAvailable) {
        dispatch(setIsCheckoutPaymentStep(true));
        navigate(`/checkout/payment`);
        dispatch(setIsCheckoutConfirmStep(false));
      } else {
        dispatch(setIsCheckoutSuccessStep(true));
        navigate(`/checkout/success`);
        dispatch(setIsCheckoutConfirmStep(false));
      }
    }
  }, [isCheckoutConfirming]);

  if (isDeliveryDataConfirming) {
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
        </Paper>
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
                gap: '24px',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <HookFormInput
                name="firstName"
                required={true}
                rules={{
                  required: {
                    value: true,
                    message: t('common:errors.required'),
                  },
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
                  required: {
                    value: true,
                    message: t('common:errors.required'),
                  },
                }}
                control={control}
                defaultValue={secondName}
                label={t('confirmation.secondName.label')}
                fullWidth
              />
            </Box>

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
          <OrderTotal isLoading={isDeliveryDataConfirming} {...total} />

          <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <Button
              className={isDeliveryDataConfirming ? 'loading' : ''}
              fullWidth
              variant="contained"
              color="confirm"
              onClick={handleSubmit(onSubmit)}
            >
              {isPaymentAvailable ? t('cart:checkout.pay') : t('cart:checkout.confirm')}
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

export default Confirm;
