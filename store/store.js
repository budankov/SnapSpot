import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "../store/redusers/dataReduser";

export const store = configureStore({
  reducer: {
    dataReducer: dataReducer.reducer,
  },
});
