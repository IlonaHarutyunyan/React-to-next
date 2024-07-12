import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Input from './Input';
import { applyPromo, removePromo } from '../redux/slices/cartSlice';

export default function PromoCodeInput(props) {
  const { promoCode, promoDiscount, promoCodeError, sx } = props;

  const [localPromoCode, setLocalPromoCode] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const { t } = useTranslation([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (promoCode) {
      setLocalPromoCode(promoCode);
      setIsSaved(true);
    } else {
      setLocalPromoCode('');
      setIsSaved(false);
    }
  }, [promoCode]);

  const applyPromoCode = () => {
    dispatch(applyPromo({ promoCode: localPromoCode }));
  };

  const removePromoCode = () => {
    dispatch(removePromo());
  };

  return (
    <Box sx={sx}>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Input
          sx={{
            color: isSaved ? '#41BD83' : 'inherit',
            '& .MuiInputBase-input': {
              color: isSaved ? '#41BD83' : 'inherit',
            },
            '& .Mui-disabled': {
              WebkitTextFillColor: isSaved ? '#41BD83' : 'inherit', // Цвет текста для disabled input
            },
            '& .MuiFormHelperText-root': {
              textAlign: promoDiscount === 0 ? 'center' : 'left',
            },
          }}
          placeholder={t('cart:promoCode.placeholder')}
          autoComplete="off"
          color="confirm"
          fullWidth
          value={localPromoCode}
          error={!!promoCodeError}
          helperText={
            (promoCodeError === 'common.PromoCodeNotAvailable' ? t('cart:promoCode.error') : '') ||
            (promoDiscount === 0 ? t('cart:promoCode.info') : '')
          }
          disabled={!!isSaved}
          onChange={event => {
            const { value } = event.target;
            const result = value?.trim().toUpperCase();
            setIsSaved(result === promoCode);
            setLocalPromoCode(result);
          }}
        />
      </Box>

      {!isSaved && (
        <Box>
          <Button sx={{ my: '16px' }} variant="outlined" color="white" fullWidth onClick={() => applyPromoCode()}>
            {t('cart:promoCode.applyPromo')}
          </Button>
        </Box>
      )}
      {isSaved && (
        <Box>
          <Button sx={{ my: '16px' }} variant="outlined" color="white" fullWidth onClick={() => removePromoCode()}>
            {t('cart:promoCode.removePromo')}
          </Button>
        </Box>
      )}
    </Box>
  );
}
