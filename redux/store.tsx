import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import selectedPostSlice from "./reducers/selectedPostSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    selectedPostSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
