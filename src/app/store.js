import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { AuthApi } from '../features/auth/AuthServices';
import { PostApi } from '../features/post/PostServices';
import { BookMarkApi } from '../features/bookmark/BookMarkServices';
import { UserApi } from '../features/user/UserServices'
import { ConversationApi } from '../features/conversation/ConversationService';
import { MessageApi } from '../features/message/MessageService';

const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [PostApi.reducerPath]: PostApi.reducer,
    [BookMarkApi.reducerPath]: BookMarkApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [ConversationApi.reducerPath]: ConversationApi.reducer,
    [MessageApi.reducerPath]: MessageApi.reducer

  },
  middleware:
    getDefaultMiddleware => getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(PostApi.middleware)
      .concat(BookMarkApi.middleware)
      .concat(UserApi.middleware)
      .concat(ConversationApi.middleware)
      .concat(MessageApi.middleware)

});

setupListeners(store.dispatch)

export default store;
