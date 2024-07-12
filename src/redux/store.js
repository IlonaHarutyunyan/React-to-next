import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import fabricPageReducer from './slices/fabricPageSlice';
import fabricsPageReducer from './slices/fabricsPageSlice';
import mailingPageReducer from './slices/mailingPageSlice';
import mailingsPageReducer from './slices/mailingsPageSlice';
import supportReducer from './slices/supportSlice';
import userReducer from './slices/userSlice';
import utmReducer from './slices/utmSlice';
import wishlistPageReducer from './slices/wishlistPageSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    mailingsPage: mailingsPageReducer,
    mailingPage: mailingPageReducer,
    fabricsPage: fabricsPageReducer,
    fabricPage: fabricPageReducer,
    wishlistPage: wishlistPageReducer,
    cart: cartReducer,
    auth: authReducer,
    support: supportReducer,
    utm: utmReducer,
  },
});
