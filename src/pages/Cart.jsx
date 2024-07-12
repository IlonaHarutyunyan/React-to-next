import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Banner from '../components/Banner';
import CartCard from '../components/CartCard';
import CO2Modal from '../components/CO2Modal';
import DeliveryInfoModal from '../components/DeliveryInfoModal';
import EditCartItemModal from '../components/EditCartItemModal';
import EmptyPage from '../components/EmptyPage';
import InfoModal from '../components/InfoModal';
import Link from '../components/Link';
import Note from '../components/Note';
import OrderTotal from '../components/OrderTotal';
import PageHeader from '../components/PageHeader';
import PromoCodeInput from '../components/PromoCodeInput';
import CartCardSkeleton from '../components/skeletons/CartCardSkeleton';
import SupportModal from '../components/SupportModal';
import { currentLang } from '../i18n';
import CartIconEmpty from '../icons/CartIconEmpty';
import CartIconFull from '../icons/CartIconFull';
import CO2Icon from '../icons/CO2Icon';
import PayIcon from '../icons/PayIcon';
import QuestionIcon from '../icons/QuestionIcon';
import TelegramIcon from '../icons/TelegramIcon';
import TrashIcon from '../icons/TrashIcon';
import WarningIcon from '../icons/WarningIcon';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { events, track } from '../metrics';
import {
  cartChangedModalClosed,
  confirmCart,
  fetchCart,
  fetchCheckoutDeliveryData,
  removeAllFromCart,
  removeFabricFromCart,
  resetState,
  setIsDeliveryDataStep,
  setIsEditCartItemModalOpen,
} from '../redux/slices/cartSlice';
import { isNewCheckout } from '../utils/abTesting';

const CartCardsWrapper = styled(props => <Box {...props} />)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  alignItems: 'flex-start',
}));

const CartTitle = styled(props => <Typography {...props} />)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 700,
  marginTop: '24px',
  marginBottom: '24px',
  display: 'flex',
}));

function Cart() {
  const { t } = useTranslation([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentCartItemProps, setCurrentCartItemProps] = useState();
  const [isDeliveryInfoModalOpen, setIsDeliveryInfoModalOpen] = useState(false);
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);
  const [isDeleteFabricModalOpen, setIsDeleteFabricModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [fabricToDeleteId, setFabricToDeleteId] = useState(null);
  const [isCO2ModalOpen, setIsCO2ModalOpen] = useState(false);

  const onEdit = fabric => {
    const { length: lengthInCart, min, max, thumbnail, title, article, id } = fabric;

    setCurrentCartItemProps({ lengthInCart, min, max, thumbnail, title, article, id });
    dispatch(setIsEditCartItemModalOpen(true));
  };

  const onRemove = id => {
    dispatch(removeFabricFromCart({ id }));
  };

  const {
    data: {
      checkoutInfo: { orderId },
      fabrics,
      fabricsChanged,
      fabricsSold,
      total,
      minimalOrder,
      fabricsSamples,
      promoCode,
      promoDiscount,
    },
    isLoading,
    isConfirmLoading,
    isCartChangedModalOpen,
    isEditCartItemModalOpen,
    isConfirmed,
    promoCodeError,
    isDeliveryDataLoading,
  } = useSelector(state => state.cart);

  const {
    data: {
      stats: {
        cart: { count },
      },
    },
  } = useSelector(state => state.user);

  const isCartEmpty = !count;

  const isOrderAvailable = total?.sum >= minimalOrder;

  const intervalId = useRef(null);

  useEffect(() => {
    dispatch(fetchCart());

    if (!isNewCheckout()) {
      intervalId.current = setInterval(() => dispatch(fetchCart()), 60000);

      return () => {
        clearInterval(intervalId.current);
        dispatch(resetState());
      };
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      track(events.cartPage.shown, {
        changedCount: fabricsChanged.length,
        soldCount: fabricsSold.length,
        samplesCount: fabricsSamples.length,
        price: total.price,
        length: total.length,
        count: total.count,
        isOrderAvailable,
      });
    }
  }, [total.price, total.length, total.count]);

  useEffect(() => {
    if (isConfirmed && orderId) {
      navigate(`/checkout/${orderId}`);
    }
  }, [isConfirmed, orderId]);

  useEffect(() => {
    if (isDeliveryDataLoading) {
      navigate(`/checkout/delivery`);
    }
  }, [isDeliveryDataLoading]);

  return (
    <>
      {!isConfirmed && (
        <>
          {!!isCartEmpty && (
            <EmptyPage
              title={t('cart:placeholder.title')}
              text={t('cart:placeholder.text')}
              icon={CartIconEmpty}
              to="/orders"
              buttonText={t('cart:placeholder.visitOrders')}
              secondaryTo="/fabrics"
              secondaryButtonText={t('cart:placeholder.visitCatalog')}
            />
          )}
          {!isCartEmpty && (
            <Box
              sx={{
                display: 'flex',
                gap: '24px',
                justifyContent: 'space-between',
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: '100%',
                    md: total?.count || isLoading ? '60%' : '100%',
                  },
                }}
              >
                <PageHeader title={t('cart:titles.main')} oneSize={true} sx={{ mb: '40px' }} />

                <Banner sx={{ my: '16px' }} location="cart" />
                {!!fabrics?.length && (
                  <CartCardsWrapper>
                    {fabrics.map((fabric, i) =>
                      isLoading ? (
                        <CartCardSkeleton key={i} />
                      ) : (
                        <CartCard
                          key={fabric?.id}
                          {...fabric}
                          onRemove={() => {
                            setIsDeleteFabricModalOpen(true);
                            setFabricToDeleteId(fabric?.id);
                          }}
                          onEdit={() => onEdit(fabric)}
                        />
                      ),
                    )}
                  </CartCardsWrapper>
                )}
                {!!fabricsChanged?.length && (
                  <>
                    <CartTitle
                      sx={{
                        justifyContent: {
                          xs: 'center',
                          md: 'left',
                        },
                      }}
                    >
                      {t('cart:titles.changed')}
                    </CartTitle>
                    <CartCardsWrapper>
                      {fabricsChanged.map(fabric =>
                        isLoading ? (
                          <CartCardSkeleton key={fabric?.id} />
                        ) : (
                          <CartCard
                            key={fabric?.id}
                            {...fabric}
                            onRemove={() => {
                              setIsDeleteFabricModalOpen(true);
                              setFabricToDeleteId(fabric?.id);
                            }}
                            onEdit={() => onEdit(fabric)}
                          />
                        ),
                      )}
                    </CartCardsWrapper>
                  </>
                )}
                {!!fabricsSamples?.length && (
                  <>
                    <CartTitle
                      sx={{
                        justifyContent: {
                          xs: 'center',
                          md: 'left',
                        },
                      }}
                    >
                      {t('cart:titles.samples')}
                    </CartTitle>
                    <CartCardsWrapper>
                      {fabricsSamples.map(fabric =>
                        isLoading ? (
                          <CartCardSkeleton key={fabric?.id} />
                        ) : (
                          <CartCard
                            key={fabric?.id}
                            {...fabric}
                            onRemove={() => {
                              setIsDeleteFabricModalOpen(true);
                              setFabricToDeleteId(fabric?.id);
                            }}
                            onEdit={() => onEdit(fabric)}
                          />
                        ),
                      )}
                    </CartCardsWrapper>
                  </>
                )}
                {!!fabricsSold?.length && (
                  <>
                    <CartTitle
                      sx={{
                        justifyContent: {
                          xs: 'center',
                          md: 'left',
                        },
                      }}
                    >
                      {t('cart:titles.sold')}
                    </CartTitle>
                    <CartCardsWrapper>
                      {fabricsSold.map(fabric => (
                        <CartCard
                          key={fabric?.id}
                          {...fabric}
                          isSold={true}
                          onRemove={() => {
                            setIsDeleteFabricModalOpen(true);
                            setFabricToDeleteId(fabric?.id);
                          }}
                        />
                      ))}
                    </CartCardsWrapper>
                    <Box
                      sx={{
                        backgroundColor: 'colors.gold',
                        color: 'colors.darkGrey',
                        padding: '16px',
                        fontSize: '14px',
                        borderRadius: '8px',
                        mt: '24px',
                      }}
                    >
                      {t('cart:info')}
                      <Box sx={{ display: 'flex', gap: '12px', mt: '16px' }}>
                        <Link target="_blank" to="https://t.me/Beglarian_fabrics">
                          <TelegramIcon sx={{ fontSize: '36px' }} />
                        </Link>
                        <Link target="_blank" to="https://api.whatsapp.com/send/?phone=33764802961">
                          <WhatsAppIcon sx={{ fontSize: '36px' }} />
                        </Link>
                      </Box>
                    </Box>
                  </>
                )}
                <Button
                  sx={{ my: '16px' }}
                  startIcon={<TrashIcon />}
                  variant="outlined"
                  color="white"
                  fullWidth
                  onClick={() => setIsClearCartModalOpen(true)}
                >
                  {t('cart:clearCart')}
                </Button>
              </Box>
              {!!total?.count && (
                <Box
                  sx={{
                    position: 'relative',
                    backgroundColor: '#ffffff',
                    width: {
                      md: '40%',
                    },
                    borderRadius: {
                      xs: '8px',
                      md: 0,
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: {
                      xs: '16px',
                      md: '128px 72px',
                    },

                    margin: {
                      xs: 0,
                      md: '-32px -48px -32px 0',
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'sticky',
                      top: '120px',
                      display: 'flex',
                      flexDirection: 'column',
                      width: {
                        xs: '100%',
                        md: '300px',
                      },
                    }}
                  >
                    <OrderTotal {...total} />
                    {!isOrderAvailable && (
                      <Note variant="success" centered={true} sx={{ mb: '16px' }}>
                        {t('cart:checkout.minimumOrder')}
                        &nbsp;
                        {minimalOrder}
                        &nbsp;
                        {t('common:units.currency')}
                      </Note>
                    )}
                    {currentLang !== 'cn' && (
                      <PromoCodeInput
                        sx={{ mb: '16px' }}
                        promoCode={promoCode}
                        promoDiscount={promoDiscount}
                        promoCodeError={promoCodeError}
                      />
                    )}
                    {total?.sustainability && (
                      <Note variant="info" icon CustomIcon={CO2Icon} sx={{ mb: '16px', userSelect: 'none' }}>
                        <Trans
                          i18nKey={total?.sustainability.ch4 ? 'cart:co2disclaimer' : 'cart:co2disclaimerShort'}
                          components={{ strong: <strong /> }}
                          values={{
                            co2: total?.sustainability.co2,
                            ch4: total?.sustainability.ch4,
                            water: total?.sustainability.water,
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

                    <Button
                      sx={{ mb: '16px' }}
                      startIcon={<CartIconFull />}
                      disabled={!isOrderAvailable}
                      variant="contained"
                      color="confirm"
                      className={isConfirmLoading || isLoading ? 'loading' : ''}
                      onClick={() => {
                        if (isNewCheckout()) {
                          dispatch(setIsDeliveryDataStep(true));
                          dispatch(fetchCheckoutDeliveryData());
                        } else {
                          dispatch(confirmCart({ promoCode }));
                        }

                        clearInterval(intervalId.current);
                      }}
                    >
                      {t('cart:checkout.save')}
                    </Button>

                    <Button
                      sx={{ mb: '16px' }}
                      startIcon={<QuestionIcon />}
                      variant="outlined"
                      color="white"
                      onClick={() => setIsSupportModalOpen(true)}
                    >
                      {t('cart:checkout.manager')}
                    </Button>
                    <Button
                      sx={{ mb: { xs: 0, md: '16px' } }}
                      startIcon={<PayIcon />}
                      variant="outlined"
                      color="white"
                      onClick={() => setIsDeliveryInfoModalOpen(true)}
                    >
                      {t('cart:checkout.delivery')}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {!!currentCartItemProps && isEditCartItemModalOpen && (
            <EditCartItemModal
              isOpen={true}
              close={() => dispatch(setIsEditCartItemModalOpen(false))}
              isLoading={isLoading}
              {...currentCartItemProps}
            />
          )}

          <InfoModal
            isOpen={isCartChangedModalOpen}
            close={() => {
              dispatch(cartChangedModalClosed());
            }}
            title={t('modals:cartChanged.title')}
            text={t('modals:cartChanged.text')}
            Icon={WarningIcon}
            buttonPrimaryText={t('modals:cartChanged.button')}
          />

          <InfoModal
            isOpen={isDeleteFabricModalOpen}
            close={() => setIsDeleteFabricModalOpen(false)}
            title={t('modals:deleteFabric.title')}
            Icon={CartIconEmpty}
            buttonPrimaryText={t('modals:deleteFabric.buttonPrimary')}
            buttonSecondaryText={t('modals:deleteFabric.buttonSecondary')}
            buttonPrimaryOnClick={() => {
              onRemove(fabricToDeleteId);
            }}
          />

          <InfoModal
            isOpen={isClearCartModalOpen}
            close={() => setIsClearCartModalOpen(false)}
            title={t('modals:clearCart.title')}
            Icon={CartIconEmpty}
            buttonPrimaryText={t('modals:clearCart.buttonPrimary')}
            buttonSecondaryText={t('modals:clearCart.buttonSecondary')}
            buttonPrimaryOnClick={() => {
              dispatch(removeAllFromCart());
            }}
          />

          <SupportModal
            title={t('modals:cartSupport.title')}
            text={t('modals:cartSupport.text')}
            isOpen={isSupportModalOpen}
            close={() => setIsSupportModalOpen(false)}
            type="cart"
          />

          <DeliveryInfoModal isOpen={isDeliveryInfoModalOpen} close={() => setIsDeliveryInfoModalOpen(false)} />

          <CO2Modal isOpen={isCO2ModalOpen} close={() => setIsCO2ModalOpen(false)} />
        </>
      )}
    </>
  );
}

export default Cart;
