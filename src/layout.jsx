import Container from '@mui/material/Container';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import Footer from './components/Footer';
import ParseUtmParams from './components/ParseUtmParams';
import Topbar from './components/Topbar';
// import TopBanner from './components/TopBanner';

export const headerHeight = 64;

export default function Layout({ children }) {
  const elementRef = useRef(null);

  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    setFooterHeight(elementRef?.current?.offsetHeight || 0);
  }, [elementRef, footerHeight]);

  return (
    <>
      <ParseUtmParams />
      <Topbar headerHeight={headerHeight} />

      {/* <TopBanner sx={{ mt: `${headerHeight}px`, mb: `${-headerHeight}px` }} /> */}

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pb: '32px',
          pt: `${headerHeight + 32}px`,
          minHeight: `100vh`,
        }}
      >
        <Suspense fallback={<div></div>}>{children ?? <Outlet />}</Suspense>
      </Container>
      <Footer elementRef={elementRef} />
      <ScrollRestoration />
    </>
  );
}
