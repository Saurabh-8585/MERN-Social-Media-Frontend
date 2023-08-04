import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { AuthApi } from '../features/auth/AuthServices';
import { PostApi } from '../features/post/PostServices';
import { BookMarkApi } from '../features/bookmark/BookMarkServices';
import { UserApi } from '../features/user/UserServices'
import { ConversationApi } from '../features/conversation/ConversationService';
import { MessageApi } from '../features/message/MessageService';
import { NewsApi } from '../features/news/newsService';
const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [PostApi.reducerPath]: PostApi.reducer,
    [BookMarkApi.reducerPath]: BookMarkApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [ConversationApi.reducerPath]: ConversationApi.reducer,
    [MessageApi.reducerPath]: MessageApi.reducer,
    [NewsApi.reducerPath]: NewsApi.reducer,

  },
  middleware:
    getDefaultMiddleware => getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(PostApi.middleware)
      .concat(BookMarkApi.middleware)
      .concat(UserApi.middleware)
      .concat(ConversationApi.middleware)
      .concat(MessageApi.middleware)
      .concat(NewsApi.middleware)

});

setupListeners(store.dispatch)

export default store;
