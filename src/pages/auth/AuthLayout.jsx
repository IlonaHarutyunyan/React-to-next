import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';

import LangPicker from '../../components/LangPicker';
import Logo from '../../components/Logo';
import ParseUtmParams from '../../components/ParseUtmParams';
import authBackground from '../../images/auth.jpg';
import { fetchUser } from '../../redux/slices/userSlice';

export default function Layout() {
  const { t } = useTranslation(['auth']);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const isChinaStore = process.env.LOCALE === 'cn';

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const {
    data: { isLoggedIn },
  } = useSelector(state => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(locationState?.from || `/${process.env.DEFAULT_PAGE}`);
    }
  }, [isLoggedIn]);

  return (
    <>
      <ParseUtmParams />
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            boxSizing: 'border-box',
            width: {
              xs: '100%',
              sm: '42%',
              md: '50%',
              lg: '66%',
            },
          }}
        >
          <Box
            sx={{
              boxSizing: 'border-box',
              alignItems: {
                xs: 'center',
                sm: 'flex-start',
              },
              backgroundColor: 'colors.almostBlack',
              background: `
                                linear-gradient(0deg, rgba(19, 33, 70, 0.60) 0%, 
                                rgba(19, 33, 70, 0.60) 100%), 
                                url(${authBackground}), 
                                lightgray 50% / cover no-repeat
                            `,
              padding: {
                xs: '52px 128px',
                sm: '120px 44px',
                md: '120px 84px',
                lg: '120px 84px',
              },
              top: 0,
              left: 0,
              bottom: 0,
              width: 'inherit',
              position: { xs: 'static', sm: 'fixed' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Logo width={120} />
            <Typography
              variant="h1"
              sx={{
                mt: 'auto',
                fontSize: '20px',
                width: '260px',
                fontWeight: '400',
                color: 'colors.white',
                display: {
                  xs: 'none',
                  sm: 'block',
                },
              }}
            >
              {t('title')}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: '58%',
              md: '50%',
              lg: '34%',
            },
            display: 'flex',
            justifyContent: 'center',
            boxSizing: 'border-box',
            padding: '40px 28px',
            backgroundColor: 'colors.white',
          }}
        >
          <Box
            sx={{
              width: {
                xs: '100%',
                sm: '415px',
              },
            }}
          >
            {!isChinaStore && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <LangPicker dark={true} sx={{ mt: '-16px', mb: '24px' }} />
              </Box>
            )}
            <Suspense fallback={<div></div>}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      </Box>
      <ScrollRestoration />
    </>
  );
}
