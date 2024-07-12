import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ChinaB2B from './banners/ChinaB2B';
import Link from './Link';
import CloseIcon from '../icons/CloseIcon';
import defaultBanner from '../images/defaultBanner.jpg';
import registerBanner from '../images/register.jpg';
// import maySale from '../images/maySale.png';
import { events, track, Track } from '../metrics';

export default function Banner(props) {
  const { sx, location = '' } = props;

  const UTM_BANNERS = [
    {
      name: 'free-samples-0124',
      pages: ['fabrics', 'mailings', 'mailing', 'cart'],
      defaultConfig: {
        count: 1,
        isVisible: true,
      },
    },
  ];

  const STATIC_BANNERS = [
    {
      name: 'firstOrder',
      pages: ['register'],
      backgroundImage: registerBanner,
      defaultConfig: {
        count: 1,
        isVisible: true,
      },
    },
    {
      component: ChinaB2B,
      name: 'chinaB2B',
      pages: ['fabrics', 'mailings'],
      defaultConfig: {
        count: 2,
        isVisible: true,
      },
    },
    // {
    //     name: 'maySale',
    //     backgroundImage: maySale,
    //     pages: ['fabrics', 'mailings', 'mailing'],
    //     defaultConfig: {
    //         count: 2,
    //         isVisible: true,
    //     },
    // },
  ];

  const { t } = useTranslation(['banners']);

  const {
    data: { utm },
  } = useSelector(state => state.utm);

  const campaign = utm?.utmCampaign;

  const banner =
    UTM_BANNERS.find(x => x.name === campaign && x.pages?.includes(location)) ||
    STATIC_BANNERS.find(x => x.pages?.includes(location)) ||
    {};

  const { name } = banner;

  if (!banner || t(`${name}.header`) === `${name}.header`) {
    return <></>;
  }

  const { backgroundImage, onClick } = banner;

  const Component = banner.component || null;

  const header = t(`${name}.header`);
  const text = t(`${name}.text`) === `${name}.text` ? null : t(`${name}.text`);
  const buttonText = t(`${name}.buttonText`);

  const currentBannerConfig = JSON.parse(localStorage.getItem(`bfBanner-${name}`)) || banner.defaultConfig;

  const [isVisible, setIsVisible] = useState(currentBannerConfig.isVisible);

  const onHide = () => {
    setIsVisible(false);

    currentBannerConfig.count = currentBannerConfig.count === 0 ? 0 : currentBannerConfig.count - 1;

    if (!currentBannerConfig.count) {
      currentBannerConfig.isVisible = false;
    }

    localStorage.setItem(`bfBanner-${name}`, JSON.stringify(currentBannerConfig));
  };

  return (
    <>
      {isVisible && (
        <>
          {!!Component && (
            <Component
              onClose={() => {
                track(events.banner.closeIcon.click, {
                  location,
                  name,
                  countLeft: currentBannerConfig.count - 1,
                });

                onHide();
              }}
              sx={sx}
            />
          )}
          {!Component && (
            <Box
              sx={{
                p: '24px',
                borderRadius: '8px',
                position: 'relative',
                background: `
                                linear-gradient(0deg, rgba(19, 33, 70, 0.50) 20%, 
                                rgba(19, 33, 70, 0.20) 100%), 
                                url(${backgroundImage || defaultBanner}), 
                                lightgray 80% / cover no-repeat
                            `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: {
                  xs: 'flex-start',
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
                <Typography
                  sx={{
                    fontSize: '20px',
                    width: '100%',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    color: 'colors.white',
                  }}
                >
                  {header}
                </Typography>
                {!!text && (
                  <Typography sx={{ fontSize: '14px', color: 'colors.white', mt: '8px' }}>
                    <Trans
                      i18nKey={`banners:${name}.text`}
                      components={{ br: <br />, strong: <strong />, ul: <ul />, li: <li /> }}
                    />
                  </Typography>
                )}

                {!!buttonText && !!onClick && (
                  <Button
                    component={Link}
                    onClick={() => {
                      track(events.banner.link.click);

                      if (onClick) {
                        onClick();
                      }
                    }}
                    color="success"
                    variant="contained"
                    sx={{ mt: '24px', minWidth: '120px' }}
                  >
                    {buttonText}
                  </Button>
                )}
              </Box>
              <CloseIcon
                onClick={() => {
                  track(events.banner.closeIcon.click, {
                    location,
                    name,
                    countLeft: currentBannerConfig.count - 1,
                  });

                  onHide();
                }}
                sx={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  color: 'colors.white',
                  cursor: 'pointer',
                }}
              />
            </Box>
          )}
          <Track eventName={events.banner.shown} eventProps={{ location, name }} />
        </>
      )}
    </>
  );
}
