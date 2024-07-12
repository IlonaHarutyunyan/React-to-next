import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import EmptyPage from '../components/EmptyPage';
import OrderCard from '../components/OrderCard';
import PageHeader from '../components/PageHeader';
import Pagination from '../components/Pagination';
import RangeDates from '../components/RangeDates';
import OrderCardSkeleton from '../components/skeletons/OrderCardSkeleton';
import ListIcon from '../icons/ListIcon';
import { fetchUserOrders, resetOrders } from '../redux/slices/userSlice';

function Orders() {
  const { t } = useTranslation(['user']);
  const dispatch = useDispatch();

  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: {
      orders: { data: orders, page, totalPages },
    },
    isLoading,
  } = useSelector(state => state.user);

  const onPageChange = newPage => {
    searchParams.set('page', newPage);

    setSearchParams(searchParams, { replace: true });

    dispatch(fetchUserOrders({ page: newPage, dateFrom, dateTo }));
  };

  useEffect(() => {
    dispatch(fetchUserOrders({ dateFrom, dateTo, page: Number(searchParams.get('page')) || page }));

    return () => dispatch(resetOrders());
  }, [dateFrom, dateTo]);

  const ordersEmpty = orders?.length === 0;

  return (
    <>
      {!!ordersEmpty && (
        <EmptyPage
          title={t('orders.placeholder.title')}
          text={t('orders.placeholder.text')}
          icon={ListIcon}
          buttonText={t('orders.placeholder.visitCatalog')}
        />
      )}

      {!ordersEmpty && (
        <Container sx={{ maxWidth: '624px !important', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <PageHeader title={t('orders.title')} />

          <Paper sx={{ p: '16px', borderRadius: '8px' }}>
            <RangeDates from={dateFrom} setFrom={setDateFrom} to={dateTo} setTo={setDateTo} />
          </Paper>

          {orders.map((props, i) =>
            !isLoading && props ? <OrderCard key={props?.id} {...props} /> : <OrderCardSkeleton key={i} />,
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '32px' }}>
            <Pagination current={page} to={totalPages} handlePageChange={onPageChange} />
          </Box>
        </Container>
      )}
    </>
  );
}

export default Orders;
