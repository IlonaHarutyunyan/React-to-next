import React from 'react';

import Link from './Link';
import LogoWhite from '../images/beglarian_fabrics_logo_white.svg';

export default function Logo(props) {
  const { sx, width = 100 } = props;
  return (
    <Link sx={{ ...sx, display: 'flex', cursor: 'pointer' }} to={`/${process.env.DEFAULT_PAGE}`}>
      <img width={width} src={LogoWhite}></img>
    </Link>
  );
}
