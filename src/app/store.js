import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { AuthApi } from '../features/auth/AuthServices';
import { PostApi } from '../features/post/PostServices';
import { BookMarkApi } from '../features/bookmark/BookMarkServices';

const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [PostApi.reducerPath]: PostApi.reducer,
    [BookMarkApi.reducerPath]: BookMarkApi.reducer,
  },
  middleware:
    getDefaultMiddleware => getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(PostApi.middleware)
      .concat(BookMarkApi.middleware),

});

setupListeners(store.dispatch)

export default store;
