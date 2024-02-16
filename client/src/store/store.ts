import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/user";
import noteReducer from "./slices/note";

 const store = configureStore({
  reducer :{
     user : userReducer,
     note : noteReducer
  }
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch