import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PhotoState {
  photoUris: string[];
}

const initialState: PhotoState = {
  photoUris: [],
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    addPhotoUri(state, action: PayloadAction<string>) {
      state.photoUris.push(action.payload);
    },
    clearPhotos(state) {
      state.photoUris = [];
    },
  },
});

export const { addPhotoUri, clearPhotos } = photoSlice.actions;
export default photoSlice.reducer;
