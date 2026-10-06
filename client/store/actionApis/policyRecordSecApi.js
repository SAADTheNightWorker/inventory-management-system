import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequests/apiRequest";

export const getPolicyRecordsSec = createAsyncThunk(
  "policyRecordSec/getPolicyRecordsSec",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRequest.get("/policyRecordSec");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred",
      );
    }
  },
);

export const createPolicyRecordsSec = createAsyncThunk(
  "policyRecordSec/createPolicyRecordsSec",
  async (data, { rejectWithValue }) => {
    for (let [key, value] of data.entries()) {
      console.log(`ACTION API >>> ${key}:`, value);
    }
    try {
      const response = await userRequest.post("/policyRecordSec", data);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred",
      );
    }
  },
);

export const updatePolicyRecordsSec = createAsyncThunk(
  "policyRecordSec/updatePolicyRecordsSec",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.put(
        `/policyRecordSec/${data.id}`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred",
      );
    }
  },
);

export const DeletePolicyRecordSec = createAsyncThunk(
  "PolicyRecordSec/DeletePolicyRecordSec",
  async (data, { rejectWithValue }) => {
    console.log("FROM API", data);
    try {
      const response = await userRequest.delete("/policyRecordSec", {
        data: data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unknown error occurred",
      );
    }
  },
);
