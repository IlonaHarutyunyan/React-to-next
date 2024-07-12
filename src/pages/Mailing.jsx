import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import AddToCartModal from '../components/AddToCartModal';
import Banner from '../components/Banner';
import CO2Modal from '../components/CO2Modal';
import FabricCard from '../components/FabricCard';
import FabricChangedModal from '../components/FabricChangedModal';
import { FabricSearch, filters } from '../components/FabricSearch';
import NavBanner from '../components/NavBanner';
import PageHeader from '../components/PageHeader';
import Pagination from '../components/Pagination';
import Placeholder from '../components/Placeholder';
import FabricCardSkeleton from '../components/skeletons/FabricCardSkeleton';
import { events, track } from '../metrics';
import {
  addFabricToCart,
  addFabricToWishlist,
  fetchFabricsOfMailing,
  fetchMailing,
  removeFabricFromWishlist,
  resetState,
  setIsAddToCartModalOpen,
  setIsFabricChangedModalOpen,
} from '../redux/slices/mailingPageSlice';

function Mailing() {
  const dispatch = useDispatch();

  const { t } = useTranslation([]);

  const navigate = useNavigate();

  const [isCO2ModalOpen, setIsCO2ModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(localStorage.getItem('bfItemsPerPage') || 12);

  const cartAction = (id, length) => {
    dispatch(addFabricToCart({ id, length }));
  };

  const wishlistAction = (id, like) => {
    if (like) {
      dispatch(addFabricToWishlist({ id }));
    } else {
      dispatch(removeFabricFromWishlist({ id }));
    }
  };

  const { id } = useParams();

  const {
    data: {
      id: mailingIdFromState,
      pagesTotal,
      fabrics,
      page,
      optionFilters,
      sorts,
      sortId,
      fabricOrderBy,
      fabricsTotal,
      title,
      description,
    },
    isAddToCartModalOpen,
    isAddToCartLoading,
    addedFabricId,
    isFabricChangedModalOpen,
    fabricChangedInfo,
    isLoading,
    error,
  } = useSelector(state => state.mailingPage);

  const [searchParams, setSearchParams] = useSearchParams();

  let computedSort = 0;

  const sortFromSearchParams = searchParams.get('sort');

  if (sortFromSearchParams) {
    computedSort = Number(sortFromSearchParams);
  } else if (sortId === null) {
    if (fabricOrderBy !== null) {
      computedSort = fabricOrderBy;
    }
  } else {
    computedSort = sortId;
  }

  const {
    data: { isLoggedIn, reservationTimeoutInMinutes },
  } = useSelector(state => state.user);

  const [needFiltersReset, setNeedFiltersReset] = useState(false);

  const filterNames = Object.keys(filters);

  const filterValuesFromSearchParams = filterNames.reduce((acc, filterName) => {
    const filterValue = searchParams.getAll(filterName)[0];

    if (!filterValue) {
      return acc;
    }

    return {
      ...acc,
      [filterName]: filterValue.split(','),
    };
  }, filters);

  const [currentFilters, setCurrentFilters] = useState(filterValuesFromSearchParams);

  const onSortChange = newSortId => {
    searchParams.set('sort', newSortId);
    searchParams.set('page', 1);

    setSearchParams(searchParams, { replace: true });

    dispatch(fetchFabricsOfMailing({ id, page: 1, filters: currentFilters, sort: newSortId, itemsPerPage }));
  };

  const onItemsPerPageChange = count => {
    setItemsPerPage(count);
    localStorage.setItem('bfItemsPerPage', count);

    searchParams.set('page', 1);
    setSearchParams(searchParams, { replace: true });

    dispatch(fetchFabricsOfMailing({ id, page: 1, filters: currentFilters, sort: sortId, itemsPerPage: count }));
  };

  const onPageChange = newPage => {
    searchParams.set('page', newPage);

    setSearchParams(searchParams, { replace: true });

    dispatch(fetchFabricsOfMailing({ id, page: newPage, filters: currentFilters, sort: computedSort, itemsPerPage }));
  };

  const onFiltersChange = values => {
    searchParams.set('page', 1);

    _.forEach(values, (value, key) => {
      if (Number.isFinite(value) || value?.length) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });

    setSearchParams(searchParams, { replace: true });

    dispatch(fetchFabricsOfMailing({ id, page: 1, filters: values, sort: computedSort, itemsPerPage }));

    setCurrentFilters(values);
  };

  useEffect(() => {
    if (!mailingIdFromState) {
      return;
    }

    dispatch(
      fetchFabricsOfMailing({
        id,
        page: Number(searchParams.get('page')) || page,
        filters: filterValuesFromSearchParams,
        sort: computedSort,
        itemsPerPage,
      }),
    );
  }, [mailingIdFromState]);

  useEffect(() => {
    dispatch(fetchMailing({ id }));

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!fabrics[0]) {
      return;
    }

    track(events.mailingPage.shown, { id, page, currentFilters, sortId, itemsPerPage });
  }, [page, currentFilters, sortId, fabricsTotal]);

  useEffect(() => {
    if (error === 400) {
      navigate('/404');
    }

    if (error === 403) {
      if (isLoggedIn) {
        navigate('/404');
      } else {
        navigate('/auth/login', {
          state: { from: `${window.location.pathname}${window.location.search}` },
        });
      }
    }
  }, [error]);

  return (
    <Box>
      <PageHeader title={title} text={description} isLoading={!title && !description} sx={{ textAlign: 'center' }} />

      <Banner sx={{ my: '16px' }} location="mailing" />

      <FabricSearch
        isLoading={isLoading}
        fabricsTotal={fabricsTotal}
        optionFilters={optionFilters}
        initialFilterValues={filterValuesFromSearchParams}
        onFiltersChange={onFiltersChange}
        onSortChange={onSortChange}
        currentSortId={sortId}
        currentFilters={currentFilters}
        setNeedFiltersReset={setNeedFiltersReset}
        needFiltersReset={needFiltersReset}
        sorts={sorts}
        sx={{ mb: '24px' }}
      />

      {!!fabrics?.length && (
        <>
          <Grid container spacing={2}>
            {fabrics.map((props, i) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={props?.id || i}
                sx={{
                  display: 'grid',
                  justifyItems: 'center',
                  mb: '24px',
                  alignItems: 'start',
                }}
              >
                {!isLoading && props ? (
                  <FabricCard
                    {...props}
                    isLoading={isAddToCartLoading && addedFabricId === props.id}
                    isUnAuth={!isLoggedIn}
                    reservationTimeoutInMinutes={reservationTimeoutInMinutes}
                    cartAction={cartAction}
                    wishlistAction={wishlistAction}
                    openCO2Modal={() => {
                      setIsCO2ModalOpen(true);
                    }}
                  />
                ) : (
                  <FabricCardSkeleton />
                )}
              </Grid>
            ))}
          </Grid>
          <NavBanner
            sx={{ mt: '8px' }}
            header={t('banners:navBanner.header')}
            text={t('banners:navBanner.text')}
            buttonText={t('banners:navBanner.buttonText')}
            to="/fabrics"
            type="mailing"
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '32px' }}>
            <Pagination
              current={page}
              to={pagesTotal}
              handlePageChange={onPageChange}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
            />
          </Box>
        </>
      )}

      {!fabrics?.length && <Placeholder onClearFilters={() => setNeedFiltersReset(true)} />}

      <AddToCartModal isOpen={isAddToCartModalOpen} close={() => dispatch(setIsAddToCartModalOpen(false))} />

      {isFabricChangedModalOpen && (
        <FabricChangedModal
          isOpen={true}
          fabricChangedInfo={fabricChangedInfo}
          close={() => {
            dispatch(setIsFabricChangedModalOpen(false));
          }}
          onAddClick={length => {
            cartAction(addedFabricId, length);
          }}
        />
      )}

      <CO2Modal
        reservationTimeoutInMinutes={reservationTimeoutInMinutes}
        isOpen={isCO2ModalOpen}
        close={() => setIsCO2ModalOpen(false)}
      />
    </Box>
  );
}

export default Mailing;
