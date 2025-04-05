import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 1,
  textBlastName: "",
  campaigns: [],
  uploadedRecipients: [],
  filteredRecipients: [],
  selectedTags: [],
  selectedExcludeTags: [],
  selectedBlasts: [],
  message: "",
  selectedImageUrl: "",
  sendTimeOption: "now",
  tags: [],
};

const textBlastSlice = createSlice({
  name: "textBlast",
  initialState,
  reducers: {
    setField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetTextBlast(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setField, resetTextBlast } = textBlastSlice.actions;

export default textBlastSlice.reducer;
