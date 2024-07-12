import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Label from './Label';
import Link from './Link';
import Note from './Note';
import Time from './Time';

const ListItem = styled(props => <MuiListItem {...props} />)(({ theme }) => ({
  padding: '16px 0 0 0',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ListItemTextLeft = styled(props => <Typography {...props} />)(({ theme }) => ({
  flexGrow: 0,
  fontSize: '14px',
  color: theme.palette.text.secondary,
}));

const ListItemTextRight = styled(props => <Typography {...props} />)(({ theme }) => ({
  color: theme.palette.text.primary,
  whiteSpace: 'break-spaces',
  fontSize: '14px',
}));

export default function CartCard(props) {
  const {
    article,
    title,
    price,
    oldPrice,
    length,
    oldLength,
    thumbnail,
    cuts = [],
    reserveTimeLeftSeconds: reserveTimeLeftSecondsFromProps,
    isSold,
    onRemove,
    onEdit,
    id,
    isSample,
  } = props;

  const [reserveTimeLeftSeconds, setReserveTimeLeftSeconds] = useState(reserveTimeLeftSecondsFromProps);

  useEffect(() => {
    if (reserveTimeLeftSeconds > 0) {
      setTimeout(() => {
        setReserveTimeLeftSeconds(reserveTimeLeftSeconds - 10 > 0 ? reserveTimeLeftSeconds - 10 : 0);
      }, 1000 * 10);
    }
  }, [reserveTimeLeftSeconds]);

  const { t } = useTranslation([]);

  return (
    <Card sx={{ width: '100%', minWidth: 345, opacity: isSold ? 0.7 : 1 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '16px',
            alignItems: 'middle',
          }}
        >
          {thumbnail && (
            <Link to={`/fabrics/${id}`}>
              <CardMedia
                component="img"
                sx={{
                  width: '62px',
                  height: '48px',
                  borderRadius: '8px',
                }}
                src={thumbnail}
              />
            </Link>
          )}
          <Box>
            <Link
              to={`/fabrics/${id}`}
              component={Typography}
              sx={{
                fontSize: '18px',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              {article}
            </Link>
            <Typography
              sx={{
                fontSize: '14px',
                color: 'colors.darkGrey',
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            {isSample && <Label text={t('cart:card.sample')} variant="success" />}
            {((!length && !isSample) || !!isSold) && <Label text={t('cart:card.sold')} variant="alert" />}
          </Box>
        </Box>
        {!isSold && (
          <>
            {cuts?.length > 1 && (
              <>
                <Divider sx={{ mt: '16px' }} />
                <Typography sx={{ mt: '16px' }} variant="body2">
                  {t('cart:card.disclaimer')}
                </Typography>
                <List
                  sx={{
                    boxSizing: 'content-box',
                    mb: '16px',
                    p: 0,
                    transition: 'max-height 0.5s ease',
                    overflow: 'visible',
                  }}
                >
                  {cuts.map((cut, i) => (
                    <ListItem key={i} sx={{ mb: '-4px' }}>
                      <ListItemTextLeft>{`${cut.title} ${i + 1}`}</ListItemTextLeft>
                      <ListItemTextRight component={'div'}>
                        {!cut.oldLength && (
                          <strong>
                            {cut.length}&nbsp;{t('common:units.metersShort')}
                          </strong>
                        )}
                        {!!cut.oldLength && (
                          <Box
                            sx={{
                              backgroundColor: 'colors.lightRed',
                              color: 'colors.red',
                              p: '2px 8px',
                              borderRadius: '6px',
                            }}
                          >
                            {cut.oldLength}&nbsp;{t('common:units.metersShort')}
                            &nbsp; → &nbsp;
                            <strong>
                              {cut.length}&nbsp;{t('common:units.metersShort')}
                            </strong>
                          </Box>
                        )}
                      </ListItemTextRight>
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </>
            )}
            {!!length && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mt: '16px',
                }}
              >
                <Typography
                  sx={{
                    color: 'colors.darkGrey',
                  }}
                >
                  {t('cart:card.total')}
                </Typography>
                {!oldPrice && (
                  <Typography>
                    <strong>
                      {price}&nbsp;{t('common:units.currency')}
                    </strong>
                  </Typography>
                )}
                {!!oldPrice && (
                  <>
                    {oldPrice !== price && (
                      <Box
                        sx={{
                          backgroundColor: 'colors.lightRed',
                          color: 'colors.red',
                          p: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      >
                        <strong>
                          {price}&nbsp;{t('common:units.currency')}
                        </strong>
                      </Box>
                    )}
                    {oldPrice === price && (
                      <Typography>
                        <strong>
                          {price}&nbsp;{t('common:units.currency')}
                        </strong>
                      </Typography>
                    )}
                  </>
                )}
                {!oldLength && (
                  <strong>
                    {length}&nbsp;{t('common:units.metersShort')}
                  </strong>
                )}
                {!!oldLength && oldLength !== length && (
                  <Box
                    sx={{
                      backgroundColor: 'colors.lightRed',
                      color: 'colors.red',
                      p: '2px 8px',
                      borderRadius: '6px',
                    }}
                  >
                    {oldLength}&nbsp;{t('common:units.metersShort')}
                    &nbsp; → &nbsp;
                    <strong>
                      {length}&nbsp;{t('common:units.metersShort')}
                    </strong>
                  </Box>
                )}
              </Box>
            )}
            {(onRemove || onEdit) && (
              <>
                <Divider sx={{ mt: '16px' }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mt: '16px',
                  }}
                >
                  {onRemove && (
                    <Link
                      onClick={event => {
                        event.preventDefault();

                        onRemove();
                      }}
                      sx={{
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: 'colors.red',
                      }}
                    >
                      {t('cart:card.delete')}
                    </Link>
                  )}
                  {onEdit && !!length && (
                    <Link
                      onClick={event => {
                        event.preventDefault();

                        onEdit();
                      }}
                      sx={{
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: 'colors.almostBlack',
                      }}
                    >
                      {t('cart:card.edit')}
                    </Link>
                  )}
                </Box>
              </>
            )}
            {!!reserveTimeLeftSeconds && !!length && (
              <Note variant="success" centered={true} sx={{ mt: '16px' }}>
                {t('fabric:onReserve')}
                &nbsp;
                <Time fullTimeUnits timeInMinutes={Math.ceil(reserveTimeLeftSeconds / 60)} />
              </Note>
            )}
          </>
        )}
        {!!isSold && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                mt: '16px',
              }}
            >
              <Link
                onClick={event => {
                  event.preventDefault();

                  onRemove();
                }}
                sx={{
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: 'colors.red',
                }}
              >
                {t('cart:card.delete')}
              </Link>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}
