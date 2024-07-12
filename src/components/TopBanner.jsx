import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Link from './Link';
import { currentLang } from '../i18n';
import CloseIcon from '../icons/CloseIcon';
import { events, track, Track } from '../metrics';

const DEFAULT_BANNER_CONFIG = {
  count: 2,
  date: new Date(),
  isVisible: true,
};

export default function Banner(props) {
  const { sx } = props;

  if (currentLang === 'cn') {
    return;
  }

  let bannerConfig = JSON.parse(localStorage.getItem('bfNewSiteBanner')) || DEFAULT_BANNER_CONFIG;

  if (!bannerConfig.isVisible) {
    const daysBetweenDates = (new Date() - new Date(bannerConfig.date)) / (1000 * 3600 * 24);

    if (daysBetweenDates > 6) {
      bannerConfig = DEFAULT_BANNER_CONFIG;

      localStorage.setItem('bfNewSiteBanner', JSON.stringify(bannerConfig));
    }
  }

  const [isVisible, setIsVisible] = useState(bannerConfig.isVisible);

  const onHide = () => {
    setIsVisible(false);

    bannerConfig.count = bannerConfig.count === 0 ? 0 : bannerConfig.count - 1;
    bannerConfig.date = new Date();

    if (!bannerConfig.count) {
      bannerConfig.isVisible = false;
    }

    localStorage.setItem('bfNewSiteBanner', JSON.stringify(bannerConfig));
  };

  const { t } = useTranslation([]);

  const link = currentLang === 'ru' ? 'https://shop.beglarianfabrics.com/' : 'https://store.beglarianfabrics.com/';

  return (
    <>
      {isVisible && (
        <Box
          sx={{
            p: '12px',
            position: 'relative',
            backgroundColor: 'colors.brightBlue',
            display: 'flex',
            justifyContent: {
              xs: 'flex-start',
              sm: 'center',
            },
            alignItems: 'center',
            ...sx,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyItems: {
                xs: 'flex-start',
                sm: 'center',
              },
              alignItems: {
                xs: 'flex-start',
                sm: 'center',
              },
              gap: {
                xs: '0px',
                sm: '8px',
              },
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              flexWrap: 'wrap',
            }}
          >
            <Typography sx={{ color: 'colors.mediumGrey' }}>{t('banners:top.text')}</Typography>
            <Link
              onClick={() => {
                track(events.topBanner.link.click);
              }}
              sx={{ color: 'colors.white', fontSize: '14px', textDecoration: 'underline' }}
              to={link}
            >
              {t('banners:top.link')}
            </Link>
          </Box>
          <CloseIcon
            onClick={() => {
              track(events.topBanner.closeIcon.click, { countLeft: bannerConfig.count - 1 });

              onHide();
            }}
            sx={{ position: 'absolute', right: '12px', color: 'colors.white', cursor: 'pointer' }}
          />

          <Track eventName={events.topBanner.shown} />
        </Box>
      )}
    </>
  );
}
