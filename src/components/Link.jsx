import MuiLink from '@mui/material/Link';
import * as React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Link = React.forwardRef((props, ref) => {
  const { state: locationState, pathname, search } = useLocation();

  const state = props.passfrom ? { from: `${pathname}${search}` } : locationState;

  return <MuiLink sx={{ display: 'inline-block' }} {...props} ref={ref} component={RouterLink} state={state} />;
});

export default Link;
