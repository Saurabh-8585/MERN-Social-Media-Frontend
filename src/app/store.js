import { configureStore } from '@reduxjs/toolkit';
import { AuthApi } from '../features/auth/AuthServices';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { PostApi } from '../features/post/PostServices';

const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [PostApi.reducerPath]: PostApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(AuthApi.middleware)
    .concat(PostApi.middleware),
});

setupListeners(store.dispatch)

export default store;
