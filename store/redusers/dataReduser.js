import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalLikes: 100,
};

export const dataReducer = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    increaseTotalLike: (state) => {
      state.totalLikes += 1;
    },
    increaseTotalLikeByAmount: (state, action) => {
      state.totalLikes += action.payload;
    },
  },
});

export const { increaseTotalLike, increaseTotalLikeByAmount } =
  dataReducer.actions;
