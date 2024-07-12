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

const ListItem = styled(props => <MuiListItem {...props} />)(({ theme }) => ({
  padding: '0 0 16px 0',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ListItemTextLeft = styled(props => <Typography {...props} />)(({ theme }) => ({
  flexGrow: 0,
  fontSize: '14px',
  color: theme.palette.text.secondary,
}));

const ListItemTextRight = styled(props => <Typography {...props} />)(({ theme }) => ({
  color: theme.palette.text.primary,
  whiteSpace: 'break-spaces',
  fontSize: '14px',
  fontWeight: 'bold',
}));

export default function OrderCard(props) {
  const { id, number, sum, status, count, length, date, updated, weight } = props;

  const dateOfOrder = new Date(date).toLocaleDateString();
  const dateOfUpdate = new Date(updated).toLocaleDateString();

  const { t } = useTranslation(['user']);

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <List>
          <ListItem>
            <ListItemTextLeft sx={{ color: 'colors.almostBlack', fontSize: '18px' }}>№{number}</ListItemTextLeft>
            <ListItemTextRight sx={{ fontSize: '18px' }}>
              {sum}
              &nbsp;
              {t('common:units.currency')}
            </ListItemTextRight>
          </ListItem>

          <ListItem>
            <ListItemTextLeft>{t('user:orders.orderCard.status')}</ListItemTextLeft>
            <ListItemTextRight>{status}</ListItemTextRight>
          </ListItem>

          <Divider sx={{ mb: '16px' }} />

          <ListItem>
            <ListItemTextLeft>{t('user:orders.orderCard.composition')}</ListItemTextLeft>
            <ListItemTextRight>
              {count}&nbsp;{t('common:units.pcs')}&nbsp;{length}&nbsp;{t('common:units.metersShort')}
            </ListItemTextRight>
          </ListItem>

          {!!weight && (
            <ListItem>
              <ListItemTextLeft>{t('user:orders.orderCard.weight')}</ListItemTextLeft>
              <ListItemTextRight>
                {weight.toFixed(2)}&nbsp;{t('common:units.kilosShort')}
              </ListItemTextRight>
            </ListItem>
          )}

          <ListItem>
            <ListItemTextLeft>{t('user:orders.orderCard.date')}</ListItemTextLeft>
            <ListItemTextRight>{dateOfOrder}</ListItemTextRight>
          </ListItem>

          <ListItem>
            <ListItemTextLeft>{t('user:orders.orderCard.updateDate')}</ListItemTextLeft>
            <ListItemTextRight>{dateOfUpdate}</ListItemTextRight>
          </ListItem>
        </List>

        <Button color="white" variant="outlined" fullWidth component={Link} to={`/orders/${id}`}>
          {t('orders.orderCard.view')}
        </Button>
      </CardContent>
    </Card>
  );
}
