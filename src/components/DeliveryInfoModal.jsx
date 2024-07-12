import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

import CloseIcon from '../icons/CloseIcon';
import PayIcon from '../icons/PayIcon';
import { events, Track } from '../metrics';

const deliveryData = [
  {
    countryName: 'france',
    rollPrice: '25€ / 33€',
    boxPrice: '19€ / 25€',
  },
  {
    countryName: 'italy',
    rollPrice: '12€ / 17€',
    boxPrice: '12€ / 17€',
  },
  {
    countryName: 'spain',
    rollPrice: '22€ / 32€',
    boxPrice: '19€ / 21€',
  },
  {
    countryName: 'portugal',
    rollPrice: '22€ / 54€',
    boxPrice: '22€ / 43€',
  },
  {
    countryName: 'germany',
    rollPrice: '17€ / 43€',
    boxPrice: '20€ / 25€',
  },
  {
    countryName: 'poland',
    rollPrice: '28€ / 60€',
    boxPrice: '27€ / 35€',
  },
  {
    countryName: 'latvia',
    rollPrice: '37€ / 78€',
    boxPrice: '27€ / 35€',
  },
  {
    countryName: 'lithuania',
    rollPrice: '37€ / 78€',
    boxPrice: '37€ / 56€',
  },
  {
    countryName: 'estonia',
    rollPrice: '37€ / 78€',
    boxPrice: '37€ / 56€',
  },
  {
    countryName: 'luxembourg',
    rollPrice: '22€ / 49€',
    boxPrice: '17€ / 27€',
  },
  {
    countryName: 'belgium',
    rollPrice: '22€ / 49€',
    boxPrice: '16€ / 25€',
  },
  {
    countryName: 'sweden',
    rollPrice: '38€ / 81€',
    boxPrice: '43€ / 55€',
  },
  {
    countryName: 'austria',
    rollPrice: '27€ / 58€',
    boxPrice: '22€ / 30€',
  },
  {
    countryName: 'bulgaria',
    rollPrice: '43€ / 82€',
    boxPrice: '27€ / 35€',
  },
  {
    countryName: 'hungary',
    rollPrice: '34€ / 66€',
    boxPrice: '29€ / 56€',
  },
  {
    countryName: 'greece',
    rollPrice: '125€ / 129€',
    boxPrice: '24€ / 43€',
  },
  {
    countryName: 'denmark',
    rollPrice: '22€ / 54€',
    boxPrice: '22€ / 30€',
  },
  {
    countryName: 'ireland',
    rollPrice: '120€ / 122€',
    boxPrice: '22€ / 30€',
  },
  {
    countryName: 'cyprus',
    rollPrice: '57€ / 167€',
    boxPrice: '56€ / 100€',
  },
  {
    countryName: 'malta',
    rollPrice: '57€ / 167€',
    boxPrice: '56€ / 98€',
  },
  {
    countryName: 'netherlands',
    rollPrice: '16€ / 43€',
    boxPrice: '16€ / 23€',
  },
  {
    countryName: 'romania',
    rollPrice: '37€ / 77€',
    boxPrice: '37€ / 59€',
  },
  {
    countryName: 'slovakia',
    rollPrice: '28€ / 60€',
    boxPrice: '27€ / 35€',
  },
  {
    countryName: 'slovenia',
    rollPrice: '29€ / 61€',
    boxPrice: '29€ / 56€',
  },
  {
    countryName: 'finland',
    rollPrice: '33€ / 76€',
    boxPrice: '32€ / 55€',
  },
  {
    countryName: 'croatia',
    rollPrice: '28€ / 61€',
    boxPrice: '27€ / 35€',
  },
  {
    countryName: 'czechRepublic',
    rollPrice: '28€ / 60€',
    boxPrice: '27€ / 34€',
  },
  {
    countryName: 'unitedKingdom',
    rollPrice: '47€ / 87€',
    boxPrice: '29€ / 37€',
  },
  {
    countryName: 'switzerland',
    rollPrice: '67€ / 108€',
    boxPrice: '39€ / 56€',
  },
  {
    countryName: 'norway',
    rollPrice: '68€ / 110€',
    boxPrice: '50€ / 58€',
  },
  {
    countryName: 'iceland',
    rollPrice: '99€ / 267€',
    boxPrice: '74€ / 121€',
  },
  {
    countryName: 'albania',
    rollPrice: '275€ / 301€',
    boxPrice: '75€ / 121€',
  },
  {
    countryName: 'serbia',
    rollPrice: '98€ / 182€',
    boxPrice: '74€ / 106€',
  },
  {
    countryName: 'montenegro',
    rollPrice: '275€ / 301€',
    boxPrice: '75€ / 121€',
  },
  {
    countryName: 'bahrain',
    rollPrice: '95€ / 276€',
    boxPrice: '90€ / 149€',
  },
  {
    countryName: 'israel',
    rollPrice: '96€ / 276€',
    boxPrice: '90€ / 149€',
  },
  {
    countryName: 'oman',
    rollPrice: '96€ / 253€',
    boxPrice: '90€ / 149€',
  },
  {
    countryName: 'qatar',
    rollPrice: '96€ / 256€',
    boxPrice: '90€ / 192€',
  },
  {
    countryName: 'india',
    rollPrice: '89€ / 235€',
    boxPrice: '83€ / 150€',
  },
  {
    countryName: 'indonesia',
    rollPrice: '256€ / 287€',
    boxPrice: '83€ / 150€',
  },
  {
    countryName: 'saudiArabia',
    rollPrice: '264€ / 305€',
    boxPrice: '90€ / 149€',
  },
  {
    countryName: 'unitedArabEmirates',
    rollPrice: '96€ / 217€',
    boxPrice: '89€ / 149€',
  },
  {
    countryName: 'cambodia',
    rollPrice: '254€ / 277€',
    boxPrice: '82€ / 150€',
  },
  {
    countryName: 'china',
    rollPrice: '89€ / 234€',
    boxPrice: '83€ / 150€',
  },
  {
    countryName: 'southKorea',
    rollPrice: '89€ / 217€',
    boxPrice: '83€ / 150€',
  },
  {
    countryName: 'japan',
    rollPrice: '89€ / 235€',
    boxPrice: '81€ / 150€',
  },
  {
    countryName: 'lebanon',
    rollPrice: '263€ / 304€',
    boxPrice: '90€ / 149€',
  },
  {
    countryName: 'mongolia',
    rollPrice: '337€ / 382€',
    boxPrice: '83€ / 150€',
  },
  {
    countryName: 'singapore',
    rollPrice: '87€ / 217€',
    boxPrice: '83€ / 150€',
  },
  {
    countryName: 'thailand',
    rollPrice: '89€ / 234€',
    boxPrice: '83€ / 150€',
  },
  {
    countryName: 'turkey',
    rollPrice: '89€ / 235€',
    boxPrice: '75€ / 121€',
  },
  {
    countryName: 'australia',
    rollPrice: '97€ / 252€',
    boxPrice: '83€ / 150€',
  },
  {
    countryName: 'newZealand',
    rollPrice: '98€ / 287€',
    boxPrice: '83€ / 192€',
  },
  {
    countryName: 'algeria',
    rollPrice: '96€ / 213€',
    boxPrice: '90€ / 149€',
  },
  {
    countryName: 'angola',
    rollPrice: '264€ / 305€',
    boxPrice: '90€ / 149€',
  },
  {
    countryName: 'ghana',
    rollPrice: '98€ / 294€',
    boxPrice: '90€ / 149€',
  },
  {
    countryName: 'egypt',
    rollPrice: '96€ / 217€',
    boxPrice: '90€ / 149€',
  },
  {
    countryName: 'ivoryCoast',
    rollPrice: '324€ / 307€',
    boxPrice: '90€ / 149€',
  },
  {
    countryName: 'morocco',
    rollPrice: '166€ / 184€',
    boxPrice: '90€ / 149€',
  },
  {
    countryName: 'senegal',
    rollPrice: '325€ / 369€',
    boxPrice: '90€ / 149€',
  },
  {
    countryName: 'southAfrica',
    rollPrice: '89€ / 235€',
    boxPrice: '89€ / 149€',
  },
  {
    countryName: 'uSA',
    rollPrice: '76€ / 148€',
    boxPrice: '61€ / 101€',
  },
  {
    countryName: 'canada',
    rollPrice: '76€ / 148€',
    boxPrice: '69€ / 112€',
  },
  {
    countryName: 'guatemala',
    rollPrice: '98€ / 294€',
    boxPrice: '77€ / 129€',
  },
  {
    countryName: 'mexico',
    rollPrice: '336€ / 148€',
    boxPrice: '70€ / 129€',
  },
  {
    countryName: 'brazil',
    rollPrice: '304€ / 276€',
    boxPrice: '77€ / 129€',
  },
  {
    countryName: 'argentina',
    rollPrice: '96€ / 276€',
    boxPrice: '77€ / 128€',
  },
  {
    countryName: 'chile',
    rollPrice: '98€ / 269€',
    boxPrice: '77€ / 129€',
  },
  {
    countryName: 'uruguay',
    rollPrice: '318€ / 354€',
    boxPrice: '77€ / 129€',
  },
  {
    countryName: 'curacao',
    rollPrice: '278€ / 324€',
    boxPrice: '133€ / 248€',
  },
  {
    countryName: 'russia',
    rollPrice: '3,2€ / 32€',
    boxPrice: '3,2€ / 32€',
  },
  {
    countryName: 'kazakhstan',
    rollPrice: '3,2€ / 32€',
    boxPrice: '3,2€ / 32€',
  },
  {
    countryName: 'kyrgyzstan',
    rollPrice: '3,2€ / 32€',
    boxPrice: '3,2€ / 32€',
  },
  {
    countryName: 'armenia',
    rollPrice: '3,2€ / 32€',
    boxPrice: '3,2€ / 32€',
  },
  {
    countryName: 'georgia',
    rollPrice: '3,2€ / 32€',
    boxPrice: '3,2€ / 32€',
  },
  {
    countryName: 'uzbekistan',
    rollPrice: '3,2€ / 32€',
    boxPrice: '3,2€ / 32€',
  },
  {
    countryName: 'belarus',
    rollPrice: '3,2€ / 32€',
    boxPrice: '3,2€ / 32€',
  },
  {
    countryName: 'moldova',
    rollPrice: '3€ / 30€',
    boxPrice: '3€ / 30€',
  },
  {
    countryName: 'ukraine',
    rollPrice: '5€ / 50€',
    boxPrice: '5€ / 50€',
  },
];

const StyledTableCell = styled(props => <TableCell {...props} />)(({ theme }) => ({
  padding: '16px 0 16px 0',
  borderColor: theme.palette.divider,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderBottom: 0,
  borderTop: 0,

  '&:first-of-type': {
    borderLeft: 0,
  },

  '&:last-of-type': {
    borderRight: 0,
  },
}));

const StyledTableRow = styled(props => <TableRow {...props} />)(({ theme }) => ({
  borderColor: theme.palette.divider,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderLeft: 0,
  borderRight: 0,

  '&:first-of-type': {
    borderTop: 0,
  },

  '&:last-of-type:not(:first-of-type)': {
    borderBottom: 0,
  },
}));

export default function DeliveryInfoModal(props) {
  const { isOpen, close } = props;

  const { t } = useTranslation(['modals']);

  const deliveryDataSorted = deliveryData
    .map(({ countryName, rollPrice, boxPrice }) => ({
      countryName: t(`delivery.countries.${countryName}`),
      rollPrice,
      boxPrice,
    }))
    .sort((a, b) => (a.countryName < b.countryName ? -1 : 1));

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
          maxWidth: '440px',
          borderRadius: '8px',
          width: '90%',
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
        <PayIcon sx={{ color: 'colors.mediumGrey', fontSize: '48px', mb: '32px' }} />
        <Typography variant="h3" sx={{ mb: '8px' }}>
          {t('delivery.title')}
        </Typography>
        <Typography variant="body2">{t('delivery.text')}</Typography>
        <TableContainer sx={{ maxHeight: 340, my: '32px' }}>
          <Table
            stickyHeader
            sx={{
              borderCollapse: 'collapse',
            }}
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '12px',
                    }}
                  >
                    {t('delivery.country')}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '12px',
                    }}
                  >
                    {t('delivery.roll')}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '12px',
                    }}
                  >
                    {t('delivery.rollWeight')}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '12px',
                    }}
                  >
                    {t('delivery.box')}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '12px',
                    }}
                  >
                    {t('delivery.boxWeight')}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {deliveryDataSorted.map(({ countryName, rollPrice, boxPrice }) => (
                <StyledTableRow key={countryName}>
                  <StyledTableCell>
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '12px',
                      }}
                      variant="body1"
                    >
                      {countryName}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '12px',
                      }}
                      variant="body1"
                    >
                      {rollPrice}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '12px',
                      }}
                      variant="body1"
                    >
                      {boxPrice}
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button color="primary" variant="contained" fullWidth onClick={() => close()}>
          {t('delivery.close')}
        </Button>

        <Track eventName={events.modals.delivery.shown} />
      </Paper>
    </Modal>
  );
}
