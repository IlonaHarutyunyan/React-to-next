import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import LengthInput from './LengthInput';
import CloseIcon from '../icons/CloseIcon';
import { events, Track } from '../metrics';
import { editCartItem } from '../redux/slices/cartSlice';

export default function EditCartItemModal(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation(['modals']);

  const { isOpen, close, lengthInCart, min, max, thumbnail, title, article, id, isLoading } = props;

  const [length, setLength] = useState(lengthInCart);

  const isError = length < min || length > max;

  return (
    <Modal disableAutoFocus={true} disableEnforceFocus={true} open={isOpen} onClose={close}>
      <Paper
        sx={{
          boxSizing: 'border-box',
          position: 'absolute',
          top: '50%',
          left: '50%',
          display: 'flex',
          flexDirection: 'column',
          p: '32px',
          transform: 'translate(-50%, -50%)',
          maxWidth: '400px',
          width: '90%',
          borderRadius: '8px',
        }}
      >
        <CloseIcon
          onClick={() => close()}
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: 'colors.almostBlack',
            cursor: 'pointer',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '16px',
            alignItems: 'middle',
            mb: '32px',
          }}
        >
          <img
            style={{
              width: '62px',
              height: '48px',
              borderRadius: '8px',
            }}
            src={thumbnail}
          />
          <Box>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              {article}
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: 'colors.darkGrey',
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
        <LengthInput
          length={length}
          setLength={setLength}
          min={min}
          max={max}
          isError={isError}
          sx={{
            mb: '32px',
          }}
        />
        <Button
          className={isLoading ? 'loading' : ''}
          color="success"
          variant="contained"
          fullWidth
          disabled={isError || length === lengthInCart}
          sx={{ mb: '8px' }}
          onClick={() => {
            dispatch(editCartItem({ id, length }));
          }}
        >
          {t('editCartItem.save')}
        </Button>
        <Button color="secondary" variant="contained" fullWidth onClick={() => close()}>
          {t('editCartItem.close')}
        </Button>

        <Track eventName={events.modals.editCartItem.shown} />
      </Paper>
    </Modal>
  );
}
