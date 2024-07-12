import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Label from './Label';
import Link from './Link';
import { events, track } from '../metrics';

export default function FabricCard(props) {
  const { percent: percentUnformatted, materialFull, material, tpe, id } = props;

  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    track(events.fabric.materialLabel.tooltipShown, { materialId: id, material });
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const percent = percentUnformatted ? `\xa0${percentUnformatted}%` : '';

  return (
    <>
      <span onClick={handleClick}>
        <Label sx={{ cursor: 'pointer', mr: '4px', mb: '4px' }} text={`${material}${percent}`} variant="material" />
      </span>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            mt: '8px',
            p: '6px 12px',
            borderRadius: '8px',
            backgroundColor: 'colors.almostBlack',
            overflow: 'visible',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            overflow: 'visible',

            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              width: 6,
              height: 6,
              top: -3,
              transform: 'rotate(45deg)',
              left: '16px',
              backgroundColor: 'colors.almostBlack',
            },
          }}
        >
          <Typography sx={{ color: 'colors.white', fontSize: '12px' }}>{materialFull || material}</Typography>
          <Typography sx={{ color: 'colors.darkGrey' }}>|</Typography>
          <Link
            sx={{
              color: 'colors.white',
              fontSize: '12px',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
            onClick={() => {
              track(events.fabric.materialLabel.find, {
                materialId: id,
                material,
              });

              window.location.assign(`${process.env.PUBLIC_PATH}fabrics?${tpe}=${id}`);
            }}
          >
            {t('fabric:find')}
          </Link>
        </Box>
      </Popover>
    </>
  );
}
