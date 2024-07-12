import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import AddToCartModal from '../components/AddToCartModal';
import CO2Modal from '../components/CO2Modal';
import EmptyPage from '../components/EmptyPage';
import FabricCard from '../components/FabricCard';
import { FabricSearch, filters } from '../components/FabricSearch';
import PageHeader from '../components/PageHeader';
import Pagination from '../components/Pagination';
import Placeholder from '../components/Placeholder';
import FabricCardSkeleton from '../components/skeletons/FabricCardSkeleton';
import LikeIcon from '../icons/LikeIcon';
import {
  addFabricToCart,
  fetchWishlist,
  removeFabricFromWishlist,
  resetState,
  setIsAddToCartModalOpen,
} from '../redux/slices/wishlistPageSlice';

function Wishlist() {
  const { t } = useTranslation([]);
  const dispatch = useDispatch();

  const [isCO2ModalOpen, setIsCO2ModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(localStorage.getItem('bfItemsPerPage') || 12);

  const {
    data: { pagesTotal, fabrics, page, optionFilters, sorts, sortId, fabricsTotal },
    isLoading,
    addedFabricId,
    isAddToCartModalOpen,
  } = useSelector(state => state.wishlistPage);

  const {
    data: {
      isLoggedIn,
      reservationTimeoutInMinutes,
      stats: {
        wishlist: { count },
      },
    },
  } = useSelector(state => state.user);

  const [searchParams, setSearchParams] = useSearchParams();
  const [needFiltersReset, setNeedFiltersReset] = useState(false);

  const pageFromSearchParams = Number(searchParams.get('page'));

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

    dispatch(fetchWishlist({ page: 1, filters: currentFilters, sort: newSortId, itemsPerPage }));
  };

  const onItemsPerPageChange = newCount => {
    setItemsPerPage(newCount);
    localStorage.setItem('bfItemsPerPage', newCount);

    searchParams.set('page', 1);
    setSearchParams(searchParams, { replace: true });

    dispatch(fetchWishlist({ page: 1, filters: currentFilters, sort: sortId, itemsPerPage: newCount }));
  };

  const onPageChange = newPage => {
    searchParams.set('page', newPage);

    setSearchParams(searchParams, { replace: true });

    dispatch(fetchWishlist({ page: newPage, filters: currentFilters, sort: sortId, itemsPerPage }));
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

    dispatch(fetchWishlist({ page: 1, filters: values, sort: sortId, itemsPerPage }));

    setCurrentFilters(values);
  };

  useEffect(() => {
    dispatch(
      fetchWishlist({
        page: pageFromSearchParams || page,
        filters: filterValuesFromSearchParams,
        sort: Number(searchParams.get('sort')) || sortId,
        itemsPerPage,
      }),
    );

    return () => {
      dispatch(resetState());
    };
  }, []);

  const cartAction = (id, length) => {
    dispatch(addFabricToCart({ id, length }));
  };

  const wishlistAction = (id, like) => {
    if (!like) {
      dispatch(removeFabricFromWishlist({ id }));
    }
  };

  const isWishlistEmpty = count === 0;

  return (
    <>
      {!!isWishlistEmpty && (
        <EmptyPage
          title={t('wishlist:placeholder.title')}
          text={t('wishlist:placeholder.text')}
          icon={LikeIcon}
          buttonText={t('wishlist:placeholder.visitCatalog')}
        />
      )}
      {!isWishlistEmpty && (
        <>
          <PageHeader title={t('wishlist:title')} />

          <FabricSearch
            isLoading={isLoading}
            fabricsTotal={fabricsTotal}
            optionFilters={optionFilters}
            initialFilterValues={filterValuesFromSearchParams}
            onFiltersChange={onFiltersChange}
            onSortChange={onSortChange}
            currentSortId={Number(sortId)}
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
                        isLoading={addedFabricId === props.id}
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
        </>
      )}

      <AddToCartModal isOpen={isAddToCartModalOpen} close={() => dispatch(setIsAddToCartModalOpen(false))} />
      <CO2Modal
        reservationTimeoutInMinutes={reservationTimeoutInMinutes}
        isOpen={isCO2ModalOpen}
        close={() => setIsCO2ModalOpen(false)}
      />
    </>
  );
}

export default Wishlist;
