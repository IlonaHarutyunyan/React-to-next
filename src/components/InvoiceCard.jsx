import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Label from './Label';

const ListItem = styled(props => <MuiListItem {...props} />)(({ theme }) => ({
  padding: '0 0 16px 0',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ListItemTextLeft = styled(props => <Box {...props} />)(({ theme }) => ({
  flexGrow: 0,
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
}));

const ListItemTextRight = styled(props => <Typography {...props} />)(({ theme }) => ({
  color: theme.palette.text.primary,
  whiteSpace: 'break-spaces',
  fontSize: '14px',
  fontWeight: 'bold',
}));

export default function InvoiceCard(props) {
  const { id, number, sum, tpe: type, discount, date, isPayed } = props;

  const dateOfOrder = new Date(date).toLocaleDateString();

  const { t } = useTranslation(['user']);

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <List>
          <ListItem>
            <ListItemTextLeft sx={{ color: 'colors.almostBlack', fontSize: '18px' }}>
              №{number}&nbsp;
              {isPayed ? (
                <Label variant="resolved" text={t('user:invoices.invoiceCard.payed')} />
              ) : (
                <Label variant="alert" text={t('user:invoices.invoiceCard.notPayed')} />
              )}
            </ListItemTextLeft>
            <ListItemTextRight sx={{ fontSize: '18px' }}>
              {sum}
              &nbsp;
              {t('common:units.currency')}
            </ListItemTextRight>
          </ListItem>

          <Divider sx={{ mb: '16px' }} />

          <ListItem>
            <ListItemTextLeft>{t('user:invoices.invoiceCard.discount')}</ListItemTextLeft>
            <ListItemTextRight>{discount}%</ListItemTextRight>
          </ListItem>

          <ListItem>
            <ListItemTextLeft>{t('user:invoices.invoiceCard.date')}</ListItemTextLeft>
            <ListItemTextRight>{dateOfOrder}</ListItemTextRight>
          </ListItem>

          <ListItem>
            <ListItemTextLeft>{t('user:invoices.invoiceCard.type')}</ListItemTextLeft>
            <ListItemTextRight>{type}</ListItemTextRight>
          </ListItem>
        </List>

        <Button color="white" variant="outlined" fullWidth component={Link} to={`/invoices/${id}`}>
          {t('invoices.invoiceCard.view')}
        </Button>
      </CardContent>
    </Card>
  );
}
