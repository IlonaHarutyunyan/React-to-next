import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Price from './Price';
import Tip from './Tip';

const CartTitle = styled(props => <Typography {...props} />)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 700,
  marginTop: '24px',
  marginBottom: '24px',
  display: 'flex',
}));

const Stats = styled(props => <Box {...props} />)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  paddingTop: '16px',
  paddingBottom: '16px',
}));

const StatsItem = styled(props => <Box {...props} />)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StatsLeft = styled(props => <Typography {...props} />)(({ theme }) => ({
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.darkGrey,
}));

const StatsRight = styled(props => <Typography {...props} />)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 700,
}));

export default function OrderTotal(props) {
  const { count, cutsCount, length, weight, price, sale, isLoading } = props;

  const { t } = useTranslation([]);

  return (
    <Box sx={{ mb: '24px' }}>
      <CartTitle
        sx={{
          mt: { xs: 0, md: '16px' },
        }}
      >
        {t('cart:checkout.title')}
      </CartTitle>
      <Divider />
      <Stats>
        {isLoading && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton animation="wave" sx={{ width: '70%' }} />
              <Skeleton animation="wave" sx={{ width: '15%' }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton animation="wave" sx={{ width: '50%' }} />
              <Skeleton animation="wave" sx={{ width: '20%' }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton animation="wave" sx={{ width: '40%' }} />
              <Skeleton animation="wave" sx={{ width: '30%' }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton animation="wave" sx={{ width: '60%' }} />
              <Skeleton animation="wave" sx={{ width: '15%' }} />
            </Box>
          </>
        )}
        {!isLoading && (
          <>
            {!!count && (
              <StatsItem>
                <StatsLeft>{t('cart:checkout.count')}</StatsLeft>
                <StatsRight>{count}</StatsRight>
              </StatsItem>
            )}
            {!!cutsCount && (
              <StatsItem>
                <StatsLeft>
                  {t('cart:checkout.cutsCount')}{' '}
                  {cutsCount > count && (
                    <Tip text={t('cart:checkout.cutsDisclaimer')} sx={{ ml: '4px', color: 'colors.darkGrey' }} />
                  )}
                </StatsLeft>
                <StatsRight>{cutsCount}</StatsRight>
              </StatsItem>
            )}
            {!!length && (
              <StatsItem>
                <StatsLeft>{t('cart:checkout.meters')}</StatsLeft>
                <StatsRight>
                  {length}&nbsp;{t('common:units.metersShort')}
                </StatsRight>
              </StatsItem>
            )}
            {!!weight && (
              <StatsItem>
                <StatsLeft>{t('cart:checkout.weight')}</StatsLeft>
                <StatsRight>
                  {weight}&nbsp;{t('common:units.kilosShort')}
                </StatsRight>
              </StatsItem>
            )}
          </>
        )}
      </Stats>
      <Divider />
      {!!price && (
        <Box
          sx={{
            mt: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <CartTitle sx={{ m: 0, mb: '8px' }}>{t('cart:checkout.total')}</CartTitle>
          </Box>
          <Price perMeter={false} price={price} sale={sale} showPercent={false} />
        </Box>
      )}
    </Box>
  );
}
