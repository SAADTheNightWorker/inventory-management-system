import { createSlice } from "@reduxjs/toolkit";
import {
  getExpiredPolicyRecords,
  getPolicyRecords,
} from "../actionApis/policyRecordApi";

const policyRecordSlice = createSlice({
  name: "policyRecord",
  initialState: {
    policyRecord: [],
    expiredPolicyRecord: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPolicyRecords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPolicyRecords.fulfilled, (state, action) => {
        state.policyRecord = action.payload;
        state.isLoading = false;
      })
      .addCase(getPolicyRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getExpiredPolicyRecords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getExpiredPolicyRecords.fulfilled, (state, action) => {
        state.expiredPolicyRecord = action.payload;
        state.isLoading = false;
      })
      .addCase(getExpiredPolicyRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default policyRecordSlice.reducer;
