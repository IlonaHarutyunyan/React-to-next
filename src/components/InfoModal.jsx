import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

import CloseIcon from '../icons/CloseIcon';

export default function InfoModal(props) {
  const {
    isOpen,
    close,
    title,
    text,
    Icon,
    buttonPrimaryText,
    buttonPrimaryTo,
    buttonSecondaryText,
    buttonSecondaryTo,
    buttonPrimaryOnClick,
    buttonSecondaryOnClick,
  } = props;

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
          maxWidth: '516px',
          width: '90%',
          borderRadius: '8px',
        }}
      >
        <Icon sx={{ color: 'colors.almostBlack', fontSize: '48px', mb: '32px' }} />
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
        <Typography variant="h3" sx={{ mb: '8px' }}>
          {title}
        </Typography>

        {text && <Typography variant="body2">{text}</Typography>}

        <Box
          sx={{
            mt: '32px',
            display: 'flex',
            gap: '8px',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
          }}
        >
          {buttonSecondaryText && (
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              onClick={() => {
                if (buttonSecondaryOnClick) {
                  buttonSecondaryOnClick();
                }

                close();
              }}
              component={buttonSecondaryTo ? Link : Button}
              to={buttonSecondaryTo}
            >
              {buttonSecondaryText}
            </Button>
          )}

          {buttonPrimaryText && (
            <Button
              color="primary"
              variant="contained"
              fullWidth
              component={buttonPrimaryTo ? Link : Button}
              to={buttonPrimaryTo}
              onClick={() => {
                if (buttonPrimaryOnClick) {
                  buttonPrimaryOnClick();
                }

                close();
              }}
            >
              {buttonPrimaryText}
            </Button>
          )}
        </Box>
      </Paper>
    </Modal>
  );
}
