import { configureStore } from '@reduxjs/toolkit';
import { AuthApi } from '../features/auth/AuthServices';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
});

setupListeners(store.dispatch)

export default store;
