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

function Success() {
  const { t } = useTranslation(['cart']);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: {
      confirmed: { orderId },
    },
    isCheckoutConfirming,
    isCheckoutSuccessStep,
  } = useSelector(state => state.cart);

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  useEffect(() => {
    if (!isCheckoutSuccessStep) {
      navigate('/orders');
    }
  }, [dispatch]);

  useEffect(() => {
    if (orderId) {
      setCurrentOrderId(orderId);
    }
  }, [orderId]);

  return (
    <>
      <PageHeader title={t('cart:checkout.success.title')} oneSize={true} sx={{ mb: '40px' }} />

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
          {t('thanks.title')}
        </Typography>

        <Typography variant="body2" sx={{ mb: '32px' }}>
          {t('thanks.text')}
        </Typography>

        <Button
          className={currentOrderId ? 'loading' : ''}
          component={Link}
          to={`/orders/${currentOrderId}`}
          color="primary"
          variant="contained"
          fullWidth
          sx={{ mb: '8px' }}
          disabled={!currentOrderId}
        >
          {t('checkout.success.toOrder')}
        </Button>

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
      </Paper>

      <SupportModal
        title={t('modals:cartSupport.title')}
        text={t('modals:cartSupport.text')}
        isOpen={isSupportModalOpen}
        close={() => setIsSupportModalOpen(false)}
        type="cart"
      />
    </>
  );
}

export default Success;
