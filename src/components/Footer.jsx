import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import Contacts from './Contacts';
import LangPicker from './LangPicker';
import Logo from './Logo';
import { currentLang } from '../i18n';
import { colors as palette } from '../theme';

const Link = styled(props => <RouterLink {...props} />)(({ theme }) => ({
  textTransform: 'uppercase',
  color: palette.white,
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '12px',
  lineHeight: '24px',
}));

export default function Footer({ elementRef }) {
  const { t } = useTranslation(['footer']);

  const isChinaStore = process.env.LOCALE === 'cn';

  return (
    <Box
      ref={elementRef}
      sx={{
        py: { xs: '104px', sm: '88px' },
        backgroundColor: palette.almostBlack,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%',
          minHeight: '100%',
          width: '100%',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <Link to="/faq">{t('howWeWork')}</Link>
          <Divider
            sx={{
              display: { xs: 'block', sm: 'none' },
              width: '100%',
              borderColor: palette.darkGrey,
            }}
          />
          <Link to="/faq">{t('faq')}</Link>
          <Divider
            sx={{
              display: { xs: 'block', sm: 'none' },
              width: '100%',
              borderColor: palette.darkGrey,
            }}
          />
          <Link to={`https://beglarianfabrics.com/${currentLang}privacy`} target="_blank">
            {t('privacyPolicy')}
          </Link>
          <Divider
            sx={{
              display: { xs: 'block', sm: 'none' },
              width: '100%',
              borderColor: palette.darkGrey,
            }}
          />
          <Link to="https://beglarianfabrics.com/mentionslegales" target="_blank">
            {t('legalNotice')}
          </Link>
          <Divider
            sx={{
              display: { xs: 'block', sm: 'none' },
              width: '100%',
              borderColor: palette.darkGrey,
              mb: '20px',
            }}
          />
        </Box>
        <Contacts
          sx={{ width: { xs: '100%', sm: 'auto' }, py: { xs: '20px', sm: '0' } }}
          iconsColor={palette.darkGrey}
          textColor={palette.white}
        />
        <Divider
          sx={{
            display: { xs: 'block', md: 'none' },
            width: '100%',
            borderColor: palette.darkGrey,
            my: { xs: '20px', sm: '48px' },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'row', md: 'column' },
            flexDirectionth: { xs: 'row', md: 'column' },
            width: { xs: '100%', md: 'auto' },
            alignItems: { xs: 'flex-end', md: 'flex-start' },
          }}
        >
          <Logo />
          {!isChinaStore && <LangPicker sx={{ mt: { md: '91px' } }} />}
        </Box>
      </Container>
    </Box>
  );
}
