import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import EmptyPage from '../components/EmptyPage';
import InvoiceCard from '../components/InvoiceCard';
import PageHeader from '../components/PageHeader';
import Pagination from '../components/Pagination';
import RangeDates from '../components/RangeDates';
import InvoiceCardSkeleton from '../components/skeletons/InvoiceCardSkeleton';
import PayIcon from '../icons/PayIcon';
import { fetchUserInvoices, resetInvoices } from '../redux/slices/userSlice';

function Invoices() {
  const { t } = useTranslation(['user']);
  const dispatch = useDispatch();

  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: {
      invoices: { data: invoices, page, totalPages },
    },
    isLoading,
  } = useSelector(state => state.user);

  const onPageChange = newPage => {
    searchParams.set('page', newPage);

    setSearchParams(searchParams, { replace: true });

    dispatch(fetchUserInvoices({ page: newPage, dateFrom, dateTo }));
  };

  useEffect(() => {
    dispatch(fetchUserInvoices({ dateFrom, dateTo, page: Number(searchParams.get('page')) || page }));

    return () => dispatch(resetInvoices());
  }, [dateFrom, dateTo]);

  const invoicesEmpty = invoices?.length === 0;

  return (
    <>
      {!!invoicesEmpty && (
        <EmptyPage
          title={t('invoices.placeholder.title')}
          text={t('invoices.placeholder.text')}
          icon={PayIcon}
          buttonText={t('invoices.placeholder.visitCatalog')}
        />
      )}
      {!invoicesEmpty && (
        <Container sx={{ maxWidth: '624px !important', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <PageHeader title={t('invoices.title')} />

          <Paper sx={{ p: '16px', borderRadius: '8px' }}>
            <RangeDates from={dateFrom} setFrom={setDateFrom} to={dateTo} setTo={setDateTo} />
          </Paper>

          {invoices.map((props, i) =>
            !isLoading && props ? <InvoiceCard key={props?.id} {...props} /> : <InvoiceCardSkeleton key={i} />,
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '32px' }}>
            <Pagination current={page} to={totalPages} handlePageChange={onPageChange} />
          </Box>
        </Container>
      )}
    </>
  );
}

export default Invoices;
