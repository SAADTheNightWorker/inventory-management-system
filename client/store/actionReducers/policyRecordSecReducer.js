import { createSlice } from "@reduxjs/toolkit";
import { getPolicyRecordsSec } from "../actionApis/policyRecordSecApi";

const policyRecordSecReducer = createSlice({
  name: "policyRecordSec",
  initialState: {
    PolicyRecordSec: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPolicyRecordsSec.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPolicyRecordsSec.fulfilled, (state, action) => {
        state.PolicyRecordSec = action.payload;
        state.isLoading = false;
      })
      .addCase(getPolicyRecordsSec.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default policyRecordSecReducer.reducer;
