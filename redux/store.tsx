import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import photoSlice from './reducers/photoSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    photo: photoSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];