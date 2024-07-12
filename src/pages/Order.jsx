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
import PageHeader from '../components/PageHeader';
import CartCardSkeleton from '../components/skeletons/CartCardSkeleton';
import { fetchUserOrder, resetOrder } from '../redux/slices/userSlice';

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

function Order() {
  const { t } = useTranslation([]);
  const dispatch = useDispatch();

  const { id } = useParams();

  const {
    data: { order },
    isLoading,
  } = useSelector(state => state.user);

  const { sum, number, weight, status, count, length, date, fabrics } = order || {};

  const dateOfOrder = new Date(date).toLocaleDateString();

  useEffect(() => {
    dispatch(fetchUserOrder(id));

    return () => dispatch(resetOrder());
  }, []);

  return (
    <Container sx={{ maxWidth: '624px !important', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <PageHeader title={t('user:order.title')} />

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
                  {t('user:order.summary.yourOrder')}&nbsp;№{number}
                </ListItemTextLeft>
                <ListItemTextRight sx={{ color: 'colors.darkGrey', fontWeight: 'normal' }}>
                  {dateOfOrder}
                </ListItemTextRight>
              </ListItem>
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
                    <ListItemTextLeft>{t('user:order.summary.status')}</ListItemTextLeft>
                    <ListItemTextRight>{status}</ListItemTextRight>
                  </ListItem>
                )}

                {!!count && (
                  <ListItem>
                    <ListItemTextLeft>{t('user:order.summary.count')}</ListItemTextLeft>
                    <ListItemTextRight>{count}</ListItemTextRight>
                  </ListItem>
                )}

                {!!length && (
                  <ListItem>
                    <ListItemTextLeft>{t('user:order.summary.length')}</ListItemTextLeft>
                    <ListItemTextRight>
                      {length}&nbsp;{t('common:units.metersShort')}
                    </ListItemTextRight>
                  </ListItem>
                )}

                {!!weight && (
                  <ListItem>
                    <ListItemTextLeft>{t('user:order.summary.weight')}</ListItemTextLeft>
                    <ListItemTextRight>
                      {weight.toFixed(2)}&nbsp;{t('common:units.kilosShort')}
                    </ListItemTextRight>
                  </ListItem>
                )}
              </>
            )}

            {!!isLoading && (
              <>
                <Divider sx={{ mb: '16px' }} />
                <ListItem sx={{ pb: 0 }}>
                  <ListItemTextLeft sx={{ color: 'colors.almostBlack', fontSize: '18px', fontWeight: 'bold' }}>
                    <Skeleton animation="wave" sx={{ width: '50px' }} />
                  </ListItemTextLeft>
                  <ListItemTextRight sx={{ color: 'colors.darkGrey', fontWeight: 'normal' }}>
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
                    {t('user:order.summary.total')}
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

export default Order;
