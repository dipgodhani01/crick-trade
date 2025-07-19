import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAuc } from "../../utils/api";
import { toast } from "react-toastify";

export const createAuction = createAsyncThunk(
  "auction/createAuction",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createAuc(formData);
      toast.success(response.data.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const auctionSlice = createSlice({
  name: "auction",
  initialState: {
    loading: false,
    success: false,
    error: null,
    auctions: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(createAuction.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createAuction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAuction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const auctionReducer = auctionSlice.reducer;
export default auctionReducer;
