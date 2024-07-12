import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PrivateWrapper(props) {
  const { Page, redirectTo = '/auth/login' } = props;
  const { pathname, search } = useLocation();

  const state = { from: `${pathname}${search}` };

  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('bfUserToken');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(redirectTo, { state });
    }
  }, [isLoggedIn]);

  return <Page />;
}
