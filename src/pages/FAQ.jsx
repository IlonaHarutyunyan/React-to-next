import MuiAccordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import PageHeader from '../components/PageHeader';
import { timeFromMinutes } from '../components/Time';
import PlusIcon from '../icons/PlusIcon';
import { events, track, Track } from '../metrics';

const Accordion = styled(props => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({}));

function FAQ() {
  const [expanded, setExpanded] = React.useState(false);
  const { t } = useTranslation([]);

  const handleChange = panel => (event, isExpanded) => {
    if (isExpanded) {
      track(events.faqPage.section.shown, { sectionName: panel });
    }

    setExpanded(isExpanded ? panel : false);
  };

  const {
    data: { reservationTimeoutInMinutes, firstOrder },
  } = useSelector(state => state.user);

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title={t('faq:title')} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 840,
        }}
      >
        <Box>
          <Accordion expanded={expanded === 'main'} onChange={handleChange('main')}>
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Trans i18nKey={'faq:main.title'} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                <Trans
                  i18nKey={'faq:main.text'}
                  values={{
                    firstOrder,
                  }}
                  components={{
                    br: <br />,
                    strong: <strong />,
                    ul: <ul />,
                    li: <li />,
                  }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'reservation'} onChange={handleChange('reservation')}>
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Trans i18nKey={'faq:reservation.title'} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                <Trans
                  i18nKey={'faq:reservation.text'}
                  components={{ br: <br />, strong: <strong />, ul: <ul />, li: <li /> }}
                  values={{
                    time: timeFromMinutes(reservationTimeoutInMinutes, true),
                  }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'newsletter'} onChange={handleChange('newsletter')}>
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Trans i18nKey={'faq:newsletter.title'} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                <Trans i18nKey={'faq:newsletter.text'} />
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'same'} onChange={handleChange('same')}>
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Trans i18nKey={'faq:same.title'} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                <Trans
                  i18nKey={'faq:same.text'}
                  components={{ br: <br />, strong: <strong />, ul: <ul />, li: <li /> }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'processing'} onChange={handleChange('processing')}>
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Trans i18nKey={'faq:processing.title'} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                <Trans
                  i18nKey={'faq:processing.text'}
                  components={{ br: <br />, strong: <strong />, ul: <ul />, li: <li /> }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'blue'} onChange={handleChange('blue')}>
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Trans i18nKey={'faq:blue.title'} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                <Trans
                  i18nKey={'faq:blue.text'}
                  components={{ br: <br />, strong: <strong />, ul: <ul />, li: <li /> }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'invoice'} onChange={handleChange('invoice')}>
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Trans i18nKey={'faq:invoice.title'} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                <Trans
                  i18nKey={'faq:invoice.text'}
                  components={{ br: <br />, strong: <strong />, ul: <ul />, li: <li /> }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'delivery'} onChange={handleChange('delivery')}>
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Trans i18nKey={'faq:delivery.title'} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                <Trans
                  i18nKey={'faq:delivery.text'}
                  components={{ br: <br />, strong: <strong />, ul: <ul />, li: <li /> }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'minimal'} onChange={handleChange('minimal')}>
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Trans i18nKey={'faq:minimal.title'} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                <Trans
                  i18nKey={'faq:minimal.text'}
                  values={{
                    firstOrder,
                  }}
                  components={{ br: <br />, strong: <strong />, ul: <ul />, li: <li /> }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'cut'} onChange={handleChange('cut')}>
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Trans i18nKey={'faq:cut.title'} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                <Trans
                  i18nKey={'faq:cut.text'}
                  components={{ br: <br />, strong: <strong />, ul: <ul />, li: <li /> }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'defects'} onChange={handleChange('defects')}>
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Trans i18nKey={'faq:defects.title'} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                <Trans
                  i18nKey={'faq:defects.text'}
                  components={{ br: <br />, strong: <strong />, ul: <ul />, li: <li /> }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>

      <Track eventName={events.faqPage.shown} />
    </Box>
  );
}

export default FAQ;
