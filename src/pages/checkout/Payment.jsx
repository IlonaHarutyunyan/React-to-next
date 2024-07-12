import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Link from '../../components/Link';
import PageHeader from '../../components/PageHeader';
import SupportModal from '../../components/SupportModal';
import SuccessIcon from '../../icons/SuccessIcon';

function Payment() {
  const { t } = useTranslation(['cart']);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: {
      confirmed: { paymentLink, paymentToken },
    },
    isCheckoutPaymentStep,
    isCheckoutConfirming,
  } = useSelector(state => state.cart);

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [currentPaymentLink, setCurrentPaymentLink] = useState(null);
  const [currentPaymentToken, setCurrentPaymentToken] = useState(null);

  useEffect(() => {
    if (!isCheckoutPaymentStep) {
      navigate('/orders');
    }
  }, [dispatch]);

  useEffect(() => {
    if (paymentLink) {
      setCurrentPaymentLink(paymentLink);
    }
  }, [paymentLink]);

  useEffect(() => {
    if (paymentToken) {
      setCurrentPaymentToken(paymentToken);
    }
  }, [paymentToken]);

  return (
    <>
      <PageHeader title={t('cart:checkout.payment.title')} oneSize={true} sx={{ mb: '40px' }} />

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
        <SuccessIcon sx={{ fontSize: '48px', mb: '32px' }} />

        <Typography variant="h3" sx={{ mb: '8px' }}>
          {t('cart:checkout.payment.thanks.title')}
        </Typography>

        <Typography variant="body2" sx={{ mb: '32px' }}>
          {t('cart:checkout.payment.thanks.text')}
        </Typography>

        {!currentPaymentLink && !currentPaymentToken && (
          <Typography variant="body2" sx={{ mb: '32px' }}>
            {t('cart:checkout.payment.waitPlease')}
          </Typography>
        )}

        {currentPaymentLink && (
          <Button
            component={Link}
            to={currentPaymentLink}
            color="primary"
            variant="contained"
            fullWidth
            sx={{ mb: '8px' }}
          >
            {t('cart:checkout.payment.pay')}
          </Button>
        )}

        <Button
          className={isCheckoutConfirming ? 'loading' : ''}
          component={Link}
          to={'/fabrics'}
          color="secondary"
          variant="contained"
          fullWidth
          sx={{ mb: '8px' }}
        >
          {t('confirmation.toCatalog')}
        </Button>

        <Button
          className={isCheckoutConfirming ? 'loading' : ''}
          color="white"
          variant="outlined"
          fullWidth
          onClick={() => setIsSupportModalOpen(true)}
        >
          {t('confirmation.manager')}
        </Button>

        <SupportModal
          title={t('modals:cartSupport.title')}
          text={t('modals:cartSupport.text')}
          isOpen={isSupportModalOpen}
          close={() => setIsSupportModalOpen(false)}
          type="cart"
        />
      </Paper>
    </>
  );
}

export default Payment;
