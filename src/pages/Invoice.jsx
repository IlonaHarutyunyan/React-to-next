import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CartCard from '../components/CartCard';
import Label from '../components/Label';
import PageHeader from '../components/PageHeader';
import CartCardSkeleton from '../components/skeletons/CartCardSkeleton';
import { fetchUserInvoice, resetInvoice } from '../redux/slices/userSlice';

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

function Invoice() {
  const { t } = useTranslation([]);
  const dispatch = useDispatch();

  const { id } = useParams();

  const {
    data: { invoice },
    isLoading,
  } = useSelector(state => state.user);

  const { status, balance, date, discount, length, number, packings, sum, fabrics, isPayed } = invoice || {};

  const dateOfOrder = new Date(date).toLocaleDateString();

  useEffect(() => {
    dispatch(fetchUserInvoice(id));

    return () => dispatch(resetInvoice());
  }, []);

  return (
    <Container sx={{ maxWidth: '624px !important', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <PageHeader title={t('user:invoice.title')} />

      <Card sx={{ width: '100%' }}>
        <CardContent>
          <List>
            {!!isLoading && (
              <ListItem>
                <ListItemTextLeft>
                  <Skeleton animation="wave" sx={{ width: '200px' }} />
                </ListItemTextLeft>
                <ListItemTextRight>
                  <Skeleton animation="wave" sx={{ width: '100px' }} />
                </ListItemTextRight>
              </ListItem>
            )}

            {!isLoading && !!number && !!dateOfOrder && (
              <ListItem>
                <ListItemTextLeft sx={{ color: 'colors.almostBlack', fontSize: '18px', fontWeight: 'bold' }}>
                  {t('user:invoice.summary.yourOrder')}&nbsp;№{number}&nbsp;
                  {isPayed ? (
                    <Label variant="resolved" text={t('user:invoices.invoiceCard.payed')} />
                  ) : (
                    <Label variant="alert" text={t('user:invoices.invoiceCard.notPayed')} />
                  )}
                </ListItemTextLeft>
                <ListItemTextRight sx={{ color: 'colors.darkGrey', fontWeight: 'normal' }}>
                  {dateOfOrder}
                </ListItemTextRight>
              </ListItem>
            )}

            {!!isLoading && (
              <>
                <Divider sx={{ mb: '16px' }} />
                <ListItem>
                  <ListItemTextLeft>
                    <Skeleton animation="wave" sx={{ width: '200px' }} />
                  </ListItemTextLeft>
                </ListItem>
                <ListItem>
                  <ListItemTextLeft>
                    <Skeleton animation="wave" sx={{ width: '120px' }} />
                  </ListItemTextLeft>
                  <ListItemTextRight>
                    <Skeleton animation="wave" sx={{ width: '50px' }} />
                  </ListItemTextRight>
                </ListItem>
                <ListItem>
                  <ListItemTextLeft>
                    <Skeleton animation="wave" sx={{ width: '120px' }} />
                  </ListItemTextLeft>
                  <ListItemTextRight>
                    <Skeleton animation="wave" sx={{ width: '50px' }} />
                  </ListItemTextRight>
                </ListItem>
              </>
            )}

            {!isLoading && !!packings?.length && (
              <>
                <Divider sx={{ mb: '16px' }} />
                <ListItem>
                  <ListItemTextLeft sx={{ fontWeight: 'bold', color: 'colors.almostBlack' }}>
                    {t('user:invoice.summary.packings')}
                  </ListItemTextLeft>
                </ListItem>
                {packings.map((props, i) => (
                  <ListItem key={`packing-${i}`}>
                    <ListItemTextLeft>{props.number}</ListItemTextLeft>
                    <ListItemTextRight>
                      {props.weight}&nbsp;{t('common:units.kilosShort')}
                    </ListItemTextRight>
                  </ListItem>
                ))}
              </>
            )}

            <Divider sx={{ mb: '16px' }} />

            {!!isLoading && (
              <>
                <ListItem>
                  <ListItemTextLeft>
                    <Skeleton animation="wave" sx={{ width: '120px' }} />
                  </ListItemTextLeft>
                  <ListItemTextRight>
                    <Skeleton animation="wave" sx={{ width: '50px' }} />
                  </ListItemTextRight>
                </ListItem>
                <ListItem>
                  <ListItemTextLeft>
                    <Skeleton animation="wave" sx={{ width: '120px' }} />
                  </ListItemTextLeft>
                  <ListItemTextRight>
                    <Skeleton animation="wave" sx={{ width: '50px' }} />
                  </ListItemTextRight>
                </ListItem>
                <ListItem>
                  <ListItemTextLeft>
                    <Skeleton animation="wave" sx={{ width: '120px' }} />
                  </ListItemTextLeft>
                  <ListItemTextRight>
                    <Skeleton animation="wave" sx={{ width: '50px' }} />
                  </ListItemTextRight>
                </ListItem>
              </>
            )}

            {!isLoading && (
              <>
                {!!status && (
                  <ListItem>
                    <ListItemTextLeft>{t('user:invoice.summary.status')}</ListItemTextLeft>
                    <ListItemTextRight>{status}</ListItemTextRight>
                  </ListItem>
                )}

                {!!length && (
                  <ListItem>
                    <ListItemTextLeft>{t('user:invoice.summary.length')}</ListItemTextLeft>
                    <ListItemTextRight>
                      {length}&nbsp;{t('common:units.metersShort')}
                    </ListItemTextRight>
                  </ListItem>
                )}

                {!!balance && (
                  <ListItem>
                    <ListItemTextLeft>{t('user:invoice.summary.balance')}</ListItemTextLeft>
                    <ListItemTextRight>
                      {balance}&nbsp;{t('common:units.currency')}
                    </ListItemTextRight>
                  </ListItem>
                )}

                {!!discount && (
                  <ListItem>
                    <ListItemTextLeft>{t('user:invoice.summary.discount')}</ListItemTextLeft>
                    <ListItemTextRight>{discount}&nbsp;%</ListItemTextRight>
                  </ListItem>
                )}
              </>
            )}

            {!!isLoading && (
              <>
                <Divider sx={{ mb: '16px' }} />
                <ListItem sx={{ pb: 0 }}>
                  <ListItemTextLeft>
                    <Skeleton animation="wave" sx={{ width: '50px' }} />
                  </ListItemTextLeft>
                  <ListItemTextRight>
                    <Skeleton animation="wave" sx={{ width: '100px' }} />
                  </ListItemTextRight>
                </ListItem>
              </>
            )}

            {!isLoading && !!sum && (
              <>
                <Divider sx={{ mb: '16px' }} />
                <ListItem sx={{ pb: 0 }}>
                  <ListItemTextLeft sx={{ color: 'colors.almostBlack', fontSize: '18px', fontWeight: 'bold' }}>
                    {t('user:invoice.summary.total')}
                  </ListItemTextLeft>
                  <ListItemTextRight sx={{ color: 'colors.almostBlack', fontSize: '18px', fontWeight: 'bold' }}>
                    {sum}&nbsp;
                    <Typography
                      sx={{ color: 'colors.darkGrey', fontSize: '14px', fontWeight: 'bold' }}
                      component="span"
                    >
                      {t('common:units.currency')}
                    </Typography>
                  </ListItemTextRight>
                </ListItem>
              </>
            )}
          </List>
        </CardContent>
      </Card>

      {!!fabrics &&
        fabrics.map((props, i) =>
          props ? <CartCard key={props?.id} {...props} /> : <CartCardSkeleton key={i} isFull={false} />,
        )}
    </Container>
  );
}

export default Invoice;
