import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import React from 'react';

import QuestionIcon from '../icons/QuestionIcon';

export default function Tip(props) {
  const { text, sx } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box component="span" sx={{ display: 'flex', ...sx }}>
      <QuestionIcon onClick={handleClick} sx={{ color: 'colors.darkGrey', cursor: 'pointer' }} />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            mt: '-8px',
            maxWidth: '336px',
            p: '6px 12px',
            borderRadius: '8px',
            backgroundColor: 'colors.lightGreen',
            overflow: 'visible',
          },
        }}
      >
        <Box
          component="span"
          sx={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            overflow: 'visible',
          }}
        >
          <Typography sx={{ color: 'colors.almostBlack', fontSize: '12px' }}>{text}</Typography>
        </Box>
      </Popover>
    </Box>
  );
}
