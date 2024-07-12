import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { CaptureConsole, HttpClient } from '@sentry/integrations';
import * as Sentry from '@sentry/react';
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  RouterProvider,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

import './i18n';

// eslint-disable-next-line no-unused-vars
import ContactUs from './components/ContactUs';
import Layout from './layout';
import { marketingEvents, trackMarketingEvent } from './marketing';
import PrivateWrapper from './pages/PrivateWrapper';
import store from './redux/store';
import theme from './theme';

const UserPage = lazy(() => import(/* webpackChunkName: "UserPage" */ './pages/User'));
const OrdersPage = lazy(() => import(/* webpackChunkName: "OrdersPage" */ './pages/Orders'));
const OrderPage = lazy(() => import(/* webpackChunkName: "OrderPage" */ './pages/Order'));
const InvoicesPage = lazy(() => import(/* webpackChunkName: "InvoicesPage" */ './pages/Invoices'));
const InvoicePage = lazy(() => import(/* webpackChunkName: "InvoicePage" */ './pages/Invoice'));
const ContactsPage = lazy(() => import(/* webpackChunkName: "Contacts" */ './pages/Contacts'));
const FAQPage = lazy(() => import(/* webpackChunkName: "FAQ" */ './pages/FAQ'));
const WishlistPage = lazy(() => import(/* webpackChunkName: "Wishlist" */ './pages/Wishlist'));
const MailingsPage = lazy(() => import(/* webpackChunkName: "Mailings" */ './pages/Mailings'));
const MailingPage = lazy(() => import(/* webpackChunkName: "Mailing" */ './pages/Mailing'));
const FabricsPage = lazy(() => import(/* webpackChunkName: "Fabrics" */ './pages/Fabrics'));
const FabricPage = lazy(() => import(/* webpackChunkName: "Fabric" */ './pages/Fabric'));
const CartPage = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const CheckoutPage = lazy(() => import(/* webpackChunkName: "Confirm" */ './pages/Checkout'));
const NotFoundPage = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/service/NotFound'));
const AuthLayout = lazy(() => import(/* webpackChunkName: "AuthLayout" */ './pages/auth/AuthLayout'));
const LoginPage = lazy(() => import(/* webpackChunkName: "Login" */ './pages/auth/Login'));
const RegisterPage = lazy(() => import(/* webpackChunkName: "Register" */ './pages/auth/Register'));
const PasswordRecoveryPage = lazy(() =>
  import(/* webpackChunkName: "PasswordRecovery" */ './pages/auth/PasswordRecovery'),
);
const CreatePasswordPage = lazy(() => import(/* webpackChunkName: "CreatePassword" */ './pages/auth/CreatePassword'));
const CheckEmailPage = lazy(() => import(/* webpackChunkName: "CheckEmailPage" */ './pages/auth/CheckEmailPage'));
const CheckoutDeliveryPage = lazy(() =>
  import(/* webpackChunkName: "CheckoutDeliveryPage" */ './pages/checkout/DeliveryData'),
);
const CheckoutConfirmPage = lazy(() =>
  import(/* webpackChunkName: "CheckoutConfirmPage" */ './pages/checkout/Confirm'),
);
const CheckoutPaymentPage = lazy(() =>
  import(/* webpackChunkName: "CheckoutPaymentPage" */ './pages/checkout/Payment'),
);
const CheckoutSuccessPage = lazy(() =>
  import(/* webpackChunkName: "CheckoutSuccessPage" */ './pages/checkout/Success'),
);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
    new HttpClient({
      failedRequestStatusCodes: [400, 599],
    }),
    new CaptureConsole({
      levels: ['error'],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    /^https:\/\/test\.beautyfabrics\.com\/api/,
    /^https:\/\/beta\.beglarianfabrics\.com\/api/,
    /^https:\/\/beglarianfabrics\.com\/api/,
  ],

  replaysOnErrorSampleRate: 1.0,

  environment: process.env.MODE,
});

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter);

const BASENAME = process.env.PUBLIC_PATH;

const router = sentryCreateBrowserRouter(
  [
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        {
          path: '/auth/login',
          element: <LoginPage />,
        },
        {
          path: '/auth/register',
          element: <RegisterPage />,
        },
        {
          path: '/auth/recovery',
          element: <PasswordRecoveryPage />,
        },
        {
          path: '/auth/recovery/:id',
          element: <PasswordRecoveryPage />,
        },
        {
          path: '/auth/create',
          element: <CreatePasswordPage />,
        },
        {
          path: '/auth/check-email',
          element: <CheckEmailPage />,
        },
      ],
    },
    {
      path: '/profile',
      element: <AuthLayout />,
      children: [
        {
          path: '/profile/recovery/:id',
          element: <PasswordRecoveryPage />,
        },
      ],
    },

    {
      path: '/',
      element: <Layout />,
      errorElement: (
        <Layout>
          <NotFoundPage />
        </Layout>
      ),
      children: [
        {
          path: '/',
          element: <MailingsPage />,
        },
        {
          path: '/404',
          element: <NotFoundPage />,
        },
        {
          path: '/mailings',
          element: <MailingsPage />,
        },
        {
          path: '/mailings/:id',
          element: <MailingPage />,
        },
        {
          path: '/fabrics',
          element: <FabricsPage />,
        },
        {
          path: '/fabrics/:fabricId',
          element: <FabricPage />,
        },
        {
          path: '/wishlist',
          element: <PrivateWrapper Page={WishlistPage} />,
        },
        {
          path: '/contacts',
          element: <ContactsPage />,
        },
        {
          path: '/FAQ',
          element: <FAQPage />,
        },
        {
          path: '/cart',
          element: <PrivateWrapper Page={CartPage} />,
        },
        {
          path: '/checkout/delivery',
          element: <PrivateWrapper Page={CheckoutDeliveryPage} />,
        },
        {
          path: '/checkout/confirm',
          element: <PrivateWrapper Page={CheckoutConfirmPage} />,
        },
        {
          path: '/checkout/payment',
          element: <PrivateWrapper Page={CheckoutPaymentPage} />,
        },
        {
          path: '/checkout/success',
          element: <PrivateWrapper Page={CheckoutSuccessPage} />,
        },
        {
          path: '/checkout/:orderId',
          element: <PrivateWrapper Page={CheckoutPage} />,
        },
        {
          path: '/user',
          element: <PrivateWrapper Page={UserPage} />,
        },
        {
          path: '/orders',
          element: <PrivateWrapper Page={OrdersPage} />,
        },
        {
          path: '/orders/:id',
          element: <PrivateWrapper Page={OrderPage} />,
        },
        {
          path: '/invoices',
          element: <PrivateWrapper Page={InvoicesPage} />,
        },
        {
          path: '/invoices/:id',
          element: <PrivateWrapper Page={InvoicePage} />,
        },
      ],
    },
  ],
  { basename: BASENAME },
);

function App() {
  trackMarketingEvent(marketingEvents.viewPage);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Provider store={store}>
        <Suspense fallback={<div></div>}>
          <ContactUs />
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
