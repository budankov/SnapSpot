import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const selectedPostSlice = createSlice({
  name: "selectedPost",
  initialState: null as any,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<any>) => action.payload,
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
