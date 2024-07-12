import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Link from './Link';
import PageHeader from './PageHeader';
import SupportModal from './SupportModal';
import QuestionIcon from '../icons/QuestionIcon';

export default function EmptyPage(props) {
  const { icon, title, text, buttonText, to, secondaryTo, secondaryButtonText, withSupport } = props;

  const { t } = useTranslation([]);

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <Box sx={{ my: 'auto' }}>
      <PageHeader
        title={title}
        text={text}
        icon={icon}
        oneSize={true}
        sx={{
          mb: '40px',
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button sx={{ width: '296px' }} component={Link} to={to || '/fabrics'} variant="contained" color="primary">
          {buttonText}
        </Button>
      </Box>

      {withSupport && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '16px' }}>
          <Button
            sx={{ width: '296px' }}
            startIcon={<QuestionIcon />}
            variant="outlined"
            color="white"
            onClick={() => setIsSupportModalOpen(true)}
          >
            {t('common:support')}
          </Button>
        </Box>
      )}

      {secondaryTo && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '16px' }}>
          <Button
            sx={{ width: '296px' }}
            component={Link}
            to={secondaryTo || '/fabrics'}
            variant="contained"
            color="secondary"
          >
            {secondaryButtonText}
          </Button>
        </Box>
      )}

      <SupportModal
        title={t('modals:cartSupport.title')}
        text={t('modals:cartSupport.text')}
        isOpen={isSupportModalOpen}
        close={() => setIsSupportModalOpen(false)}
        type="cart"
      />
    </Box>
  );
}
