import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AddToCartModal from '../components/AddToCartModal';
import CO2Modal from '../components/CO2Modal';
import FabricChangedModal from '../components/FabricChangedModal';
import FabricModal from '../components/FabricModal';
import IconButton from '../components/IconButton';
import Label from '../components/Label';
import LengthInput from '../components/LengthInput';
import Link from '../components/Link';
import LoginRegisterModal from '../components/LoginRegisterModal';
import MaterialLabel from '../components/MaterialLabel';
import Note from '../components/Note';
import Price from '../components/Price';
import FabricCardSkeleton from '../components/skeletons/FabricCardSkeleton';
import Slider from '../components/Slider';
import { currentLang } from '../i18n';
import CartIconEmpty from '../icons/CartIconEmpty';
import CartIconFull from '../icons/CartIconFull';
import CO2Icon from '../icons/CO2Icon';
import CopyIcon from '../icons/CopyIcon';
import LikeIcon from '../icons/LikeIcon';
import LikeIconActive from '../icons/LikeIconActive';
import MagnifierIcon from '../icons/MagnifierIcon';
import { marketingEvents, trackMarketingEvent } from '../marketing';
import { events, track } from '../metrics';
import {
  addFabricToCart,
  addFabricToWishlist,
  fetchFabric,
  removeFabricFromWishlist,
  resetState,
  setIsAddToCartModalOpen,
  setIsFabricChangedModalOpen,
} from '../redux/slices/fabricPageSlice';
import pluralize from '../utils/pluralize';

const ListItem = styled(props => <MuiListItem {...props} />)(({ theme }) => ({
  padding: '8px 0 0 0',
  alignItems: 'flex-start',
}));

const ListItemTextLeft = styled(props => <Typography {...props} />)(({ theme }) => ({
  width: '107px',
  flexGrow: 0,
  flexShrink: 0,
  color: theme.palette.text.secondary,
}));

const ListItemTextRight = styled(props => <Typography {...props} />)(({ theme }) => ({
  color: theme.palette.text.primary,
  whiteSpace: 'break-spaces',
  fontWeight: 700,
}));

function Fabric() {
  const dispatch = useDispatch();
  const { t } = useTranslation([]);

  const {
    data: { fabric },
    isLoading,
    isAddToCartLoading,
    isAddToCartModalOpen,
    isFabricChangedModalOpen,
    fabricChangedInfo,
  } = useSelector(state => state.fabricPage);

  const {
    data: { isLoggedIn },
  } = useSelector(state => state.user);

  const { fabricId } = useParams();

  const {
    article,
    brand,
    price,
    isNew,
    isLiked,
    lengthInCart,
    isSampleInCart = false,
    isSampleAvailable,
    priceInCart = 0,
    sale,
    feature,
    properties,
    sustainability: { co2, ch4, water } = {},
    description,
    maxCount = 0,
    minCount = 0,
    videos = [],
    images = [],
    thumbnails = [],
    videoThumbnails,
  } = fabric || {};

  const { composition, density, type, width, purpose, weaving, stretch, color, country } = properties || {};

  const [isCO2ModalOpen, setIsCO2ModalOpen] = useState(false);
  const [isSample, setIsSample] = useState(isSampleInCart);
  const [isLoginRegisterModalOpen, setIsLoginRegisterModalOpen] = useState(false);
  const [isFabricModalOpen, setIsFabricModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [length, setLength] = useState(0);
  const isUnAuth = !isLoggedIn;
  const isSold = maxCount === 0;

  let available = `${maxCount} ${t('common:units.metersShort')}`;

  if (isSold) {
    available = t('fabric:soldOut');
  }

  const isError = length < minCount || length > maxCount;
  const isChanged = lengthInCart !== length;

  const cartAction = (id, addedLength) => {
    dispatch(addFabricToCart({ id, length: addedLength }));
  };

  const wishlistAction = (id, like) => {
    if (like) {
      dispatch(addFabricToWishlist({ id }));
    } else {
      dispatch(removeFabricFromWishlist({ id }));
    }
  };

  useEffect(() => {
    dispatch(fetchFabric(fabricId));

    return () => {
      dispatch(resetState());
    };
  }, []);

  useEffect(() => {
    setLength(lengthInCart || Math.max(Math.min(10, maxCount), minCount));
  }, [lengthInCart]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, gap: '8px', mb: '16px', width: '100%' }}>
        <Button component={Link} to={'/fabrics'} variant="contained" color="secondary" fullWidth>
          {t('fabric:buttons.catalog')}
        </Button>

        <IconButton
          variant="contained"
          color={isLiked ? 'error' : 'secondary'}
          icon={isLiked ? LikeIconActive : LikeIcon}
          onClick={() => {
            if (isUnAuth) {
              setIsLoginRegisterModalOpen(true);
            } else {
              wishlistAction(fabricId, !isLiked);
            }
          }}
        />
      </Box>
      {!isLoading && !!fabric ? (
        <Paper
          sx={{
            width: '100%',
            maxWidth: 840,
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            justifyContent: 'space-between',
            gap: {
              xs: '16px',
              sm: '24px',
            },
            p: {
              xs: '0 0 24px 0',
              sm: '24px',
            },
            borderRadius: '8px',
          }}
        >
          <Box
            sx={{
              width: {
                xs: '100%',
                sm: '60%',
              },
            }}
          >
            <Box
              sx={{
                height: 280,
                borderRadius: '8px 8px 0 0',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                mb: '16px',
              }}
              onClick={() => setIsFabricModalOpen(true)}
            >
              <Slider
                images={thumbnails}
                videos={videos}
                videoThumbnails={videoThumbnails}
                controls={true}
                setCurrent={setCurrentImageIndex}
              />
              {isSold && (
                <Box
                  sx={{
                    '.cardMedia:hover &': {
                      transition: 'opacity ease-in 200ms',
                      opacity: 0,
                    },
                    pointerEvents: 'none',
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    top: '0',
                    right: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'opacity ease-in 200ms',
                    backgroundColor: 'colors.almostBlackTransparent',

                    '& .MuiTypography-root': {
                      fontWeight: 600,
                      color: 'colors.white',
                      fontSize: '28px',
                    },
                  }}
                >
                  {isSold && <Typography>{t('fabric:soldOut')}</Typography>}
                </Box>
              )}
              <Box sx={{ position: 'absolute', top: '16px', left: '16px', textTransform: 'uppercase' }}>
                {!!isNew && <Label text={t('fabric:new')} variant="promotion" />}
                {!!sale && <Label text={t('fabric:sale')} variant="sale" />}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  gap: '8px',
                  maxWidth: 'calc(100% - 140px)',
                  flexWrap: 'wrap',
                }}
              >
                {!!feature && feature.map((x, i) => !!x?.name && <Label key={i} text={x?.name} variant="tag" />)}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  height: '32px',
                  width: '32px',
                  backgroundColor: 'colors.lightGrey',
                  borderRadius: '50%',
                }}
              >
                <MagnifierIcon sx={{ fontSize: '16px' }} />
              </Box>
            </Box>
            <Box
              sx={{
                px: {
                  xs: '24px',
                  sm: 0,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: '16px',
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '18px',
                      textOverflow: 'ellipsis',
                      maxWidth: '200px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {brand || article}
                  </Typography>
                  {!!brand && <Typography variant="body2">{article}</Typography>}
                </Box>
                <Price price={price} sale={sale} />
              </Box>
              <Divider />
              <Box>
                <List
                  sx={{
                    boxSizing: 'content-box',
                  }}
                >
                  {!!composition?.length && (
                    <ListItem sx={{ mb: '-4px' }}>
                      <ListItemTextLeft>{t('fabric:composition')}</ListItemTextLeft>
                      <ListItemTextRight sx={{ maxWidth: '200px' }} component={'div'}>
                        {composition.map((x, i) => (
                          <MaterialLabel key={i} {...x} />
                        ))}
                      </ListItemTextRight>
                    </ListItem>
                  )}
                  {!!available && (
                    <ListItem>
                      <ListItemTextLeft>{t('fabric:available')}</ListItemTextLeft>
                      <ListItemTextRight>{available}</ListItemTextRight>
                    </ListItem>
                  )}
                  {!!density && (
                    <ListItem>
                      <ListItemTextLeft>{t('fabric:density')}</ListItemTextLeft>
                      <ListItemTextRight>{`${density}\xa0${t('common:units.gramsPerMeter')}`}</ListItemTextRight>
                    </ListItem>
                  )}

                  {!!country && (
                    <ListItem>
                      <ListItemTextLeft>{t('fabric:country')}</ListItemTextLeft>
                      <ListItemTextRight>{country}</ListItemTextRight>
                    </ListItem>
                  )}

                  {!!type && (
                    <ListItem>
                      <ListItemTextLeft>{t('fabric:type')}</ListItemTextLeft>
                      <ListItemTextRight>{type}</ListItemTextRight>
                    </ListItem>
                  )}
                  {!!width && (
                    <ListItem>
                      <ListItemTextLeft>{t('fabric:width')}</ListItemTextLeft>
                      <ListItemTextRight>{`${width}\xa0${t('common:units.centimeters')}`}</ListItemTextRight>
                    </ListItem>
                  )}
                  {!!purpose && (
                    <ListItem>
                      <ListItemTextLeft>{t('fabric:purpose')}</ListItemTextLeft>
                      <ListItemTextRight>{purpose.join(', ')}</ListItemTextRight>
                    </ListItem>
                  )}
                  {!!weaving && (
                    <ListItem>
                      <ListItemTextLeft>{t('fabric:weaving')}</ListItemTextLeft>
                      <ListItemTextRight>{weaving}</ListItemTextRight>
                    </ListItem>
                  )}
                  {!!stretch && (
                    <ListItem>
                      <ListItemTextLeft>{t('fabric:stretch')}</ListItemTextLeft>
                      <ListItemTextRight>{stretch}</ListItemTextRight>
                    </ListItem>
                  )}
                  {!!color && (
                    <ListItem>
                      <ListItemTextLeft>{t('fabric:color')}</ListItemTextLeft>
                      <ListItemTextRight>{color.join('\n')}</ListItemTextRight>
                    </ListItem>
                  )}
                </List>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              boxSizing: 'border-box',
              width: {
                xs: '100%',
                sm: 'calc(40% - 24px)',
              },
              display: 'flex',
              flexDirection: 'column',
              px: {
                xs: '24px',
                sm: 0,
              },
            }}
          >
            {!!description && (
              <Box sx={{ mb: '16px' }}>
                <Typography sx={{ fontWeight: 'bold', mb: '8px', userSelect: 'none' }} variant="body1">
                  {t('fabric:description')}
                </Typography>
                <Typography variant="body2" sx={{ userSelect: 'none' }}>
                  {description}
                </Typography>
              </Box>
            )}
            {!isSold && (
              <>
                {/* Ткань не распродана и не в корзине ни как ткань ни
                                как образец: отображаем переключатель образца */}

                {!lengthInCart && !isSampleInCart && isSampleAvailable && (
                  <FormControlLabel
                    sx={{ mb: '16px' }}
                    control={
                      <Switch
                        checked={isSample}
                        onChange={() => {
                          track(events.fabric.toggleSample, { isSample: !isSample });

                          setIsSample(!isSample);
                        }}
                      />
                    }
                    label={t('fabric:orderSample')}
                  />
                )}

                {/* Ввод длины, отображаем если не образец */}

                {!isSample && !isSampleInCart && (
                  <LengthInput
                    length={length}
                    setLength={setLength}
                    max={maxCount}
                    min={minCount}
                    sx={{
                      mb: '16px',
                    }}
                    isError={isError}
                  />
                )}

                {/* Ткань есть в корзине, длина не менялась */}
                {!!lengthInCart && !isChanged && (
                  <Button
                    disabled={isError}
                    color={'success'}
                    variant="contained"
                    startIcon={<CartIconFull sx={{ color: 'colors.white' }} />}
                    fullWidth
                    component={Link}
                    to={'/cart'}
                  >
                    {t('fabric:buttons.inCart')}
                  </Button>
                )}

                {/* Образец в корзине */}
                {!!isSampleInCart && (
                  <Button
                    disabled={isError}
                    color={'success'}
                    variant="contained"
                    startIcon={<CartIconFull sx={{ color: 'colors.white' }} />}
                    fullWidth
                    component={Link}
                    to={'/cart'}
                  >
                    {t('fabric:buttons.sampleInCart')}
                  </Button>
                )}

                {/* Ткань не распродана, в корзине как ткань и изменена длина */}
                {!!lengthInCart && !!isChanged && (
                  <Button
                    className={isAddToCartLoading ? 'loading' : ''}
                    disabled={isError}
                    color={'success'}
                    variant="contained"
                    startIcon={<CartIconFull sx={{ color: 'colors.white' }} />}
                    fullWidth
                    onClick={() => {
                      cartAction(fabricId, length);
                    }}
                  >
                    {t('fabric:buttons.save')}
                  </Button>
                )}

                {/* Ткань не распродана, не в корзине ни как образец, ни как ткань */}
                {!lengthInCart && !isSampleInCart && (
                  <Button
                    className={isAddToCartLoading ? 'loading' : ''}
                    disabled={isError}
                    color={'primary'}
                    variant="contained"
                    startIcon={<CartIconEmpty sx={{ color: 'colors.white' }} />}
                    fullWidth
                    onClick={() => {
                      track(events.fabric.addToCart, { isSample });
                      trackMarketingEvent(marketingEvents.cart.add);

                      if (isUnAuth) {
                        setIsLoginRegisterModalOpen(true);
                      } else {
                        cartAction(fabricId, isSample ? 0 : length);
                      }
                    }}
                  >
                    {t('fabric:buttons.add')}
                  </Button>
                )}

                {!!lengthInCart && (
                  <Note variant="success" centered sx={{ mt: '16px', userSelect: 'none' }}>
                    {t('fabric:inYourCart')}&nbsp;{lengthInCart}&nbsp;
                    {pluralize(lengthInCart, t('common:units.meters'))}&nbsp;({priceInCart}&nbsp;
                    {t('common:units.currency')})
                  </Note>
                )}

                {!!co2 && (
                  <Note variant="info" icon CustomIcon={CO2Icon} sx={{ mt: '16px', userSelect: 'none' }}>
                    <Trans
                      i18nKey={ch4 ? 'fabric:co2disclaimer' : 'fabric:co2disclaimerShort'}
                      values={{
                        co2,
                        ch4,
                        water,
                      }}
                    />
                    {'. '}
                    <Link
                      sx={{ mt: '4px' }}
                      onClick={e => {
                        setIsCO2ModalOpen(true);
                        e.preventDefault();
                      }}
                    >
                      {t('common:links.moreInfo')}
                    </Link>
                  </Note>
                )}
              </>
            )}

            <Button
              sx={{ mt: { xs: '16px', sm: 'auto' } }}
              startIcon={<CopyIcon />}
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {
                const url = `${window.location.origin}${process.env.PUBLIC_PATH}fabrics/${fabricId}?lang=${currentLang}`;
                navigator.clipboard.writeText(url);
              }}
            >
              {t('fabric:buttons.copyLink')}
            </Button>

            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '8px', mt: '16px' }}>
              <Button component={Link} to={'/fabrics'} variant="contained" color="secondary" fullWidth>
                {t('fabric:buttons.catalog')}
              </Button>
              <IconButton
                variant="contained"
                color={isLiked ? 'error' : 'secondary'}
                icon={isLiked ? LikeIconActive : LikeIcon}
                onClick={() => {
                  if (isUnAuth) {
                    setIsLoginRegisterModalOpen(true);
                  } else {
                    wishlistAction(fabricId, !isLiked);
                  }
                }}
              />
            </Box>
          </Box>
        </Paper>
      ) : (
        <FabricCardSkeleton />
      )}

      <LoginRegisterModal isOpen={isLoginRegisterModalOpen} close={() => setIsLoginRegisterModalOpen(false)} />

      <FabricModal
        article={article}
        isOpen={isFabricModalOpen}
        close={() => setIsFabricModalOpen(false)}
        thumbnails={thumbnails}
        images={images}
        videos={videos}
        videoThumbnails={videoThumbnails}
        initial={currentImageIndex}
      />

      <AddToCartModal isOpen={isAddToCartModalOpen} close={() => dispatch(setIsAddToCartModalOpen(false))} />

      {isFabricChangedModalOpen && (
        <FabricChangedModal
          isOpen={true}
          fabricChangedInfo={fabricChangedInfo}
          close={() => {
            dispatch(setIsFabricChangedModalOpen(false));
          }}
          onAddClick={addedLength => {
            cartAction(fabricId, addedLength);
          }}
        />
      )}

      <CO2Modal isOpen={isCO2ModalOpen} close={() => setIsCO2ModalOpen(false)} />
    </Box>
  );
}

export default Fabric;
